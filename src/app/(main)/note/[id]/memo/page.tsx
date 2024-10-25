'use client';

import { useEffect, useRef, useState } from 'react';
import { useParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';

import getMemoList from '@/apis/memo/get-memo-list';
import getMemo from '@/apis/memo/get-memo';
import createMemo from '@/apis/memo/create-memo';
import PlusIcon from '@/icons/plus-icon';
import PencilIcon from '@/icons/pencil-icon';
import editMemo from '@/apis/memo/edit-memo';
import MemoBackground from '@/app/(main)/note/[id]/memo/memo-background';

function Memo() {
  const queryClient = useQueryClient();
  const { id }: { id: string } = useParams();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [selectedMemoId, setSelectedMemoId] = useState<string>('');
  const [memo, setMemo] = useState('');
  const [isEditing, setIsEditing] = useState(false);
  const [editedMemo, setEditedMemo] = useState('');
  const { data: memoList } = useQuery({
    queryKey: ['memoList', id],
    queryFn: () => getMemoList(+id),
  });

  useEffect(() => {
    setEditedMemo(memo);
  }, [memo]);

  const { mutate: handleGetMemo } = useMutation({
    mutationFn: async (memoId: string) => {
      const cachedData = queryClient.getQueryData(['memo', memoId]);
      if (cachedData) {
        return cachedData; // 캐시된 데이터를 반환
      }
      const data = await getMemo(memoId);
      return data;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(['memo', selectedMemoId], data);
      setMemo(data);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('Error: ', error);
    },
  });

  useEffect(() => {
    if (selectedMemoId === '' && memoList) {
      setSelectedMemoId(memoList[0].toString());
      handleGetMemo(memoList[0].toString());
    }
  }, [memoList]);

  const selectMemo = (event: React.MouseEvent<HTMLButtonElement>) => {
    const memoId = event.currentTarget.getAttribute('data-memoid') || '';
    setSelectedMemoId(memoId);
    handleGetMemo(memoId);
    setIsEditing(false);
  };

  const { mutate: handleCreateMemo } = useMutation({
    mutationFn: () => createMemo(+id),
    onSuccess: (data) => {
      queryClient.setQueryData(['memoList', id], data);
      setSelectedMemoId(data[data.length - 1].toString());
      handleGetMemo(data[data.length - 1].toString());
      setIsEditing(false);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('Error: ', error);
    },
  });

  const { mutate: handleEditMemo } = useMutation({
    mutationFn: () => editMemo(selectedMemoId, editedMemo),
    onSuccess: () => {
      queryClient.setQueryData(['memo', selectedMemoId], editedMemo);
      setMemo(textAreaRef.current?.value || '');
      setIsEditing(false);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('Error: ', error);
    },
  });

  const handleEditButton = () => {
    if (!isEditing) {
      setIsEditing(true);
    } else {
      handleEditMemo();
    }
  };

  useEffect(() => {
    if (isEditing && textAreaRef.current) {
      textAreaRef.current.focus();
      textAreaRef.current.setSelectionRange(textAreaRef.current.value.length, textAreaRef.current.value.length);
    }
  }, [isEditing]);

  return (
    <div className="relative flex h-[717px] w-[1012px] flex-col px-[24px] pb-[24px] pt-[12px]">
      <MemoBackground memoList={memoList || []} selectedMemoId={selectedMemoId} />
      <div className="z-10 flex ">
        <div className="flex h-[32px] w-[900px] gap-[52px]">
          {memoList?.map(
            (memoId: string, index: number) =>
              index !== 8 && (
                <button
                  type="button"
                  data-memoid={memoId}
                  className="flex h-[32px] w-[60px] justify-center"
                  onClick={selectMemo}
                >
                  <div
                    className={`${memoId.toString() === selectedMemoId ? 'bg-secondary_dark text-white' : 'bg-secondary_light text-secondary_dark'} text-subtitle1 flex h-[32px] w-[32px] items-center justify-center rounded-[12px]`}
                  >
                    {index + 1}
                  </div>
                </button>
              ),
          )}
        </div>
        {memoList?.length === 9 ? (
          <button
            type="button"
            data-memoid={memoList[8]}
            className="flex h-[32px] w-[60px] justify-center"
            onClick={selectMemo}
          >
            <div
              className={`${memoList[8].toString() === selectedMemoId ? 'bg-secondary_dark text-white' : 'bg-secondary_light text-secondary_dark'} text-subtitle1 flex h-[32px] w-[32px] items-center justify-center rounded-[12px]`}
            >
              9
            </div>
          </button>
        ) : (
          <button type="button" className="flex h-[32px] w-[60px] justify-center" onClick={() => handleCreateMemo()}>
            <div className="text-subtitle1 flex h-[32px] w-[32px] items-center justify-center rounded-[12px] bg-secondary text-white">
              <PlusIcon />
            </div>
          </button>
        )}
      </div>
      {isEditing ? (
        <textarea
          ref={textAreaRef}
          value={editedMemo}
          className="text-body1 z-10 mb-[20px] mt-[24px] h-[553px] w-[964px] resize-none  border border-secondary_light p-[12px] outline-secondary"
          onChange={(event) => setEditedMemo(event.target.value)}
        />
      ) : (
        <div className="z-10 mb-[20px] mt-[24px] h-[553px] w-[964px]">
          <ReactMarkdown rehypePlugins={[rehypeHighlight, rehypeRaw]}>{memo}</ReactMarkdown>
        </div>
      )}
      <div className="z-10 flex h-[48px] w-[964px] justify-end ">
        <button
          type="button"
          className="text-button flex h-[48px] w-[120px] items-center gap-[8px] rounded-[16px] bg-primary px-[20px] py-[12px] text-white hover:bg-primary_dark"
          onClick={handleEditButton}
        >
          <PencilIcon />
          <div className="h-[20px]">수정하기</div>
        </button>
      </div>
    </div>
  );
}

export default Memo;
