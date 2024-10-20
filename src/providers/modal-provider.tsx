'use client';

import { ComponentCreateModal } from '@/components/modals/component-create-modal';
import { PageCreateModal } from '@/components/modals/page-create-modal';
import { PageEditModal } from '@/components/modals/page-edit-modal';
import { ProjectModal } from '@/components/modals/project-modal';
import { SectionCreateModal } from '@/components/modals/section-create-modal';
import { SectionEditModal } from '@/components/modals/section-edit-modal';
import { useEffect, useState } from 'react';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <ProjectModal />
      <PageCreateModal />
      <PageEditModal />
      <SectionCreateModal />
      <SectionEditModal />
      <ComponentCreateModal />
    </>
  );
};
