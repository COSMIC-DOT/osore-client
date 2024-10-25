import getInstance from '@/apis/instance';

async function createMemo(noteId: number) {
  const instance = await getInstance();
  const { data } = await instance.post('/api/memos', JSON.stringify({ noteId }));
  const memoList = data.result.data.memos;
  return memoList;
}

export default createMemo;
