'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const ThemeSwitchBtn = () => {
  const router = useRouter();

  const onClick = () => {
    const theme = Cookies.get('theme');

    Cookies.set('theme', theme === 'dark' ? 'light' : 'dark', {
      expires: 365,
    });

    router.refresh();
  };

  return <button onClick={onClick}>ThemeSwitchBtn</button>;
};

export default ThemeSwitchBtn;
