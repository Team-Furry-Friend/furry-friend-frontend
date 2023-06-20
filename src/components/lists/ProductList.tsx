import { ProductListResponse } from '@/types';
import Image from 'next/image';
import Link from 'next/link';

const ProductList = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?page=1&size=16`
  );
  const {
    data: { dtoList },
  } = (await response.json()) as ProductListResponse;

  return (
    <ul className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8'>
      {dtoList.map(item => (
        <li
          key={item.pid}
          className='w-[calc(50%-4px)] md:w-[calc((100%-48px)/4)] '
        >
          <Link className='flex flex-col gap-1' href={`/products/${item.pid}`}>
            {item.imageDTOList.length === 0 ? (
              <div className='h-32 bg-gray-200 rounded flex justify-center items-center'>
                이미지없음
              </div>
            ) : (
              <Image
                src={item.imageDTOList[0].path}
                alt={item.pname}
                width={150}
                height={150}
                className='w-full h-32 object-cover rounded'
              />
            )}

            <p className='text-gray-400 text-sm'> {item.pcategory}</p>
            <h4 className='font-bold'>{item.pname}</h4>
            <p>{item.pprice}원</p>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;
