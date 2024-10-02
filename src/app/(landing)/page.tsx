import Image from 'next/image';

import GitHubLoginButton from './github-login-button';
import GoogleLoginButton from './google-login-button';
import Header from './header';

export default function Home() {
  return (
    <div className="flex justify-end">
      <Image className="bg1" src="/images/bg1.png" alt="배경1" height={1280} width={1440} />
      <Image className="bg2" src="/images/bg2.png" alt="배경2" height={1280} width={1440} />
      <Image className="bg3" src="/images/bg3.png" alt="배경3" height={1280} width={1440} />
      <Image className="bg4" src="/images/bg4.png" alt="배경4" height={1280} width={1440} />

      <div className="flex h-[100vh] min-w-[477px] flex-col items-center justify-end gap-[260px] bg-black bg-opacity-10 px-[40px] py-[60px]">
        <div className="flex h-[353px] w-[400px] flex-col items-center justify-between">
          <Header />
          <div className="flex h-[140px] w-[400px] flex-col justify-between">
            <GoogleLoginButton />
            <GitHubLoginButton />
          </div>
        </div>
        <div className="text-button">이용약관 &nbsp; | &nbsp; 개인정보 보호 정책</div>
      </div>
    </div>
  );
}
