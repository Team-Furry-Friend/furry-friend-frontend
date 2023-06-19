const ProductListSkeleton = () => {
  return (
    <div className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8'>
      {[...new Array(16)].fill(0).map((_, key) => (
        <div
          key={key}
          className='w-[calc(50%-4px)] md:w-[calc((100%-48px)/4)] flex flex-col gap-2'
        >
          <div className='h-32 bg-gray-200 rounded animate-pulse' />
          <div className='w-1/3 h-4 bg-gray-200 rounded animate-pulse' />
          <div className='w-3/4 h-6 bg-gray-200 rounded animate-pulse' />
          <div className='w-1/2 h-4 bg-gray-200 rounded animate-pulse' />
        </div>
      ))}
    </div>
  );
};

export default ProductListSkeleton;
