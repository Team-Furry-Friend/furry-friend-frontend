import { ReactNode } from 'react';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='min-h-[calc(100dvh-48px)] md:min-h-[calc(100dvh-64px)] max-w-6xl mx-auto p-2 md:p-4 flex justify-center items-center'>
      {children}
    </div>
  );
};

export default Layout;
