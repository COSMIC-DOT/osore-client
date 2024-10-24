import Chatbot from '@/app/(main)/note/[id]/(chatbot)/chatbot';
import Explorer from '@/app/(main)/note/[id]/explorer';
import Navigation from './navigation';

export default async function NoteLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Navigation />
      <div className="mt-[29px] flex px-[80px] pb-[43px]">
        <Explorer />
        {children}
        <div className="relative">
          <Chatbot />
        </div>
      </div>
    </div>
  );
}
