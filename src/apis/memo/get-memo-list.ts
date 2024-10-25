import getInstance from '@/apis/instance';

async function getMemoList(noteId: number) {
  const instance = await getInstance();
  const { data } = await instance.get(`/api/memos?noteId=${noteId}`);
  const memoList = data.result.data.memos;
  return memoList;
}

export default getMemoList;
