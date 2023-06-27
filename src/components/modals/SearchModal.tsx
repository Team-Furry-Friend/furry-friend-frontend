'use client';

import { useRouter } from 'next/navigation';
import { BsSearch } from 'react-icons/bs';
import { FormEventHandler, useEffect, useRef, useState } from 'react';
import { useModal } from '@/store/modalStore';

const SearchModal = () => {
  const router = useRouter();
  const setModal = useModal(s => s.setModal);
  const [keyword, setKeyword] = useState('');

  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const onSubmit: FormEventHandler = e => {
    e.preventDefault();

    if (keyword.length === 0) return;

    setModal(null);
    router.push(`/search/${keyword}`);
  };

  return (
    <form onSubmit={onSubmit} className='flex flex-col'>
      <div className='p-2 md:p-4 flex flex-col gap-4'>
        <h2 className='font-bold text-xl'>검색하기</h2>
        <div className='p-2 border rounded-full flex gap-4 items-center'>
          <input
            ref={inputRef}
            onChange={e => setKeyword(e.target.value)}
            type='text'
            className='w-full'
          />
          <BsSearch size={24} />
        </div>
      </div>
      <div className='flex mt-4'>
        <span
          id='close'
          className='w-full bg-red-400 py-2 font-bold text-white flex justify-center items-center cursor-pointer'
          onClick={e => e.preventDefault()}
        >
          닫기
        </span>
        <button className='w-full bg-blue-400 py-2 font-bold text-white'>
          검색하기
        </button>
      </div>
    </form>
  );
};

export default SearchModal;
