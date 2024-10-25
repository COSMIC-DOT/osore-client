import getInstance from '@/apis/instance';

async function getNoteList() {
  const instance = await getInstance();
  const { data } = await instance.get('/api/notes');
  const noteList = data.result.data.list || [];
  return noteList;
}

export default getNoteList;
