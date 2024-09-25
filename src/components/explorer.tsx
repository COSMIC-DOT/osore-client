'use client';

import { useRef, useState } from 'react';

import ArrowDropRightIcon from '@/icons/arrow-dropright-icon';
import CloseFolderIcon from '@/icons/close-folder-icon';
import FileIcon from '@/icons/file-icon';
import ArrowDropdownIcon from '@/icons/arrow-dropdown-icon';
import OpenFolderIcon from '@/icons/open-folder-icon';

interface FileType {
  children: FileType[];
  extension?: string;
  name?: string;
  type?: string;
  isOpen?: boolean;
}

function Explorer({ rootFile }: { rootFile: FileType | null }) {
  const [fileList, setFileList] = useState(rootFile);
  const folderRef = useRef<HTMLDivElement | null>(null);

  const openFile = () => {
    // TODO: 파일 열기
  };

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
          <div className="flex gap-[8px] pl-[24px]" onClick={openFile} onKeyDown={openFile} role="button" tabIndex={0}>
            <FileIcon />
            <div className="text-body2 w-[calc(100%-8px)] truncate">
              {child.name}.{child.extension}
            </div>
          </div>
        ) : (
          <div>
            {child.isOpen ? (
              <div>
                <div
                  className="text-body2 flex select-none gap-[8px]"
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
                className="text-body2 flex select-none gap-[8px]"
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
    <div className="h-[684px] min-w-[285px] max-w-[285px] overflow-y-scroll border p-[12px]">
      {createFileTree(fileList)}
    </div>
  );
}
export default Explorer;
