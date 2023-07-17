import { ReactNode, Suspense } from 'react';
import Link from 'next/link';

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='bg-gray-200'>
      <div className='center p-0 flex h-[calc(100dvh-48px)] md:h-[calc(100dvh-64px)] bg-white'>
        <div className='hidden md:block w-64 overflow-y-scroll scroll-n'>
          <Suspense fallback={<div>ChatList Skeleton</div>}>
            <ul className='border-r'>
              {new Array(24).fill(0).map((value, key) => (
                <li key={key}>
                  <Link
                    className='flex flex-col gap-2 border-b p-2'
                    href={`/chats/${key}`}
                  >
                    <p className='font-bold text-xl'>{key}</p>
                    <p className=''>{key}</p>
                  </Link>
                </li>
              ))}
            </ul>
          </Suspense>
        </div>

        <div className='w-full md:w-[calc(100%-256px)] flex justify-center'>
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
