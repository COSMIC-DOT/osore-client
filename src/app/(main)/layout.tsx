import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Header from './header';

export default async function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
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
    <body className="flex w-[100%] flex-col items-center justify-center pb-[43px]">
      <Header />
      <div className="w-[1440px]">
        {children}
        {modal}
      </div>
    </body>
  );
}
