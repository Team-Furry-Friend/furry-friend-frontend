import InfiniteScroll from '@/components/lists/InfiniteScroll';

const Page = ({
  params,
}: {
  params: {
    keyword: string;
  };
}) => {
  return (
    <div className='w-full'>
      <h2 className='font-bold text-2xl my-4'>검색</h2>

      <InfiniteScroll keyword={params.keyword} />
    </div>
  );
};

export default Page;
