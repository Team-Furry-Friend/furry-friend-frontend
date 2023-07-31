import { getDateDiff } from '@/libs/getDateDiff';
import { MessageData } from '@/types';

interface ChatListItemProps {
  message: MessageData;
  memberId: number;
  isHttp?: boolean;
}

const ChatListItem = ({ memberId, message, isHttp }: ChatListItemProps) => {
  return (
    <li
      key={message.chatMessageId}
      className={`flex flex-col ${
        memberId === message.chatMessageSenderId ? 'items-end' : ''
      } gap-2 p-2`}
    >
      {memberId !== message.chatMessageSenderId && (
        <p className='font-bold'>{message.chatMessageSerderName}</p>
      )}
      <p
        className={`p-2 shadow font-bold rounded w-fit ${
          memberId === message.chatMessageSenderId
            ? 'bg-blue-400 text-white rounded-tr-none'
            : 'bg-white dark:bg-gray-800 rounded-tl-none'
        }`}
      >
        {message.chatMessageContent}
      </p>

      <div className='flex items-center gap-2'>
        <p className='text-gray-500 text-sm'>{getDateDiff(message.regDate)}</p>
        {!isHttp && !message.chatMessageRead && (
          <span className='w-1 block aspect-square rounded-full bg-yellow-400' />
        )}
      </div>
    </li>
  );
};

export default ChatListItem;
