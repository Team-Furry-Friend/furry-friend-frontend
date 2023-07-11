'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { api, comments } from '@/libs/api';
import { useModal } from '@/store/modalStore';
import NoticeModal from '@/components/modals/NoticeModal';

interface CommentFormProps {
  pid: string;
  at: string;
}

type CommentFields = {
  text: string;
};

const CommentForm = ({ at, pid }: CommentFormProps) => {
  const router = useRouter();
  const setModal = useModal(s => s.setModal);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CommentFields>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<CommentFields> = async fields => {
    setIsLoading(true);

    try {
      await comments.post({
        pid,
        text: fields.text,
        at: `Bearer ${at}`,
      });

      reset();
    } catch (e) {
      setModal(<NoticeModal texts={['댓글 작성에 실패하였습니다.']} />);
    }

    setIsLoading(false);
    router.refresh();
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className='flex flex-col gap-4 py-2 rounded'
      >
        <textarea
          {...register('text', {
            required: '댓글을 작성해주세요.',
            minLength: {
              value: 4,
              message: '최소 4글자 이상 작성해주세요.',
            },
          })}
          className='w-full h-32 rounded border p-2 resize-none focus:outline-blue-500'
          placeholder='댓글 입력하기...'
        />

        <div className='flex flex-row-reverse justify-between items-center'>
          <button
            type='submit'
            className='bg-blue-400 hover:bg-blue-200 disabled:bg-gray-200 font-bold text-white rounded p-2'
            disabled={isLoading}
          >
            작성하기
          </button>
          {errors.text && <p className='text-red-400'>{errors.text.message}</p>}
        </div>
      </form>

      {isLoading && (
        <div className='flex flex-col gap-4 mt-8'>
          <div className='flex gap-4'>
            <div className='h-6 w-8 bg-gray-200 rounded animate-pulse' />
            <div className='h-6 w-8 bg-gray-200 rounded animate-pulse' />
          </div>
          <div className='h-6 w-1/2 bg-gray-200 rounded animate-pulse' />
          <div className='h-6 w-1/3 bg-gray-200 rounded animate-pulse' />
        </div>
      )}
    </>
  );
};

export default CommentForm;
