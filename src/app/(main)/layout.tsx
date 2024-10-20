import { cookies } from 'next/headers';
import { redirect, usePathname } from 'next/navigation';

import Header from './header';

export default async function RootLayout({
  children,
  modal,
  params,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
  params: string;
}) {
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
    <body className="flex flex-col items-center justify-center bg-gray0">
      <Header />
      <div>
        {children}
        {modal}
      </div>
    </body>
  );
}
