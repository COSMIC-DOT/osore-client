import getInstance from '../intance';

export async function GET() {
  const instance = await getInstance();
  const { data } = await instance.get('/api/notes');

  const noteList = data.result.data.list || [];

  return Response.json(noteList);
}

export async function POST(request: Request) {
  const instance = await getInstance();
  const body = await request.json();
  const { data } = await instance.post('/api/notes', JSON.stringify(body));

  const noteList = data.result.data.list || [];

  return Response.json(noteList);
}
