import { create } from 'zustand';

import Notetype from '@/types/note-type';

interface SearchStoreType {
  searchWord: string;
  setSearchWord: (word: string) => void;
  searchedNotes: Notetype[];
  setSearchedNotes: (notes: Notetype[]) => void;
}

const searchStore = create<SearchStoreType>((set) => ({
  searchWord: '',
  setSearchWord: (searchWord: string) => set({ searchWord }),
  searchedNotes: [],
  setSearchedNotes: (searchedNotes: Notetype[]) => set({ searchedNotes }),
}));

export default searchStore;
