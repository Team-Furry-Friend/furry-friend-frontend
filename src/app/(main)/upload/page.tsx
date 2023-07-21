import { cookies } from 'next/headers';
import UploadForm from '@/app/(main)/upload/UploadForm';
import Auth from '@/components/layouts/Auth';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Metadata } from 'next';
import { auth } from '@/libs/api';

export const metadata: Metadata = {
  title: 'Upload',
};

const Page = async () => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  if (!at) {
    return <Auth type='upload' />;
  }

  const tokenResponse = await auth.getToken(at);

  const isValid = tokenResponse.status === 'success';

  if (!isValid || !tokenResponse.data) {
    return <Auth type='upload' />;
  }

  return (
    <div className='w-full flex flex-col gap-8'>
      <Link href={'/products'} className='block w-fit'>
        <AiOutlineArrowLeft
          size={32}
          className='border border-black dark:border-white rounded-full p-1'
        />
      </Link>

      <h2 className='font-bold text-2xl'>상품 등록</h2>
      <UploadForm at={at} memberId={tokenResponse.data.memberId} />
    </div>
  );
};

export default Page;
