import { cookies } from 'next/headers';
import Link from 'next/link';
import { authMenus } from '@/datas/menuData';
import LogoutBtn from '@/components/buttons/LogoutBtn';

const AuthMenus = async () => {
  const cookieStore = cookies();

  // TODO: 쿠키와 토큰 검증 API를 이용해 로그인 여부를 받아와서 ui 변경 로직 추가

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
