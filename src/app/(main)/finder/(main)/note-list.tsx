'use client';

import { useState, useEffect } from 'react';

import NoteType from '@/types/note-type';
import Note from './note';

function NoteList() {
  const [notes, setNotes] = useState<NoteType[] | null>(null);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/notes', {
          method: 'GET',
        });
        const { noteList } = await response.json();
        setNotes(noteList);
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    })();
  }, []);

  return (
    <main className="flex w-[100%] flex-col px-[80px]">
      <div className="flex  flex-wrap gap-[40px]">
        {notes?.map((note: NoteType) => <Note key={note.id} note={note} />)}
      </div>
    </main>
  );
}

export default NoteList;
