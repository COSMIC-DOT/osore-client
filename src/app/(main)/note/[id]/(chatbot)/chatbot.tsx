'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import ChatRoom from '@/app/(main)/note/[id]/(chatbot)/chat-room';
import ChatRoomList from '@/app/(main)/note/[id]/(chatbot)/chat-room-list';
import getChatRoomList from '@/apis/chat/get-chat-room-list';
import chatbotStore from '@/stores/chatbot-store';
import CloseIcon from '@/icons/close-icon';
import OsoreDarkIcon from '@/icons/osore-dark-icon';
import TimerIcon from '@/icons/timer-icon';
import PlusIcon from '@/icons/plus-icon';
import createChatRoom from '@/apis/chat/create-chat-room';
import Loading from '@/components/loading';

function ChatBot() {
  const { id }: { id: string } = useParams();
  const queryClient = useQueryClient();
  const { data: chatRoomList } = useQuery({ queryKey: ['chatRoomList', id], queryFn: () => getChatRoomList(id) });
  const isChatBotOpen = chatbotStore((state: { isOpen: boolean }) => state.isOpen);
  const setIsChatBotOpen = chatbotStore((state: { setIsOpen: (isOpen: boolean) => void }) => state.setIsOpen);
  const [isChatBotRender, setIsChatBotRender] = useState(isChatBotOpen);
  const [isAnimaitionStart, setIsAnimaitionStart] = useState(false);
  const [isChatRoom, setIsChatRoom] = useState(true);
  const [selectedChatRoomId, setSelectedChatRoomId] = useState(chatRoomList?.[0]?.id || null);

  useEffect(() => {
    if (!selectedChatRoomId) {
      setSelectedChatRoomId(chatRoomList?.[0]?.chatRoomId || null);
    }
  }, [chatRoomList]);

  const closeChatBot = () => {
    setIsChatBotOpen(false);
  };

  useEffect(() => {
    setIsChatRoom(true);
  }, [isChatBotOpen]);

  const { mutate: handleCreateRoom, isPending } = useMutation({
    mutationFn: () => createChatRoom(id),
    onSuccess: (data) => {
      queryClient.setQueryData(['chatRoomList', id], data.chattingRoomList);
      setSelectedChatRoomId(data.chatRoomId);
    },
    onError: (error) => {
      // eslint-disable-next-line no-console
      console.error('Error: ', error);
    },
  });

  useEffect(() => {
    if (isChatBotOpen) {
      setIsChatBotRender(true);
      setTimeout(() => {
        setIsAnimaitionStart(true);
      }, 100);
    } else {
      setIsAnimaitionStart(false);
      setTimeout(() => {
        setIsChatBotRender(false);
      }, 500);
    }
  }, [isChatBotOpen]);

  return (
    isChatBotRender && (
      <div
        className={`chat-bot-backdrop ${isAnimaitionStart && 'chat-bot-open'} absolute right-0 flex h-[717px] w-[480px] flex-col gap-[12px] rounded-[32px] bg-white p-[20px] shadow-[0_0_30px_0_rgba(0,0,0,0.05)]`}
      >
        {isPending && <Loading />}
        <div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-[8px]">
              <div className="flex items-center gap-[4px]">
                <OsoreDarkIcon />
                <div className="text-title4">ASK SORE</div>
              </div>
              <button type="button" onClick={() => setIsChatRoom(!isChatRoom)}>
                <TimerIcon />
              </button>
              <button
                type="button"
                onClick={() => {
                  handleCreateRoom();
                }}
                className="h-[32px] w-[32px] rounded-[8px] bg-secondary p-[4px]"
              >
                <PlusIcon />
              </button>
            </div>
            <button type="button" className="flex h-[25px] w-[25px] items-center justify-center" onClick={closeChatBot}>
              <CloseIcon />
            </button>
          </div>
        </div>
        {isChatRoom ? (
          <ChatRoom selectedChatRoomId={selectedChatRoomId} />
        ) : (
          <ChatRoomList
            selectedChatRoomId={selectedChatRoomId}
            setIsChatRoom={setIsChatRoom}
            setSelectedChatRoomId={setSelectedChatRoomId}
          />
        )}
      </div>
    )
  );
}

export default ChatBot;
