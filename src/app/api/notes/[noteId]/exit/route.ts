import getInstance from '@/app/api/intance';

export async function POST(request: Request, { params }: { params: { noteId: string } }) {
  const instance = await getInstance();
  const { noteId } = params;
  const data = await instance.post(`/api/notes/${noteId}/exit`);

  console.log(data);
}
