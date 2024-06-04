export async function GET() {
  const data = await fetch('http://localhost:8080/api/user', {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
    },
  });

  console.log(data);

  return Response.json({ data });
}
