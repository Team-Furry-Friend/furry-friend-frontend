import ChatRoomsSkeleton from '@/components/skeletons/ChatRoomsSkeleton';
import { ImSpinner8 } from 'react-icons/im';

const Loading = () => {
  return (
    <>
      <div className='block md:hidden w-full h-full'>
        <ChatRoomsSkeleton />
      </div>

      <ImSpinner8 size={32} className='hidden md:block mx-auto animate-spin' />
    </>
  );
};

export default Loading;
