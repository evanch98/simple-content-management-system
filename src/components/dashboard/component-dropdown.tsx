import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { ComponentEnum, ComponentType } from '@/types';
import { PlusCircle } from 'lucide-react';
import { Id } from '../../../convex/_generated/dataModel';
import { useComponentCreateModal } from '@/store/use-component-create-modal';

interface ComponentDropdownProps {
  pageId: Id<'pages'>;
  sectionId: Id<'sections'>;
}

export const ComponentDropdown = ({
  pageId,
  sectionId,
}: ComponentDropdownProps) => {
  const { onOpen } = useComponentCreateModal();

  const handleOnOpen = (componentType: ComponentType) => {
    onOpen(sectionId, pageId, componentType);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          type="button"
          size="sm"
          variant="outline"
        >
          <PlusCircle className="mr-2 size-3.5" />
          New component
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-[140px]">
        {ComponentEnum.map((component, index) => (
          <DropdownMenuItem
            onClick={() => handleOnOpen(component)}
            key={`${component}-${index}`}
          >
            {component}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
