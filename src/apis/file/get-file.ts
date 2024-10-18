import getInstance from '@/apis/instance';

async function getFile(fileId: number) {
  const instance = await getInstance();
  const { data } = await instance.get(`/api/files/${fileId}`);
  const fileInfo = data.result.data;

  return fileInfo;
}

export default getFile;
