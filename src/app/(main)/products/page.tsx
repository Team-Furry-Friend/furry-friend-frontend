import ProductList from '@/components/lists/ProductList';
import { Suspense } from 'react';
import ProductListSkeleton from '@/components/skeletons/ProductListSkeleton';
import CategoryList from '@/components/lists/CategoryList';
import SearchBtn from '@/components/buttons/SearchBtn';

const Page = () => {
  return (
    <div className='center'>
      <div className='h-8 flex justify-between items-center my-4'>
        <h2 className='w-full font-bold text-2xl'>최근 등록된 상품들</h2>

        <CategoryList />
        <SearchBtn />
      </div>

      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList />
      </Suspense>
    </div>
  );
};

export default Page;
