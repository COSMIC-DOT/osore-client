import getInstance from '../intance';

export async function GET() {
  const instance = await getInstance();
  const { data } = await instance.get('/api/user');

  const user = data.result.data;

  return Response.json(user);
}
