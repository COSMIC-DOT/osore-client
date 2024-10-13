'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';

import fileStore from '@/stores/file-store';
import BranchIcon2 from '@/icons/branch-icon-2';
import CodeIcon from '@/icons/code-icon';
import DocsIcon from '@/icons/docs-icon';
import GraphIcon from '@/icons/graph-icon';
import OsoreWhiteIcon from '@/icons/osore-white-icon';

function Navigation() {
  const router = useRouter();
  const { id } = useParams();
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState(pathname.split('/')[3]);
  const [noteInfo, setNoteInfo] = useState({ title: '', branch: '', repository: '' });
  const filePath = fileStore((state: { path: string }) => state.path);
  const fileId = fileStore((state: { id: number }) => state.id);

  useEffect(() => {
    setActiveButton(pathname.split('/')[3]);
  }, [pathname]);

  useEffect(() => {
    const exit = () => {
      try {
        navigator.sendBeacon(`/api/notes/${id}/exit`);
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    };

    window.addEventListener('beforeunload', exit);

    return () => {
      window.removeEventListener('beforeunload', exit);
    };
  }, [id]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/notes/${id}`, {
          method: 'GET',
        });
        const data = await response.json();
        setNoteInfo(data);
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    })();
  }, [id]);

  const navigatePage = (event: React.MouseEvent<HTMLButtonElement>) => {
    const clickedButton = event.currentTarget.getAttribute('data-value') || '';
    if (clickedButton === 'code') {
      router.push(`/note/${id}/${clickedButton}/${fileId}`);
    } else {
      router.push(`/note/${id}/${clickedButton}`);
    }
  };

  const askChatBot = () => {
    if (pathname.split('/').includes('chat-bot')) {
      router.back();
    } else {
      router.push(`${pathname}/chat-bot`);
    }
  };

  return (
    <div className="mt-[40px] flex h-[112px] flex-col gap-[24px] px-[80px]">
      <div className="flex h-[40px] items-center gap-[20px]">
        <div className="text-title3">{noteInfo.title}</div>
        <div className="text-body2 text-gray2">|</div>
        <div className="text-subtitle1 text-gray4">{noteInfo.repository}</div>
        <div className="text-body2 text-gray2">|</div>
        <div className="text-subtitle1 flex h-[40px] items-center gap-[4px] rounded-[20px] bg-gray1  px-[16px] text-gray4">
          <BranchIcon2 />
          <div className="h-[20px]">{noteInfo.branch}</div>
        </div>
      </div>

      <div className="flex h-[48px] items-center justify-between">
        <div className="text-subtitle1">{filePath}</div>
        <div className="flex h-[48px] w-[540px] gap-[12px]">
          <button
            type="button"
            className={`text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] ${activeButton === 'code' ? 'bg-secondary_light text-secondary_dark' : 'bg-secondary hover:bg-secondary_dark'} px-[20px] py-[12px] text-white`}
            onClick={navigatePage}
            data-value="code"
          >
            {activeButton === 'code' ? <CodeIcon color="#00B0A9" /> : <CodeIcon color="#FFFFFF" />}
            <div className="h-[18px]">CODE</div>
          </button>
          <button
            type="button"
            className={`text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] ${activeButton === 'graph' ? 'bg-secondary_light text-secondary_dark' : 'bg-secondary hover:bg-secondary_dark'} px-[20px] py-[12px] text-white`}
            onClick={navigatePage}
            data-value="graph"
          >
            {activeButton === 'graph' ? <GraphIcon color="#00B0A9" /> : <GraphIcon color="#FFFFFF" />}
            <div className="h-[18px]">GRAPH</div>
          </button>
          <button
            type="button"
            className={`text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] ${activeButton === 'memo' ? 'bg-secondary_light text-secondary_dark' : 'bg-secondary hover:bg-secondary_dark'} px-[20px] py-[12px] text-white`}
            onClick={navigatePage}
            data-value="memo"
          >
            {activeButton === 'memo' ? <DocsIcon color="#00B0A9" /> : <DocsIcon color="#FFFFFF" />}
            <div className="h-[18px]">메모</div>
          </button>
          <button
            type="button"
            className="text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] bg-secondary px-[20px] py-[12px] text-white hover:bg-secondary_dark"
            onClick={askChatBot}
          >
            <OsoreWhiteIcon />
            <div className="h-[18px]">ASK 소리</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
