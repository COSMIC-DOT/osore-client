'use client';

import Image from 'next/image';

import Profile from '@/components/profile';
import { useRouter } from 'next/navigation';

function Header() {
  const router = useRouter();

  return (
    <header className="flex h-[120px] min-w-[100vw] items-center justify-between border border-white border-b-gray1 px-[80px]">
      <div
        className="flex h-[47px] w-[223px] items-center justify-between"
        onClick={() => router.replace('/finder')}
        onKeyDown={() => router.replace('/finder')}
        tabIndex={0}
        role="button"
      >
        <Image className="h-[47px] w-[36px]" src="/images/icon.png" alt="아이콘" height={47} width={36} />
        <Image className="h-[32px] w-[174px]" src="/images/logo.png" alt="로고" height={32} width={174} />
      </div>
      <Profile />
    </header>
  );
}

export default Header;
