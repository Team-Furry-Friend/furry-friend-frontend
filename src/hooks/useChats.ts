import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { MessageData, MessageResponse } from '@/types';
import { convertUtcToKst } from '@/libs/convertUtcToKst';
import SockJS from 'sockjs-client';
import { chats } from '@/libs/api';

type UseChatProps = {
  chatRoomId: string;
  at: string;
  rt: string;
};

export const useChats = ({ chatRoomId, at, rt }: UseChatProps) => {
  const router = useRouter();
  const stompClient = useRef<CompatClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const [messages, setMessages] = useState<MessageData[]>([]);

  const curDate = useRef<string>(
    convertUtcToKst(new Date()).toISOString().split('Z')[0]
  );

  useEffect(() => {
    const socket = new SockJS(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/furry`
    );
    stompClient.current = Stomp.over(socket);

    stompClient.current.connect(
      {
        Authorization: `Bearer ${rt}`,
      },
      async () => {
        try {
          const data = await chats.getMessages({
            page: 1,
            chatRoomId: chatRoomId,
            startTime: curDate.current,
            at,
          });

          setMessages(data.dtoList.reverse());
        } catch (e) {
          router.push('/chats');
        }

        setIsConnected(true);

        stompClient.current?.subscribe(`/sub/chats/${chatRoomId}`, response => {
          const message = JSON.parse(response.body) as MessageResponse;

          setMessages(prev => [...prev, message.data]);
        });
      }
    );

    return () => {
      stompClient.current?.disconnect(() => {
        setIsConnected(false);
      });
    };
  }, []);

  return {
    isConnected,
    messages,
    stompClient,
  };
};
