'use client';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { Datum, DtoList, ProductListResponse } from '@/types';
import ProductItem from '@/components/items/ProductItem';
import ProductItemWithHeart from '@/components/items/ProductItemWithHeart';
import { api } from '@/libs/api';

interface InfiniteScrollProps {
  userBaskets?: Datum[];
  initialPage?: number;
}

const InfiniteScroll = ({ userBaskets, initialPage }: InfiniteScrollProps) => {
  const { postsGroup, spinnerRef } = useInfiniteScroll<DtoList>({
    fetcher: (page: number) =>
      api
        .get<ProductListResponse>(`/products?page=${page}&size=16`)
        .then(r => r.data.data.dtoList.filter(item => !item.del)),
    initialPage: initialPage || 1,
    viewPerPage: 16,
  });

  return (
    <>
      <ul className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8'>
        {postsGroup.map(posts =>
          posts.map(item =>
            userBaskets ? (
              <ProductItemWithHeart
                item={item}
                key={item.pid}
                isLike={userBaskets.some(basket => basket.pid === item.pid)}
              />
            ) : (
              <ProductItem item={item} key={item.pid} />
            )
          )
        )}
      </ul>

      <ul
        className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8'
        ref={spinnerRef}
      >
        {[...new Array(16)].fill(0).map((_, key) => (
          <li
            key={key}
            className='w-[calc(50%-4px)] md:w-[calc((100%-48px)/4)] flex flex-col gap-2'
          >
            <div className='h-32 bg-gray-200 rounded animate-pulse' />
            <div className='w-1/3 h-4 bg-gray-200 rounded animate-pulse' />
            <div className='w-3/4 h-6 bg-gray-200 rounded animate-pulse' />
            <div className='w-1/2 h-4 bg-gray-200 rounded animate-pulse' />
          </li>
        ))}
      </ul>
    </>
  );
};

export default InfiniteScroll;
