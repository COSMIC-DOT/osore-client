import { create } from 'zustand';

interface FileStoreType {
  id: number;
  setId: (id: number) => void;
  path: string;
  setPath: (path: string) => void;
  content: string;
  setContent: (content: string) => void;
  language: string;
  setLanguage: (language: string) => void;
}

const fileStore = create<FileStoreType>((set) => ({
  id: 0,
  setId: (id) => set({ id }),
  path: '',
  setPath: (path) => set({ path }),
  content: '',
  setContent: (content) => set({ content }),
  language: '',
  setLanguage: (language) => set({ language }),
}));

export default fileStore;
