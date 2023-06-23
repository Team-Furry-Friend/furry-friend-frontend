import EditForm from '@/app/(main)/products/[pid]/edit/EditForm';
import { cookies } from 'next/headers';
import Auth from '@/components/layouts/Auth';
import { ProductDetailResponse, TokenResponse } from '@/types';
import { api } from '@/libs/api';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { redirect } from 'next/navigation';

const Page = async ({ params }: { params: { pid: string } }) => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  if (!at) {
    return <Auth />;
  }

  const tokenResponse = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/gateway/isvalid/${at}`
  );

  const tokenBody = (await tokenResponse.json()) as TokenResponse;

  const isValid = tokenBody.status === 'success';

  if (!isValid || !tokenBody.data?.memberId) {
    return <Auth />;
  }

  const {
    data: { data: detail },
  } = await api.get<ProductDetailResponse>(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/products/detail?pid=${params.pid}`
  );

  if (detail.mid !== tokenBody.data.memberId) {
    return redirect(`../${detail.pid}`);
  }

  return (
    <div className='w-full flex flex-col gap-8'>
      <Link href={`../${detail.pid}`} className='block w-fit'>
        <AiOutlineArrowLeft
          size={32}
          className='border border-black rounded-full p-1'
        />
      </Link>

      <h2 className='font-bold text-2xl'>상품 등록</h2>
      <EditForm at={at} memberId={tokenBody.data.memberId} pid={detail.pid} />
    </div>
  );
};

export default Page;
