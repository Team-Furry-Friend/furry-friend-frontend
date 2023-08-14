import Link from 'next/link';
import { Product } from '@/types';

const SearchItem = ({ item }: { item: Product }) => {
  return (
    <li>
      <Link
        href={`/products/${item.pid}`}
        className='flex justify-between p-2 hover:bg-gray-200 dark:hover:bg-gray-600'
      >
        <p>{item.pname}</p>
        <p className='text-sm text-gray-400'>{item.pcategory}</p>
      </Link>
    </li>
  );
};

export default SearchItem;
