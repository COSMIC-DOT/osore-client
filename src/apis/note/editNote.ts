import getInstance from '@/apis/instance';

async function editNote(noteId: string, body: { title: string }) {
  const instance = await getInstance();
  const { data } = await instance.put(`/api/notes/${noteId}`, JSON.stringify(body));
  const noteList = data.result.data.list || [];

  return noteList;
}

export default editNote;
