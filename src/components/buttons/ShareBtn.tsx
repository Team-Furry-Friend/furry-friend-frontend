'use client';

import { AiOutlineLink } from 'react-icons/ai';
import { useModal } from '@/store/modalStore';
import NoticeModal from '@/components/modals/NoticeModal';
import { useState } from 'react';

const ShareBtn = () => {
  const [isLoading, setIsLoading] = useState(false);
  const setModal = useModal(s => s.setModal);

  const onClick = async () => {
    setIsLoading(true);

    try {
      await window.navigator.clipboard.writeText(window.location.href);

      setModal(<NoticeModal texts={['클립보드에 복사되었습니다!']} />);
    } catch (e) {
      setModal(<NoticeModal texts={['클립보드에 복사 실패하였습니다!']} />);
    }

    setIsLoading(false);
  };

  return (
    <button
      onClick={onClick}
      className='bg-white rounded hover:bg-gray-200 p-1'
      disabled={isLoading}
    >
      <AiOutlineLink size={24} />
    </button>
  );
};

export default ShareBtn;
