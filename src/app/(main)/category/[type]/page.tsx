import InfiniteScroll from '@/components/lists/InfiniteScroll';

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

      <InfiniteScroll type={params.type} />
    </div>
  );
};

export default Page;
