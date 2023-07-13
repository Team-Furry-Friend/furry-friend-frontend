'use client';

import { chats } from '@/libs/api';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useModal } from '@/store/modalStore';
import NoticeModal from '@/components/modals/NoticeModal';

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

  const setModal = useModal(s => s.setModal);
  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);

    try {
      const response = await chats.createChatRoom({
        chatParticipantsName,
        chatParticipantsId,
        jwtRequest: {
          access_token: `Bearer ${at}`,
        },
      });

      router.refresh();
      router.push(`/chats/${response.data.chatRoomResponseDTO.chatRoomId}`);
    } catch (e) {
      setModal(<NoticeModal texts={['채팅방 생성에 실패하였습니다.']} />);
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
