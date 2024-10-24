'use client';

import { useEffect, useState } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';

import selectedFileStore from '@/stores/selected-file-store';
import chatbotStore from '@/stores/chatbot-store';
import BranchIcon2 from '@/icons/branch-icon-2';
import CodeIcon from '@/icons/code-icon';
import DocsIcon from '@/icons/docs-icon';
import GraphIcon from '@/icons/graph-icon';
import OsoreWhiteIcon from '@/icons/osore-white-icon';
import OsorePrimaryIcon from '@/icons/osore-primary-icon';
import { useQuery } from '@tanstack/react-query';
import getFile from '@/apis/file/get-file';
import getNoteInfo from '@/apis/note/getNoteInfo';

function Navigation() {
  const router = useRouter();
  const { id } = useParams();
  const pathname = usePathname();
  const [activeButton, setActiveButton] = useState(pathname.split('/')[3]);
  const [codeHover, setCodeHover] = useState(false);
  const [graphHover, setGraphHover] = useState(false);
  const [memoHover, setMemoHover] = useState(false);
  const [chatBotHover, setChatBotHover] = useState(false);
  const selectedFileId = selectedFileStore((state: { id: number }) => state.id);
  const isChatBotOpen = chatbotStore((state: { isOpen: boolean }) => state.isOpen);
  const setIsChatBotOpen = chatbotStore((state: { setIsOpen: (isOpen: boolean) => void }) => state.setIsOpen);

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
    setIsChatBotOpen(!isChatBotOpen);
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
          <div className="h-[22px]">{noteInfo?.branch}</div>
        </div>
      </div>

      <div className="flex h-[48px] items-center justify-between">
        <div className="text-subtitle1">{fileInfo?.path}</div>
        <div className="flex h-[48px] w-[540px] gap-[12px]">
          <button
            type="button"
            className={`text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] ${activeButton === 'code' ? 'bg-primary text-white' : 'bg-primary_light text-primary'} px-[20px] py-[12px] hover:bg-primary_dark hover:text-white`}
            onClick={navigatePage}
            onMouseOver={() => {
              setCodeHover(true);
            }}
            onFocus={() => {
              setCodeHover(true);
            }}
            onMouseLeave={() => {
              setCodeHover(false);
            }}
            data-value="code"
          >
            {activeButton === 'code' || codeHover ? <CodeIcon color="#FFFFFF" /> : <CodeIcon color="#4E60FF" />}
            <div className="h-[20px]">CODE</div>
          </button>
          <button
            type="button"
            className={`text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] ${activeButton === 'graph' ? 'bg-primary text-white' : 'bg-primary_light text-primary'} px-[20px] py-[12px] hover:bg-primary_dark hover:text-white`}
            onClick={navigatePage}
            onMouseOver={() => {
              setGraphHover(true);
            }}
            onFocus={() => {
              setGraphHover(true);
            }}
            onMouseLeave={() => {
              setGraphHover(false);
            }}
            data-value="graph"
          >
            {activeButton === 'graph' || graphHover ? <GraphIcon color="#FFFFFF" /> : <GraphIcon color="#4E60FF" />}
            <div className="h-[20px]">GRAPH</div>
          </button>
          <button
            type="button"
            className={`text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] ${activeButton === 'memo' ? 'bg-primary text-white' : 'bg-primary_light text-primary'} px-[20px] py-[12px] hover:bg-primary_dark hover:text-white`}
            onClick={navigatePage}
            onMouseOver={() => {
              setMemoHover(true);
            }}
            onFocus={() => {
              setMemoHover(true);
            }}
            onMouseLeave={() => {
              setMemoHover(false);
            }}
            data-value="memo"
          >
            {activeButton === 'memo' || memoHover ? <DocsIcon color="#FFFFFF" /> : <DocsIcon color="#4E60FF" />}
            <div className="h-[20px]">메모</div>
          </button>
          <button
            type="button"
            className={`text-button ${isChatBotOpen ? 'bg-primary text-white' : 'bg-primary_light text-primary'} flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] px-[20px] py-[12px] hover:bg-primary_dark hover:text-white`}
            onClick={askChatBot}
            onMouseOver={() => {
              setChatBotHover(true);
            }}
            onFocus={() => {
              setChatBotHover(true);
            }}
            onMouseLeave={() => {
              setChatBotHover(false);
            }}
          >
            {isChatBotOpen || chatBotHover ? <OsoreWhiteIcon /> : <OsorePrimaryIcon />}

            <div className="h-[20px]">ASK 소리</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
