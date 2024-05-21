import Image from 'next/image';

export default function Header() {
  return (
    <header className="mx-auto my-[40px] flex w-[95%] items-center justify-between">
      <div className="flex h-[47px] w-[223px] items-center justify-between">
        <Image className="h-[47px] w-[36px]" src="/images/icon.png" alt="아이콘" height={47} width={36} />
        <Image className="h-[32px] w-[174px]" src="/images/logo.png" alt="로고" height={32} width={174} />
      </div>
      <div className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full bg-white">
        <Image
          className="h-[60px] w-[60px]"
          src="https://avatars.githubusercontent.com/u/74997112?v=4"
          alt="프로필"
          width={50}
          height={50}
        />
      </div>
    </header>
  );
}
