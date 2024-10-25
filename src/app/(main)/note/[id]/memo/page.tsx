import PlusIcon from '@/icons/plus-icon';
import PencilIcon from '@/icons/pencil-icon';

function Memo() {
  return (
    <div className="flex h-[717px] w-[1012px] flex-col bg-white px-[24px] pb-[24px] pt-[12px]">
      <div className="flex">
        <div className="flex h-[32px] w-[904px] gap-[53px] border border-primary">
          <button type="button" className="flex h-[32px] w-[60px] justify-center">
            <div className="text-subtitle1 flex h-[32px] w-[32px] items-center justify-center rounded-[12px] bg-secondary_dark text-white">
              1
            </div>
          </button>
        </div>
        <button type="button" className="flex h-[32px] w-[60px] justify-center">
          <div className="text-subtitle1 flex h-[32px] w-[32px] items-center justify-center rounded-[12px] bg-secondary text-white">
            <PlusIcon />
          </div>
        </button>
      </div>
      <div className="mb-[20px] mt-[24px] h-[553px] w-[964px] border border-primary">내용</div>
      <div className="flex h-[48px] w-[964px] justify-end ">
        <button
          type="button"
          className="text-button flex h-[48px] w-[120px] items-center gap-[8px] rounded-[16px] bg-primary px-[20px] py-[12px] text-white"
        >
          <PencilIcon />
          <div className="h-[20px]">수정하기</div>
        </button>
      </div>
    </div>
  );
}

export default Memo;
