import getInstance from '@/apis/instance';

async function editMemo(memoId: string, content: string) {
  const instance = await getInstance();
  await instance.put(`/api/memos/${memoId}`, JSON.stringify({ content }));
}

export default editMemo;
