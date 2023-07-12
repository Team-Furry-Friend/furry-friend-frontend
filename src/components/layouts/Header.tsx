import Link from 'next/link';
import { Bevan } from 'next/font/google';
import { Suspense } from 'react';
import AuthMenus from '@/components/lists/AuthMenus';
import AuthMenusSkeleton from '@/components/skeletons/AuthMenusSkeleton';
import Image from 'next/image';
import SearchBtn from '@/components/buttons/SearchBtn';
import CategoryList from '@/components/lists/CategoryList';
import { BsChatDots } from 'react-icons/bs';

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

        <div className='flex items-center h-12 md:h-16'>
          <CategoryList />
          <SearchBtn />

          <Link href={'/chats'} className='flex gap-2 px-2'>
            <BsChatDots size={24} />

            <span className='hidden md:block'>채팅</span>
          </Link>

          <Suspense fallback={<AuthMenusSkeleton />}>
            <AuthMenus />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Header;
