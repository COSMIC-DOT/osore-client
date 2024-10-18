'use client';

import Image from 'next/image';
import { useParams, useRouter } from 'next/navigation';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import exitNote from '@/apis/note/exitNote';
import Profile from '@/components/profile';

function Header() {
  const queryClient = useQueryClient();
  const router = useRouter();
  const { id } = useParams();

  const { mutate: goToFinder } = useMutation({
    mutationFn: () => exitNote(id as string),
    onSuccess: (data) => {
      queryClient.setQueryData(['noteList'], data);
      router.replace('/finder');
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('Error: ', error);
    },
  });

  return (
    <header className="flex h-[120px] min-w-[100vw] items-center justify-between border border-white border-b-gray1 px-[80px]">
      <div
        className="flex h-[47px] w-[223px] items-center justify-between"
        onClick={() => goToFinder()}
        onKeyDown={() => goToFinder()}
        tabIndex={0}
        role="button"
      >
        <Image className="h-[47px] w-[36px]" src="/images/icon.png" alt="아이콘" height={47} width={36} />
        <Image className="h-[32px] w-[174px]" src="/images/logo.png" alt="로고" height={32} width={174} />
      </div>
      <Profile />
    </header>
  );
}

export default Header;
