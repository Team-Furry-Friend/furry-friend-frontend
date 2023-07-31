import { useEffect, useRef, useState } from 'react';
import { CompatClient, Stomp } from '@stomp/stompjs';
import { MessageData, MessageResponse } from '@/types';
import SockJS from 'sockjs-client';
import { useRouter } from 'next/navigation';

type UseChatProps = {
  chatRoomId: string;
  rt: string;
  memberId: number;
};

export const useChats = ({ chatRoomId, rt, memberId }: UseChatProps) => {
  const router = useRouter();
  const stompClient = useRef<CompatClient | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  const [messages, setMessages] = useState<MessageData[]>([]);

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
        setIsConnected(true);

        stompClient.current?.subscribe(`/sub/chats/${chatRoomId}`, response => {
          const message = JSON.parse(response.body) as MessageResponse;

          if (message.data.chatMessageSenderId !== memberId) {
            stompClient.current?.send(
              '/pub/chats/read',
              {
                Authorization: `Bearer ${rt}`,
              },
              JSON.stringify({
                chatRoomId,
                messageId: [message.data.chatMessageId],
              })
            );
          }

          setMessages(prev => [...prev, message.data]);
        });

        stompClient.current?.subscribe(
          `/sub/chats/read/${chatRoomId}`,
          response => {
            const successes = JSON.parse(response.body) as number[];

            setMessages(prev =>
              prev.map(message => ({
                ...message,
                chatMessageRead: message.chatMessageRead
                  ? true
                  : successes.includes(message.chatMessageId),
              }))
            );
          }
        );
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
