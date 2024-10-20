/* eslint-disable no-unused-vars */
import { create } from 'zustand';
import { Id } from '../../convex/_generated/dataModel';
import { ComponentType } from '@/types';

interface ComponentCreateModalStore {
  sectionId: Id<'sections'> | undefined;
  pageId: Id<'pages'> | undefined;
  componentType: ComponentType | undefined;
  isOpen: boolean;
  onOpen: (
    sectionId: Id<'sections'>,
    pageId: Id<'pages'>,
    componentType: ComponentType,
  ) => void;
  onClose: () => void;
}

export const useComponentCreateModal = create<ComponentCreateModalStore>(
  (set) => ({
    sectionId: undefined,
    pageId: undefined,
    componentType: undefined,
    isOpen: false,
    onOpen: (
      sectionId: Id<'sections'>,
      pageId: Id<'pages'>,
      componentType: ComponentType,
    ) => set({ isOpen: true, sectionId, pageId, componentType }),
    onClose: () =>
      set({
        isOpen: false,
        sectionId: undefined,
        pageId: undefined,
        componentType: undefined,
      }),
  }),
);
