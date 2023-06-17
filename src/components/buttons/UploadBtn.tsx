'use client';

import Link from 'next/link';

const UploadBtn = () => {
  return (
    <Link
      href={'/upload'}
      className='flex justify-center items-center fixed left-1/2 -translate-x-1/2 bottom-4 bg-blue-400 hover:bg-blue-200 rounded-full p-2 font-bold text-white'
    >
      업로드
    </Link>
  );
};

export default UploadBtn;
