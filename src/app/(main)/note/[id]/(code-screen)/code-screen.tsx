'use client';

import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import ArrowDropRightIcon from '@/icons/arrow-dropright-icon';
import CloseFolderIcon from '@/icons/close-folder-icon';
import FileIcon from '@/icons/file-icon';

interface FileType {
  children: [];
  extension?: string;
  name: string;
  type: string;
}

function CodeScreen() {
  const { id } = useParams();
  const [fileList, setFileList] = useState<FileType>();

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch(`/api/files?noteId=${id}`, {
          method: 'GET',
        });
        const data = await response.json();
        setFileList(data);
      } catch (error) {
        // eslint-disable-next-line
        console.error(error);
      }
    })();
  }, [id, setFileList]);

  const openFile = () => {
    // TODO: 파일 열기
  };

  const openFolder = () => {
    // TODO: 파일 열기
  };

  return (
    <div className="mt-[29px] flex gap-[20px] px-[80px]">
      <div className="h-[684px] w-[285px] border p-[12px]">
        {fileList?.children.map((child: FileType) => (
          <div>
            {child.type === 'file' ? (
              <div
                className="text-body2 flex gap-[8px] pl-[24px]"
                onClick={openFile}
                onKeyDown={openFile}
                role="button"
                tabIndex={0}
              >
                <FileIcon />
                {child.name}.{child.extension}
              </div>
            ) : (
              <div
                className="text-body2 flex gap-[8px]"
                onClick={openFolder}
                onKeyDown={openFolder}
                role="button"
                tabIndex={0}
              >
                <div className="flex">
                  <ArrowDropRightIcon />
                  <CloseFolderIcon />
                </div>
                {child.name}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className="h-[696px] w-full bg-[#D9D9D9]" />
    </div>
  );
}

export default CodeScreen;
