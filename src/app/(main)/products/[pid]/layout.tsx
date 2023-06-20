import { ReactNode } from 'react';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='max-w-6xl mx-auto p-2 md:p-4'>
      <Link href={'/'} className='block w-fit mb-4'>
        <AiOutlineArrowLeft
          size={32}
          className='border border-black rounded-full p-1'
        />
      </Link>
      {children}
    </div>
  );
};

export default Layout;
