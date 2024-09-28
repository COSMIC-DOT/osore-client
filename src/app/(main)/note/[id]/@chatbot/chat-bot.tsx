'use client';

import { useRouter } from 'next/navigation';

import userStore from '@/stores/user-store';
import CloseIcon from '@/icons/close-icon';
import OsoreDarkIcon from '@/icons/osore-dark-icon';
import SendIcon from '@/icons/send-icon';

function ChatBot() {
  const router = useRouter();
  const userName = userStore((state: { name: string }) => state.name);

  const closeChatBot = () => {
    router.back();
  };

  return (
    <div className="flex h-[713px] min-w-[283px] flex-col justify-between rounded-[32px] bg-white p-[20px] shadow-[0_0_30px_0_rgba(0,0,0,0.05)]">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[4px]">
            <OsoreDarkIcon />
            <div className="text-title4">ASK SORE</div>
          </div>
          <button type="button" className="flex h-[25px] w-[25px] items-center justify-center" onClick={closeChatBot}>
            <CloseIcon />
          </button>
        </div>
      </div>

      <div className="text-subtitle1 flex h-[284px] w-[243px] flex-col gap-[22px] rounded-[32px] bg-gray1 p-[20px]">
        <div>
          {userName}님, <br /> Sore에게 궁금한 것들을 물어보세요!
        </div>
        <div className="text-body3 flex flex-col gap-[12px]">
          <div>1. 이 저장소는 어떤 프로그래밍 언어로 작성되었나요?</div>
          <div>2. 코드의 구조나 디렉토리 구조는 어떻게 되어 있나요?</div>
          <div>3. 이 저장소는 어떤 프레임워크나 라이브러리를 사용하나요?</div>
        </div>
      </div>

      <div className="flex h-[52px] w-[392px] items-center gap-[12px]">
        <input
          className="placeholder:text-button flex h-[45px] w-[191px] items-center rounded-[16px] bg-gray1 px-[20px] py-[12px]"
          placeholder="소리에게 물어보기"
        />
        <SendIcon />
      </div>
    </div>
  );
}

export default ChatBot;
