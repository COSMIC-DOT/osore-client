import getInstance from '@/apis/instance';

async function deleteMemo(noteId: string, memoId: string) {
  const instance = await getInstance();
  const { data } = await instance.delete(`/api/memos/${memoId}?noteId=${noteId}`);
  const memoList = data.result.data.memos;
  return memoList;
}

export default deleteMemo;
