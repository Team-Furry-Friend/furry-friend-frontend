'use client';

import { AiFillMessage } from 'react-icons/ai';
import { Product } from '@/types';
import Link from 'next/link';
import SearchItem from '@/components/items/SearchItem';

interface AutoSearchListProps {
  keyword: string;
  productList: Product[];
}

const AutoSearchList = ({ keyword, productList }: AutoSearchListProps) => {
  if (keyword.length === 0) {
    return (
      <div className='p-2 flex flex-col items-center gap-2'>
        <AiFillMessage size={32} className='text-gray-200' />
        <p>검색어를 입력해주세요.</p>
      </div>
    );
  }

  if (productList.length === 0) {
    return (
      <div className='p-2 flex flex-col items-center gap-2'>
        <AiFillMessage size={32} className='text-gray-200' />
        <p>검색 결과가 없습니다.</p>
      </div>
    );
  }

  return (
    <>
      <ul className='w-full'>
        {productList.map(item => (
          <SearchItem item={item} key={item.pid} />
        ))}
      </ul>

      <Link
        href={`/search/${keyword}`}
        className='block w-full text-center p-2 hover:bg-gray-200 dark:hover:bg-gray-600'
      >
        더 보기
      </Link>
    </>
  );
};

export default AutoSearchList;
