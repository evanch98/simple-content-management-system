'use client';

import { PageCreateModal } from '@/components/modals/page-create-modal';
import { PageEditModal } from '@/components/modals/page-edit-modal';
import { ProjectModal } from '@/components/modals/project-modal';
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
    </>
  );
};
