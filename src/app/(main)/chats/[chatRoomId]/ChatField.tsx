'use client';

import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import ChatForm from '@/app/(main)/chats/[chatRoomId]/ChatForm';
import ChatList from '@/app/(main)/chats/[chatRoomId]/ChatList';
import { MessageData, MessageResponse } from '@/types';
import ChatSkeleton from '@/components/skeletons/ChatSkeleton';
import { useAutoScroll } from '@/hooks/useAutoScroll';

interface ChatFieldProps {
  rt: string;
  chatRoomId: string;
  memberId: number;
}

const ChatField = ({ chatRoomId, rt, memberId }: ChatFieldProps) => {
  const stompClient = useRef<CompatClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const [messages, setMessages] = useState<MessageData[]>([]);

  const { setChatListElement } = useAutoScroll();

  useEffect(() => {
    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/furry`
    );
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect(
      {
        Authorization: `Bearer ${rt}`,
      },
      () => {
        setIsConnected(true);

        stompClient.current?.subscribe(`/sub/chats/${chatRoomId}`, response => {
          const message = JSON.parse(response.body) as MessageResponse;

          setMessages(prev => [...prev, message.data]);
        });
      }
    );

    return () => {
      stompClient.current?.disconnect();
    };
  }, []);

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
