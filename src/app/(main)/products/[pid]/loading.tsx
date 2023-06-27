const Loading = () => {
  return (
    <div className='w-full flex flex-col gap-4'>
      <div className='w-8 h-8 bg-gray-200 rounded-full animate-pulse mb-4' />
      <div className='w-24 h-10 bg-gray-200 rounded animate-pulse' />
      <div className='flex gap-4'>
        <div className='w-12 h-4 bg-gray-200 rounded animate-pulse' />
        <div className='w-16 h-4 bg-gray-200 rounded animate-pulse' />
      </div>
      <div className='w-36 h-6 bg-gray-200 rounded animate-pulse' />
      <div className='w-24 h-4 bg-gray-200 rounded animate-pulse' />

      <div className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8'>
        <div className='w-[calc(50%-4px)] md:w-[calc((100%-48px)/4)] h-64 bg-gray-200 rounded animate-pulse' />
        <div className='w-[calc(50%-4px)] md:w-[calc((100%-48px)/4)] h-64 bg-gray-200 rounded animate-pulse' />
        <div className='w-[calc(50%-4px)] md:w-[calc((100%-48px)/4)] h-64 bg-gray-200 rounded animate-pulse' />
        <div className='w-[calc(50%-4px)] md:w-[calc((100%-48px)/4)] h-64 bg-gray-200 rounded animate-pulse' />
      </div>
      <div className='w-24 h-4 bg-gray-200 rounded animate-pulse' />
      <div className='w-32 h-4 bg-gray-200 rounded animate-pulse' />
      <div className='w-16 h-4 bg-gray-200 rounded animate-pulse' />

      <div className='h-[1px] bg-gray-200 my-4' />

      <div className='bg-gray-200 animate-pulse h-32 rounded mb-8' />

      <div className='flex flex-col border-b pb-8 mb-32'>
        <div className='flex gap-4'>
          <div className='w-16 h-6 bg-gray-200 rounded animate-pulse' />
          <div className='w-16 h-6 bg-gray-200 rounded animate-pulse' />
        </div>

        <div className='w-32 h-4 bg-gray-200 rounded animate-pulse mt-4' />
        <div className='w-16 h-4 bg-gray-200 rounded animate-pulse mt-4' />
      </div>
    </div>
  );
};

export default Loading;
