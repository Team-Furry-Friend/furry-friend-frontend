import { cookies } from 'next/headers';
import Link from 'next/link';

const Page = async () => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  if (!at) {
    return (
      <div className='min-h-[calc(100dvh-48px)] md:min-h-[calc(100dvh-64px)] max-w-6xl mx-auto p-2 md:p-4 flex justify-center items-center'>
        <div className='max-w-2xl w-full border rounded flex flex-col items-center gap-4 p-4'>
          <p className='font-bold text-xl text-center'>
            지금 가입하고 <br /> 당신의 상품을 업로드 하세요!
          </p>

          <Link
            href={'/login'}
            className='w-fit p-2 rounded font-bold text-white bg-blue-400'
          >
            로그인하기
          </Link>
        </div>
      </div>
    );
  }

  return <div className='max-w-6xl mx-auto p-2 md:p-4'>Page</div>;
};

export default Page;
