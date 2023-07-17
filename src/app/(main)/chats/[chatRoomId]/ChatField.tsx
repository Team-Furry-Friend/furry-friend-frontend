'use client';

import { useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { Stomp } from '@stomp/stompjs';

interface ChatFieldProps {
  at: string;
  rt: string;
  chatRoomId: string;
}

const ChatField = ({ chatRoomId, at, rt }: ChatFieldProps) => {
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    const socket = new SockJS('https://howstheairtoday.site/chats/furry');
    const stompClient = Stomp.over(socket);

    stompClient.connect(
      {
        Authorization: `Bearer ${rt}`,
      },
      () => {
        setIsConnected(true);

        stompClient.subscribe(`/sub/chats/${chatRoomId}`, response => {
          console.log(response);
        });
      },
      (error: any) => {
        console.log(error);
      }
    );

    return () => {
      stompClient.disconnect(() => {
        console.log('연결 종료');
      });
    };
  }, []);

  return <div>{isConnected ? '연결됨' : '연결안됨'}</div>;
};

export default ChatField;
