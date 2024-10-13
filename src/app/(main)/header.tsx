'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';

import NoteType from '@/types/note-type';
import noteStore from '@/stores/note-store';
import searchStore from '@/stores/search-store';
import Profile from '@/components/profile';

function Header() {
  const router = useRouter();
  const { id } = useParams();
  const setNotes = noteStore((state: { setNotes: (notes: NoteType[]) => void }) => state.setNotes);
  const setSearchedNotes = searchStore(
    (state: { setSearchedNotes: (notes: NoteType[]) => void }) => state.setSearchedNotes,
  );

  const goToFinder = async () => {
    try {
      const response = await fetch(`/api/notes/${id}/exit`, {
        method: 'POST',
      });
      const data = await response.json();
      setNotes(data);
      setSearchedNotes(data);
      router.replace('/finder');
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  return (
    <header className="flex h-[120px] min-w-[100vw] items-center justify-between border border-white border-b-gray1 px-[80px]">
      <div
        className="flex h-[47px] w-[223px] items-center justify-between"
        onClick={goToFinder}
        onKeyDown={goToFinder}
        tabIndex={0}
        role="button"
      >
        <Image className="h-[47px] w-[36px]" src="/images/icon.png" alt="아이콘" height={47} width={36} />
        <Image className="h-[32px] w-[174px]" src="/images/logo.png" alt="로고" height={32} width={174} />
      </div>
      <Profile />
    </header>
  );
}

export default Header;
