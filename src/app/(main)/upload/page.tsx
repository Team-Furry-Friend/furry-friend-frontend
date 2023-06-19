import { cookies } from 'next/headers';
import UploadForm from '@/app/(main)/upload/UploadForm';
import Auth from '@/components/layouts/Auth';

const Page = async () => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  if (!at) {
    return <Auth />;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/gateway/isvalid/${at}`
  );

  const body = await response.json();

  const isValid = body.status === 'success';

  if (!isValid) {
    return <Auth />;
  }

  return (
    <div className='w-full flex flex-col gap-8'>
      <h2 className='font-bold text-2xl'>상품 등록</h2>
      <UploadForm at={at} memberId={body.data.memberId} />
    </div>
  );
};

export default Page;
