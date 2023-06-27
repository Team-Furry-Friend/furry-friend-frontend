import InfiniteScroll from '@/components/lists/InfiniteScroll';
import { Metadata } from 'next';
import { cookies } from 'next/headers';
import { api } from '@/libs/api';
import { BasketResponse, ProductListResponse, TokenResponse } from '@/types';
import ProductItem from '@/components/items/ProductItem';
import ProductItemWithHeart from '@/components/items/ProductItemWithHeart';

const List = async ({ keyword }: { keyword: string }) => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  const [
    {
      data: {
        data: { dtoList },
      },
    },
    basketsResponse,
    tokenResponse,
  ] = await Promise.all([
    api.get<ProductListResponse>(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/products?page=1&size=16&keyword=${keyword}`
    ),
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/baskets/member/${at}`),
    fetch(`${process.env.NEXT_PUBLIC_BACKEND_URL}/gateway/isvalid/${at}`),
  ]);

  const [{ data: baskets }, { data: memberData }] = (await Promise.all([
    basketsResponse.json(),
    tokenResponse.json(),
  ])) as [BasketResponse, TokenResponse];

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

        <InfiniteScroll keyword={keyword} initialPage={2} />
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

      <InfiniteScroll
        keyword={keyword}
        userBaskets={userBaskets}
        initialPage={2}
      />
    </>
  );
};

export default List;
