'use client';

import { Dispatch, SetStateAction } from 'react';
import { MessageData } from '@/types';
import { getDateDiff } from '@/libs/getDateDiff';
import ChatListItem from '@/components/items/ChatListItem';

interface ChatListProps {
  messages: MessageData[];
  memberId: number;
  setChatListElement: Dispatch<SetStateAction<HTMLUListElement | null>>;
}

const ChatList = ({
  messages,
  memberId,
  setChatListElement,
}: ChatListProps) => {
  return (
    <ul
      className='h-[calc(100%-48px)] overflow-y-scroll bg-gray-200 dark:bg-gray-600'
      ref={setChatListElement}
    >
      {messages.map(message => (
        <ChatListItem
          key={message.chatMessageId}
          message={message}
          memberId={memberId}
        />
      ))}
    </ul>
  );
};

ChatList.displayName = 'ChatList';

export default ChatList;
