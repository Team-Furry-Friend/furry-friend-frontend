import { BasketResponse, ProductDetailResponse, TokenResponse } from '@/types';
import Image from 'next/image';
import { api } from '@/libs/api';
import Link from 'next/link';
import { AiFillHeart, AiOutlineArrowLeft } from 'react-icons/ai';
import { cookies } from 'next/headers';
import Auth from '@/components/layouts/Auth';
import { IoMenuOutline } from 'react-icons/io5';
import LikeBtn from '@/components/buttons/LikeBtn';

const Page = async ({ params }: { params: { pid: string } }) => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  if (!at) {
    return <Auth />;
  }

  const tokenResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/gateway/isvalid/${at}`
  );

  const body = (await tokenResponse.json()) as TokenResponse;

  const isValid = body.status === 'success';

  if (!isValid) {
    return <Auth />;
  }

  const [
    {
      data: { data: detail },
    },
    {
      data: { data: baskets },
    },
  ] = await Promise.all([
    api.get<ProductDetailResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/detail?pid=${params.pid}`
    ),
    api.get<BasketResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/baskets/member/${at}`
    ),
  ]);

  const userBaskets = baskets?.filter(
    basket => basket.mid === body.data?.memberId
  );

  return (
    <div className='w-full flex flex-col gap-2'>
      <Link href={'/'} className='block w-fit mb-4'>
        <AiOutlineArrowLeft
          size={32}
          className='border border-black rounded-full p-1'
        />
      </Link>

      <div className='flex justify-between items-center'>
        <button className='text-gray-400 p-2 border rounded w-fit'>
          {detail.pcategory}
        </button>

        <div className='relative group'>
          <IoMenuOutline
            className='rounded cursor-pointer bg-white group-hover:bg-gray-200'
            size={32}
          />
          <ul className='absolute top-full right-0 rounded overflow-hidden shadow hidden group-hover:block'>
            <li>
              <LikeBtn
                basket={userBaskets?.find(basket => basket.pid === detail.pid)}
                at={at}
                pid={detail.pid}
              />
            </li>
          </ul>
        </div>
      </div>

      <p>{detail.mname}</p>
      <h2 className='font-bold text-2xl'>{detail.pname}</h2>
      <p className='mb-4'>{detail.pprice}원</p>

      {detail.imageDTOList.length !== 0 && (
        <ul className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8'>
          {detail.imageDTOList.map(img => (
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

      <p className='break-all py-4'>{detail.pexplain}</p>
    </div>
  );
};

export default Page;
