'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import getRepoInfo from '@/apis/note/getRepoInfo';
import createNote from '@/apis/note/createNote';
import Modal from '@/components/modal';
import CloseIcon from '@/icons/close-icon';
import BranchIcon from '@/icons/branch-icon';
import ArrowDropdownIcon from '@/icons/arrow-dropdown-icon';
import ArrowDropupIcon from '@/icons/arrow-dropup-icon';
import Dropdwon from '@/components/dropdwon';
import Loading from '@/components/loading';

function CreateModal() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const branchDropdownref = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const [linkInfo, setLinkInfo] = useState({ branch: [] });
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');

  const branchDropdownList = linkInfo.branch.map((branch, index) => ({
    id: index,
    text: branch,
    handleClick: (event: React.MouseEvent<HTMLButtonElement>) => {
      const target = event.target as HTMLElement;
      setSelectedBranch(target.textContent as string);
      setIsBranchDropdownOpen(false);
    },
  }));

  const closeModal = () => {
    router.back();
  };

  useEffect(() => {
    const branchDropdownOutsideClick = (event: MouseEvent) => {
      if (
        isBranchDropdownOpen &&
        branchDropdownref.current &&
        !branchDropdownref.current.contains(event.target as Node)
      ) {
        setIsBranchDropdownOpen(!isBranchDropdownOpen);
      }
    };

    document.addEventListener('click', branchDropdownOutsideClick);

    return () => {
      document.removeEventListener('click', branchDropdownOutsideClick);
    };
  }, [isBranchDropdownOpen]);

  const toggleBranchDropdown = () => {
    if (branchDropdownList.length) {
      setIsBranchDropdownOpen(!isBranchDropdownOpen);
    }
  };

  const { mutate: searchLink, isPending: searchLinkIsPending } = useMutation({
    mutationFn: () => getRepoInfo(urlInputRef.current?.value as string),
    onSuccess: (data) => {
      setSelectedLink(urlInputRef.current?.value as string);
      setSelectedBranch('');
      if (Object.keys(data).length) {
        setLinkInfo(data);
      } else {
        // eslint-disable-next-line no-alert
        alert('해당 URL을 찾을 수 없습니다.');
      }
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('Error: ', error);
    },
  });

  const { mutate: handleCreateNote, isPending: createNoteIsPending } = useMutation({
    mutationFn: () =>
      createNote({
        title: titleInputRef.current?.value as string,
        url: selectedLink,
        branch: selectedBranch,
      }),
    onSuccess: (data) => {
      queryClient.setQueryData(['noteList'], data);
      router.back();
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('Error: ', error);
    },
  });

  const isLoading = searchLinkIsPending || createNoteIsPending;

  return (
    <Modal>
      <div className="relative flex h-[451px] w-[649px] flex-col gap-[8px] rounded-[32px] bg-white p-[40px] shadow-[0_0_30px_0_rgba(0,0,0,0.05)]">
        <div className="flex h-[25px] w-[100%] justify-end">
          <button
            type="button"
            className="flex h-[24px] w-[24px] items-center justify-center"
            onClick={closeModal}
            aria-label="닫기 버튼"
          >
            <CloseIcon />
          </button>
        </div>

        <div className="flex flex-col gap-[60px]">
          <div className="flex flex-col gap-[21px]">
            <div className="text-title2">새로운 노트</div>

            <div className="flex flex-col gap-[16px]">
              <div className="flex h-[48px] items-center justify-start gap-[40px]">
                <div className="text-subtitle1 flex w-[45px] items-center">이름</div>
                <div className="rounded-[16px] border border-gray1 focus-within:border-primary">
                  <input
                    ref={titleInputRef}
                    placeholder="노트이름을 입력해주세요."
                    className="text-button outline- h-[48px]  w-[400px] rounded-[16px] bg-gray1 px-[20px] py-[12px] text-[#6F717C] outline-none placeholder:text-center"
                  />
                </div>
              </div>

              <div className="flex h-[48px] items-center justify-start gap-[40px]">
                <div className="text-subtitle1 flex w-[45px] items-center">URL</div>
                <div className="flex gap-[12px]">
                  <div className="rounded-[16px] border border-gray1 focus-within:border-primary">
                    <input
                      ref={urlInputRef}
                      placeholder="URL 주소를 입력해주세요."
                      className="text-button h-[48px]  w-[400px] rounded-[16px] bg-gray1 px-[20px] py-[12px] text-gray4 outline-none placeholder:text-center"
                    />
                  </div>
                  <button
                    type="button"
                    className="text-button h-[48px] w-[72px] rounded-[16px] bg-gray2 text-white"
                    onClick={() => searchLink()}
                  >
                    확인
                  </button>
                </div>
              </div>
              <div className="flex h-[48px] items-center justify-start gap-[40px]">
                <div className="text-subtitle1 flex w-[45px] items-center">Branch</div>
                <div>
                  <button
                    type="button"
                    className="mb-[8px] flex h-[40px] w-[192px] items-center justify-between rounded-[20px] bg-gray1 pl-[16px] pr-[8px]"
                    onClick={toggleBranchDropdown}
                  >
                    <div className="flex items-center gap-[4px]">
                      <BranchIcon />
                      <div className="text-subtitle1 h-[20px] w-[116px] truncate text-left text-gray4">
                        {selectedBranch || '브랜치 선택'}
                      </div>
                    </div>
                    <div className="flex h-[24px] w-[24px] items-center justify-center">
                      {isBranchDropdownOpen ? <ArrowDropupIcon /> : <ArrowDropdownIcon />}
                    </div>
                  </button>
                  {isBranchDropdownOpen && (
                    <Dropdwon dropdownList={branchDropdownList} dropdownRef={branchDropdownref} border={false} />
                  )}
                </div>
              </div>
            </div>
          </div>

          <button
            type="button"
            className="text-button flex h-[48px] w-[100%] items-center justify-center rounded-[16px] bg-gray2 px-[24px] py-[12px] text-white"
            onClick={() => {
              if (titleInputRef.current?.value && selectedLink && selectedBranch) handleCreateNote();
            }}
          >
            생성하기
          </button>
        </div>
        {isLoading && <Loading />}
      </div>
    </Modal>
  );
}

export default CreateModal;
