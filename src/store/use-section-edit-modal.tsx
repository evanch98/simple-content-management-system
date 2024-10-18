import { create } from 'zustand';

interface SectionEditModalStore {
  name: string;
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpen: (title: string) => void;
  onClose: () => void;
}

export const useSectionEditModal = create<SectionEditModalStore>((set) => ({
  name: '',
  isOpen: false,
  onOpen: (name: string) => set({ isOpen: true, name }),
  onClose: () => set({ isOpen: false, name: '' }),
}));
