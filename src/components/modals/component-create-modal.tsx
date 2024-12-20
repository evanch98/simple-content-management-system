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
import { TextBlockComponentForm } from '../dashboard/components/text-block-component-form';
import { ImageComponentForm } from '../dashboard/components/image-component-form';
import { BadgeComponentForm } from '../dashboard/components/badge-component-form';
import { LinkComponentForm } from '../dashboard/components/link-component-form';
import { TextComponentForm } from '../dashboard/components/text-component-form';

export interface FormProps {
  pageId: Id<'pages'>;
  sectionId: Id<'sections'>;
  projectId: Id<'projects'>;
  isEditing?: boolean;
}

export const ComponentCreateModal = () => {
  const params = useParams();
  const { isOpen, onClose, componentType, pageId, sectionId, isEditing } =
    useComponentCreateModal();

  let dialogContent;

  switch (componentType) {
    case 'Badge':
      dialogContent = (
        <BadgeComponentForm
          pageId={pageId!}
          sectionId={sectionId!}
          projectId={params.projectId as Id<'projects'>}
          isEditing={isEditing}
        />
      );
      break;
    case 'Button':
      dialogContent = (
        <ButtonComponentForm
          pageId={pageId!}
          sectionId={sectionId!}
          projectId={params.projectId as Id<'projects'>}
          isEditing={isEditing}
        />
      );
      break;
    case 'Card':
      dialogContent = (
        <CardComponentForm
          pageId={pageId!}
          sectionId={sectionId!}
          projectId={params.projectId as Id<'projects'>}
          isEditing={isEditing}
        />
      );
      break;
    case 'Title':
      dialogContent = (
        <TitleComponentForm
          pageId={pageId!}
          sectionId={sectionId!}
          projectId={params.projectId as Id<'projects'>}
          isEditing={isEditing}
        />
      );
      break;
    case 'Text':
      dialogContent = (
        <TextComponentForm
          pageId={pageId!}
          sectionId={sectionId!}
          projectId={params.projectId as Id<'projects'>}
          isEditing={isEditing}
        />
      );
      break;
    case 'TextBlock':
      dialogContent = (
        <TextBlockComponentForm
          pageId={pageId!}
          sectionId={sectionId!}
          projectId={params.projectId as Id<'projects'>}
          isEditing={isEditing}
        />
      );
      break;
    case 'Image':
      dialogContent = (
        <ImageComponentForm
          pageId={pageId!}
          sectionId={sectionId!}
          projectId={params.projectId as Id<'projects'>}
          isEditing={isEditing}
        />
      );
      break;
    case 'Link':
      dialogContent = (
        <LinkComponentForm
          pageId={pageId!}
          sectionId={sectionId!}
          projectId={params.projectId as Id<'projects'>}
          isEditing={isEditing}
        />
      );
      break;
    default:
      dialogContent = (
        <ButtonComponentForm
          pageId={pageId!}
          sectionId={sectionId!}
          projectId={params.projectId as Id<'projects'>}
          isEditing={isEditing}
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
