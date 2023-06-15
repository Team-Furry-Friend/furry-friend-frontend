import './globals.css';
import { Inter } from 'next/font/google';
import { ReactNode } from 'react';
import { Metadata } from 'next';
import Modal from '@/components/layouts/Modal';

const baseFont = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: {
    template: '%s | Furry Friend',
    default: 'Furry Friend',
  },
  description: 'Furry Friend Description',
  openGraph: {
    title: {
      template: '%s | Furry Friend',
      default: 'Furry Friend',
    },
  },
};

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang='kr'>
      <body className={baseFont.className}>
        <Modal />
        {children}
      </body>
    </html>
  );
};

export default RootLayout;
