'use client';

import { useQueryClient, useQuery, useMutation } from '@tanstack/react-query';

import getNoteList from '@/apis/note/getNoteList';
import deleteNote from '@/apis/note/deleteNote';
import Loading from '@/components/loading';
import NoteType from '@/types/note-type';
import searchStore from '@/stores/search-store';
import Note from './note';

function NoteList() {
  const queryClient = useQueryClient();
  const searchWord = searchStore((state: { searchWord: string }) => state.searchWord);
  const { data: noteList, isPending: getNoteListIsPending } = useQuery({
    queryKey: ['noteList'],
    queryFn: getNoteList,
  });
  const { mutate: handleDeleteNote, isPending: deleteNoteIsPending } = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: (data) => {
      queryClient.setQueryData(['noteList'], data);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('Error: ', error);
    },
  });

  const isLoading = getNoteListIsPending || deleteNoteIsPending;

  return (
    <main className="relative flex w-[1440px] flex-col px-[80px] pb-[109px]">
      {isLoading && (
        <div className="absolute left-0 top-[-120px] z-50 flex h-[calc(100vh-120px)] w-full items-center justify-center">
          <Loading />
        </div>
      )}
      <div className="flex flex-wrap gap-[40px]">
        {noteList
          ?.filter((note: NoteType) => note.title.includes(searchWord))
          .map((note: NoteType) => (
            <Note key={note.id} note={note} handleDeleteNote={() => handleDeleteNote(note.id.toString())} />
          ))}
      </div>
    </main>
  );
}

export default NoteList;
