import { Metadata } from 'next';
import LoginForm from '@/app/(auth)/login/LoginForm';
import Link from 'next/link';
import SocialLogin, { Provider } from '@/app/(auth)/login/SocialLogin';

export const metadata: Metadata = {
  title: 'Login',
};

const socials: Provider[] = ['naver', 'kakao', 'google'];

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
        <p className='absolute left-1/2 -translate-x-1/2 top-0 -translate-y-[calc(50%-1px)] bg-white dark:bg-gray-800 px-2 text-gray-400'>
          소셜 로그인
        </p>
      </div>

      <div className='flex flex-col gap-2 items-center justify-center'>
        {socials.map(socialProvider => (
          <SocialLogin key={socialProvider} provider={socialProvider} />
        ))}
      </div>
    </>
  );
};

export default Page;
