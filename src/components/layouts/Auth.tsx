import Link from 'next/link';

interface AuthProps {
  type?: 'upload' | 'post';
}

const Auth = ({ type }: AuthProps) => {
  return (
    <div className='min-h-[calc(100dvh-80px)] md:min-h-[calc(100dvh-96px)] max-w-2xl w-full flex justify-center items-center mx-auto'>
      <div className='border rounded flex flex-col items-center gap-4 p-4 w-full'>
        <p className='font-bold text-xl text-center'>
          지금 가입하고 <br />{' '}
          {type === 'upload'
            ? '당신의 상품을 업로드 하세요!'
            : '상품을 확인해보세요!'}
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
};

export default Auth;
