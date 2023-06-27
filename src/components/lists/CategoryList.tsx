import Link from 'next/link';

const categories = ['사료', '간식', '용품', '의류'];

const CategoryList = () => {
  return (
    <div className='group relative h-full'>
      <button className='h-full px-2 md:px-4 bg-white group-hover:bg-gray-200'>
        카테고리
      </button>

      <ul className='absolute hidden group-hover:block bg-white w-20 md:w-24 shadow'>
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
