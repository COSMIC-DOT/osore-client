import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import Notetype from '@/types/note-type';
import MeatballsMenuIcon from '@/icons/meatballs-menu-icon';
import PeopleIcon from '@/icons/people-icon';
import StarIcon from '@/icons/star-icon';
import ForkIcon from '@/icons/fork-icon';
import Dropdwon from '@/components/dropdwon';
import noteStore from '@/stores/note-store';

function Note({ note }: { note: Notetype }) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const setNotes = noteStore((state: { setNotes: (notes: Notetype[]) => void }) => state.setNotes);
  const noteDropdwonList = [
    {
      id: 1,
      text: '수정하기',
      handleClick: () => {
        // TODO: 노트 수정하기
      },
    },
    {
      id: 2,
      text: '삭제하기',
      handleClick: async () => {
        try {
          const response = await fetch(`/api/note?noteId=${note.id}`, {
            method: 'DELETE',
          });
          const data = await response.json();
          setNotes(data);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        }
      },
    },
  ];

  useEffect(() => {
    const dropdownOutsideClick = (event: MouseEvent) => {
      if (isDropdownOpen && dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(!isDropdownOpen);
      }
    };

    document.addEventListener('click', dropdownOutsideClick);

    return () => {
      document.removeEventListener('click', dropdownOutsideClick);
    };
  }, [isDropdownOpen]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="flex h-[335px] w-[400px] flex-col justify-between">
      <div
        className="relative h-[270px] w-[400px]"
        onClick={() => router.push('/note')}
        onKeyDown={() => router.push('/note')}
        tabIndex={0}
        role="button"
      >
        <Image
          className="absolute h-[270px] w-[400px] drop-shadow-[0_0_30px_rgba(0,0,0,0.05)]"
          src="/images/folder.png"
          alt="폴더"
          height={270}
          width={400}
        />
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
      <div className="flex h-[49px] w-[400px] justify-between">
        <div className="h-[49px] w-[131px]">
          <div className="text-subtitle1">{note.title}</div>
          <div className="text-body3 text-gray4">Viewed 2 months ago</div>
        </div>
        <div>
          <button
            type="button"
            className="flex h-[32px] w-[160px] justify-end"
            onClick={toggleDropdown}
            aria-label="노트 설정"
          >
            <MeatballsMenuIcon />
          </button>
          {isDropdownOpen && <Dropdwon dropdownList={noteDropdwonList} dropdownRef={dropdownRef} border={false} />}
        </div>
      </div>
    </div>
  );
}

export default Note;
