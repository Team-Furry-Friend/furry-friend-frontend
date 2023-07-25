'use client';

import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import ChatForm from '@/app/(main)/chats/[chatRoomId]/ChatForm';
import ChatList from '@/app/(main)/chats/[chatRoomId]/ChatList';
import { MessageData, MessageResponse } from '@/types';
import ChatSkeleton from '@/components/skeletons/ChatSkeleton';
import { useAutoScroll } from '@/hooks/useAutoScroll';
import { useRouter } from 'next/navigation';
import { chats } from '@/libs/api';
import { convertUtcToKst } from '@/libs/convertUtcToKst';
import chatList from '@/app/(main)/chats/[chatRoomId]/ChatList';
import { useChats } from '@/hooks/useChats';

interface ChatFieldProps {
  at: string;
  rt: string;
  chatRoomId: string;
  memberId: number;
}

const ChatField = ({ chatRoomId, rt, memberId, at }: ChatFieldProps) => {
  const { stompClient, messages, isConnected } = useChats({
    chatRoomId,
    at,
    rt,
  });

  const { setChatListElement } = useAutoScroll();

  if (!isConnected || !stompClient.current) {
    return <ChatSkeleton />;
  }

  return (
    <div className='h-[calc(100%-41px)] md:h-[calc(100%-57px)]'>
      <ChatList
        messages={messages}
        memberId={memberId}
        setChatListElement={setChatListElement}
      />
      <ChatForm
        stompClient={stompClient.current}
        chatRoomId={chatRoomId}
        rt={rt}
      />
    </div>
  );
};

export default ChatField;
