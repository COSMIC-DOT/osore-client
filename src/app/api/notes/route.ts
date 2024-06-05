export async function GET() {
  const data = await fetch('http://localhost:3000/mock/notes.json', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
    cache: 'no-cache',
  });

  const { noteList } = await data.json();

  return Response.json({ noteList });
}
