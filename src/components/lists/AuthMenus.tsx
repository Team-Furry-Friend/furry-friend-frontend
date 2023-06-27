import { cookies } from 'next/headers';
import Link from 'next/link';
import { authMenus } from '@/datas/menuData';
import LogoutBtn from '@/components/buttons/LogoutBtn';

const AuthMenus = async () => {
  const cookieStore = cookies();
  const at = cookieStore.get('access_token')?.value;

  if (at) {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/gateway/isvalid/${at}`
    );

    const body = await response.json();

    if (body.status === 'success') {
      return (
        <div className='px-2 md:px-4'>
          <LogoutBtn at={at} />
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
            className='h-full flex items-center px-2 md:px-4 bg-white hover:bg-gray-200'
          >
            {menu.title}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default AuthMenus;
