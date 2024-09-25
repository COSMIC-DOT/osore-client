'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function Note() {
  const router = useRouter();
  const pathname = usePathname();
  router.replace(`${pathname}/code`);

  return <div />;
}
