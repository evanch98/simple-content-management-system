'use client';

import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { Doc, Id } from '../../../convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { RiApps2AddLine, RiApps2Line } from 'react-icons/ri';
import { redirect, useParams, useRouter } from 'next/navigation';
import { useQuery } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { Check, ChevronsUpDown, PlusCircle } from 'lucide-react';
import { useProjectModal } from '@/store/use-project-modal';

interface ProjectSwitcherProps {
  projects: Doc<'projects'>[] | undefined;
  className?: string;
}

export const ProjectSwitcher = ({
  projects,
  className,
}: ProjectSwitcherProps) => {
  const projectModal = useProjectModal();
  const [open, setOpen] = useState(false);
  const params = useParams();
  const router = useRouter();

  let currentProject;

  try {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    currentProject = useQuery(api.project.get, {
      id: params.projectId as Id<'projects'>,
    });
  } catch (e) {
    return redirect('/');
  }

  const onProjectSelect = (projectId: string) => {
    setOpen(false);
    router.push(`/${projectId}`);
    router.refresh();
  };

  return (
    <Popover
      open={open}
      onOpenChange={setOpen}
    >
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          size="sm"
          aria-expanded={open}
          aria-label="Select a project"
          className={cn('w-[200px] justify-between text-sm', className)}
        >
          <RiApps2AddLine className="mr-2 size-4" />
          {currentProject?.title}
          <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search project..." />
            <CommandEmpty>No project found.</CommandEmpty>
            <CommandGroup heading="Projects">
              {projects?.map((project) => (
                <CommandItem
                  key={project._id}
                  className="text-sm"
                  onSelect={() => onProjectSelect(project._id)}
                >
                  <RiApps2Line className="mr-2 size-4" />
                  {project.title}
                  <Check
                    className={cn(
                      'ml-auto size-4',
                      project._id === params.projectId
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setOpen(false);
                  projectModal.onOpen();
                }}
              >
                <PlusCircle className="mr-2 size-5" />
                New project
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
