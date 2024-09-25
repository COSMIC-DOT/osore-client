import getInstance from '../intance';

export async function GET(request: Request) {
  const instance = await getInstance();
  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get('noteId');
  const filePath = searchParams.get('filePath');
  const { data } = await instance.get(`/api/file?noteId=${noteId}&filePath=${filePath}`);

  const fileList = data.result.data;

  return Response.json(fileList);
}