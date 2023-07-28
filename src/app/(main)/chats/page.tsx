import { cookies } from 'next/headers';
import Auth from '@/components/layouts/Auth';
import { auth } from '@/libs/api';
import ChatRoomList from '@/app/(main)/chats/ChatRoomList';

const Page = async () => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  if (!at) {
    return (
      <div className='px-2'>
        <Auth />
      </div>
    );
  }

  const tokenResponse = await auth.getToken(at);

  if (tokenResponse.status !== 'success') {
    return (
      <div className='px-2'>
        <Auth />
      </div>
    );
  }

  return (
    <div className='h-full flex justify-center items-center'>
      <div className='hidden md:block max-w-2xl border p-4 rounded'>
        <p className='font-bold text-xl'>채팅방을 선택해주세요!</p>
      </div>

      <div className='w-full h-full block md:hidden'>
        <p className='px-2 py-4 font-bold border-b'>채팅</p>

        <div className='overflow-y-scroll h-[calc(100%-57px)]'>
          <ChatRoomList />
        </div>
      </div>
    </div>
  );
};

export default Page;
