import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import Modal from '@/components/layouts/Modal';
import { cookies } from 'next/headers';

const baseFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Furry Friend',
    default: 'Furry Friend',
  },
  description: '반려동물 용품 중고 거래',
  openGraph: {
    title: {
      template: '%s | Furry Friend',
      default: 'Furry Friend',
    },
  },
  twitter: {
    title: {
      template: '%s | Furry Friend',
      default: 'Furry Friend',
    },
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  const cookieStore = cookies();
  const theme = cookieStore.get('theme')?.value;

  return (
    <html lang='kr' className={theme || 'light'}>
      <body
        className={`${baseFont.className} bg-white dark:bg-gray-800 text-black dark:text-white`}
      >
        <Modal />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
