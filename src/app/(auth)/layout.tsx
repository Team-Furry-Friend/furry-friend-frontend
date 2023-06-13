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
    <div className='min-h-[100dvh] flex justify-center items-center p-2 md:p-4'>
      <div className='max-w-md w-full flex flex-col gap-4 border p-2 md:p-4 rounded shadow'>
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

        <Link href={'/'} className='text-center'>
          메인으로 돌아가기
        </Link>
      </div>
    </div>
  );
};

export default Layout;
