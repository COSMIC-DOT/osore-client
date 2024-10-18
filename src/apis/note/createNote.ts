import getInstance from '@/apis/instance';

async function createNote(body: { title: string; url: string; branch: string }) {
  const instance = await getInstance();
  const { data } = await instance.post('/api/notes', JSON.stringify(body));
  const noteList = data.result.data.list || [];

  return noteList;
}

export default createNote;
