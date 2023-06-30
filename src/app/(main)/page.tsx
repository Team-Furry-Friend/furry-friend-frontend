import UploadBtn from '@/components/buttons/UploadBtn';
import ProductList from '@/components/lists/ProductList';
import { Suspense } from 'react';
import ProductListSkeleton from '@/components/skeletons/ProductListSkeleton';
import Banner from '@/app/(main)/Banner';
import BannerSkeleton from '@/components/skeletons/BannerSkeleton';

export const revalidate = 0;

const Page = () => {
  return (
    <>
      <Suspense fallback={<BannerSkeleton />}>
        <Banner />
      </Suspense>

      <div className='center'>
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
