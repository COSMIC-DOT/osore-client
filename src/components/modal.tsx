'use client';

import { useRouter } from 'next/navigation';

function Modal({ modal }: { modal: React.ReactNode }) {
  const router = useRouter();
  const clickOutside = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      router.back();
    }
  };

  return (
    <div
      className="fixed left-0 top-0 z-10 flex h-[100%] w-[100%] items-center justify-center"
      onClick={clickOutside}
      onKeyDown={() => {}}
      tabIndex={0}
      role="button"
    >
      {modal}
    </div>
  );
}

export default Modal;
