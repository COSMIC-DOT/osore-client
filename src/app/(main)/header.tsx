'use client';

import Image from 'next/image';

import Profile from '@/components/profile';

function Header() {
  return (
    <header className="mx-auto mb-[65px] mt-[45px] flex max-w-[1750px] items-center justify-between">
      <div className="flex h-[47px] w-[223px] items-center justify-between">
        <Image className="h-[47px] w-[36px]" src="/images/icon.png" alt="아이콘" height={47} width={36} />
        <Image className="h-[32px] w-[174px]" src="/images/logo.png" alt="로고" height={32} width={174} />
      </div>
      <Profile />
    </header>
  );
}

export default Header;
