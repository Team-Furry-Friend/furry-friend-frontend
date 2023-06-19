const Loading = () => {
  return (
    <div className='w-full flex flex-col gap-8'>
      <div className='w-32 h-8 bg-gray-200 rounded animate-pulse' />

      <div className='flex flex-col gap-4'>
        <div className='flex flex-col gap-2'>
          <div className='w-32 h-6 bg-gray-200 rounded animate-pulse' />
          <div className='w-full h-11 bg-gray-200 rounded animate-pulse' />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='w-32 h-6 bg-gray-200 rounded animate-pulse' />
          <div className='w-full h-11 bg-gray-200 rounded animate-pulse' />
        </div>
        <div className='flex flex-col gap-2'>
          <div className='w-32 h-6 bg-gray-200 rounded animate-pulse' />
          <div className='w-full h-11 bg-gray-200 rounded animate-pulse' />
        </div>

        <div className='h-10 bg-gray-200 rounded animate-pulse' />
      </div>
    </div>
  );
};

export default Loading;
