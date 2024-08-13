'use client';

import CancelButton from '@/icons/cancel-icon';
import SearchIcon from '@/icons/search-icon';
import { useRef } from 'react';

function NoteSearchInput() {
  const cancelRef = useRef<HTMLButtonElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!cancelRef.current) return;

    if (!event.target.value) {
      cancelRef.current.style.setProperty('display', 'none');
    } else {
      cancelRef.current.style.setProperty('display', 'inline-block');
    }
  };

  const inputCancel = () => {
    if (!inputRef.current || !cancelRef.current) return;

    inputRef.current.value = '';
    cancelRef.current.style.setProperty('display', 'none');
  };

  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
      <label
        htmlFor="search"
        className="flex h-[48px] w-[320px] items-center justify-center gap-[8px] rounded-[16px] border-[1px] border-gray1 bg-gray1 px-[20px] py-[12px] focus-within:border-primary"
      >
        <div>
          <SearchIcon />
        </div>
        <input
          id="search"
          ref={inputRef}
          className="text-button flex w-[63px] items-center justify-center gap-3 bg-gray1 py-[12px] outline-none placeholder:text-gray4 valid:w-[214px] focus:w-[247px]"
          placeholder="Note 검색"
          required
          onChange={handleChange}
        />
        <button type="button" aria-label="Cancel" className="hidden" ref={cancelRef} onClick={inputCancel}>
          <CancelButton />
        </button>
      </label>
    </div>
  );
}

export default NoteSearchInput;
