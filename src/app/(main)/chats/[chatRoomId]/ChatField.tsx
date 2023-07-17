'use client';

import { useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { CompatClient, Stomp } from '@stomp/stompjs';
import ChatForm from '@/app/(main)/chats/[chatRoomId]/ChatForm';
import ChatList from '@/app/(main)/chats/[chatRoomId]/ChatList';

interface ChatFieldProps {
  at: string;
  rt: string;
  chatRoomId: string;
}

const ChatField = ({ chatRoomId, at, rt }: ChatFieldProps) => {
  const stompClient = useRef<CompatClient | null>(null);

  const [isConnected, setIsConnected] = useState(false);

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
          console.log(response);
        });
      }
    );

    return () => {
      stompClient.current?.disconnect(() => {
        console.log('연결 종료');
      });
    };
  }, []);

  if (!isConnected || !stompClient.current) {
    return <div>연결중</div>;
  }

  return (
    <div className='h-full'>
      <ChatList stompClient={stompClient.current} />
      <ChatForm
        stompClient={stompClient.current}
        chatRoomId={chatRoomId}
        rt={rt}
      />
    </div>
  );
};

export default ChatField;
