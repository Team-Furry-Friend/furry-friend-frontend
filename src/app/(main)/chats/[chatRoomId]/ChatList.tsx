'use client';

import { forwardRef } from 'react';
import { MessageData } from '@/types';

interface ChatListProps {
  messages: MessageData[];
  memberId: number;
}

const ChatList = forwardRef<HTMLUListElement, ChatListProps>(
  ({ messages, memberId }, ref) => {
    return (
      <ul className='h-[calc(100%-48px)] overflow-y-scroll bg-gray-200'>
        {messages.map(message => (
          <li
            key={message.chatMessageId}
            className={`flex flex-col  ${
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
          </li>
        ))}
      </ul>
    );
  }
);

ChatList.displayName = 'ChatList';

export default ChatList;
