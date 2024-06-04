export async function GET() {
  const data = await fetch('http://localhost:3000/mock/notes.json');

  const { noteList } = await data.json();

  return Response.json({ noteList });
}
