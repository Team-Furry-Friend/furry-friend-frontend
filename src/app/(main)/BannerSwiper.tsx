'use client';

import Image from 'next/image';
import Link from 'next/link';
import BannerNavigation from '@/app/(main)/BannerNavigation';
import { useState } from 'react';
import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { getDateDiff } from '@/libs/getDateDiff';
import { Popularity } from '@/types';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const BannerSwiper = ({ posts }: { posts: Popularity[] }) => {
  const [curIndex, setCurIndex] = useState(0);

  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView='auto'
      centeredSlides
      autoplay
      onSlideChange={swiper => setCurIndex(swiper.activeIndex)}
    >
      {posts.map(post => (
        <SwiperSlide key={post.pid} className='w-full bg-blue-400'>
          <Link href={`/products/${post.pid}`}>
            <div className='center p-0 md:px-4 md:py-8 flex relative'>
              <div className='w-full md:w-1/2'>
                {post.imageDTOList.length !== 0 ? (
                  <Image
                    src={post.imageDTOList[0].path}
                    alt={post.imageDTOList[0].imgName}
                    width={480}
                    height={480}
                    className='object-cover w-full h-80'
                  />
                ) : (
                  <div className='h-80 bg-gray-400 flex justify-center items-center'>
                    <p>등록된 이미지가 없어요...</p>
                  </div>
                )}
              </div>

              <div
                className={`absolute bottom-0 md:bottom-auto top-auto md:top-0 md:left-1/2 w-full h-full md:w-1/2 
              p-2 md:px-4 md:py-8 flex flex-col justify-end md:justify-start gap-4 bg-gradient-to-t from-black to-black/0 md:bg-none`}
              >
                <button className='text-white rounded w-fit'>
                  {post.pcategory}
                </button>

                <div className='flex gap-2 items-center'>
                  <h4 className='font-bold text-white text-2xl'>
                    {post.pname}
                  </h4>
                  <p className='text-white'>{getDateDiff(post.regDate)}</p>
                </div>
                <p className='font-bold text-white text-xl'>{post.pprice}원</p>
              </div>
            </div>
          </Link>
        </SwiperSlide>
      ))}

      <BannerNavigation posts={posts} curIndex={curIndex} />
    </Swiper>
  );
};

export default BannerSwiper;
