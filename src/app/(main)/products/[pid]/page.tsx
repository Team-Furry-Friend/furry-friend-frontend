import { ProductDetailResponse } from '@/types';
import Image from 'next/image';

const Page = async ({ params }: { params: { pid: string } }) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/detail?pid=${params.pid}`
  );
  const { data } = (await response.json()) as ProductDetailResponse;

  return (
    <div className='flex flex-col gap-2'>
      <p className='text-gray-400'>{data.pcategory}</p>
      <h2 className='font-bold text-xl'>{data.pname}</h2>

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
                className='w-full rounded border aspect-square object-contain'
              />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Page;
