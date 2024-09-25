import Navigation from './navigation';

export default async function NoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navigation />
      {children}
    </div>
  );
}
