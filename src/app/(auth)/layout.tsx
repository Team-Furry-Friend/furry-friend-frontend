import { ReactNode } from 'react';
import Link from 'next/link';
import { Bevan } from 'next/font/google';
import Image from 'next/image';

const font = Bevan({
  weight: '400',
  subsets: ['latin'],
});

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex'>
      <div className='md:w-1/2 bg-gray-100 hidden lg:flex justify-center items-center'>
        <h2 className='text-3xl'>Furry Friend에 오신 것을 환영해요!</h2>
      </div>
      <div className='w-full lg:w-1/2 min-h-[100dvh] flex justify-center items-center p-2 md:p-4'>
        <div className='max-w-md w-full flex flex-col gap-4 p-2 md:p-4'>
          <h1
            className={`${font.className} text-xl flex justify-center items-center gap-4`}
          >
            <Image
              src='/icons/chinchilla.png'
              alt='logo'
              width={50}
              height={50}
              className='w-8'
            />

            <p>Furry Friend</p>
          </h1>

          {children}

          <Link href={'/'} className='w-fit mx-auto'>
            메인으로 돌아가기
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Layout;
