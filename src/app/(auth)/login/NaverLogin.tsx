import Image from 'next/image';
import Link from 'next/link';

const NaverLogin = () => {
  const client_id = 'a9fba49d1993fd773a9dc3bcaf08805c';
  const state = '';

  const redirect_url =
    process.env.NODE_ENV === 'production'
      ? 'https://furry-friend-kappa.vercel.app/oauth2/naver'
      : 'http://localhost:3000/oauth2/naver';

  const url = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${client_id}&state=${state}&redirect_uri=${redirect_url}`;

  return (
    <Link href={url}>
      <Image
        src={'/icons/naver_login.png'}
        alt={'naver login'}
        width={180}
        height={60}
      />
    </Link>
  );
};

export default NaverLogin;
