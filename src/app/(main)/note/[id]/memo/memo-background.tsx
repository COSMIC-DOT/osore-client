import Image from 'next/image';

function MemoBackground({ memoList, selectedMemoId }: { memoList: string[]; selectedMemoId: string }) {
  return (
    <div className="absolute left-0 top-0 h-[717px] w-[1012px]">
      {memoList.map(
        (memo, index) =>
          index !== 8 && (
            <Image
              className={`absolute left-0 top-0 ${memo.toString() === selectedMemoId && 'drop-shadow-[0_0_30px_rgba(0,0,0,0.05)]'}`}
              src={`/images/memo-${index}.png`}
              alt="메모"
              height={717}
              width={1012}
              style={memo.toString() === selectedMemoId ? { zIndex: 1 } : { zIndex: -index }}
            />
          ),
      )}
      {memoList.length === 9 ? (
        <Image
          className={`absolute left-0 top-0 ${memoList[8].toString() === selectedMemoId && 'drop-shadow-[0_0_30px_rgba(0,0,0,0.05)]'}`}
          src="/images/memo-8.png"
          alt="메모"
          height={717}
          width={1012}
          style={memoList[8].toString() === selectedMemoId ? { zIndex: 1 } : { zIndex: -8 }}
        />
      ) : (
        <Image
          className="absolute left-0 top-0"
          src="/images/memo-8.png"
          alt="메모"
          height={717}
          width={1012}
          style={{ zIndex: -8 }}
        />
      )}
    </div>
  );
}

export default MemoBackground;
