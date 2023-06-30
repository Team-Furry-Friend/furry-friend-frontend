const BannerSkeleton = () => {
  return (
    <>
      <div className='bg-gray-200 h-[320px] md:h-[384px] animate-pulse' />
      <div className='center'>
        <ul className='flex gap-4 mt-4'>
          <li className='w-24 h-[34px] bg-gray-200 rounded-full animate-pulse' />
          <li className='w-20 h-[34px] bg-gray-200 rounded-full animate-pulse' />
          <li className='w-16 h-[34px] bg-gray-200 rounded-full animate-pulse' />
          <li className='w-20 h-[34px] bg-gray-200 rounded-full animate-pulse' />
        </ul>
      </div>
    </>
  );
};

export default BannerSkeleton;
