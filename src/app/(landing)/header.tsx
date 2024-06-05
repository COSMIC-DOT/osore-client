import Image from 'next/image';

function Header() {
  return (
    <header>
      <div className="flex h-[79px] w-[342px] items-center justify-between">
        <Image className="h-[79px] w-[60px]" src="/images/icon.png" alt="아이콘" height={78} width={60} />
        <Image className="h-[48px] w-[262px]" src="/images/logo.png" alt="로고" height={48} width={262} />
      </div>
      <div className="text-title2 mt-[12px] text-center">로그인</div>
    </header>
  );
}

export default Header;
