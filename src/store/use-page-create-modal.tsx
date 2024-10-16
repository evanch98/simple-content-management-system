import { create } from 'zustand';

interface PageCreateModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

export const usePageCreateModal = create<PageCreateModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
