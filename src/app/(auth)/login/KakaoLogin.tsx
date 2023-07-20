import Image from 'next/image';
import Link from 'next/link';

const KakaoLogin = () => {
  const api_key = 'a9fba49d1993fd773a9dc3bcaf08805c';

  const redirect_url =
    process.env.NODE_ENV === 'production'
      ? 'https://furry-friend-kappa.vercel.app/oauth2/kakao'
      : 'http://localhost:3000/oauth2/kakao';

  const url = `https://kauth.kakao.com/oauth/authorize?client_id=${api_key}&redirect_uri=${redirect_url}&response_type=code`;

  return (
    <Link href={url}>
      <Image
        src={'/icons/kakao_login.png'}
        alt={'kakao login'}
        width={180}
        height={60}
      />
    </Link>
  );
};

export default KakaoLogin;
