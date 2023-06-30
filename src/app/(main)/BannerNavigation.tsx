'use client';

import { useSwiper } from 'swiper/react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { Popularity } from '@/types';

const BannerNavigation = ({ posts }: { posts: Popularity[] }) => {
  const swiper = useSwiper();

  return (
    <div className='center flex items-center gap-4'>
      <div className='flex border border-blue-400 w-fit rounded-full overflow-hidden'>
        <button onClick={() => swiper.slidePrev()}>
          <BsArrowLeftShort size={32} className='text-blue-400' />
        </button>
        <div className='w-[1px] h-8 bg-blue-400' />
        <button onClick={() => swiper.slideNext()}>
          <BsArrowRightShort size={32} className='text-blue-400' />
        </button>
      </div>
    </div>
  );
};

export default BannerNavigation;
