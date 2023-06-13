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
      <Link href={'/register'} className='text-center'>
        회원가입
      </Link>
    </>
  );
};

export default Page;
