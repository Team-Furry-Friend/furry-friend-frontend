'use client';

import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';

const ThemeSwitchBtn = ({ theme }: { theme: string | undefined }) => {
  const router = useRouter();

  const onClick = () => {
    Cookies.set('theme', theme === 'dark' ? 'light' : 'dark', {
      expires: 365,
    });

    router.refresh();
  };

  return (
    <button
      onClick={onClick}
      className={`relative transition-all rounded-full w-14 h-8 px-1 ${
        theme === 'dark' ? 'bg-gray-400' : 'bg-gray-600'
      }`}
    >
      <div
        className={`absolute left-1 top-1 w-6 h-6 transition-transform rounded-full bg-white ${
          theme === 'dark' ? 'translate-x-6' : 'translate-x-0'
        }`}
      />
    </button>
  );
};

export default ThemeSwitchBtn;
