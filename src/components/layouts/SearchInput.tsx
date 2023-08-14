'use client';

import { ChangeEventHandler, FormEventHandler, useRef, useState } from 'react';
import { BsSearch } from 'react-icons/bs';
import AutoSearchList from '@/app/(main)/AutoSearchList';
import { products } from '@/libs/api';
import { Product } from '@/types';
import { useRouter } from 'next/navigation';

const SearchInput = () => {
  const router = useRouter();

  const [keyword, setKeyword] = useState('');
  const [productList, setProductList] = useState<Product[]>([]);
  const debounce = useRef<ReturnType<typeof setTimeout>>();

  const onChange: ChangeEventHandler<HTMLInputElement> = e => {
    setKeyword(e.target.value);

    clearTimeout(debounce.current);

    debounce.current = setTimeout(async () => {
      if (e.target.value.length > 0) {
        const response = await products.get({
          page: 1,
          keyword: e.target.value,
        });

        setProductList(response);
      }
    }, 500);
  };

  const onSubmit: FormEventHandler = e => {
    e.preventDefault();

    if (keyword.length > 0) {
      router.push(`/search/${keyword}`);
    }
  };

  return (
    <div className='hidden md:block group'>
      <form
        onSubmit={onSubmit}
        className='p-2 rounded bg-gray-200 dark:bg-gray-600 w-60 flex items-center'
      >
        <button>
          <BsSearch />
        </button>
        <input
          type='text'
          className='block w-full pl-2'
          placeholder='어떤 상품을 찾으시나요?'
          onChange={onChange}
        />
      </form>

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
