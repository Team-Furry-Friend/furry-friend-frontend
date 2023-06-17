import { cookies } from 'next/headers';
import Link from 'next/link';
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

  const isValid = (await response.json()).status === 'success';

  if (!isValid) {
    return <Auth />;
  }

  return <UploadForm at={at} />;
};

export default Page;
