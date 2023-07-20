import { ReactNode, Suspense } from 'react';
import ChatRoomList from '@/app/(main)/chats/ChatRoomList';
import ChatRoomsSkeleton from '@/components/skeletons/ChatRoomsSkeleton';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='bg-gray-200 dark:bg-gray-800'>
      <div className='center dark:border-x dark:border-x-gray-600 p-0 flex h-[calc(100dvh-48px)] md:h-[calc(100dvh-64px)] bg-white dark:bg-gray-800'>
        <div className='hidden md:block border-r w-64 overflow-y-scroll'>
          <Suspense fallback={<ChatRoomsSkeleton />}>
            <ChatRoomList />
          </Suspense>
        </div>

        <div className='w-full md:w-[calc(100%-256px)] flex flex-col justify-center'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
