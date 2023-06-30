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
    <Swiper slidesPerView='auto' loop centeredSlides>
      {posts.map(post => (
        <SwiperSlide key={post.pid} className='w-full bg-blue-400'>
          <div className='center'>
            <p>{post.pname}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Banner;
