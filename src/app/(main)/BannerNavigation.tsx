'use client';

import { Swiper, SwiperSlide, useSwiper } from 'swiper/react';
import { BsArrowLeftShort, BsArrowRightShort } from 'react-icons/bs';
import { Popularity } from '@/types';
import useIsClient from '@/hooks/useIsClient';

const BannerNavigation = ({
  posts,
  curIndex,
}: {
  posts: Popularity[];
  curIndex: number;
}) => {
  const swiper = useSwiper();
  const isClient = useIsClient();

  return (
    <div className='center mt-4 flex flex-row-reverse items-center gap-4'>
      <div className='w-[67px] flex border border-blue-400 rounded-full overflow-hidden'>
        <button onClick={() => swiper.slidePrev()}>
          <BsArrowLeftShort size={32} className='text-blue-400' />
        </button>
        <div className='w-[1px] h-8 bg-blue-400' />
        <button onClick={() => swiper.slideNext()}>
          <BsArrowRightShort size={32} className='text-blue-400' />
        </button>
      </div>
      {isClient && (
        <Swiper
          className='w-[calc(100%-96px)]'
          slidesPerView='auto'
          spaceBetween={12}
        >
          {posts.map((post, index) => (
            <SwiperSlide className='!w-fit' key={post.pid}>
              <span
                onClick={() => swiper.slideTo(index)}
                className={`block px-2 py-1 border font-bold ${
                  index === curIndex
                    ? 'border-blue-400 text-blue-400'
                    : 'border-gray-400 text-gray-400'
                } rounded-full whitespace-nowrap cursor-pointer`}
              >
                {post.pname}
              </span>
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default BannerNavigation;
