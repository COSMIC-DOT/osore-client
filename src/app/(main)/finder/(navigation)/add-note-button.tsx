import PlusIcon from '@/icons/plus-icon';

function AddNoteButton() {
  return (
    <button
      type="button"
      className="text-button flex h-[48px] w-[159px] items-center justify-center gap-3 rounded-[16px] border-[1px] border-black"
    >
      NOTE 추가하기
      <PlusIcon />
    </button>
  );
}

export default AddNoteButton;
