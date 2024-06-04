'use client';

import { use, useState } from 'react';

import NoteType from '@/types/note-type';
import PrevIcon from '@/icons/prev-icon';
import NextIcon from '@/icons/next-icon';
import Note from './note';

function NoteList() {
  const [page, setPage] = useState(0);

  const notes = use(
    fetch('/api/notes', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then(({ noteList }) => noteList)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error:', error);
      }),
  );

  const handlePrevButton = () => {
    if (page > 0) {
      setPage(page - 1);
    }
  };

  const handleNextButton = () => {
    if (page < notes.length - 1) {
      setPage(page + 1);
    }
  };

  return (
    <main className="mx-auto mt-[60px] flex w-[95%] flex-col gap-[58px]">
      <div className="mx-auto flex max-w-[1800px] flex-wrap gap-[20px]">
        {notes[page].map((note: NoteType) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
      <div className="m-auto flex h-[32px] w-[158px] items-center justify-between text-xl">
        <button
          type="button"
          className="flex h-[32px] w-[32px] items-center justify-center border-[1px]"
          onClick={handlePrevButton}
          aria-label="이전 노트 리스트"
        >
          <PrevIcon />
        </button>
        {page + 1}/{notes.length}
        <button
          type="button"
          className="flex h-[32px] w-[32px] items-center justify-center border-[1px]"
          onClick={handleNextButton}
          aria-label="다음 노트 리스트"
        >
          <NextIcon />
        </button>
      </div>
    </main>
  );
}

export default NoteList;
