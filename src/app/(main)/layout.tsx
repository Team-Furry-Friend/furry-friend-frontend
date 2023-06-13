import { ReactNode } from 'react';
import Header from '@/app/(main)/Header';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div>
      <Header />
      {children}
    </div>
  );
};

export default Layout;
