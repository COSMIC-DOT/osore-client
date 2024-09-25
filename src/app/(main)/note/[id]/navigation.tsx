'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import BranchIcon2 from '@/icons/branch-icon-2';
import CodeIcon from '@/icons/code-icon';
import DocsIcon from '@/icons/docs-icon';
import GraphIcon from '@/icons/graph-icon';
import OsoreIcon from '@/icons/osore-icon';
import TagIcon2 from '@/icons/tag-icon-2';

function Navigation() {
  const router = useRouter();
  const { id } = useParams();
  const [noteInfo, setNoteInfo] = useState({ title: '', version: '', branch: '', repository: '' });

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/note?noteId=${id}`, {
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

  return (
    <div className="mt-[40px] flex h-[112px] flex-col gap-[24px] px-[80px]">
      <div className="flex h-[40px] items-center gap-[20px]">
        <div className="text-title3">{noteInfo.title}</div>
        <div className="text-body2 text-gray2">|</div>
        <div className="text-subtitle1 text-gray4">{noteInfo.repository}</div>
        <div className="text-body2 text-gray2">|</div>
        <div className="flex gap-[12px]">
          <div className="text-subtitle1 flex h-[40px] items-center gap-[4px] rounded-[20px] bg-gray1  px-[16px] text-gray4">
            <TagIcon2 />
            <div className="h-[20px]">{noteInfo.version}</div>
          </div>
          <div className="text-subtitle1 flex h-[40px] items-center gap-[4px] rounded-[20px] bg-gray1  px-[16px] text-gray4">
            <BranchIcon2 />
            <div className="h-[20px]">{noteInfo.branch}</div>
          </div>
        </div>
      </div>

      <div className="flex h-[48px] items-center justify-between">
        <div className="text-subtitle1">/hello/my/name/is.md</div>
        <div className="flex h-[48px] w-[540px] gap-[12px]">
          <button
            type="button"
            className="text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] bg-secondary px-[20px] py-[12px] text-white hover:bg-secondary_dark"
            onClick={() => router.push(`/note/${id}/code`)}
          >
            <CodeIcon />
            <div className="h-[18px]">CODE</div>
          </button>
          <button
            type="button"
            className="text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] bg-secondary px-[20px] py-[12px] text-white hover:bg-secondary_dark"
            onClick={() => router.push(`/note/${id}/graph`)}
          >
            <GraphIcon />
            <div className="h-[18px]">GRAPH</div>
          </button>
          <button
            type="button"
            className="text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] bg-secondary px-[20px] py-[12px] text-white hover:bg-secondary_dark"
            onClick={() => router.push(`/note/${id}/memo`)}
          >
            <DocsIcon />
            <div className="h-[18px]">메모</div>
          </button>
          <button
            type="button"
            className="text-button flex w-[126px] items-center justify-center gap-[8px] rounded-[16px] bg-secondary px-[20px] py-[12px] text-white hover:bg-secondary_dark"
          >
            <OsoreIcon />
            <div className="h-[18px]">ASK 소리</div>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Navigation;
