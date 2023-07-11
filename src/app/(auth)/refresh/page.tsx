'use client';

import { ImSpinner8 } from 'react-icons/im';
import { useEffect } from 'react';
import Cookies from 'js-cookie';
import { auth } from '@/libs/api';
import { useRouter } from 'next/navigation';

const Page = () => {
  const router = useRouter();

  useEffect(() => {
    const rt = Cookies.get('refresh_token');

    if (!rt) {
      auth.signOut();
      router.push('/login');
      return;
    }

    (async () => {
      try {
        const {
          data: { accessToken, refreshToken },
        } = await auth.refreshToken(rt);

        Cookies.set('access_token', accessToken.replace('Bearer ', ''), {
          expires: 7,
        });

        Cookies.set('refresh_token', refreshToken.replace('Bearer ', ''), {
          expires: 30,
        });

        router.push('/');
        router.refresh();
      } catch (e) {
        auth.signOut();

        router.refresh();
        router.push('/login');
      }
    })();
  }, []);

  return (
    <div className='flex justify-center items-center h-32'>
      <ImSpinner8 className='animate-spin text-gray-200' size={32} />
    </div>
  );
};

export default Page;
