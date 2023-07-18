import { auth, chats } from '@/libs/api';
import { cookies } from 'next/headers';
import Image from 'next/image';
import ChatRoomItem from '@/components/items/ChatRoomItem';

const ChatRoomList = async () => {
  const cookieStore = cookies();

  const at = cookieStore.get('access_token')?.value;
  const rt = cookieStore.get('refresh_token')?.value;

  if (!rt || !at) {
    return (
      <div className='h-full flex justify-center items-center'>
        <Image
          src='/icons/chinchilla.png'
          alt='logo'
          width={240}
          height={240}
          className='w-12'
        />
      </div>
    );
  }

  const [{ data }, tokenResponse] = await Promise.all([
    chats.getChatList(rt),
    auth.getToken(at),
  ]);

  return (
    <ul className='h-full'>
      {data.map(room => (
        <ChatRoomItem
          room={room}
          tokenResponse={tokenResponse}
          key={room.chatParticipantsResponseDTO.chatParticipantsId}
        />
      ))}

      {data.length === 0 && (
        <div className='h-full flex items-center justify-center'>
          아직, 대화 내역이 없어요...
        </div>
      )}
    </ul>
  );
};

export default ChatRoomList;
