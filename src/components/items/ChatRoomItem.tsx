'use client';

import Link from 'next/link';
import { ChatRoomsData, TokenResponse } from '@/types';
import { useParams } from 'next/navigation';
import { getDateDiff } from '@/libs/getDateDiff';

interface ChatRoomItemProps {
  room: ChatRoomsData;
  tokenResponse: TokenResponse;
}

const ChatRoomItem = ({ room, tokenResponse }: ChatRoomItemProps) => {
  const { chatRoomId } = useParams();

  return (
    <li key={room.chatParticipantsResponseDTO.chatParticipantsId}>
      <Link
        href={`/chats/${room.chatParticipantsResponseDTO.chatRoomResponseDTO.chatRoomId}`}
        className={`flex flex-col gap-2 p-2 border-b ${
          chatRoomId ===
          room.chatParticipantsResponseDTO.chatRoomResponseDTO.chatRoomId.toString()
            ? 'bg-blue-400 text-white'
            : 'bg-white dark:bg-gray-800'
        }`}
      >
        <div className='flex justify-between'>
          <p className='font-bold'>
            {room.chatParticipantsResponseDTO.chatParticipantsMemberName ===
            tokenResponse.data?.memberName
              ? room.chatParticipantsResponseDTO.chatRoomResponseDTO
                  .chatCreatorName
              : room.chatParticipantsResponseDTO.chatParticipantsMemberName}
          </p>
          <p>{getDateDiff(room.chatMessageResponseDTO.regDate)}</p>
        </div>

        <div className='flex justify-between'>
          <p
            className={
              chatRoomId ===
              room.chatParticipantsResponseDTO.chatRoomResponseDTO.chatRoomId.toString()
                ? 'text-white'
                : 'text-gray-400'
            }
          >
            {room.chatMessageResponseDTO.chatMessageContent}
          </p>
          <p className='bg-red-400 text-white rounded-full px-1'>
            {room.notReadCount}
          </p>
        </div>
      </Link>
    </li>
  );
};

export default ChatRoomItem;
