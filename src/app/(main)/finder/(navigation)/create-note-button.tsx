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
      className="bg-primary flex h-[48px] w-[135px] items-center justify-center gap-[8px] rounded-[16px] px-[20px] py-[12px]"
      onClick={openCreateNoteModal}
    >
      <PlusIcon />
      <div className="text-button h-[19px] text-white">NOTE 추가</div>
    </button>
  );
}

export default CreateNoteButton;
