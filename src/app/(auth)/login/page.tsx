import { Metadata } from 'next';
import LoginForm from '@/app/(auth)/login/LoginForm';
import Link from 'next/link';

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
    </>
  );
};

export default Page;
