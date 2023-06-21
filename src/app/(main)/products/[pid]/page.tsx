import { ProductDetailResponse } from '@/types';
import Image from 'next/image';
import { api } from '@/libs/api';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { cookies } from 'next/headers';
import Auth from '@/components/layouts/Auth';

const Page = async ({ params }: { params: { pid: string } }) => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  if (!at) {
    return <Auth />;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/gateway/isvalid/${at}`
  );

  const body = await response.json();

  const isValid = body.status === 'success';

  if (!isValid) {
    return <Auth />;
  }

  const {
    data: { data },
  } = await api.get<ProductDetailResponse>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/detail?pid=${params.pid}`
  );

  return (
    <div className='w-full flex flex-col gap-2'>
      <Link href={'/'} className='block w-fit mb-4'>
        <AiOutlineArrowLeft
          size={32}
          className='border border-black rounded-full p-1'
        />
      </Link>

      <p className='text-gray-400'>{data.pcategory}</p>

      <p>{data.mname}</p>
      <h2 className='font-bold text-xl'>{data.pname}</h2>
      <p className='mb-4'>{data.pprice}원</p>

      {data.imageDTOList.length !== 0 && (
        <ul className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8'>
          {data.imageDTOList.map(img => (
            <li
              key={img.imgName}
              className='w-[calc(50%-4px)] md:w-[calc((100%-48px)/4)]'
            >
              <Image
                src={img.path}
                alt={img.imgName}
                width={480}
                height={480}
                className='w-full rounded aspect-square object-contain'
              />
            </li>
          ))}
        </ul>
      )}

      <p className='break-all'>{data.pexplain}</p>
    </div>
  );
};

export default Page;
