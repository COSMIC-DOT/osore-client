import '@/styles/global.css';
import type { Metadata } from 'next';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Header from './header';

export const metadata: Metadata = {
  title: '오소리',
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const cookie = cookies().get('JSESSIONID')?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `JSESSIONID=${cookie}`,
    },
  });
  const { success: isLogin } = await response.json();

  if (!isLogin) {
    redirect('/');
  }

  return (
    <html lang="ko">
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
