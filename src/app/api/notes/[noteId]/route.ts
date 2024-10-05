import getInstance from '../../intance';

export async function GET(request: Request, { params }: { params: { noteId: string } }) {
  const instance = await getInstance();
  const { noteId } = params;
  const { data } = await instance.get(`/api/notes/${noteId}`);

  const noteInfo = data.result.data || {};

  return Response.json(noteInfo);
}

export async function PUT(request: Request, { params }: { params: { noteId: string } }) {
  const instance = await getInstance();
  const { noteId } = params;
  const body = await request.json();
  const { data } = await instance.put(`/api/notes/${noteId}`, JSON.stringify(body));

  const noteList = data.result.data.list || [];

  return Response.json(noteList);
}

export async function DELETE(request: Request, { params }: { params: { noteId: string } }) {
  const instance = await getInstance();
  const { noteId } = params;
  const { data } = await instance.delete(`/api/notes/${noteId}`);

  const noteList = data.result.data.list || [];

  return Response.json(noteList);
}
