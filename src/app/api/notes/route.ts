import getInstance from '../intance';

export async function GET() {
  const instance = await getInstance();
  const { data } = await instance.get('/api/notes');

  const noteList = data.result.data.list || [];

  return Response.json(noteList);
}
