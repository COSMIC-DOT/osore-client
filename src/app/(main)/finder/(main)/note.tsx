import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import NoteType from '@/types/note-type';
import MeatballsMenuIcon from '@/icons/meatballs-menu-icon';
import PeopleIcon from '@/icons/people-icon';
import StarIcon from '@/icons/star-icon';
import ForkIcon from '@/icons/fork-icon';
import Dropdwon from '@/components/dropdwon';
import noteStore from '@/stores/note-store';
import searchStore from '@/stores/search-store';

function Note({ note, setIsLoading }: { note: NoteType; setIsLoading: (isLoading: boolean) => void }) {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const noteTitleInputRef = useRef<HTMLInputElement>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedNoteTitle, setEditedNoteTilte] = useState(note.title);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const setNotes = noteStore((state: { setNotes: (notes: NoteType[]) => void }) => state.setNotes);
  const searchedNotes = searchStore((state: { searchedNotes: NoteType[] }) => state.searchedNotes);
  const setSearchedNotes = searchStore(
    (state: { setSearchedNotes: (notes: NoteType[]) => void }) => state.setSearchedNotes,
  );

  useEffect(() => {
    setEditedNoteTilte(note.title);
  }, [note]);

  const noteDropdwonList = [
    {
      id: 1,
      text: '수정하기',
      handleClick: () => {
        setIsDropdownOpen(false);
        setIsEditing(true);
        setTimeout(() => {
          noteTitleInputRef.current?.select();
        }, 0);
      },
    },
    {
      id: 2,
      text: '삭제하기',
      handleClick: async () => {
        try {
          setIsLoading(true);
          setIsDropdownOpen(false);
          const response = await fetch(`/api/notes/${note.id}`, {
            method: 'DELETE',
          });
          const data = await response.json();
          setNotes(data);
          const newSearchedNotes = data.filter((item: NoteType) =>
            searchedNotes.map((searchedNote: NoteType) => JSON.stringify(searchedNote)).includes(JSON.stringify(item)),
          );
          setSearchedNotes(newSearchedNotes);
        } catch (error) {
          // eslint-disable-next-line no-console
          console.error(error);
        } finally {
          setIsLoading(false);
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

  useEffect(() => {
    const noteTitleInputOutsideClick = async (event: MouseEvent) => {
      try {
        const title = noteTitleInputRef.current?.value;
        if (isEditing && noteTitleInputRef.current !== event.target) {
          setIsEditing(!isEditing);
          if (title !== note.title && title !== '') {
            const response = await fetch(`/api/notes/${note.id}`, {
              method: 'PUT',
              body: JSON.stringify({
                title: note.title,
              }),
            });
            const data = await response.json();
            setNotes(data);
            setSearchedNotes(data);
          } else {
            setEditedNoteTilte(note.title);
          }
        }
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
    };

    document.addEventListener('click', noteTitleInputOutsideClick);

    return () => {
      document.removeEventListener('click', noteTitleInputOutsideClick);
    };
  }, [isEditing, note, setNotes, setSearchedNotes]);

  const enterNoteTitleInput = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    try {
      const title = (event.target as HTMLInputElement).value;
      if (event.key === 'Enter') {
        setIsEditing(!isEditing);
        if (title !== note.title && title !== '') {
          const response = await fetch(`/api/notes/${note.id}`, {
            method: 'PUT',
            body: JSON.stringify({
              title: note.title,
            }),
          });
          const data = await response.json();
          setNotes(data);
          setSearchedNotes(data);
        } else {
          setEditedNoteTilte(note.title);
        }
      }
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleNoteTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEditedNoteTilte(event.target.value);
  };

  return (
    <div className="flex h-[335px] w-[400px] flex-col justify-between">
      <div
        className="relative h-[270px] w-[400px]"
        onClick={() => router.push(`/note/${note.id}`)}
        onKeyDown={() => router.push(`/note/${note.id}`)}
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
            <div className="flex flex-col">
              <div className="text-title4 truncate">{note.repository}</div>
              <div className="text-body2 line-clamp-3">{note.description}</div>
            </div>

            <div className="flex h-[43px] gap-[32px]">
              <div className="flex w-[92px] gap-[5px]">
                <PeopleIcon />
                <div className="flex flex-col gap-[4px]">
                  <div className="text-subtitle2">
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {+note.contributorsCount < 1000
                      ? note.contributorsCount
                      : +note.contributorsCount < 1000000
                        ? `${Math.floor(+note.contributorsCount / 1000)}K`
                        : `${Math.floor(+note.contributorsCount / 1000000)}M`}
                  </div>
                  <div className="text-caption">Contributors</div>
                </div>
              </div>
              <div className="flex w-[55px] gap-[5px]">
                <StarIcon />
                <div className="flex flex-col gap-[4px]">
                  <div className="text-subtitle2">
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {+note.starsCount < 1000
                      ? note.starsCount
                      : +note.starsCount < 1000000
                        ? `${Math.floor(+note.starsCount / 1000)}K`
                        : `${Math.floor(+note.starsCount / 1000000)}M`}
                  </div>
                  <div className="text-caption">Stars</div>
                </div>
              </div>
              <div className="flex w-[54px] gap-[5px]">
                <ForkIcon />
                <div className="flex flex-col gap-[4px]">
                  <div className="text-subtitle2">
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {+note.forksCount < 1000
                      ? note.forksCount
                      : +note.forksCount < 1000000
                        ? `${Math.floor(+note.forksCount / 1000)}K`
                        : `${Math.floor(+note.forksCount / 1000000)}M`}
                  </div>
                  <div className="text-caption">Forks</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex h-[49px] w-[400px] justify-between">
        <div className="h-[49px] w-[240px]">
          {isEditing ? (
            <input
              ref={noteTitleInputRef}
              className="text-subtitle1"
              value={editedNoteTitle}
              onChange={handleNoteTitleChange}
              onKeyDown={enterNoteTitleInput}
            />
          ) : (
            <div className="text-subtitle1 truncate">{note.title}</div>
          )}
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
