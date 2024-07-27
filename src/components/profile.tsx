'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import ArrowDropdownIcon from '@/icons/arrow-dropdown-icon';
import ArrowDropupIcon from '@/icons/arrow-dropup-icon';
import ProfileIcon from '@/icons/profile-icon';
import LogoutIcon from '@/icons/logout-icon';
import Dropdwon from './dropdwon';

function Profile() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState({ name: '', avatar: '' });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownList = [
    {
      id: 1,
      icon: <ProfileIcon />,
      text: '마이페이지',
      handleClick: () => {
        // TODO: 마이페이지로 이동
      },
    },
    {
      id: 2,
      icon: <LogoutIcon />,
      text: '로그아웃',
      warning: true,
      handleClick: async () => {
        try {
          await fetch('/api/logout', {
            method: 'GET',
          });
          router.push('/');
        } catch (error) {
          // eslint-disable-next-line
          console.error(error);
        }
      },
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch('/api/profile', {
          method: 'GET',
        });
        const data = await response.json();
        setUser(data);
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    })();
  }, []);

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
    <div>
      <div
        className="mb-[4px] flex h-[60px] items-center justify-center gap-[8px]"
        onClick={toggleDropdown}
        onKeyDown={toggleDropdown}
        role="button"
        tabIndex={0}
      >
        <div className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full bg-[#D9D9D9]">
          <Image className="h-[60px] w-[60px]" src={user.avatar} alt="프로필" width={50} height={50} />
        </div>
        <div className="text-body2 flex h-[60px] items-center justify-center">
          {user.name}
          <div className="flex h-[24px] w-[24px] items-center justify-center">
            {isDropdownOpen ? <ArrowDropupIcon /> : <ArrowDropdownIcon />}
          </div>
        </div>
      </div>

      {isDropdownOpen && <Dropdwon dropdownList={dropdownList} dropdownRef={dropdownRef} border />}
    </div>
  );
}

export default Profile;
