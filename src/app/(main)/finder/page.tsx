import Navigation from './navigation';
import NoteList from './note-list';

export default function Main() {
  return (
    <div className="bg-[#F7F8F9] pt-[40px]">
      <Navigation />
      <NoteList />
    </div>
  );
}
