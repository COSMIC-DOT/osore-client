import getInstance from '@/apis/instance';

async function getNoteInfo(noteId: string) {
  const instance = await getInstance();
  const { data } = await instance.get(`/api/notes/${noteId}`);
  const noteInfo = data.result.data || {};

  return noteInfo;
}

export default getNoteInfo;
