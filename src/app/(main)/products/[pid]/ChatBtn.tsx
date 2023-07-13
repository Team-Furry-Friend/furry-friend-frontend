'use client';

import { chats } from '@/libs/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

type CreateChatRoomOptions = {
  chatParticipantsId: number | string;
  chatParticipantsName: string;
  at: string;
};

const ChatBtn = ({
  chatParticipantsId,
  chatParticipantsName,
  at,
}: CreateChatRoomOptions) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);

    try {
      const data = await chats.createChatRoom({
        chatParticipantsName,
        chatParticipantsId,
        jwtRequest: {
          access_token: at,
        },
      });
      console.log(data);
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  return (
    <button
      onClick={onClick}
      className='bg-blue-400 hover:bg-blue-200 disabled:bg-gray-200 py-1 font-bold text-white rounded'
      disabled={isLoading}
    >
      채팅 보내기
    </button>
  );
};

export default ChatBtn;
