'use client';

import { use } from 'react';
import Image from 'next/image';

function Profile() {
  const user = use(
    fetch('/api/profile', {
      method: 'GET',
    })
      .then((response) => response.json())
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('Error:', error);
      }),
  );

  return (
    <div className="flex h-[60px] w-[60px] items-center justify-center overflow-hidden rounded-full bg-[#D9D9D9]">
      <Image className="h-[60px] w-[60px]" src={user.avatar} alt="프로필" width={50} height={50} />
    </div>
  );
}

export default Profile;
