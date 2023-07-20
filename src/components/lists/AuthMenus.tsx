import { cookies } from 'next/headers';
import Link from 'next/link';
import { authMenus } from '@/datas/menuData';
import LogoutBtn from '@/components/buttons/LogoutBtn';
import { auth } from '@/libs/api';

const AuthMenus = async () => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  if (at) {
    const tokenResponse = await auth.getToken(at);

    if (tokenResponse.status === 'success') {
      return (
        <div className='pl-2 md:pl-4'>
          <LogoutBtn />
        </div>
      );
    }
  }

  return (
    <ul className='flex h-full'>
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
