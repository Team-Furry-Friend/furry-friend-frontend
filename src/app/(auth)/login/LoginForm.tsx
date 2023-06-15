'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { api } from '@/libs/api';
import NoticeModal from '@/components/modals/NoticeModal';
import { useModal } from '@/store/modalStore';
import { useRouter } from 'next/navigation';

type LoginFields = {
  username: string;
  password: string;
};

const LoginForm = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>();

  const [isLoading, setIsLoading] = useState(false);
  const setModal = useModal(s => s.setModal);

  const onSubmit: SubmitHandler<LoginFields> = async fields => {
    setIsLoading(true);

    try {
      await api.post('/member/login', fields);

      router.refresh();
    } catch (e) {
      setModal(
        <NoticeModal
          texts={[
            '로그인에 실패했습니다.',
            '입력하신 정보를 다시 확인해주세요.',
          ]}
        />
      );
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <label className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <span>이메일</span>
          {errors.username && (
            <span className='text-red-400'>{errors.username.message}</span>
          )}
        </div>
        <input
          type='email'
          {...register('username', {
            required: '이메일을 입력해주세요.',
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: '정확한 이메일을 입력해주세요.',
            },
          })}
          className='border rounded p-2'
          placeholder='example@gmail.com'
        />
      </label>

      <label className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <span>비밀번호</span>
          {errors.password && (
            <span className='text-red-400'>{errors.password.message}</span>
          )}
        </div>
        <input
          type='password'
          {...register('password', {
            required: '비밀번호를 입력해주세요.',
            minLength: {
              value: 4,
              message: '최소 4글자 이상 입력해주세요.',
            },
          })}
          className='border rounded p-2'
        />
      </label>

      <button
        type='submit'
        className='py-2 rounded bg-blue-400 hover:bg-blue-300 disabled:bg-gray-200 text-white font-bold'
        disabled={isLoading}
      >
        로그인
      </button>
    </form>
  );
};

export default LoginForm;
