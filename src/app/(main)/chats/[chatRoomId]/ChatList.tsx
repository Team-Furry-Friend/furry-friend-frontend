'use client';

import { Dispatch, forwardRef, SetStateAction } from 'react';
import { MessageData } from '@/types';
import { getDateDiff } from '@/libs/getDateDiff';

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
      className='h-[calc(100%-48px)] overflow-y-scroll bg-gray-200'
      ref={setChatListElement}
    >
      {messages.map(message => (
        <li
          key={message.chatMessageId}
          className={`flex flex-col ${
            memberId === message.chatMessageSenderId ? 'items-end' : ''
          } gap-2 p-2`}
        >
          {memberId !== message.chatMessageSenderId && (
            <p className='font-bold'>{message.chatMessageSerderName}</p>
          )}
          <p
            className={`p-2 shadow font-bold rounded w-fit ${
              memberId === message.chatMessageSenderId
                ? 'bg-blue-400 text-white rounded-tr-none'
                : 'bg-white rounded-tl-none'
            }`}
          >
            {message.chatMessageContent}
          </p>
          <p className='text-gray-500 text-sm'>
            {getDateDiff(message.regDate)}
          </p>
        </li>
      ))}
    </ul>
  );
};

ChatList.displayName = 'ChatList';

export default ChatList;
