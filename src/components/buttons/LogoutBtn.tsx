'use client';

import { useRouter } from 'next/navigation';
import { auth } from '@/libs/api';
import { useState } from 'react';

const LogoutBtn = ({ at }: { at: string }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    auth.signOut();

    router.refresh();
    router.push('/login');
  };

  return (
    <button
      disabled={isLoading}
      onClick={onClick}
      className='bg-blue-400 hover:bg-blue-200 disabled:bg-gray-200 rounded px-2 py-1 text-white font-bold'
    >
      로그아웃
    </button>
  );
};

export default LogoutBtn;
