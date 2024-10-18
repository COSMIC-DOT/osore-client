import getInstance from '@/apis/instance';

async function exitNote(noteId: string) {
  const instance = await getInstance();
  const { data } = await instance.post(`/api/notes/${noteId}/exit`);
  const noteList = data.result.data.list || [];

  return noteList;
}

export default exitNote;
