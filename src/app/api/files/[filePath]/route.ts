import getInstance from '../../intance';

export async function GET(request: Request, { params }: { params: { filePath: string } }) {
  const instance = await getInstance();
  const { filePath } = params;
  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get('noteId');
  const { data } = await instance.get(`/api/files/${filePath}?noteId=${noteId}`);

  const fileInfo = data.result.data;

  return Response.json(fileInfo);
}
