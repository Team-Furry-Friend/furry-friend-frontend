'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import Link from 'next/link';

type RegisterFields = {
  email: string;
  password: string;
  name: string;
  address: string;
  phone: string;
  agreement: boolean;
};

const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFields>();

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<RegisterFields> = async fields => {
    setIsLoading(true);

    console.log(fields);
  };

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

      <label className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <span>이름</span>
          {errors.name && (
            <span className='text-red-400'>{errors.name.message}</span>
          )}
        </div>
        <input
          type='text'
          {...register('name', {
            required: '이름을 입력해주세요.',
          })}
          className='border rounded p-2'
        />
      </label>

      <label className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <span>주소</span>
          {errors.address && (
            <span className='text-red-400'>{errors.address.message}</span>
          )}
        </div>
        <input
          type='text'
          {...register('address', {
            required: '주소를 입력해주세요.',
          })}
          className='border rounded p-2'
        />
      </label>

      <label className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <span>휴대폰 번호</span>
          {errors.phone && (
            <span className='text-red-400'>{errors.phone.message}</span>
          )}
        </div>
        <input
          type='text'
          {...register('phone', {
            required: '휴대폰 번호를 입력해주세요.',
          })}
          className='border rounded p-2'
        />
      </label>

      <label className='flex gap-2 cursor-pointer'>
        <input
          type='checkbox'
          {...register('agreement', {
            required: true,
          })}
        />
        <span
          className={errors.agreement ? 'underline underline-offset-4' : ''}
        >
          <Link
            href={'/privacy'}
            className='text-blue-400 font-bold'
            target='_blank'
          >
            이용약관
          </Link>{' '}
          및{' '}
          <Link
            href={'/terms-of-service'}
            className='text-blue-400 font-bold'
            target='_blank'
          >
            개인정보 처리방침
          </Link>
          에 동의합니다.
        </span>
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
