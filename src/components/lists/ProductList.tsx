import InfiniteScroll from '@/components/lists/InfiniteScroll';
import ProductItem from '@/components/items/ProductItem';
import { cookies } from 'next/headers';
import ProductItemWithHeart from '@/components/items/ProductItemWithHeart';
import { auth, baskets, products } from '@/libs/api';

const ProductList = async ({
  disabledScroll,
}: {
  disabledScroll?: boolean;
}) => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  if (!at) {
    const dtoList = await products.get({
      page: 1,
    });

    return (
      <>
        <ul className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8 mb-8'>
          {dtoList
            .filter(item => !item.del)
            .map(item => (
              <ProductItem item={item} key={item.pid} />
            ))}
        </ul>

        {!disabledScroll && <InfiniteScroll initialPage={2} />}
      </>
    );
  }

  const [dtoList, basketResponse, tokenResponse] = await Promise.all([
    products.get({
      page: 1,
    }),
    baskets.get(at),
    auth.getToken(at),
  ]);

  if (!tokenResponse.data?.memberId || !basketResponse.data) {
    return (
      <>
        <ul className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8 mb-8'>
          {dtoList
            .filter(item => !item.del)
            .map(item => (
              <ProductItem item={item} key={item.pid} />
            ))}
        </ul>

        {!disabledScroll && <InfiniteScroll initialPage={2} />}
      </>
    );
  }

  return (
    <>
      <ul className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8 mb-8'>
        {dtoList.map(item => (
          <ProductItemWithHeart
            item={item}
            key={item.pid}
            isLike={basketResponse.data?.some(
              basket => basket.pid === item.pid
            )}
          />
        ))}
      </ul>

      {!disabledScroll && (
        <InfiniteScroll userBaskets={basketResponse.data} initialPage={2} />
      )}
    </>
  );
};

export default ProductList;
