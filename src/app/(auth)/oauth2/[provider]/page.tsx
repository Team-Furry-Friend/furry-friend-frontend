'use client';

import { ImSpinner8 } from 'react-icons/im';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/libs/api';
import { useModal } from '@/store/modalStore';
import NoticeModal from '@/components/modals/NoticeModal';
import Cookies from 'js-cookie';

type PageParams = {
  params: { provider: string };
  searchParams: { code: string | undefined };
};

const Page = ({ params: { provider }, searchParams: { code } }: PageParams) => {
  const router = useRouter();
  const setModal = useModal(s => s.setModal);

  useEffect(() => {
    if (!code) {
      return router.push('/');
    }

    (async () => {
      try {
        const { data } = await auth.signInWithSocial({ provider, code });

        if (!data) {
          throw new Error('소셜 로그인 실패!');
        }

        Cookies.set('access_token', data.accessToken.replace('Bearer ', ''), {
          expires: 7,
        });

        Cookies.set('refresh_token', data.refreshToken.replace('Bearer ', ''), {
          expires: 30,
        });

        router.push('/');
        router.refresh();
      } catch (e) {
        setModal(<NoticeModal texts={['소셜 로그인에 실패했습니다.']} />);

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
