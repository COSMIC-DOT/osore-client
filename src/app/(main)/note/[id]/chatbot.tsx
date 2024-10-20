'use client';

import { useQuery } from '@tanstack/react-query';

import getUserName from '@/apis/auth/get-user-name';
import chatbotStore from '@/stores/chatbot-store';
import CloseIcon from '@/icons/close-icon';
import OsoreDarkIcon from '@/icons/osore-dark-icon';
import SendIcon from '@/icons/send-icon';

function ChatBot() {
  const { data: username } = useQuery({ queryKey: ['username'], queryFn: getUserName });
  const isChatBotOpen = chatbotStore((state: { isOpen: boolean }) => state.isOpen);
  const setIsChatBotOpen = chatbotStore((state: { setIsOpen: (isOpen: boolean) => void }) => state.setIsOpen);

  const closeChatBot = () => {
    setIsChatBotOpen(false);
  };

  if (isChatBotOpen) {
    return (
      <div className="absolute right-0 flex h-[713px] w-[480px] flex-col justify-between rounded-[32px] bg-white p-[20px] shadow-[0_0_30px_0_rgba(0,0,0,0.05)]">
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

        <div className="text-subtitle1 flex h-[221px] w-[440px] flex-col gap-[22px] rounded-[32px] bg-gray1 p-[20px]">
          <div>
            {username}님, <br /> Sore에게 궁금한 것들을 <br /> 물어보세요!
          </div>
          <div className="text-body3 flex flex-col gap-[12px]">
            <div>1. 이 저장소는 어떤 프로그래밍 언어로 작성되었나요?</div>
            <div>2. 코드의 구조나 디렉토리 구조는 어떻게 되어 있나요?</div>
            <div>3. 이 저장소는 어떤 프레임워크나 라이브러리를 사용하나요?</div>
          </div>
        </div>

        <div className="flex h-[52px] w-[440px] items-center gap-[12px]">
          <input
            className="placeholder:text-button flex h-[45px] w-[388px] items-center rounded-[16px] bg-gray1 px-[20px] py-[12px]"
            placeholder="소리에게 물어보기"
          />
          <SendIcon />
        </div>
      </div>
    );
  }
}

export default ChatBot;
