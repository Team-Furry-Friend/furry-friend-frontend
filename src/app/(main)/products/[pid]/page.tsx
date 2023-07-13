import Image from 'next/image';
import { auth, baskets, comments, products } from '@/libs/api';
import Link from 'next/link';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { cookies } from 'next/headers';
import Auth from '@/components/layouts/Auth';
import { IoMenuOutline } from 'react-icons/io5';
import LikeBtn from '@/components/buttons/LikeBtn';
import RemoveBtn from '@/components/buttons/RemoveBtn';
import { BsFillPencilFill } from 'react-icons/bs';
import CommentForm from '@/app/(main)/products/[pid]/CommentForm';
import CommentList from '@/app/(main)/products/[pid]/CommentList';
import { getDateDiff } from '@/libs/getDateDiff';
import { Metadata } from 'next';
import ShareBtn from '@/components/buttons/ShareBtn';
import ChatBtn from '@/app/(main)/products/[pid]/ChatBtn';

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

  if (!isValid) {
    return <Auth />;
  }

  const [detail, { data: basketList }, { data: commentList }] =
    await Promise.all([
      products.getProduct(params.pid),
      baskets.get(at),
      comments.get(params.pid),
    ]);

  if (detail.del) {
    return (
      <div className='min-h-[calc(100dvh-80px)] md:min-h-[calc(100dvh-96px)] max-w-2xl w-full flex justify-center items-center'>
        <div className='border rounded flex flex-col items-center gap-4 p-4 w-full'>
          <p className='font-bold text-xl text-center'>
            판매자가 삭제한 상품입니다.
          </p>

          <Link
            href={'/'}
            className='w-fit p-2 rounded font-bold text-white bg-blue-400'
          >
            메인으로 가기
          </Link>
        </div>
      </div>
    );
  }

  const userBaskets = basketList?.filter(
    basket => basket.mid === tokenResponse.data?.memberId
  );

  return (
    <div className='w-full flex flex-col gap-2'>
      <Link href={'/'} className='block w-fit mb-4'>
        <AiOutlineArrowLeft
          size={32}
          className='border border-black rounded-full p-1'
        />
      </Link>
      <div className='flex justify-between items-center'>
        <Link
          href={`/category/${detail.pcategory}`}
          className='text-gray-400 p-2 border rounded w-fit bg-white'
        >
          {detail.pcategory}
        </Link>

        <div className='flex justify-between gap-2 items-center'>
          <LikeBtn
            basket={userBaskets?.find(basket => basket.pid === detail.pid)}
            at={at}
            pid={detail.pid}
          />

          <ShareBtn />

          {tokenResponse.data?.memberId === detail.mid && (
            <div className='relative group'>
              <IoMenuOutline
                className='rounded cursor-pointer bg-white group-hover:bg-gray-200'
                size={32}
              />
              <ul className='absolute top-full right-0 rounded overflow-hidden shadow hidden group-hover:block'>
                <li>
                  <RemoveBtn pid={detail.pid} at={at} />
                </li>
                <li>
                  <Link
                    href={`${detail.pid}/edit`}
                    className='w-32 flex items-center gap-2 p-2 bg-white disabled:bg-gray-200 hover:bg-gray-200'
                  >
                    <BsFillPencilFill size={24} />
                    <p>수정하기</p>
                  </Link>
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>
      <div className='flex gap-4 mb-4'>
        <p>{detail.mname}</p>
        <p>{getDateDiff(detail.regDate)}</p>
      </div>
      <h2 className='font-bold text-2xl'>{detail.pname}</h2>
      <p className='mb-4'>{detail.pprice}원</p>
      {detail.imageDTOList.length !== 0 && (
        <ul className='flex flex-wrap gap-x-2 gap-y-8 md:gap-x-4 md:gap-y-8 justify-center'>
          {detail.imageDTOList.map(img => (
            <li
              key={img.imgName}
              className='w-[calc(50%-4px)] md:w-[calc((100%-48px)/4)]'
            >
              <Image
                src={img.path}
                alt={img.imgName}
                width={480}
                height={480}
                className='w-full rounded aspect-square object-contain'
              />
            </li>
          ))}
        </ul>
      )}
      <p className='break-all py-4'>{detail.pexplain}</p>

      {tokenResponse.data?.memberId !== detail.mid && (
        <ChatBtn
          chatParticipantsId={detail.mid}
          chatParticipantsName={detail.mname}
          at={at}
        />
      )}

      <div className='bg-gray-200 h-[1px] mb-8' />
      <CommentForm at={at} pid={params.pid} />
      <CommentList comments={commentList} />
    </div>
  );
};

export default Page;
