import Image from 'next/image';
import { Bevan } from 'next/font/google';
import Link from 'next/link';

const font = Bevan({
  weight: '400',
  subsets: ['latin'],
});

const Footer = () => {
  return (
    <footer className='bg-gray-100'>
      <div className='max-w-5xl mx-auto p-2 md:p-4 flex flex-col gap-4'>
        <div className={`flex gap-4 items-center ${font.className}`}>
          <Image
            src='/icons/chinchilla.png'
            alt='logo'
            width={50}
            height={50}
            className='w-6'
          />
          <p className='block'>Furry Friend</p>
        </div>

        <div className='flex gap-4 items-center'>
          <Link href={'/terms-of-service'}>이용약관</Link>
          <div className='w-[1px] h-4 bg-gray-400' />
          <Link href={'/privacy'}>개인정보 처리방침</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
