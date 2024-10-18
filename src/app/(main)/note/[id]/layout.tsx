import Explorer from '@/app/(main)/note/[id]/explorer';
import Navigation from './navigation';

export default async function NoteLayout({
  children,
  chatbot,
}: {
  children: React.ReactNode;
  chatbot: React.ReactNode;
}) {
  return (
    <div className="max-w-[100vw]">
      <Navigation />
      <div className="mt-[29px] flex gap-[20px] px-[80px]">
        <Explorer />
        {children}
        {chatbot}
      </div>
    </div>
  );
}
