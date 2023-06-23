import { BasketResponse, ProductListResponse, TokenResponse } from '@/types';
import InfiniteScroll from '@/components/lists/InfiniteScroll';
import ProductItem from '@/components/items/ProductItem';
import { cookies } from 'next/headers';
import ProductItemWithHeart from '@/components/items/ProductItemWithHeart';

const ProductList = async () => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  const [productListResponse, basketsResponse, tokenResponse] =
    await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/products?page=1&size=16`, {
        next: {
          revalidate: false,
        },
      }),
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/baskets/member/${at}`),
      fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/gateway/isvalid/${at}`),
    ]);

  const [
    {
      data: { dtoList },
    },
    { data: baskets },
    { data: memberData },
  ] = (await Promise.all([
    productListResponse.json(),
    basketsResponse.json(),
    tokenResponse.json(),
  ])) as [ProductListResponse, BasketResponse, TokenResponse];

  if (!memberData || !baskets) {
    return (
      <>
        <ul className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8 mb-8'>
          {dtoList
            .filter(item => !item.del)
            .map(item => (
              <ProductItem item={item} key={item.pid} />
            ))}
        </ul>

        <InfiniteScroll />
      </>
    );
  }

  const userBaskets = baskets.filter(
    basket => basket.mid === memberData.memberId
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

      <InfiniteScroll userBaskets={userBaskets} />
    </>
  );
};

export default ProductList;
