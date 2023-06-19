'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { api, supabase } from '@/libs/api';
import Image from 'next/image';
import ImageList from '@/app/(main)/upload/ImageList';
import { MdImage } from 'react-icons/md';
import { useModal } from '@/store/modalStore';
import NoticeModal from '@/components/modals/NoticeModal';

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

const UploadForm = ({ at, memberId }: { at: string; memberId: string }) => {
  const router = useRouter();
  const setModal = useModal(s => s.setModal);

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

  const [files, setFiles] = useState<File[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<UploadFields> = async fields => {
    setIsLoading(true);

    try {
      const responses = await Promise.all(
        files.map(file =>
          supabase.storage
            .from('products')
            .upload(
              `${memberId}/${file.lastModified}-${new Date().getTime()}`,
              file
            )
        )
      );

      if (responses.some(res => res.error)) {
        throw new Error('파일 이름이 적절하지 않습니다.');
      }

      const publicUrls = responses
        .filter(res => res.data?.path)
        .map(
          res =>
            supabase.storage
              .from('products')
              .getPublicUrl(res.data?.path as string).data.publicUrl
        );

      await api.post('/products', {
        productDTO: {
          pcategory: fields.pcategory,
          pname: fields.pname,
          pexplain: fields.pexplain,
          pprice: fields.pprice,
          imageDTOList: publicUrls.map(url => ({
            path: url,
            imgName: url,
          })),
        },
        jwtRequest: {
          access_token: at,
        },
      });

      router.push('/');
    } catch (e) {
      setIsLoading(false);
    }
  };

  const onChange: ChangeEventHandler<HTMLInputElement> = async e => {
    if (!e.target.files) return;
    const fileList = Array.from(e.target.files);
    if (fileList.length === 0) return;

    const isOverSize = fileList.some(file => file.size > 10000000);

    if (isOverSize) {
      setModal(
        <NoticeModal texts={['파일 사이즈가 너무 큽니다. (10Mb 제한)']} />
      );

      return;
    }

    const filteredFile = fileList.filter(
      file => !files.find(f => f.name === file.name)
    );

    const newFileList = [...files, ...filteredFile];

    if (newFileList.length > 4) {
      setModal(<NoticeModal texts={['이미지 개수는 4개가 최대입니다.']} />);

      return;
    }

    setFiles([...files, ...filteredFile]);
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

        <ImageList files={files} setFiles={setFiles} />

        <label>
          <div className='flex justify-center'>
            <MdImage
              size={48}
              className='hover:bg-gray-200 cursor-pointer rounded-full p-2'
            />
          </div>
          <input
            type='file'
            multiple
            accept='image/*'
            hidden
            onChange={onChange}
          />
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
          className='border rounded p-2 focus:outline-none resize-none'
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

      <button
        disabled={isLoading}
        className='bg-blue-400 hover:bg-blue-200 font-bold text-white py-2 rounded disabled:bg-gray-200'
      >
        업로드
      </button>
    </form>
  );
};

export default UploadForm;
