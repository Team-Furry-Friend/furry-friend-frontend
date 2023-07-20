import Image from 'next/image';
import { Bevan } from 'next/font/google';
import Link from 'next/link';
import { BsGithub } from 'react-icons/bs';
import ThemeSwitchBtn from '@/components/buttons/ThemeSwitchBtn';
import { cookies } from 'next/headers';

const font = Bevan({
  weight: '400',
  subsets: ['latin'],
});

const Footer = () => {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme')?.value;

  return (
    <footer className='bg-gray-100 dark:bg-gray-700 border-t'>
      <div className='max-w-6xl mx-auto px-2 md:px-4 py-8 flex flex-col gap-4 items-start'>
        <div className='flex flex-wrap gap-4 items-center'>
          <div
            className={`w-full md:w-fit flex gap-4 items-center ${font.className}`}
          >
            <Image
              src='/icons/chinchilla.png'
              alt='logo'
              width={50}
              height={50}
              className='w-6'
            />
            <p className='block'>Furry Friend</p>
          </div>
          <div className='hidden md:block w-[1px] h-4 bg-gray-400' />
          <Link href={'/terms-of-service'}>이용약관</Link>
          <div className='w-[1px] h-4 bg-gray-400' />
          <Link href={'/privacy'}>개인정보 처리방침</Link>
        </div>

        <div className='flex gap-2'>
          <Link
            target='_blank'
            href='https://icons8.com/icon/IXOBYgTqGhdq/chinchilla'
          >
            Chinchilla
          </Link>
          icon by
          <Link target='_blank' href='https://icons8.com'>
            Icons8
          </Link>
        </div>

        <div className='w-full flex justify-end gap-2 items-center'>
          <ThemeSwitchBtn theme={theme} />
          <Link
            href={'https://github.com/kkukileon305/furry-friend'}
            target='_blank'
            className='hover:underline'
          >
            <BsGithub size={32} />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
