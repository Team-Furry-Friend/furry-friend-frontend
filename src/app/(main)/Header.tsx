import Link from 'next/link';
import { Bevan } from 'next/font/google';

const font = Bevan({
  weight: '400',
  subsets: ['latin'],
});

const Header = async () => {
  return (
    <header className='shadow'>
      <div className='max-w-5xl mx-auto p-2 md:p-4 flex justify-between'>
        <h1>
          <Link className={`${font.className} text-xl`} href={'/'}>
            Furry Friend
          </Link>
        </h1>
      </div>
    </header>
  );
};

export default Header;
