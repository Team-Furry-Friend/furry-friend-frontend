import ProfileForm from '@/app/(auth)/profile/ProfileForm';
import { redirect } from 'next/navigation';
import Link from 'next/link';

type PageParams = {
  searchParams: { mid: string | undefined };
};

const Page = ({ searchParams }: PageParams) => {
  if (!searchParams.mid) {
    redirect('/');
  }

  return (
    <>
      <ProfileForm mid={searchParams.mid} />
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
