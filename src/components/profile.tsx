'use client';

import { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { useMutation, useQuery } from '@tanstack/react-query';

import logout from '@/apis/auth/logout';
import getUserName from '@/apis/auth/get-user-name';
import ArrowDropdownIcon from '@/icons/arrow-dropdown-icon';
import ArrowDropupIcon from '@/icons/arrow-dropup-icon';
import ProfileIcon from '@/icons/profile-icon';
import LogoutIcon from '@/icons/logout-icon';
import Dropdwon from './dropdwon';

function Profile() {
  const router = useRouter();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { data: username } = useQuery({ queryKey: ['username'], queryFn: getUserName });
  const { mutate } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      router.push('/');
    },
    onError: () => {
      alert('로그아웃에 실패했습니다.');
    },
  });
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
      handleClick: () => {
        mutate();
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
    <div>
      <div
        className="mb-[4px] flex h-[60px] items-center justify-center gap-[8px]"
        onClick={toggleDropdown}
        onKeyDown={toggleDropdown}
        role="button"
        tabIndex={0}
      >
        <div className="text-body2 flex h-[60px] items-center justify-center">
          {username}
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
