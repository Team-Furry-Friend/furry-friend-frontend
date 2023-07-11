'use client';

import { useRouter } from 'next/navigation';
import { auth } from '@/libs/api';
import { useState } from 'react';

const LogoutBtn = () => {
  const router = useRouter();

  const onClick = async () => {
    auth.signOut();

    router.refresh();
    router.push('/login');
  };

  return (
    <button
      onClick={onClick}
      className='bg-blue-400 hover:bg-blue-200 disabled:bg-gray-200 rounded px-2 py-1 text-white font-bold'
    >
      로그아웃
    </button>
  );
};

export default LogoutBtn;
