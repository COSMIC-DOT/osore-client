import { Suspense } from 'react';
import Image from 'next/image';

import Profile from '@/components/profile';

function Header() {
  return (
    <header className="mx-auto my-[40px] flex w-[95%] items-center justify-between">
      <div className="flex h-[47px] w-[223px] items-center justify-between">
        <Image className="h-[47px] w-[36px]" src="/images/icon.png" alt="아이콘" height={47} width={36} />
        <Image className="h-[32px] w-[174px]" src="/images/logo.png" alt="로고" height={32} width={174} />
      </div>
      <Suspense fallback={<div className="h-[60px] w-[60px] rounded-full bg-gray-500" />}>
        <Profile />
      </Suspense>
    </header>
  );
}

export default Header;
