import { create } from 'zustand';
import { Id } from '../../convex/_generated/dataModel';

interface SectionCreateModalStore {
  pageId: Id<'pages'> | null;
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpen: (pageId: Id<'pages'>) => void;
  onClose: () => void;
}

export const useSectionCreateModal = create<SectionCreateModalStore>((set) => ({
  pageId: null,
  isOpen: false,
  onOpen: (pageId: Id<'pages'>) => set({ isOpen: true, pageId }),
  onClose: () => set({ isOpen: false, pageId: null }),
}));
