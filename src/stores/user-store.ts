import { create } from 'zustand';

interface UserStoreType {
  name: string;
  setName: (name: string) => void;
}

const userStore = create<UserStoreType>((set) => ({
  name: '',
  setName: (name) => set({ name }),
}));

export default userStore;
