const ChatSkeleton = () => {
  return (
    <div className='flex flex-col h-full'>
      <div className='h-[calc(100%-48px)] bg-gray-200 p-2'>
        <div className='flex flex-col gap-2 mb-4'>
          <div className='bg-gray-300 w-16 h-6 rounded animate-pulse' />
          <div className='bg-gray-300 w-32 h-24 rounded animate-pulse' />
        </div>

        <div className='flex flex-col gap-2 items-end mb-4'>
          <div className='bg-gray-300 w-32 h-24 rounded animate-pulse' />
        </div>

        <div className='flex flex-col gap-2'>
          <div className='bg-gray-300 w-16 h-6 rounded animate-pulse' />
          <div className='bg-gray-300 w-24 h-12 rounded animate-pulse' />
        </div>
      </div>

      <div className='h-12 p-2'>
        <div className='h-full w-32 bg-gray-200 rounded animate-pulse ' />
      </div>
    </div>
  );
};

export default ChatSkeleton;
