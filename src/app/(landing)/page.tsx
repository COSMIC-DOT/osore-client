import Image from 'next/image';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import Header from './header';
import GitHubLoginButton from './github-login-button';
import GoogleLoginButton from './google-login-button';

export default async function Home() {
  const cookie = cookies().get('JSESSIONID')?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/check`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `JSESSIONID=${cookie}`,
    },
  });
  const { success: isLogin } = await response.json();

  if (isLogin) {
    redirect('/finder');
  }

  return (
    <div className="flex items-center justify-between pl-[80px]">
      <Image className="bg1" src="/images/bg1.png" alt="배경1" height={1280} width={1440} />
      <Image className="bg2" src="/images/bg2.png" alt="배경2" height={1280} width={1440} />
      <Image className="bg3" src="/images/bg3.png" alt="배경3" height={1280} width={1440} />
      <Image className="bg4" src="/images/bg4.png" alt="배경4" height={1280} width={1440} />

      <div className="flex h-[105px] w-[428px] items-center justify-center gap-[20px]">
        <Image className="h-[105px] w-[80px]" src="/images/icon.png" alt="아이콘" height={105} width={80} />
        <Image className="h-[60px] w-[328px]" src="/images/logo.png" alt="로고" height={60} width={328} />
      </div>

      <div className="flex h-[100vh] min-w-[477px] flex-col items-center justify-end gap-[260px] bg-black bg-opacity-10 px-[40px] py-[60px]">
        <div className="flex h-[322px] w-[400px] flex-col items-center justify-center gap-[80px]">
          <Header />
          <div className="flex h-[140px] w-[400px] flex-col justify-between">
            <GoogleLoginButton />
            <GitHubLoginButton />
          </div>
        </div>
        <div className="text-button flex gap-[12px] text-gray4">
          <div>이용약관</div> <div>|</div> <div>개인정보 보호 정책</div>
        </div>
      </div>
    </div>
  );
}
