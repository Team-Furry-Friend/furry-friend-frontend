'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';

type RegisterFields = {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFields>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<RegisterFields> = async fields => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
      <label className='flex flex-col gap-2'>
        <span>이메일</span>
        <input
          type='email'
          {...register('email')}
          className='border rounded p-2'
        />
      </label>

      <label className='flex flex-col gap-2'>
        <span>비밀번호</span>
        <input
          type='password'
          {...register('password')}
          className='border rounded p-2'
        />
      </label>

      <label className='flex flex-col gap-2'>
        <span>이름</span>
        <input
          type='text'
          {...register('name')}
          className='border rounded p-2'
        />
      </label>

      <label className='flex flex-col gap-2'>
        <span>주소</span>
        <input
          type='text'
          {...register('address')}
          className='border rounded p-2'
        />
      </label>

      <label className='flex flex-col gap-2'>
        <span>휴대폰 번호</span>
        <input
          type='text'
          {...register('phone')}
          className='border rounded p-2'
        />
      </label>

      <button
        type='submit'
        className='py-2 rounded bg-blue-400 hover:bg-blue-300 disabled:bg-gray-200 text-white font-bold'
        disabled={isLoading}
      >
        회원가입
      </button>
    </form>
  );
};

export default RegisterForm;
