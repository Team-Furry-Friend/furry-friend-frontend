'use client';

import Link from 'next/link';
import { ChatRoomsData, TokenResponse } from '@/types';
import { useParams } from 'next/navigation';

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
        className={`block p-2 border-b ${
          chatRoomId ===
          room.chatParticipantsResponseDTO.chatRoomResponseDTO.chatRoomId.toString()
            ? 'bg-blue-400 text-white'
            : 'bg-white'
        }`}
      >
        <p className='font-bold'>
          {room.chatParticipantsResponseDTO.chatParticipantsMemberName ===
          tokenResponse.data?.memberName
            ? room.chatParticipantsResponseDTO.chatRoomResponseDTO
                .chatCreatorName
            : room.chatParticipantsResponseDTO.chatParticipantsMemberName}
        </p>

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
      </Link>
    </li>
  );
};

export default ChatRoomItem;