import '@/styles/global.css';
import type { Metadata } from 'next';
import Header from './header';

export const metadata: Metadata = {
  title: '오소리',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
