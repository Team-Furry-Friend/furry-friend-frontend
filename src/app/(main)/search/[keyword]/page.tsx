import { Metadata } from 'next';
import List from '@/app/(main)/search/[keyword]/List';
import { Suspense } from 'react';
import ProductListSkeleton from '@/components/skeletons/ProductListSkeleton';

export const generateMetadata = async ({
  params,
}: {
  params: { keyword: string };
}): Promise<Metadata> => {
  return {
    title: `${decodeURIComponent(params.keyword)} - 검색`,
    openGraph: {
      title: `${decodeURIComponent(params.keyword)} - 검색`,
    },
    twitter: {
      title: `${decodeURIComponent(params.keyword)} - 검색`,
    },
  };
};

const Page = ({
  params,
}: {
  params: {
    keyword: string;
  };
}) => {
  return (
    <Suspense fallback={<ProductListSkeleton />}>
      <List keyword={params.keyword} />
    </Suspense>
  );
};

export default Page;
