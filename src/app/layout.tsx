import '@/styles/global.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '오소리',
  icons: {
    icon: '/images/favicon.png',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  );
}
