import { cookies } from 'next/headers';
import UploadForm from '@/app/(main)/upload/UploadForm';
import Auth from '@/components/layouts/Auth';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Upload',
};

const Page = async () => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  if (!at) {
    return <Auth type='upload' />;
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/gateway/isvalid/${at}`
  );

  const body = await response.json();

  const isValid = body.status === 'success';

  if (!isValid) {
    return <Auth type='upload' />;
  }

  return (
    <div className='w-full flex flex-col gap-8'>
      <Link href={'/'} className='block w-fit'>
        <AiOutlineArrowLeft
          size={32}
          className='border border-black rounded-full p-1'
        />
      </Link>

      <h2 className='font-bold text-2xl'>상품 등록</h2>
      <UploadForm at={at} memberId={body.data.memberId} />
    </div>
  );
};

export default Page;
