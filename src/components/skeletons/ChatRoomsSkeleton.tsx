const ChatRoomsSkeleton = () => {
  return (
    <>
      {new Array(8).fill(0).map((_, key) => (
        <div key={key} className='p-2 border-b'>
          <div className='h-6 w-32 bg-gray-200 rounded animate-pulse mb-2' />
          <div className='h-4 w-16 bg-gray-200 rounded animate-pulse' />
        </div>
      ))}
    </>
  );
};

export default ChatRoomsSkeleton;
