'use client';

import { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

import Modal from '@/components/modal';
import CloseIcon from '@/icons/close-icon';
import TagIcon from '@/icons/tag-icon';
import BranchIcon from '@/icons/branch-icon';
import ArrowDropdownIcon from '@/icons/arrow-dropdown-icon';
import ArrowDropupIcon from '@/icons/arrow-dropup-icon';
import Dropdwon from '@/components/dropdwon';
import Spiner from '@/components/spiner';
import noteStore from '@/stores/note-store';
import searchStore from '@/stores/search-store';
import NoteType from '@/types/note-type';

function CreateModal() {
  const router = useRouter();
  const branchDropdownref = useRef<HTMLDivElement>(null);
  const tagDropdownref = useRef<HTMLDivElement>(null);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const urlInputRef = useRef<HTMLInputElement>(null);
  const [linkInfo, setLinkInfo] = useState({ branch: [], tag: [] });
  const [isLoading, setIsLoading] = useState(false);
  const [isBranchDropdownOpen, setIsBranchDropdownOpen] = useState(false);
  const [isTagDropdownOpen, setIsTagDropdownOpen] = useState(false);
  const [selectedLink, setSelectedLink] = useState('');
  const [selectedTag, setSelectedTag] = useState('');
  const [selectedBranch, setSelectedBranch] = useState('');
  const setNotes = noteStore((state: { setNotes: (notes: NoteType[]) => void }) => state.setNotes);
  const searchWord = searchStore((state: { searchWord: string }) => state.searchWord);
  const setSearchedNotes = searchStore(
    (state: { setSearchedNotes: (notes: NoteType[]) => void }) => state.setSearchedNotes,
  );

  const tagDropdownList = linkInfo.tag.map((tag, index) => {
    const dropdownItem = {
      id: index,
      text: tag,
      handleClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLElement;
        setSelectedTag(target.textContent as string);
        setIsTagDropdownOpen(false);
      },
    };
    return dropdownItem;
  });

  const branchDropdownList = linkInfo.branch.map((branch, index) => {
    const dropdownItem = {
      id: index,
      text: branch,
      handleClick: (event: React.MouseEvent<HTMLButtonElement>) => {
        const target = event.target as HTMLElement;
        setSelectedBranch(target.textContent as string);
        setIsBranchDropdownOpen(false);
      },
    };
    return dropdownItem;
  });

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

  useEffect(() => {
    const tagDropdownOutsideClick = (event: MouseEvent) => {
      if (isTagDropdownOpen && tagDropdownref.current && !tagDropdownref.current.contains(event.target as Node)) {
        setIsTagDropdownOpen(!isTagDropdownOpen);
      }
    };

    document.addEventListener('click', tagDropdownOutsideClick);

    return () => {
      document.removeEventListener('click', tagDropdownOutsideClick);
    };
  }, [isTagDropdownOpen]);

  const toggleTagDropdown = () => {
    if (tagDropdownList.length) {
      setIsTagDropdownOpen(!isTagDropdownOpen);
    }
  };

  const searchLink = async () => {
    try {
      setIsBranchDropdownOpen(false);
      setIsTagDropdownOpen(false);
      setIsLoading(true);
      const response = await fetch(`/api/note?url=${urlInputRef.current?.value}`, {
        method: 'GET',
      });
      const data = await response.json();
      setIsLoading(false);
      setSelectedLink(urlInputRef.current?.value as string);
      setSelectedBranch('');
      setSelectedTag('');
      if (Object.keys(data).length) {
        setLinkInfo(data);
      } else {
        // eslint-disable-next-line no-alert
        alert('해당 URL을 찾을 수 없습니다.');
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error: ', error);
    }
  };

  const creataNote = async () => {
    if (titleInputRef.current?.value && selectedLink && selectedBranch && selectedTag) {
      try {
        setIsLoading(true);
        const response = await fetch('/api/note', {
          method: 'POST',
          body: JSON.stringify({
            title: titleInputRef.current?.value,
            url: selectedLink,
            tag: selectedTag,
            branch: selectedBranch,
          }),
        });
        const data = await response.json();
        setNotes(data);
        const searchedNotes = data.filter((note: NoteType) => note.title.includes(searchWord));
        setSearchedNotes(searchedNotes);
        setIsLoading(false);
        router.back();
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    }
  };

  return (
    <Modal>
      <div className="relative flex h-[507px] w-[649px] flex-col gap-[8px] rounded-[32px] bg-white p-[40px] shadow-[0_0_30px_0_rgba(0,0,0,0.05)]">
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
                    onClick={searchLink}
                  >
                    확인
                  </button>
                </div>
              </div>

              <div className="flex h-[48px] items-center justify-start gap-[40px]">
                <div className="text-subtitle1 flex w-[45px] items-center">Tag</div>
                <div>
                  <button
                    type="button"
                    className="mb-[8px] flex h-[40px] w-[192px] items-center justify-between rounded-[20px] bg-gray1 pl-[16px] pr-[8px]"
                    onClick={toggleTagDropdown}
                  >
                    <div className="flex items-center gap-[4px]">
                      <TagIcon />
                      <div className="text-subtitle1 h-[20px] w-[116px] truncate text-left text-gray4">
                        {selectedTag || '태그 선택'}
                      </div>
                    </div>
                    <div className="flex h-[24px] w-[24px] items-center justify-center">
                      {isTagDropdownOpen ? <ArrowDropupIcon /> : <ArrowDropdownIcon />}
                    </div>
                  </button>
                  {isTagDropdownOpen && (
                    <Dropdwon dropdownList={tagDropdownList} dropdownRef={tagDropdownref} border={false} />
                  )}
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
            onClick={creataNote}
          >
            생성하기
          </button>
        </div>
        {isLoading && <Spiner />}
      </div>
    </Modal>
  );
}

export default CreateModal;
