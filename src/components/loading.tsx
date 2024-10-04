import Image from 'next/image';

function Loading() {
  return (
    <div className="absolute left-0 top-0 flex h-[100%] w-[100%] items-center justify-center">
      <Image src="/images/loading.gif" alt="로딩" width={150} height={150} />
    </div>
  );
}

export default Loading;
