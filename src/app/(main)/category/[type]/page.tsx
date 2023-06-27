import { Metadata } from 'next';
import { Suspense } from 'react';
import ProductListSkeleton from '@/components/skeletons/ProductListSkeleton';
import List from './List';

export const generateMetadata = async ({
  params,
}: {
  params: { type: string };
}): Promise<Metadata> => {
  return {
    title: `${decodeURIComponent(params.type)} - 카테고리`,
    openGraph: {
      title: `${decodeURIComponent(params.type)} - 카테고리`,
    },
    twitter: {
      title: `${decodeURIComponent(params.type)} - 카테고리`,
    },
  };
};
const Page = ({
  params,
}: {
  params: {
    type: string;
  };
}) => {
  return (
    <div className='w-full'>
      <h2 className='font-bold text-2xl my-4'>
        {decodeURIComponent(params.type)}
      </h2>

      <Suspense fallback={<ProductListSkeleton />}>
        <List type={params.type} />
      </Suspense>
    </div>
  );
};

export default Page;
