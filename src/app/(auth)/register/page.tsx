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
      <div className='flex justify-center gap-4'>
        <p>이미 회원이신가요?</p>
        <Link href={'/login'} className='text-center text-blue-400'>
          로그인
        </Link>
      </div>
    </>
  );
};

export default Page;
