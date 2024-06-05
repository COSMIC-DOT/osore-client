import { Suspense } from 'react';

import Navigation from './navigation';
import NoteList from './note-list';

export default function Main() {
  return (
    <div className="bg-[#F7F8F9] pt-[40px]">
      <Navigation />
      <Suspense fallback={<div>로딩중...</div>}>
        <NoteList />
      </Suspense>
    </div>
  );
}
