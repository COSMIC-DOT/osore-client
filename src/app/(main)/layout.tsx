import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Header from './header';

export default async function RootLayout({ children, modal }: { children: React.ReactNode; modal: React.ReactNode }) {
  const cookie = cookies().get('JSESSIONID')?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_DOCKER_INTERNAL_URL}/api/auth/check`, {
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
