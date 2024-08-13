'use client';

import { useEffect } from 'react';

import NoteType from '@/types/note-type';
import noteStore from '@/stores/note-store';
import Note from './note';

function NoteList() {
  const setNotes = noteStore((state: { setNotes: (notes: NoteType[]) => void }) => state.setNotes);
  const searchedNotes = noteStore((state: { searchedNotes: NoteType[] }) => state.searchedNotes);
  const setSearchedNotes = noteStore(
    (state: { setSearchedNotes: (notes: NoteType[]) => void }) => state.setSearchedNotes,
  );

  console.log('aaa');

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/notes', {
          method: 'GET',
        });

        const data = await response.json();
        setNotes(data);
        setSearchedNotes(data);
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    })();
  }, [setNotes, setSearchedNotes]);

  return (
    <main className="flex min-h-[100vh] min-w-[100vw] flex-col px-[80px]">
      <div className="flex flex-wrap gap-[40px]">
        {searchedNotes?.map((note: NoteType) => <Note key={note.id} note={note} />)}
      </div>
    </main>
  );
}

export default NoteList;
