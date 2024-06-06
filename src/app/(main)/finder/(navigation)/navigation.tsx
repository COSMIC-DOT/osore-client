import SearchIcon from '@/icons/search-icon';
import AddNoteButton from './add-note-button';

function Navigation() {
  return (
    <nav className="mb-[32px] flex h-[48px] w-[100%] items-center justify-between px-[80px]">
      <div className="text-title2">NOTE</div>
      <div className="flex h-[48px] w-[318px] items-center justify-between">
        <button
          type="button"
          className="text-button flex h-[48px] w-[135px] items-center justify-center gap-3 rounded-[16px] border-[1px] border-black"
        >
          NOTE 검색
          <SearchIcon />
        </button>
        <AddNoteButton />
      </div>
    </nav>
  );
}

export default Navigation;
