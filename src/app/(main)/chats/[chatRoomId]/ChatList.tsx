'use client';

import { MessageData } from '@/types';
import ChatListItem from '@/components/items/ChatListItem';

interface ChatListProps {
  messages: MessageData[];
  memberId: number;
}

const ChatList = ({ messages, memberId }: ChatListProps) => {
  return (
    <ul>
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
