import Image from 'next/image';
import Link from 'next/link';

export type Provider = 'kakao' | 'google' | 'naver';

const SocialLogin = ({ provider }: { provider: Provider }) => {
  const redirect_url =
    process.env.NODE_ENV === 'production'
      ? `https://furry-friend-kappa.vercel.app/oauth2/${provider}`
      : `http://localhost:3000/oauth2/${provider}`;

  const kakao = `https://kauth.kakao.com/oauth/authorize?client_id=a9fba49d1993fd773a9dc3bcaf08805c&redirect_uri=${redirect_url}&response_type=code`;
  const google = `https://accounts.google.com/o/oauth2/v2/auth?client_id=526477563372-29m9nrid0oq8mk2rfvkb5rd8j9iquq0k.apps.googleusercontent.com&redirect_uri=${redirect_url}&response_type=code&scope=email`;
  const naver = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=k630Wyb3TY8cxFgIdoIB&redirect_uri=${redirect_url}`;

  const urls = {
    kakao,
    google,
    naver,
  };

  return (
    <Link href={urls[provider]}>
      <Image
        src={`/icons/${provider}_login.png`}
        alt={`${provider} login`}
        width={180}
        height={60}
      />
    </Link>
  );
};

export default SocialLogin;
