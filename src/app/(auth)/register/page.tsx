import { Metadata } from 'next';
import Link from 'next/link';
import RegisterForm from '@/app/(auth)/register/RegisterForm';

export const metadata: Metadata = {
  title: 'Register',
};

const Page = () => {
  return (
    <>
      <RegisterForm />
      <Link href={'/login'} className='text-center'>
        로그인
      </Link>
    </>
  );
};

export default Page;
