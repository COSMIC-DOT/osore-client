'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';

import fileStore from '@/stores/file-store';
import ArrowDropRightIcon from '@/icons/arrow-dropright-icon';
import CloseFolderIcon from '@/icons/close-folder-icon';
import FileIcon from '@/icons/file-icon';
import ArrowDropdownIcon from '@/icons/arrow-dropdown-icon';
import OpenFolderIcon from '@/icons/open-folder-icon';

interface FileType {
  id: number;
  children: FileType[];
  extension?: string;
  name?: string;
  type?: string;
  isOpen?: boolean;
}

function Explorer({ rootFile }: { rootFile: FileType | null }) {
  const { id } = useParams();
  const [fileList, setFileList] = useState(rootFile);
  const folderRef = useRef<HTMLDivElement | null>(null);
  const setFilepath = fileStore((state: { setPath: (path: string) => void }) => state.setPath);
  const setFileContent = fileStore((state: { setContent: (content: string) => void }) => state.setContent);
  const setFileLanguage = fileStore((state: { setLanguage: (langauge: string) => void }) => state.setLanguage);

  const openFile = async (fileId: string) => {
    try {
      const response = await fetch(`/api/files/${fileId}?noteId=${id}`, {
        method: 'GET',
      });

      const { content, language, path } = await response.json();

      setFileContent(content);
      setFileLanguage(language);
      setFilepath(path);
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Error: ', error);
    }
  };

  useEffect(() => {
    if (
      rootFile?.children.some(
        (child) => (child.name === 'README' || child.name === 'readme') && child.extension === 'md',
      )
    ) {
      openFile('README.md');
    } else {
      setFileContent('');
      setFileLanguage('');
      setFilepath('');
    }
  }, []);

  const toggleFolder = (child: FileType) => {
    const toggleChild = (item: FileType): FileType => {
      if (item === child) {
        return { ...item, isOpen: !item.isOpen };
      }

      if (item.children) {
        return {
          ...item,
          children: item.children.map(toggleChild),
        };
      }

      return item;
    };

    if (fileList) {
      const newFileList = toggleChild(fileList);
      setFileList(newFileList);
    }
  };

  function createFileTree(list: FileType | null) {
    return list?.children.map((child: FileType) => (
      <div>
        {child.type === 'file' ? (
          <div className="flex h-[32px] items-center gap-[8px] rounded-[12px] pl-[24px] hover:bg-gray1">
            <FileIcon />
            <div
              className="text-body2 w-[calc(100%-8px)] truncate"
              data-value={child.id}
              onClick={(event) => {
                const fileId = event.currentTarget.getAttribute('data-value') || '';
                openFile(fileId);
              }}
              onKeyDown={(event) => {
                const fileId = event.currentTarget.getAttribute('data-value') || '';
                openFile(fileId);
              }}
              role="button"
              tabIndex={0}
            >
              {child.name}.{child.extension}
            </div>
          </div>
        ) : (
          <div>
            {child.isOpen ? (
              <div>
                <div
                  className="text-body2 flex h-[32px] select-none items-center gap-[8px] rounded-[12px] hover:bg-gray1"
                  ref={folderRef}
                  onClick={() => {
                    toggleFolder(child);
                  }}
                  onKeyDown={() => {
                    toggleFolder(child);
                  }}
                  role="button"
                  tabIndex={0}
                >
                  <div className="flex">
                    <ArrowDropdownIcon />
                    <OpenFolderIcon />
                  </div>
                  <div className="text-body2 w-[calc(100%-8px)] truncate">{child.name}</div>
                </div>
                <div className="pl-[24px]">{createFileTree(child)}</div>
              </div>
            ) : (
              <div
                className="text-body2 flex h-[32px] select-none items-center gap-[8px] rounded-[12px] hover:bg-gray1"
                ref={folderRef}
                onClick={() => {
                  toggleFolder(child);
                }}
                onKeyDown={() => {
                  toggleFolder(child);
                }}
                role="button"
                tabIndex={0}
              >
                <div className="flex">
                  <ArrowDropRightIcon />
                  <CloseFolderIcon />
                </div>
                <div className="text-body2 w-[calc(100%-8px)] truncate">{child.name}</div>
              </div>
            )}
          </div>
        )}
      </div>
    ));
  }

  return (
    <div className="flex h-[713px] min-w-[252px] max-w-[252px] flex-col gap-[4px] overflow-y-scroll rounded-[28px] bg-white p-[20px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] scrollbar-hide">
      {createFileTree(fileList)}
    </div>
  );
}
export default Explorer;
