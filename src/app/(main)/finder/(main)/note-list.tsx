'use client';

import { useEffect, useState } from 'react';

import Spiner from '@/components/spiner';
import NoteType from '@/types/note-type';
import noteStore from '@/stores/note-store';
import searchStore from '@/stores/search-store';
import Note from './note';

function NoteList() {
  const [isLoading, setIsLoading] = useState(true);
  const setNotes = noteStore((state: { setNotes: (notes: NoteType[]) => void }) => state.setNotes);
  const searchedNotes = searchStore((state: { searchedNotes: NoteType[] }) => state.searchedNotes);
  const setSearchedNotes = searchStore(
    (state: { setSearchedNotes: (notes: NoteType[]) => void }) => state.setSearchedNotes,
  );

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
      } finally {
        setIsLoading(false);
      }
    })();
  }, [setNotes, setSearchedNotes]);

  return (
    <main className="relative flex min-h-[calc(100vh-240px)] min-w-[100vw] flex-col px-[80px]">
      {isLoading && (
        <div className="absolute left-0 top-0 z-50 flex h-full w-full items-center justify-center">
          <Spiner />
        </div>
      )}
      <div className="flex flex-wrap gap-[40px]">
        {searchedNotes?.map((note: NoteType) => <Note key={note.id} note={note} setIsLoading={setIsLoading} />)}
      </div>
    </main>
  );
}

export default NoteList;
