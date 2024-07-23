import Navigation from './(navigation)/navigation';
import NoteList from './(main)/note-list';

export default function Main() {
  return (
    <div className="bg-gray0 pt-[40px]">
      <Navigation />
      <NoteList />
    </div>
  );
}
