import EditForm from '@/app/(main)/products/[pid]/edit/EditForm';
import { cookies } from 'next/headers';
import Auth from '@/components/layouts/Auth';
import { auth, products } from '@/libs/api';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { redirect } from 'next/navigation';
import { Metadata } from 'next';

export const generateMetadata = async ({
  params,
}: {
  params: { pid: string };
}): Promise<Metadata> => {
  const detail = await products.getProduct(params.pid);

  return {
    title: detail.pname,
    description: detail.pexplain,
    openGraph: {
      title: detail.pname,
      description: detail.pexplain,
      images: detail.imageDTOList.map(item => item.path),
    },
    twitter: {
      title: detail.pname,
      images: detail.imageDTOList.map(item => item.path),
    },
  };
};

const Page = async ({ params }: { params: { pid: string } }) => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  if (!at) {
    return <Auth />;
  }

  const tokenResponse = await auth.getToken(at);

  const isValid = tokenResponse.status === 'success';

  if (!isValid || !tokenResponse.data?.memberId) {
    return <Auth />;
  }

  const detail = await products.getProduct(params.pid);

  if (detail.mid !== tokenResponse.data.memberId) {
    return redirect(`../${detail.pid}`);
  }

  return (
    <div className='w-full flex flex-col gap-8'>
      <Link href={`../${detail.pid}`} className='block w-fit'>
        <AiOutlineArrowLeft
          size={32}
          className='border border-black dark:border-white rounded-full p-1'
        />
      </Link>

      <h2 className='font-bold text-2xl'>상품 수정</h2>
      <EditForm
        at={at}
        memberId={tokenResponse.data.memberId}
        detail={detail}
      />
    </div>
  );
};

export default Page;
