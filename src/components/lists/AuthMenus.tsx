import { cookies } from 'next/headers';
import Link from 'next/link';
import { authMenus } from '@/datas/menuData';
import LogoutBtn from '@/components/buttons/LogoutBtn';
import { auth } from '@/libs/api';
import { BsArrowUpCircle } from 'react-icons/bs';

const AuthMenus = async () => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  if (at) {
    const tokenResponse = await auth.getToken(at);

    if (tokenResponse.status === 'success') {
      return (
        <div className='border-l border-gray-400 flex gap-2 h-full items-center'>
          <Link
            href={'/upload'}
            className='h-full flex items-center gap-2 px-2 md:px-4 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600'
          >
            <BsArrowUpCircle size={24} />

            <span className='hidden md:block'>상품 올리기</span>
          </Link>

          <LogoutBtn />
        </div>
      );
    }
  }

  return (
    <ul className='border-l border-gray-400 flex h-full'>
      {authMenus.map(menu => (
        <li key={menu.title}>
          <Link
            href={menu.href}
            className='h-full flex items-center px-2 md:px-4 bg-white dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-600'
          >
            {menu.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AuthMenus;
