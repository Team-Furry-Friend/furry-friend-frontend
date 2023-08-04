import Link from 'next/link';
import Image from 'next/image';
import { DtoList } from '@/types';
import { getDateDiff } from '@/libs/getDateDiff';

const ProductItem = ({ item }: { item: DtoList }) => {
  return (
    <li className='w-[calc(50%-4px)] md:w-[calc((100%-48px)/4)]'>
      <Link
        className='flex flex-col gap-1 transition-transform hover:-translate-y-2'
        href={`/products/${item.pid}`}
      >
        {item.imageDTOList.length === 0 ? (
          <div className='h-32 bg-gray-200 dark:bg-gray-400 rounded flex justify-center items-center'>
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

        <div className='flex flex-col gap-1 items-start justify-between mt-1'>
          <p className='bg-white dark:bg-gray-800 text-gray-400 text-sm p-1 border rounded w-fit'>
            {item.pcategory}
          </p>
          <h4 className='font-bold'>{item.pname}</h4>
        </div>
        <p className='font-bold'>{item.pprice}원</p>
        <p className='text-gray-400'>{getDateDiff(item.regDate)}</p>
      </Link>
    </li>
  );
};

export default ProductItem;
