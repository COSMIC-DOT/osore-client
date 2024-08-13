import { create } from 'zustand';

import Notetype from '@/types/note-type';

interface NoteStoreType {
  notes: Notetype[];
  setNotes: (notes: Notetype[]) => void;
  searchedNotes: Notetype[];
  setSearchedNotes: (notes: Notetype[]) => void;
}

const noteStore = create<NoteStoreType>((set) => ({
  notes: [],
  setNotes: (notes: Notetype[]) => set({ notes }),
  searchedNotes: [],
  setSearchedNotes: (searchedNotes: Notetype[]) => set({ searchedNotes }),
}));

export default noteStore;
