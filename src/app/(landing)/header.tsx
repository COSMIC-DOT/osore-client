import Image from 'next/image';

function Header() {
  return (
    <header className="flex h-[102px] w-[262px] flex-col gap-[12px]">
      <Image className="h-[48px] w-[262px]" src="/images/logo.png" alt="로고" height={48} width={262} />
      <div className="text-title2 text-center">로그인</div>
    </header>
  );
}

export default Header;
