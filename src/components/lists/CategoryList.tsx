import Link from 'next/link';
import { BiCategory } from 'react-icons/bi';

const categories = ['사료', '간식', '용품', '의류'];

const CategoryList = () => {
  return (
    <div className='group/category relative h-full w-16 md:w-32 z-10'>
      <button className='flex justify-center items-center gap-2 w-full h-full px-2 md:px-4 bg-white dark:bg-gray-800 group-hover/category:bg-gray-200 dark:group-hover/category:bg-gray-600'>
        <BiCategory size={20} />
        <p className='hidden md:block w-16'>카테고리</p>
      </button>

      <ul className='absolute w-full hidden group-hover/category:block bg-white dark:bg-gray-700 shadow rounded-b-lg overflow-hidden'>
        <li>
          <Link
            href={`/products`}
            className='block p-1 text-center bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
          >
            전체
          </Link>
        </li>

        {categories.map(category => (
          <li key={category}>
            <Link
              href={`/category/${category}`}
              className='block p-1 text-center bg-white dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600'
            >
              {category}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryList;
