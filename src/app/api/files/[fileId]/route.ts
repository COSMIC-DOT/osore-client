import getInstance from '../../intance';

export async function GET(request: Request, { params }: { params: { fileId: string } }) {
  const instance = await getInstance();
  const { fileId } = params;

  const { data } = await instance.get(`/api/files/${fileId}`);

  const fileInfo = data.result.data;

  return Response.json(fileInfo);
}
