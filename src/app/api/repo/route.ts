import getInstance from '../intance';

export async function GET(request: Request) {
  const instance = await getInstance();
  const { searchParams } = new URL(request.url);
  const url = searchParams.get('url');
  const { data } = await instance.get(`/api/repo?url=${url}`);

  const linkInfo = data.result.data || {};

  return Response.json(linkInfo);
}
