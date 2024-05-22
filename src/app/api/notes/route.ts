import instance from '../instance';

// eslint-disable-next-line
export async function GET() {
  const { data } = await instance.get('/mock/notes.json');

  return Response.json({ data });
}
