'use client';

import { ImSpinner8 } from 'react-icons/im';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { auth } from '@/libs/api';
import { useModal } from '@/store/modalStore';
import NoticeModal from '@/components/modals/NoticeModal';

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
        const response = await auth.signInWithSocial({ provider, code });

        // TODO: 백엔드 redirect_uri 수정해야한다고 말하고 성공시 at, rt를 쿠키로 저장해야함
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
