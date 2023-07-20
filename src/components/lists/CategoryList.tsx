import Link from 'next/link';
import { BiCategory } from 'react-icons/bi';

const categories = ['사료', '간식', '용품', '의류'];

const CategoryList = () => {
  return (
    <div className='group/category relative h-full w-16 md:w-32'>
      <button className='flex justify-center items-center gap-2 w-full h-full px-2 md:px-4 bg-white group-hover/category:bg-gray-200'>
        <BiCategory size={20} />
        <p className='hidden md:block'>카테고리</p>
      </button>

      <ul className='absolute w-full hidden group-hover/category:block bg-white shadow rounded-b-lg overflow-hidden'>
        {categories.map(category => (
          <li key={category}>
            <Link
              href={`/category/${category}`}
              className='block p-1 text-center bg-white hover:bg-gray-200'
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
