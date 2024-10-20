import Navigation from './(navigation)/navigation';
import NoteList from './(main)/note-list';

export default function Main() {
  return (
    <div className="flex w-[100vw] flex-col items-center pt-[40px]">
      <Navigation />
      <NoteList />
    </div>
  );
}
