import { cookies } from 'next/headers';
import { authMenus } from '@/libs/const';
import Link from 'next/link';

const AuthMenus = async () => {
  const cookieStore = cookies();

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
