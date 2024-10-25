'use client';

import { useParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import getMemoList from '@/apis/memo/get-memo-list';
import PlusIcon from '@/icons/plus-icon';
import PencilIcon from '@/icons/pencil-icon';
import { useEffect, useState } from 'react';
import createMemo from '@/apis/memo/create-memo';

function Memo() {
  const queryClient = useQueryClient();
  const { id }: { id: string } = useParams();
  const [selectedMemoId, setSelectedMemoId] = useState<string>('');
  const { data: memoList } = useQuery({
    queryKey: ['memoList', id],
    queryFn: () => getMemoList(+id),
  });

  useEffect(() => {
    if (selectedMemoId === '' && memoList) {
      setSelectedMemoId(memoList[0].toString());
    }
  }, [memoList]);

  const selectMemo = (event: React.MouseEvent<HTMLButtonElement>) => {
    const memoId = event.currentTarget.getAttribute('data-memoid') || '';
    setSelectedMemoId(memoId);
  };

  const { mutate } = useMutation({
    mutationFn: () => createMemo(+id),
    onSuccess: (data) => {
      queryClient.setQueryData(['memoList', id], data);
      // setSelectedMemoId(data[])
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('Error: ', error);
    },
  });

  return (
    <div className="flex h-[717px] w-[1012px] flex-col bg-white px-[24px] pb-[24px] pt-[12px]">
      <div className="flex">
        <div className="flex h-[32px] w-[904px] gap-[53px]">
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
          <button type="button" className="flex h-[32px] w-[60px] justify-center" onClick={() => mutate()}>
            <div className="text-subtitle1 flex h-[32px] w-[32px] items-center justify-center rounded-[12px] bg-secondary text-white">
              <PlusIcon />
            </div>
          </button>
        )}
      </div>
      <div className="mb-[20px] mt-[24px] h-[553px] w-[964px] border border-primary">{selectedMemoId}</div>
      <div className="flex h-[48px] w-[964px] justify-end ">
        <button
          type="button"
          className="text-button flex h-[48px] w-[120px] items-center gap-[8px] rounded-[16px] bg-primary px-[20px] py-[12px] text-white"
        >
          <PencilIcon />
          <div className="h-[20px]">수정하기</div>
        </button>
      </div>
    </div>
  );
}

export default Memo;
