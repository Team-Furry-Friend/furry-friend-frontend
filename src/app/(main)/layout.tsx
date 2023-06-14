import { ReactNode } from 'react';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';

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
