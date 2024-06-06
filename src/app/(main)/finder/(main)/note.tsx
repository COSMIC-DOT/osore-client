import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Notetype from '@/types/note-type';
import MeatballsMenuIcon from '@/icons/meatballs-menu-icon';
import PeopleIcon from '@/icons/people-icon';
import StarIcon from '@/icons/star-icon';
import ForkIcon from '@/icons/fork-icon';

function Note({ note }: { note: Notetype }) {
  const router = useRouter();

  return (
    <div className="flex h-[335px] w-[400px] flex-col justify-between">
      <div
        className="relative h-[270px] w-[400px]"
        onClick={() => router.push('/note')}
        onKeyDown={() => router.push('/note')}
        tabIndex={0}
        role="button"
      >
        <Image className="absolute h-[270px] w-[400px]" src="/images/folder.png" alt="폴더" height={270} width={400} />
        <div className="absolute z-10 flex h-[270px] w-[400px] flex-col justify-between p-[24px]">
          <div className="flex h-[40px] w-[40px] items-center justify-center overflow-hidden rounded-full bg-[#D9D9D9]">
            <Image className="h-[40px] w-[40px]" src={note.avatar} alt="저장소 프로필" height={40} width={40} />
          </div>
          <div className="flex h-[158px] w-[352px] flex-col justify-between">
            <div className="flex h-[58px] flex-col justify-between">
              <div className="text-title4">{note.repository}</div>
              <div className="text-body2">{note.description}</div>
            </div>
            <div className="flex h-[43px] gap-[24px]">
              <div className="flex gap-[5px]">
                <PeopleIcon />
                <div className="flex flex-col gap-[4px]">
                  <div className="text-subtitle2">{note.contributors}</div>
                  <div className="text-caption">Contributors</div>
                </div>
              </div>
              <div className="flex gap-[5px]">
                <StarIcon />
                <div className="flex flex-col gap-[4px]">
                  <div className="text-subtitle2">{note.stars}</div>
                  <div className="text-caption">Stars</div>
                </div>
              </div>
              <div className="flex gap-[5px]">
                <ForkIcon />
                <div className="flex flex-col gap-[4px]">
                  <div className="text-subtitle2">{note.forks}</div>
                  <div className="text-caption">Forks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="text-subtitle1 flex h-[49px] w-[400px] justify-between">
        {note.title}
        <button type="button" className="h-[32px] w-[32px]" aria-label="노트 설정">
          <MeatballsMenuIcon />
        </button>
      </div>
    </div>
  );
}

export default Note;
