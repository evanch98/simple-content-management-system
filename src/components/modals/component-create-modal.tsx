import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { ButtonComponentForm } from '@/components/dashboard/components/button-component-form';
import { useComponentCreateModal } from '@/store/use-component-create-modal';
import { useParams } from 'next/navigation';
import { Id } from '../../../convex/_generated/dataModel';
import { CardComponentForm } from '@/components/dashboard/components/card-component-form';
import { TitleComponentForm } from '@/components/dashboard/components/title-component-form';

export const ComponentCreateModal = () => {
  const params = useParams();
  const { isOpen, onClose, componentType, pageId, sectionId } =
    useComponentCreateModal();

  let dialogContent;

  switch (componentType) {
    case 'Button':
      dialogContent = (
        <ButtonComponentForm
          pageId={pageId!}
          sectionId={sectionId!}
          projectId={params.projectId as Id<'projects'>}
        />
      );
      break;
    case 'Card':
      dialogContent = (
        <CardComponentForm
          pageId={pageId!}
          sectionId={sectionId!}
          projectId={params.projectId as Id<'projects'>}
        />
      );
      break;
    case 'Title':
      dialogContent = (
        <TitleComponentForm
          pageId={pageId!}
          sectionId={sectionId!}
          projectId={params.projectId as Id<'projects'>}
        />
      );
      break;
    default:
      dialogContent = (
        <ButtonComponentForm
          pageId={pageId!}
          sectionId={sectionId!}
          projectId={params.projectId as Id<'projects'>}
        />
      );
  }

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create a new {componentType} component</DialogTitle>
          <DialogDescription>
            Decorate your section with a {componentType} component.
          </DialogDescription>
        </DialogHeader>
        {dialogContent}
      </DialogContent>
    </Dialog>
  );
};
