import { ReactNode } from 'react';
import CategoryList from '@/components/lists/CategoryList';
import SearchBtn from '@/components/buttons/SearchBtn';

const Layout = ({
  params,
  children,
}: {
  params: { type: string };
  children: ReactNode;
}) => {
  return (
    <div className='w-full'>
      <div className='h-8 flex justify-between items-center my-4'>
        <h2 className='w-full font-bold text-2xl'>
          {decodeURIComponent(params.type)}
        </h2>

        <CategoryList />
        <SearchBtn />
      </div>

      {children}
    </div>
  );
};

export default Layout;
