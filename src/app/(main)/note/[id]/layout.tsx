import { cookies } from 'next/headers';

import Explorer from '@/components/explorer';
import Navigation from './navigation';

export default async function NoteLayout({ children, params }: { children: React.ReactNode; params: { id: string } }) {
  const cookie = cookies().get('JSESSIONID')?.value;
  const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/files?noteId=${params.id}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Cookie: `JSESSIONID=${cookie}`,
    },
  });

  const data = await response.json();
  const rootFile = data.result.data;

  return (
    <div>
      <Navigation />
      <div className="mt-[29px] flex gap-[20px] px-[80px]">
        <Explorer rootFile={rootFile} />
        {children}
      </div>
    </div>
  );
}