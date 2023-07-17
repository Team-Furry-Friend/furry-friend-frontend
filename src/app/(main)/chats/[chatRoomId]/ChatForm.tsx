'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { BsFillSendFill } from 'react-icons/bs';
import { CompatClient } from '@stomp/stompjs';

type ChatFields = {
  content: string;
};

interface ChatFormProps {
  stompClient: CompatClient;
  chatRoomId: string;
  rt: string;
}
const ChatForm = ({ stompClient, chatRoomId, rt }: ChatFormProps) => {
  const { register, handleSubmit, reset } = useForm<ChatFields>();

  const onSubmit: SubmitHandler<ChatFields> = async fields => {
    stompClient.send(
      `/pub/chats/${chatRoomId}`,
      {
        Authorization: `Bearer ${rt}`,
      },
      JSON.stringify(fields)
    );

    reset();
  };

  return (
    <form
      className='h-12 flex gap-2 p-2 border-t border-blue-400'
      onSubmit={handleSubmit(onSubmit)}
    >
      <div className='w-[calc(100%-40px)] border border-blue-400 rounded-full px-3 overflow-hidden'>
        <input
          type='text'
          className='w-full h-full bg-transparent'
          {...register('content', { required: true })}
        />
      </div>
      <button
        type='submit'
        className='aspect-square p-0 flex justify-center items-center border border-blue-400 rounded-full'
      >
        <BsFillSendFill size={18} className='text-blue-400' />
      </button>
    </form>
  );
};

export default ChatForm;
