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
      return <LogoutBtn at={at} />;
    }
  }

  return (
    <ul className='flex gap-4'>
      {authMenus.map(menu => (
        <li key={menu.title}>
          <Link href={menu.href}>{menu.title}</Link>
        </li>
      ))}
    </ul>
  );
};

export default AuthMenus;
