import Link from 'next/link';
import { Bevan } from 'next/font/google';
import { Suspense } from 'react';
import AuthMenus from '@/components/lists/AuthMenus';
import AuthMenusSkeleton from '@/components/skeletons/AuthMenusSkeleton';
import Image from 'next/image';
import SearchBtn from '@/components/buttons/SearchBtn';

const font = Bevan({
  weight: '400',
  subsets: ['latin'],
});

const Header = () => {
  return (
    <header className='shadow sticky top-0 bg-white z-10'>
      <div className='max-w-6xl mx-auto px-2 md:px-4 flex justify-between items-center'>
        <h1 className='py-2 md:py-4 '>
          <Link
            className={`${font.className} text-xl flex gap-4 items-center`}
            href={'/'}
          >
            <Image
              src='/icons/chinchilla.png'
              alt='logo'
              width={50}
              height={50}
              className='w-8'
            />
            <p className='hidden md:block'>Furry Friend</p>
          </Link>
        </h1>

        <div className='flex gap-4 items-center'>
          <SearchBtn />

          <Suspense fallback={<AuthMenusSkeleton />}>
            <AuthMenus />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Header;
