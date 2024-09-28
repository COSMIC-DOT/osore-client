'use client';

import { useParams, useRouter } from 'next/navigation';

export default function Page() {
  const router = useRouter();
  const { id } = useParams();
  router.replace(`/note/${id}/memo`);

  return null;
}
