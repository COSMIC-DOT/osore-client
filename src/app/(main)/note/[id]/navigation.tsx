'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';

import selectedFileStore from '@/stores/selected-file-store';
import BranchIcon2 from '@/icons/branch-icon-2';
import CodeIcon from '@/icons/code-icon';
import DocsIcon from '@/icons/docs-icon';
import GraphIcon from '@/icons/graph-icon';
import OsoreWhiteIcon from '@/icons/osore-white-icon';
import { useQuery } from '@tanstack/react-query';
import getFile from '@/apis/file/get-file';
import getNoteInfo from '@/apis/note/getNoteInfo';

function Navigation() {
  const router = useRouter();
  const { id } = useParams();
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState(pathname.split('/')[3]);
  const selectedFileId = selectedFileStore((state: { id: number }) => state.id);

  const { data: fileInfo } = useQuery({
    queryKey: ['fileInfo', selectedFileId],
    queryFn: () => getFile(+selectedFileId),
    enabled: selectedFileId !== 0,
  });

  const { data: noteInfo } = useQuery({
    queryKey: ['noteInfo', id],
    queryFn: () => getNoteInfo(id as string),
  });

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

  const navigatePage = (event: React.MouseEvent<HTMLButtonElement>) => {
    const clickedButton = event.currentTarget.getAttribute('data-value') || '';
    if (clickedButton === 'code') {
      router.push(`/note/${id}/${clickedButton}/${selectedFileId}`);
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
    <div className="mt-[40px] flex h-[112px] w-[1440px] flex-col gap-[24px] px-[80px]">
      <div className="flex h-[40px] items-center gap-[20px]">
        <div className="text-title3">{noteInfo?.title}</div>
        <div className="text-body2 text-gray2">|</div>
        <div className="text-subtitle1 text-gray4">{noteInfo?.repository}</div>
        <div className="text-body2 text-gray2">|</div>
        <div className="text-subtitle1 flex h-[40px] items-center gap-[4px] rounded-[20px] bg-gray1  px-[16px] text-gray4">
          <BranchIcon2 />
          <div className="h-[20px]">{noteInfo?.branch}</div>
        </div>
      </div>

      <div className="flex h-[48px] items-center justify-between">
        <div className="text-subtitle1">{fileInfo?.path}</div>
        <div className="flex h-[48px] w-[540px] gap-[12px]">
          <button
            type="button"
            className={`text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] ${activeButton === 'code' ? 'bg-primary_light text-primary_dark' : 'bg-primary hover:bg-primary_dark'} px-[20px] py-[12px] text-white`}
            onClick={navigatePage}
            data-value="code"
          >
            {activeButton === 'code' ? <CodeIcon color="#3617B3" /> : <CodeIcon color="#FFFFFF" />}
            <div className="h-[20px]">CODE</div>
          </button>
          <button
            type="button"
            className={`text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] ${activeButton === 'graph' ? 'bg-primary_light text-primary_dark' : 'bg-primary hover:bg-primary_dark'} px-[20px] py-[12px] text-white`}
            onClick={navigatePage}
            data-value="graph"
          >
            {activeButton === 'graph' ? <GraphIcon color="#3617B3" /> : <GraphIcon color="#FFFFFF" />}
            <div className="h-[20px]">GRAPH</div>
          </button>
          <button
            type="button"
            className={`text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] ${activeButton === 'memo' ? 'bg-primary_light text-primary_dark' : 'bg-primary hover:bg-primary_dark'} px-[20px] py-[12px] text-white`}
            onClick={navigatePage}
            data-value="memo"
          >
            {activeButton === 'memo' ? <DocsIcon color="#3617B3" /> : <DocsIcon color="#FFFFFF" />}
            <div className="h-[20px]">메모</div>
          </button>
          <button
            type="button"
            className="text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] bg-primary px-[20px] py-[12px] text-white hover:bg-primary_dark"
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
