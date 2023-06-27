import InfiniteScroll from '@/components/lists/InfiniteScroll';
import { Metadata } from 'next';

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
    <div className='w-full'>
      <h2 className='font-bold text-2xl my-4'>
        &apos;{decodeURIComponent(params.keyword)}&apos; 검색
      </h2>

      <InfiniteScroll keyword={params.keyword} />
    </div>
  );
};

export default Page;
