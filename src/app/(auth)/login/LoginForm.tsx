'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

type LoginFields = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFields>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginFields> = async fields => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <label className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <span>이메일</span>
          {errors.email && (
            <span className='text-red-400'>{errors.email.message}</span>
          )}
        </div>
        <input
          type='email'
          {...register('email', {
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
              value: 6,
              message: '최소 6글자 이상 입력해주세요.',
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
