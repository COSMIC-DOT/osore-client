import Link from 'next/link';

import ZeroIcon from '@/icons/zero-icon';

export default function NotFound() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      <div className="flex h-[352px] w-[463px] flex-col items-center gap-[52px]">
        <div className="flex h-[252px] flex-col items-center gap-[32px]">
          <div className="text-caption flex h-[100px] w-[201px] items-center gap-[4px] text-[100px]">
            4<ZeroIcon />4
          </div>
          <div className="flex h-[120px] flex-col items-center gap-[12px]">
            <div className="text-title2 text-[32px]">페이지를 찾을 수 없습니다.</div>
            <div className="text-body1 text-center">
              페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다. <br /> 입력하신 주소가 정확한지 다시 한번 확인해
              주시기 바랍니다.
            </div>
          </div>
        </div>
        <div>
          <Link
            href="/"
            replace
            className="text-button flex h-[48px] w-[112px] items-center justify-center rounded-[16px] bg-primary text-white no-underline  hover:bg-primary_dark hover:text-white"
          >
            메인페이지로
          </Link>
        </div>
      </div>
    </div>
  );
}
