'use client';

import { use } from 'react';
import Image from 'next/image';

function Profile() {
  const user = use(
    fetch('/api/profile', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then(({ data }) => data),
  );

  return (
    <div className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full bg-white">
      <Image className="h-[60px] w-[60px]" src={user.avartar} alt="프로필" width={50} height={50} />
    </div>
  );
}

export default Profile;
