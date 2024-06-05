import GitHubLoginButton from './github-login-button';
import GoogleLoginButton from './google-login-button';
import Header from './header';

export default function Home() {
  return (
    <div className="flex">
      <div className="h-[100vh] w-full bg-[#D9D9D9]" />

      <div className="flex h-[100vh] min-w-[477px] flex-col items-center justify-end gap-[260px] bg-[#E9E9E9] px-[40px] py-[60px]">
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
