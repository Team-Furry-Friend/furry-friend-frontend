type Menu = {
  title: string;
  href: string;
};

export const authMenus: Menu[] = [
  {
    title: '로그인',
    href: '/login',
  },
  {
    title: '회원가입',
    href: '/register',
  },
];

export const categories = ['사료', '간식', '용품', '의류'] as const;
