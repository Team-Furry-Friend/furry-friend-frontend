'use client';

import { ChangeEventHandler, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import AutoSearchList from '@/app/(main)/AutoSearchList';
import { products } from '@/libs/api';
import { Product } from '@/types';

const SearchInput = () => {
  const [keyword, setKeyword] = useState('');
  const debounce = useRef<ReturnType<typeof setTimeout>>();
  const [productList, setProductList] = useState<Product[]>([]);

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    setKeyword(e.target.value);

    clearTimeout(debounce.current);

    debounce.current = setTimeout(async () => {
      if (keyword.length > 0) {
        const response = await products.get({ page: 1, keyword });

        setProductList(response);
      }
    }, 500);
  };

  return (
    <div className='hidden md:block group'>
      <div className='p-2 rounded bg-gray-200 dark:bg-gray-600 w-60 flex items-center'>
        <BsSearch />
        <input
          type='text'
          className='block w-full pl-2'
          placeholder='어떤 상품을 찾으시나요?'
          onChange={onChange}
        />
      </div>

      <div
        tabIndex={0}
        className='absolute hidden overflow-hidden group-focus-within:block top-full bg-white dark:bg-gray-800 w-60 rounded-b shadow-xl'
      >
        <AutoSearchList keyword={keyword} productList={productList} />
      </div>
    </div>
  );
};

export default SearchInput;
