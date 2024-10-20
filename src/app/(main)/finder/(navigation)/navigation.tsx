import CreatenoteButton from './create-note-button';
import NoteSearchInput from './note-search-input';

function Navigation() {
  return (
    <nav className="mb-[32px] flex h-[48px] w-[1440px] items-center justify-between px-[80px]">
      <div className="text-title2">NOTE</div>
      <div className="flex h-[48px] w-[467px] items-center justify-between">
        <NoteSearchInput />
        <CreatenoteButton />
      </div>
    </nav>
  );
}

export default Navigation;
