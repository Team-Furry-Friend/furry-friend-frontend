'use client';

import { useRouter } from 'next/navigation';
import { api } from '@/libs/api';
import Cookies from 'js-cookie';
import { useState } from 'react';

const LogoutBtn = ({ at }: { at: string }) => {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);

  const onClick = async () => {
    setIsLoading(true);

    try {
      await api.post(`/member/logout`, {
        access_token: at,
      });
    } catch (e) {
      console.log(e);
    }

    setIsLoading(false);

    Cookies.set('access_token', '', {
      expires: 0,
    });

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
