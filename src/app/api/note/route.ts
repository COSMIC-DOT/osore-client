import getInstance from '../intance';

export async function GET(request: Request) {
  const instance = await getInstance();
  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get('noteId');
  const { data } = await instance.get(`/api/note?noteId=${noteId}`);

  const noteInfo = data.result.data || {};

  return Response.json(noteInfo);
}

export async function POST(request: Request) {
  const instance = await getInstance();
  const body = await request.json();
  const { data } = await instance.post('/api/note', JSON.stringify(body));

  const noteList = data.result.data.list || [];

  return Response.json(noteList);
}

export async function DELETE(request: Request) {
  const instance = await getInstance();
  const { searchParams } = new URL(request.url);
  const noteId = searchParams.get('noteId');
  const { data } = await instance.delete(`/api/note?id=${noteId}`);

  const noteList = data.result.data.list || [];

  return Response.json(noteList);
}
