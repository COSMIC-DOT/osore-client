import { create } from 'zustand';

interface SearchStoreType {
  searchWord: string;
  setSearchWord: (word: string) => void;
}

const searchStore = create<SearchStoreType>((set) => ({
  searchWord: '',
  setSearchWord: (searchWord: string) => set({ searchWord }),
}));

export default searchStore;
