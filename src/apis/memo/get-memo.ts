import getInstance from '@/apis/instance';

async function getMemo(memoId: string) {
  const instance = await getInstance();
  const { data } = await instance.get(`/api/memos/${memoId}`);
  console.log(data);
  const memo = data.result.data.content;
  return memo;
}

export default getMemo;
