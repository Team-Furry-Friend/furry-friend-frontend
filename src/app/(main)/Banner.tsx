'use client';

import { api } from '@/libs/api';
import { PopularityResponse } from '@/types';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import Image from 'next/image';

const Banner = async () => {
  const {
    data: { data: posts },
  } = await api.get<PopularityResponse>('/products/popularity');

  return (
    <Swiper className='bg-blue-400' slidesPerView='auto' loop centeredSlides>
      {posts.map(post => (
        <SwiperSlide key={post.pid} className='max-w-6xl mx-auto w-full'>
          <p>{post.pname}</p>

          {post.imageDTOList.length !== 0 && (
            <ul className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8 justify-center'>
              {post.imageDTOList.map(img => (
                <li
                  key={img.imgName}
                  className='w-[calc(50%-4px)] md:w-[calc((100%-48px)/4)]'
                >
                  <Image
                    src={img.path}
                    alt={img.imgName}
                    width={480}
                    height={480}
                    className='w-full rounded aspect-square object-contain'
                  />
                </li>
              ))}
            </ul>
          )}
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
