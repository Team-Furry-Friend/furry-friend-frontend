'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { useState } from 'react';
import { auth } from '@/libs/api';
import NoticeModal from '@/components/modals/NoticeModal';
import { useModal } from '@/store/modalStore';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import Link from 'next/link';

type ProfileFields = {
  mid: string;
  name: string;
  address: string;
  phone: string;
  agreement: boolean;
};

const ProfileForm = ({ mid }: { mid: string }) => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ProfileFields>({
    defaultValues: {
      mid,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const setModal = useModal(s => s.setModal);

  const onSubmit: SubmitHandler<ProfileFields> = async fields => {
    setIsLoading(true);

    try {
      const { data } = await auth.editProfile(fields);

      if (!data) {
        throw new Error();
      }

      Cookies.set('access_token', data.accessToken.replace('Bearer ', ''), {
        expires: 7,
      });

      Cookies.set('refresh_token', data.refreshToken.replace('Bearer ', ''), {
        expires: 30,
      });

      router.push('/');
      router.refresh();
    } catch (e) {
      setModal(<NoticeModal texts={['가입에 실패했습니다.']} />);

      router.push('/login');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className='flex flex-col gap-4'>
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

export default ProfileForm;
