import { cookies } from 'next/headers';
import Auth from '@/components/layouts/Auth';
import { auth } from '@/libs/api';
import ChatRoomList from '@/app/(main)/chats/ChatRoomList';

const Page = async () => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  if (!at) {
    return <Auth />;
  }

  const tokenResponse = await auth.getToken(at);

  if (tokenResponse.status !== 'success') {
    return <Auth />;
  }

  return (
    <div className='h-full flex justify-center items-center'>
      <div className='hidden md:block max-w-2xl border p-4 rounded'>
        <p className='font-bold text-xl'>채팅방을 선택해주세요!</p>
      </div>

      <div className='w-full h-full block md:hidden'>
        <ChatRoomList />
      </div>
    </div>
  );
};

export default Page;
