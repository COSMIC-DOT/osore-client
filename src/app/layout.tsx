import '@/styles/global.css';
import type { Metadata } from 'next';

import Providers from '@/app/providers';

export const metadata: Metadata = {
  title: '오소리',
  icons: {
    icon: '/images/favicon.png',
  },
};

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
