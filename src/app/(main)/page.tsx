import UploadBtn from '@/components/buttons/UploadBtn';
import ProductList from '@/components/lists/ProductList';
import { Suspense } from 'react';
import ProductListSkeleton from '@/components/skeletons/ProductListSkeleton';
import Banner from '@/app/(main)/Banner';
import BannerSkeleton from '@/components/skeletons/BannerSkeleton';
import Link from 'next/link';
import CategoryList from '@/components/lists/CategoryList';
import SearchBtn from '@/components/buttons/SearchBtn';

export const revalidate = 0;

const Page = () => {
  return (
    <>
      <Suspense fallback={<BannerSkeleton />}>
        <Banner />
      </Suspense>

      <div className='center'>
        <div className='h-8 flex justify-between items-center my-4'>
          <h2 className='w-full font-bold text-2xl'>최근 등록된 상품들</h2>

          <CategoryList />
          <SearchBtn />
        </div>

        <Suspense fallback={<ProductListSkeleton />}>
          <ProductList disabledScroll />
        </Suspense>
      </div>

      <Link
        href={'/products'}
        className='block w-fit p-4 my-4 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600 border border-blue-400 text-blue-400 font-bold rounded mx-auto'
      >
        상품 더 찾아보기
      </Link>
    </>
  );
};

export default Page;
