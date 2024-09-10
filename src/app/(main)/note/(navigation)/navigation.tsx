import BranchIcon2 from '@/icons/branch-icon-2';
import CodeIcon from '@/icons/code-icon';
import DocsIcon from '@/icons/docs-icon';
import GraphIcon from '@/icons/graph-icon';
import OsoreIcon from '@/icons/osore-icon';
import TagIcon2 from '@/icons/tag-icon-2';

function Navigation() {
  return (
    <div className="mt-[40px] flex h-[112px] flex-col gap-[24px] px-[80px]">
      <div className="flex h-[40px] items-center gap-[20px]">
        <div className="text-title3">NOTE 이름</div>
        <div className="text-body2 text-gray2">|</div>
        <div className="text-subtitle1 text-gray4">Github 레포 이름</div>
        <div className="text-body2 text-gray2">|</div>
        <div className="flex gap-[12px]">
          <div className="text-subtitle1 flex h-[40px] items-center gap-[4px] rounded-[20px] bg-gray1  px-[16px] text-gray4">
            <TagIcon2 />
            <div className="h-[20px]">태그 정보</div>
          </div>
          <div className="text-subtitle1 flex h-[40px] items-center gap-[4px] rounded-[20px] bg-gray1  px-[16px] text-gray4">
            <BranchIcon2 />
            <div className="h-[20px]">브랜치 정보</div>
          </div>
        </div>
      </div>

      <div className="flex h-[48px] items-center justify-between">
        <div className="text-subtitle1">/hello/my/name/is.md</div>
        <div className="flex h-[48px] w-[540px] gap-[12px]">
          <button
            type="button"
            className="text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] bg-secondary px-[20px] py-[12px] text-white hover:bg-secondary_dark"
          >
            <CodeIcon />
            <div className="h-[18px]">CODE</div>
          </button>
          <button
            type="button"
            className="text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] bg-secondary px-[20px] py-[12px] text-white hover:bg-secondary_dark"
          >
            <GraphIcon />
            <div className="h-[18px]">GRAPH</div>
          </button>
          <button
            type="button"
            className="text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] bg-secondary px-[20px] py-[12px] text-white hover:bg-secondary_dark"
          >
            <DocsIcon />
            <div className="h-[18px]">요약</div>
          </button>
          <button
            type="button"
            className="text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] bg-secondary px-[20px] py-[12px] text-white hover:bg-secondary_dark"
          >
            <OsoreIcon />
            <div className="h-[18px]">ASK 소리</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
