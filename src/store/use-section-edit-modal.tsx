import { create } from 'zustand';
import { Id } from '../../convex/_generated/dataModel';

interface SectionEditModalStore {
  name: string;
  id: Id<'sections'> | undefined;
  isOpen: boolean;
  // eslint-disable-next-line no-unused-vars
  onOpen: (title: string, id: Id<'sections'>) => void;
  onClose: () => void;
}

export const useSectionEditModal = create<SectionEditModalStore>((set) => ({
  name: '',
  id: undefined,
  isOpen: false,
  onOpen: (name: string, id: Id<'sections'>) => set({ isOpen: true, name, id }),
  onClose: () => set({ isOpen: false, name: '', id: undefined }),
}));
