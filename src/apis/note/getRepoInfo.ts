import getInstance from '@/apis/instance';

async function getRepoInfo(url: string) {
  const instance = await getInstance();
  const { data } = await instance.get(`/api/repo?url=${url}`);
  const repoInfo = data.result.data || {};

  return repoInfo;
}

export default getRepoInfo;
