'use client';

import { BsFillTrashFill } from 'react-icons/bs';
import { useModal } from '@/store/modalStore';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import FunctionModal from '@/components/modals/FunctionModal';
import { products } from '@/libs/api';
import NoticeModal from '@/components/modals/NoticeModal';

interface RemoveBtnProps {
  pid: number;
  at: string;
}

const RemoveBtn = ({ at, pid }: RemoveBtnProps) => {
  const router = useRouter();
  const setModal = useModal(s => s.setModal);

  const [isLoading, setIsLoading] = useState(false);

  const handleRemove = async () => {
    setIsLoading(true);

    try {
      await products.delete(pid, at);

      setModal(null);
      router.push('/');
      router.refresh();
    } catch (e) {
      setModal(<NoticeModal texts={['삭제에 실패했습니다.']} />);
    }

    setIsLoading(false);
  };

  const onClick = () => {
    setModal(
      <FunctionModal
        texts={['정말로 삭제하시겠어요?']}
        handler={handleRemove}
        disabled={isLoading}
      />
    );
  };

  return (
    <button
      onClick={onClick}
      className='w-32 flex items-center gap-2 p-2 bg-white dark:bg-gray-800 disabled:bg-gray-200 hover:bg-gray-200 dark:disabled:bg-gray-600 dark:hover:bg-gray-600'
    >
      <BsFillTrashFill size={24} />
      <p className='w-fit'>삭제하기</p>
    </button>
  );
};

export default RemoveBtn;
