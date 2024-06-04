import getInstance from '../intance';

export async function GET() {
  const instance = await getInstance();
  const { data } = await instance.get('/api/auth/sign-out');

  return Response.json(data);
}
