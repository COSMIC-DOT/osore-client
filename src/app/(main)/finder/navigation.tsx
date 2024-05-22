import PlusIcon from '@/icons/plus-icon';
import SearchIcon from '@/icons/search-icon';

function Navigation() {
  return (
    <nav className="mx-auto flex h-[48px] w-[95%] items-center justify-between">
      <div className="text-xl font-bold">NOTE</div>
      <div className="flex h-[48px] w-[318px] items-center justify-between">
        <button
          type="button"
          className="flex h-[48px] w-[135px] items-center justify-center gap-3 border-[1px] border-black"
        >
          NOTE 검색
          <SearchIcon />
        </button>
        <button
          type="button"
          className="flex h-[48px] w-[159px] items-center justify-center gap-3 border-[1px] border-black"
        >
          NOTE 추가하기
          <PlusIcon />
        </button>
      </div>
    </nav>
  );
}

export default Navigation;
