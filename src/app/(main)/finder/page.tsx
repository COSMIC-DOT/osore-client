import Navigation from './(navigation)/navigation';
import NoteList from './(main)/note-list';

export default function Main() {
  return (
    <div className="bg-[#F7F8F9] pt-[40px]">
      <Navigation />
      <NoteList />
    </div>
  );
}
