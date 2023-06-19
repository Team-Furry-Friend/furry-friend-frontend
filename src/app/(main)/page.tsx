import UploadBtn from '@/components/buttons/UploadBtn';
import ProductList from '@/components/lists/ProductList';
import { Suspense } from 'react';
import ProductListSkeleton from '@/components/skeletons/ProductListSkeleton';

const Page = () => {
  return (
    <>
      <div className='h-80 bg-fuchsia-400 flex justify-center items-center text-white font-bold text-3xl'>
        <h2>Furry Friend</h2>
      </div>

      <div className='max-w-6xl mx-auto p-2 md:p-4'>
        <h2 className='w-full font-bold text-2xl my-8'>최근 등록된 상품들</h2>

        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList />
        </Suspense>
      </div>

      <UploadBtn />
    </>
  );
};

export default Page;
