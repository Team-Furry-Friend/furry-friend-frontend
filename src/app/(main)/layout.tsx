import { ReactNode } from 'react';
import Header from '@/app/(main)/Header';
import Footer from '@/app/(main)/Footer';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <div className='min-h-[100dvh]'>
        <Header />
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;
