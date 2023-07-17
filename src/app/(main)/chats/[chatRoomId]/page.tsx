import { BiDotsVerticalRounded } from 'react-icons/bi';
import ChatField from '@/app/(main)/chats/[chatRoomId]/ChatField';
import { auth } from '@/libs/api';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { redirect } from 'next/navigation';

const Page = async ({ params }: { params: { chatRoomId: string } }) => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;
  const rt = cookieStore.get('refresh_token')?.value;

  // TODO: 토큰 검증 로직 + loading.tsx 해야함

  if (!at || !rt) {
    return (
      <div className='w-full center h-full flex justify-center items-center'>
        <div className='max-w-2xl border rounded flex flex-col items-center gap-4 p-4 w-full'>
          <p className='font-bold text-xl text-center'>
            로그인 후 이용해주세요!
          </p>

          <Link
            href={'/login'}
            className='w-fit p-2 rounded font-bold text-white bg-blue-400'
          >
            로그인하기
          </Link>
        </div>
      </div>
    );
  }

  const tokenResponse = await auth.getToken(at);

  if (!tokenResponse.data?.memberId) {
    redirect('/refresh');
  }

  return (
    <div className='w-full h-full flex flex-col'>
      <div className='flex justify-between p-2 md:p-4 border-b'>
        <h2 className='font-bold'>{params.chatRoomId}</h2>

        <button>
          <BiDotsVerticalRounded size={24} />
        </button>
      </div>

      <ChatField
        memberId={tokenResponse.data.memberId}
        chatRoomId={params.chatRoomId}
        rt={rt}
      />
    </div>
  );
};

export default Page;
