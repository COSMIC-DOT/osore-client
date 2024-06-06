'use client';

import { useRef } from 'react';
import { useRouter } from 'next/navigation';

import Modal from '@/components/modal';
import CloseIcon from '@/icons/close-icon';
import TagIcon from '@/icons/tag-icon';
import BranchIcon from '@/icons/branch-icon';
import ArrowDropdownIcon from '@/icons/arrow-dropdown-icon';

function CreateModal() {
  const router = useRouter();
  const urlInputRef = useRef<HTMLInputElement>(null);

  const closeModal = () => {
    router.back();
  };

  const searchLink = () => {
    console.log(urlInputRef.current?.value);
  };

  return (
    <Modal>
      <div className="flex h-[450px] w-[649px] flex-col gap-[8px] rounded-[32px] bg-white p-[40px] shadow-[0_0_30px_0_rgba(0,0,0,0.05)]">
        <div className="flex h-[25px] w-[100%] justify-end">
          <button type="button" onClick={closeModal} aria-label="닫기 버튼">
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-[60px]">
          <div className="flex flex-col gap-[21px]">
            <div className="text-title2">새로운 노트</div>

            <div className="flex flex-col gap-[16px]">
              <div className="flex h-[48px] items-center justify-start gap-[40px]">
                <div className="text-subtitle1 flex h-[45px] items-center">이름</div>
                <input
                  placeholder="노트이름을 입력해주세요."
                  className="text-button h-[48px]  w-[400px] rounded-[16px] bg-[#E9EBEF] px-[20px] py-[12px] text-[#6F717C] placeholder:text-center"
                />
              </div>

              <div className="flex h-[48px] items-center justify-start gap-[40px]">
                <div className="text-subtitle1 flex h-[45px] items-center">URL</div>
                <div className="flex gap-[12px]">
                  <input
                    ref={urlInputRef}
                    placeholder="URL 주소를 입력해주세요."
                    className="text-button h-[48px]  w-[400px] rounded-[16px] bg-[#E9EBEF] px-[20px] py-[12px] text-[#6F717C] placeholder:text-center"
                  />
                  <button
                    type="button"
                    className="text-button h-[48px] w-[72px] rounded-[16px] bg-[#C5C6CD] text-white"
                    onClick={searchLink}
                  >
                    확인
                  </button>
                </div>
              </div>

              <div className="flex h-[40px] gap-[12px] pl-[88px]">
                <button
                  type="button"
                  className="flex h-[40px] w-[168px] items-center justify-between rounded-[20px] bg-[#D9D9D9] pl-[16px] pr-[8px]"
                >
                  <div className="text-subtitle1 flex gap-[4px]">
                    <TagIcon />
                    태그 선택
                  </div>
                  <div className="flex h-[24px] w-[24px] items-center justify-center">
                    <ArrowDropdownIcon />
                  </div>
                </button>
                <button
                  type="button"
                  className="flex h-[40px] w-[168px] items-center justify-between rounded-[20px] bg-[#D9D9D9] pl-[16px] pr-[8px]"
                >
                  <div className="text-subtitle1 flex items-center gap-[4px]">
                    <BranchIcon />
                    브랜치 선택
                  </div>
                  <div className="flex h-[24px] w-[24px] items-center justify-center">
                    <ArrowDropdownIcon />
                  </div>
                </button>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="text-button flex h-[48px] w-[100%] items-center justify-center rounded-[16px] bg-[#C5C6CD] px-[24px] py-[12px] text-white"
          >
            생성하기
          </button>
        </div>
      </div>
    </Modal>
  );
}

export default CreateModal;
