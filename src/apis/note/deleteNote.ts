import getInstance from '@/apis/instance';

async function deleteNote(noteId: string) {
  const instance = await getInstance();
  const { data } = await instance.delete(`/api/notes/${noteId}`);
  const noteList = data.result.data.list || [];

  return noteList;
}

export default deleteNote;
