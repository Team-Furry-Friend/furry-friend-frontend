const Page = ({
  searchParams,
}: {
  searchParams: {
    [keyword: string]: string;
  };
}) => {
  return <div className='w-full'>{JSON.stringify(searchParams)}</div>;
};

export default Page;
