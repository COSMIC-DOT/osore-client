import { create } from 'zustand';

interface FileStoreType {
  id: number;
  setId: (id: number) => void;
}

const selectedFileStore = create<FileStoreType>((set) => ({
  id: 0,
  setId: (id) => set({ id }),
}));

export default selectedFileStore;
