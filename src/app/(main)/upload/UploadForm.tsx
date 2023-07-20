'use client';

import { SubmitHandler, useForm } from 'react-hook-form';
import { ChangeEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';
import { products, supabase } from '@/libs/api';
import Image from 'next/image';
import ImageList from '@/app/(main)/upload/ImageList';
import { MdImage } from 'react-icons/md';
import { useModal } from '@/store/modalStore';
import NoticeModal from '@/components/modals/NoticeModal';
import { categories } from '@/datas/menuData';

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

interface UploadFormProps {
  at: string;
  memberId: string | number;
}

const UploadForm = ({ at, memberId }: UploadFormProps) => {
  const router = useRouter();
  const setModal = useModal(s => s.setModal);

  const {
    handleSubmit,
    register,
    formState: { errors },
    watch,
  } = useForm<UploadFields>({
    defaultValues: {
      access_token: at,
      pcategory: '사료',
    },
  });

  const [files, setFiles] = useState<File[]>([]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit: SubmitHandler<UploadFields> = async fields => {
    if (files.length === 0) {
      setModal(<NoticeModal texts={['사진을 하나 이상 업로드해주세요!']} />);

      return;
    }

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

      await products.post({
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
          access_token: `Bearer ${at}`,
        },
      });

      router.push('/');
      router.refresh();
    } catch (e) {
      setIsLoading(false);
      setModal(<NoticeModal texts={['상품 등록에 실패하였습니다!']} />);
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
    e.target.value = '';
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className='w-full flex flex-col gap-4'
    >
      <ul className='flex gap-2 mb-4'>
        {categories.map(category => (
          <li key={category}>
            <label>
              <span
                className={`p-2 border rounded cursor-pointer ${
                  watch('pcategory') === category
                    ? 'border-blue-400 bg-blue-400 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-400 hover:bg-blue-200'
                }`}
              >
                {category}
              </span>
              <input
                type='radio'
                {...register('pcategory')}
                value={category}
                hidden
              />
            </label>
          </li>
        ))}
      </ul>

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
        <div className='flex gap-4 items-center'>
          <input
            type='number'
            {...register('pprice', {
              required: '상품 가격을 입력해주세요.',
            })}
            className='border rounded p-2 w-full'
            placeholder='11000...'
          />
          <p>원</p>
        </div>
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
