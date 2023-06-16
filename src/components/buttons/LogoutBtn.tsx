'use client';

import { useRouter } from 'next/navigation';
import { api } from '@/libs/api';
import Cookies from 'js-cookie';

const LogoutBtn = ({ at }: { at: string }) => {
  const router = useRouter();

  const onClick = async () => {
    try {
      await api.post(`/member/logout`, {
        access_token: at,
      });
    } catch (e) {
      console.log(e);
    }

    Cookies.set('access_token', '', {
      expires: 0,
    });

    router.refresh();
  };

  return <button onClick={onClick}>로그아웃</button>;
};

export default LogoutBtn;
