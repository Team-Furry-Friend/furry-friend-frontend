import Link from 'next/link';
import { Bevan } from 'next/font/google';
import { Suspense } from 'react';
import AuthMenus from '@/components/lists/AuthMenus';

const font = Bevan({
  weight: '400',
  subsets: ['latin'],
});

const Header = () => {
  return (
    <header className='shadow'>
      <div className='max-w-5xl mx-auto p-2 md:p-4 flex justify-between items-center'>
        <h1>
          <Link className={`${font.className} text-xl`} href={'/'}>
            Furry Friend
          </Link>
        </h1>

        <Suspense>
          <AuthMenus />
        </Suspense>
      </div>
    </header>
  );
};

export default Header;
