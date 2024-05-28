import Image from 'next/image';

function Header() {
  return (
    <header>
      <div className="flex h-[105px] w-[428px] items-center justify-between">
        <Image className="h-[105px] w-[80px]" src="/images/icon.png" alt="아이콘" height={105} width={80} />
        <Image className="h-[60px] w-[328px]" src="/images/logo.png" alt="로고" height={60} width={328} />
      </div>
      <div className="mt-[15px] text-center text-[28px]">로그인</div>
    </header>
  );
}

export default Header;
