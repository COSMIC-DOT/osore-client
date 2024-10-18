import getInstance from '@/apis/instance';

async function getFileList(noteId: number) {
  const instance = await getInstance();
  const { data } = await instance.get(`/api/files?noteId=${noteId}`);
  const fileList = data.result.data;

  return fileList;
}

export default getFileList;
