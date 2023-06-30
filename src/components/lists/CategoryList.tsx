import Link from 'next/link';

const categories = ['사료', '간식', '용품', '의류'];

const CategoryList = () => {
  return (
    <div className='group/category relative h-full w-20 md:w-24'>
      <button className='h-full px-2 md:px-4 bg-white group-hover/category:bg-gray-200'>
        카테고리
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
