import Link from 'next/link';
import { Bevan } from 'next/font/google';
import { ReactNode, Suspense } from 'react';
import AuthMenus from '@/components/lists/AuthMenus';
import AuthMenusSkeleton from '@/components/skeletons/AuthMenusSkeleton';
import Image from 'next/image';
import { BsChatDots } from 'react-icons/bs';
import { MdOutlineSell } from 'react-icons/md';
import { cookies } from 'next/headers';
import ThemeSwitchBtn from '@/components/buttons/ThemeSwitchBtn';

const font = Bevan({
  weight: '400',
  subsets: ['latin'],
});

type LinkData = {
  href: string;
  title: string;
  Icon: ReactNode;
};

const links: LinkData[] = [
  {
    title: '상품',
    href: '/products',
    Icon: <MdOutlineSell size={24} />,
  },
  {
    title: '채팅',
    href: '/chats',
    Icon: <BsChatDots size={24} />,
  },
];

const Header = () => {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme')?.value;

  return (
    <header className='shadow sticky top-0 bg-white dark:bg-gray-800 z-20'>
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
          {links.map(linkData => (
            <Link
              key={linkData.href}
              href={linkData.href}
              className='flex gap-2 items-center px-2 md:px-4 h-full bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600'
            >
              {linkData.Icon}
              <span className='hidden md:block'>{linkData.title}</span>
            </Link>
          ))}
          <div className='px-2 md:pr-4'>
            <ThemeSwitchBtn theme={theme} />
          </div>

          <Suspense fallback={<AuthMenusSkeleton />}>
            <AuthMenus />
          </Suspense>
        </div>
      </div>
    </header>
  );
};

export default Header;
