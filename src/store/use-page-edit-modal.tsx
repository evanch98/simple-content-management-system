import { create } from 'zustand';

interface PageEditModalStore {
  title: string;
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpen: (title: string) => void;
  onClose: () => void;
}

export const usePageEditModal = create<PageEditModalStore>((set) => ({
  title: '',
  isOpen: false,
  onOpen: (title: string) => set({ isOpen: true, title }),
  onClose: () => set({ isOpen: false, title: '' }),
}));
