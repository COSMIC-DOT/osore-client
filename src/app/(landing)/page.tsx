import Header from './header';

export default function Home() {
  return (
    <div className="flex">
      <div className="h-[100vh] w-full bg-[#D9D9D9]" />
      <div className="h-[100vh] min-w-[668px] bg-white">
        <div className="ml-[20px] mt-[258px] h-[784px] w-[584px] px-[40px] py-[60px]">
          <div className="flex h-[382px] w-[428px] flex-col justify-between">
            <Header />
            <div className="h-[140px] w-[400px]">
              <button type="button">구글</button>
              <button type="button">깃허브</button>
            </div>
          </div>
          <div>이용약관 | 개인정보 보호 정책</div>
        </div>
      </div>
    </div>
  );
}
