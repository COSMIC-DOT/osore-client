'use client';

import { use } from 'react';

import NoteType from '@/types/note-type';
import PrevIcon from '@/icons/prev-icon';
import NextIcon from '@/icons/next-icon';
import Note from './note';

function NoteList() {
  const notes = use(
    fetch('/api/notes', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then(({ data }) => data.noteList),
  );

  return (
    <main className="mx-auto mt-[60px] flex w-[95%] flex-col gap-[58px]">
      <div className="mx-auto flex max-w-[1800px] flex-wrap gap-[20px]">
        {notes.map((note: NoteType) => (
          <Note key={note.id} note={note} />
        ))}
      </div>
      <div className="m-auto flex h-[32px] w-[158px] items-center justify-between text-xl">
        <button
          type="button"
          className="flex h-[32px] w-[32px] items-center justify-center border-[1px]"
          aria-label="이전 노트 리스트"
        >
          <PrevIcon />
        </button>
        1/3
        <button
          type="button"
          className="flex h-[32px] w-[32px] items-center justify-center border-[1px]"
          aria-label="다음 노트 리스트"
        >
          <NextIcon />
        </button>
      </div>
    </main>
  );
}

export default NoteList;
