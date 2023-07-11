'use client';

import Image from 'next/image';

const Error = () => {
  return (
    <div className='min-h-[100dvh] flex flex-col items-center justify-center'>
      <Image
        src='/icons/chinchilla.png'
        alt='icon'
        width={420}
        height={420}
        className='w-24 object-cover'
      />

      <h1 className='font-bold text-4xl'>404</h1>

      <p className='font-bold text-blue-400'>
        알 수 없는 에러가 발생하였습니다.
      </p>
    </div>
  );
};

export default Error;
