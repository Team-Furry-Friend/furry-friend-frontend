'use client';

import ChatForm from '@/app/(main)/chats/[chatRoomId]/ChatForm';
import ChatList from '@/app/(main)/chats/[chatRoomId]/ChatList';
import ChatSkeleton from '@/components/skeletons/ChatSkeleton';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useChats } from '@/hooks/useChats';
import { useRef } from 'react';
import { convertUtcToKst } from '@/libs/convertUtcToKst';
import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { MessageData } from '@/types';
import { chats } from '@/libs/api';
import ChatListItem from '@/components/items/ChatListItem';
import { toReversed } from '@/libs/toReversed';

interface ChatFieldProps {
  at: string;
  rt: string;
  chatRoomId: string;
  memberId: number;
}

const ChatField = ({ chatRoomId, rt, memberId, at }: ChatFieldProps) => {
  const { stompClient, messages, isConnected } = useChats({
    chatRoomId,
    rt,
    memberId,
  });

  const curDate = useRef<string>(
    convertUtcToKst(new Date()).toISOString().split('Z')[0]
  );

  const { postsGroup, setSpinner } = useInfiniteScroll<MessageData>({
    fetcher: page =>
      chats.getMessages({ chatRoomId, at, page, startTime: curDate.current }),
    viewPerPage: 10,
    onFetched: data => {
      stompClient.current?.send(
        '/pub/chats/read',
        {
          Authorization: `Bearer ${rt}`,
        },
        JSON.stringify({
          chatRoomId,
          messageId: data
            .filter(message => message.chatMessageSenderId !== memberId)
            .map(message => message.chatMessageId),
        })
      );
    },
  });

  const { setChatListElement } = useAutoScroll();

  if (!isConnected || !stompClient.current) {
    return <ChatSkeleton />;
  }

  return (
    <div className='h-[calc(100%-41px)] md:h-[calc(100%-57px)]'>
      <div
        className='h-[calc(100%-48px)] overflow-y-scroll bg-gray-200 dark:bg-gray-600'
        ref={setChatListElement}
      >
        <ul className='p-2' ref={setSpinner}>
          <li className='flex flex-col gap-2 mb-4'>
            <div className='bg-gray-300 w-16 h-6 rounded animate-pulse' />
            <div className='bg-gray-300 w-32 h-24 rounded animate-pulse' />
          </li>

          <li className='flex flex-col gap-2 items-end mb-4'>
            <div className='bg-gray-300 w-32 h-24 rounded animate-pulse' />
          </li>

          <li className='flex flex-col gap-2'>
            <div className='bg-gray-300 w-16 h-6 rounded animate-pulse' />
            <div className='bg-gray-300 w-24 h-12 rounded animate-pulse' />
          </li>
        </ul>

        <ul>
          {toReversed(postsGroup).map(messages =>
            toReversed(messages).map(message => (
              <ChatListItem
                key={message.chatMessageId}
                message={message}
                memberId={memberId}
              />
            ))
          )}
        </ul>
        <ChatList messages={messages} memberId={memberId} />
      </div>
      <ChatForm
        stompClient={stompClient.current}
        chatRoomId={chatRoomId}
        rt={rt}
      />
    </div>
  );
};

export default ChatField;
