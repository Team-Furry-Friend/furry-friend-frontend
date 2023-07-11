'use client';

import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useModal } from '@/store/modalStore';
import { baskets } from '@/libs/api';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Datum } from '@/types';
import NoticeModal from '@/components/modals/NoticeModal';

interface LikeBtnProps {
  basket?: Datum;
  at: string;
  pid: number;
}

const LikeBtn = ({ basket, at, pid }: LikeBtnProps) => {
  const router = useRouter();
  const setModal = useModal(s => s.setModal);

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);

    if (!basket) {
      try {
        await baskets.createBasket(pid, at);
      } catch (e) {
        setModal(<NoticeModal texts={['찜하기에 실패하였습니다.']} />);
      }
    } else {
      try {
        await baskets.removeBasket(basket.bid, at);
      } catch (e) {
        setModal(<NoticeModal texts={['찜 취소에 실패하였습니다.']} />);
      }
    }

    setIsLoading(false);
    router.refresh();
  };

  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className='mx-auto rounded flex items-center gap-2 p-1 bg-white disabled:bg-gray-200 hover:bg-gray-200'
    >
      {basket ? (
        <AiFillHeart size={24} className='text-red-400' />
      ) : (
        <AiOutlineHeart size={24} className='text-red-400' />
      )}
    </button>
  );
};

export default LikeBtn;
