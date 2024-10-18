import { Button } from '@/components/ui/button';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useState } from 'react';
import { TbSection } from 'react-icons/tb';
import { Doc } from '../../../convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { toast } from 'sonner';

interface SectionSwitcherProps {
  sections: Doc<'sections'>[];
  currentSectionIndex: number;
  // eslint-disable-next-line no-unused-vars
  setCurrentSectionIndex: (index: number) => void;
  className?: string;
}

export const SectionSwitcher = ({
  sections,
  currentSectionIndex,
  setCurrentSectionIndex,
  className,
}: SectionSwitcherProps) => {
  const [open, setOpen] = useState(false);

  const currentSection = sections[currentSectionIndex];

  const onSectionSelect = (currentIndex: number) => {
    setOpen(false);
    setCurrentSectionIndex(currentIndex);
    toast(`Switched to the ${sections[currentIndex].name} section.`);
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
          aria-label="Select a section"
          className={cn('w-[200px] justify-between text-sm', className)}
        >
          <TbSection className="mr-2 size-4" />
          {currentSection?.name}
          <ChevronsUpDown className="ml-auto size-4 shrink-0 text-muted-foreground" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Search sections..." />
            <CommandEmpty>No section found.</CommandEmpty>
            <CommandGroup heading="Sections">
              {sections.map((section, index) => (
                <CommandItem
                  key={section._id}
                  className="text-sm"
                  onSelect={() => onSectionSelect(index)}
                >
                  <TbSection className="mr-2 size-4" />
                  {section.name}
                  <Check
                    className={cn(
                      'ml-auto size-4',
                      section._id === currentSection._id
                        ? 'opacity-100'
                        : 'opacity-0',
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
