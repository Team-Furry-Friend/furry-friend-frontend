import InfiniteScroll from '@/components/lists/InfiniteScroll';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { auth, baskets, products } from '@/libs/api';
import ProductItem from '@/components/items/ProductItem';
import ProductItemWithHeart from '@/components/items/ProductItemWithHeart';

const List = async ({ type }: { type: string }) => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  const dtoList = await products.get({
    page: 1,
    type,
  });

  if (!at) {
    return (
      <>
        <ul className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8 mb-8'>
          {dtoList
            .filter(item => !item.del)
            .map(item => (
              <ProductItem item={item} key={item.pid} />
            ))}
        </ul>

        <InfiniteScroll type={type} initialPage={2} />
      </>
    );
  }

  const [basketsResponse, tokenResponse] = await Promise.all([
    baskets.get(at),
    auth.getToken(at),
  ]);

  if (!tokenResponse.data?.memberId || !basketsResponse.data) {
    return (
      <>
        <ul className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8 mb-8'>
          {dtoList
            .filter(item => !item.del)
            .map(item => (
              <ProductItem item={item} key={item.pid} />
            ))}
        </ul>

        <InfiniteScroll type={type} initialPage={2} />
      </>
    );
  }

  const userBaskets = basketsResponse.data.filter(
    basket => basket.mid === tokenResponse.data?.memberId
  );

  return (
    <>
      <ul className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8 mb-8'>
        {dtoList.map(item => (
          <ProductItemWithHeart
            item={item}
            key={item.pid}
            isLike={userBaskets.some(basket => basket.pid === item.pid)}
          />
        ))}
      </ul>

      <InfiniteScroll type={type} userBaskets={userBaskets} initialPage={2} />
    </>
  );
};

export default List;
