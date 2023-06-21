'use client';

import useInfiniteScroll from '@/hooks/useInfiniteScroll';
import { DtoList, ProductData, ProductListResponse } from '@/types';
import { api } from '@/libs/api';
import Link from 'next/link';
import Image from 'next/image';
import ProductItem from '@/components/items/ProductItem';

const InfiniteScroll = () => {
  const { postsGroup, spinnerRef } = useInfiniteScroll<DtoList>({
    fetcher: (page: number) =>
      api
        .get<ProductListResponse>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?page=${page}&size=16`
        )
        .then(r => r.data.data.dtoList),
    initialPage: 2,
    viewPerPage: 16,
  });

  return (
    <ul className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8'>
      {postsGroup.map(posts =>
        posts.map(item => <ProductItem item={item} key={item.pid} />)
      )}
    </ul>
  );
};

export default InfiniteScroll;
