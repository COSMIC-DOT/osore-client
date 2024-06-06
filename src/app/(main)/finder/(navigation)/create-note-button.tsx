'use client';

import { useRouter } from 'next/navigation';

import PlusIcon from '@/icons/plus-icon';

function CreateNoteButton() {
  const router = useRouter();

  const openCreateNoteModal = () => {
    router.push('/finder/create-modal');
  };

  return (
    <button
      type="button"
      className="text-button flex h-[48px] w-[159px] items-center justify-center gap-3 rounded-[16px] border-[1px] border-black"
      onClick={openCreateNoteModal}
    >
      NOTE 추가하기
      <PlusIcon />
    </button>
  );
}

export default CreateNoteButton;
