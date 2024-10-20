import { create } from 'zustand';

interface ChatbotStoreType {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const chatbotStore = create<ChatbotStoreType>((set) => ({
  isOpen: false,
  setIsOpen: (isOpen: boolean) => set({ isOpen }),
}));

export default chatbotStore;
