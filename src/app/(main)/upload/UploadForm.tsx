'use client';

import { SubmitHandler, useForm } from 'react-hook-form';

type Image = {
  imgName: string;
  path: string;
};

type UploadFields = {
  pcategory: string;
  pname: string;
  pexplain: string;
  pprice: number;
  access_token: string;
  imageDTOList: Image[];
};

const UploadForm = ({ at }: { at: string }) => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm<UploadFields>({
    defaultValues: {
      access_token: at,
    },
  });

  const onSubmit: SubmitHandler<UploadFields> = async fields => {
    console.log(fields);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-4'
    >
      <label className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <span>카테고리</span>
          {errors.pcategory && (
            <span className='text-red-400'>{errors.pcategory.message}</span>
          )}
        </div>
        <input
          type='text'
          {...register('pcategory', {
            required: '카테고리를 입력해주세요.',
          })}
          className='border rounded p-2'
          placeholder='카테고리'
        />
      </label>

      <label className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <span>상품명</span>
          {errors.pname && (
            <span className='text-red-400'>{errors.pname.message}</span>
          )}
        </div>
        <input
          type='text'
          {...register('pname', {
            required: '상품명을 입력해주세요.',
          })}
          className='border rounded p-2'
          placeholder='상품명...'
        />
      </label>

      <div>
        <h2>이미지</h2>

        <label>
          <span>업로드 아이콘</span>
          <input type='file' multiple accept='image/*' hidden />
        </label>
      </div>

      <label className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <span>상품 설명</span>
          {errors.pexplain && (
            <span className='text-red-400'>{errors.pexplain.message}</span>
          )}
        </div>
        <textarea
          {...register('pexplain', {
            required: '상품 설명을 입력해주세요.',
          })}
          className='border rounded p-2 focus:outline-none'
          placeholder='상품 설명...'
        />
      </label>

      <label className='flex flex-col gap-2'>
        <div className='flex justify-between'>
          <span>상품 가격 </span>
          {errors.pprice && (
            <span className='text-red-400'>{errors.pprice.message}</span>
          )}
        </div>
        <input
          type='number'
          {...register('pprice', {
            required: '상품 가격을 입력해주세요.',
          })}
          className='border rounded p-2'
          placeholder='11000...'
        />
      </label>
    </form>
  );
};

export default UploadForm;
