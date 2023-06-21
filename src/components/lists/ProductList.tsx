import { ProductListResponse } from '@/types';
import InfiniteScroll from '@/components/lists/InfiniteScroll';
import ProductItem from '@/components/items/ProductItem';

const ProductList = async () => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?page=1&size=16`
  );
  const {
    data: { dtoList },
  } = (await response.json()) as ProductListResponse;

  return (
    <>
      <ul className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8 mb-8'>
        {dtoList.map(item => (
          <ProductItem item={item} key={item.pid} />
        ))}
      </ul>

      <InfiniteScroll />
    </>
  );
};

export default ProductList;
