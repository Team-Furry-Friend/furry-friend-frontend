import { ReactNode, Suspense } from 'react';
import ChatRoomList from '@/app/(main)/chats/ChatRoomList';
import ChatRoomsSkeleton from '@/components/skeletons/ChatRoomsSkeleton';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='bg-gray-200 dark:bg-gray-800'>
      <div className='center dark:border-x dark:border-x-gray-600 p-0 flex h-[calc(100dvh-48px)] md:h-[calc(100dvh-64px)] bg-white dark:bg-gray-800'>
        <div className='hidden md:flex flex-col border-r w-64'>
          <p className='px-2 py-4 font-bold border-b'>채팅</p>

          <div className='overflow-y-scroll h-[calc(100%-57px)]'>
            <Suspense fallback={<ChatRoomsSkeleton />}>
              <ChatRoomList />
            </Suspense>
          </div>
        </div>

        <div className='w-full md:w-[calc(100%-256px)] flex flex-col justify-center'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
