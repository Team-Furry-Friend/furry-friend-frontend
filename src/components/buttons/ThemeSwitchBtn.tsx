'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const ThemeSwitchBtn = () => {
  const router = useRouter();
  const theme = Cookies.get('theme');

  const onClick = () => {
    Cookies.set('theme', theme === 'dark' ? 'light' : 'dark', {
      expires: 365,
    });

    router.refresh();
  };

  return (
    <button
      onClick={onClick}
      className={`transition-all border rounded-full w-14 h-8 px-1 ${
        theme === 'dark' ? 'bg-gray-400' : 'bg-gray-600'
      }`}
    >
      <div
        className={`h-6 transition-transform aspect-square rounded-full bg-white ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default ThemeSwitchBtn;
