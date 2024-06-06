'use client';

import Image from 'next/image';

import Profile from '@/components/profile';

function Header() {
  return (
    <header className="flex h-[120px] w-[100%] items-center justify-between px-[80px]">
      <div className="flex h-[47px] w-[223px] items-center justify-between">
        <Image className="h-[47px] w-[36px]" src="/images/icon.png" alt="아이콘" height={47} width={36} />
        <Image className="h-[32px] w-[174px]" src="/images/logo.png" alt="로고" height={32} width={174} />
      </div>
      <Profile />
    </header>
  );
}

export default Header;
