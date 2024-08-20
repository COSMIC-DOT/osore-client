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
    <main className="flex min-h-[100vh] min-w-[100vw] flex-col px-[80px]">
      {isLoading ? (
        <div className="fixed left-0 top-0 flex h-full w-full items-center justify-center">
          <Spiner />
        </div>
      ) : (
        <div className="flex flex-wrap gap-[40px]">
          {searchedNotes?.map((note: NoteType) => <Note key={note.id} note={note} />)}
        </div>
      )}
    </main>
  );
}

export default NoteList;
