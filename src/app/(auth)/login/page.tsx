import { Metadata } from 'next';
import LoginForm from '@/app/(auth)/login/LoginForm';
import Link from 'next/link';
import Image from 'next/image';

export const metadata: Metadata = {
  title: 'Login',
};

const Page = () => {
  return (
    <>
      <LoginForm />
      <div className='flex justify-center gap-4'>
        <p>처음이신가요?</p>
        <Link href={'/register'} className='text-center text-blue-400'>
          회원가입
        </Link>
      </div>

      <div className='my-4 relative'>
        <div className='h-[1px] bg-gray-200' />
        <p className='absolute left-1/2 -translate-x-1/2 top-0 -translate-y-[calc(50%-1px)] bg-white px-2 text-gray-400'>
          소셜 로그인
        </p>
      </div>

      <div className='flex justify-center'>
        <Link
          href={`${process.env.NEXT_PUBLIC_BACKEND_URL}/oauth2/authorization/kakao`}
        >
          <Image
            src={'/icons/kakao_login.png'}
            alt={'kakao login'}
            width={180}
            height={60}
          />
        </Link>
      </div>
    </>
  );
};

export default Page;
