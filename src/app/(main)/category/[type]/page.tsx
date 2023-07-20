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
    <Suspense fallback={<ProductListSkeleton />}>
      <List type={params.type} />
    </Suspense>
  );
};

export default Page;
