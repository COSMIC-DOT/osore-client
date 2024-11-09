'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';

import getFileList from '@/apis/file/get-file-list';
import selectedFileStore from '@/stores/selected-file-store';
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

function Explorer() {
  const router = useRouter();
  const { id } = useParams();
  const [fileList, setFileList] = useState<FileType>();
  const folderRef = useRef<HTMLDivElement | null>(null);
  const setSelectedFileId = selectedFileStore((state: { setId: (id: number) => void }) => state.setId);
  const { data: rootFileList } = useQuery<FileType>({
    queryKey: ['fileList', id],
    queryFn: () => getFileList(+id),
  });

  const openFile = (event: React.MouseEvent<HTMLDivElement> | React.KeyboardEvent<HTMLDivElement>) => {
    const fileId = event.currentTarget.getAttribute('data-value') || '';
    setSelectedFileId(+fileId);
    router.push(`/note/${id}/code/${fileId}`);
  };

  console.log(rootFileList);

  useEffect(() => {
    if (rootFileList) {
      setFileList(rootFileList);
      const isReadme = rootFileList.children.some((child) => child.name === 'README' || child.name === 'readme');

      if (!isReadme) {
        router.replace(`/note/${id}`);
      } else {
        rootFileList.children.forEach((child) => {
          if (child.name === 'README' || child.name === 'readme') {
            router.replace(`/note/${id}/code/${child.id.toString()}`);
            setSelectedFileId(child.id);
          }
        });
      }
    }
  }, [rootFileList]);

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

  function createFileTree(list: FileType | undefined) {
    return list?.children.map((child: FileType) => (
      <div>
        {child.type === 'file' ? (
          <div className="flex h-[32px] w-[210px] min-w-[210px] items-center gap-[8px] rounded-[12px] pl-[24px] hover:bg-gray1">
            <div className="min-w-[24px]">
              <FileIcon />
            </div>
            <div
              className="text-body2 truncate"
              data-value={child.id}
              onClick={openFile}
              onKeyDown={openFile}
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
                  className="text-body2 flex h-[32px] w-[210px] min-w-[210px] select-none items-center gap-[8px] rounded-[12px] hover:bg-gray1"
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
                  <div className="text-body2 truncate">{child.name}</div>
                </div>
                <div className="pl-[24px]">{createFileTree(child)}</div>
              </div>
            ) : (
              <div
                className="text-body2 flex h-[32px] w-[210px] min-w-[210px] select-none items-center gap-[8px] rounded-[12px] hover:bg-gray1"
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
                <div className="text-body2 truncate">{child.name}</div>
              </div>
            )}
          </div>
        )}
      </div>
    ));
  }

  return (
    <div className="mr-[12px] flex h-[717px] min-w-[252px] max-w-[252px] flex-col gap-[4px] overflow-scroll rounded-[28px] bg-white p-[20px] shadow-[0px_0px_30px_0px_rgba(0,0,0,0.05)] scrollbar-hide">
      {createFileTree(fileList)}
    </div>
  );
}
export default Explorer;
