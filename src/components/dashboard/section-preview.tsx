import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Doc } from '../../../convex/_generated/dataModel';
import { Monitor, Smartphone, Tablet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SectionPreviewProps {
  currentSection: Doc<'sections'>;
}

export const SectionPreview = ({ currentSection }: SectionPreviewProps) => {
  const [value, setValue] = useState('large');

  return (
    <Tabs
      className="h-full w-full"
      defaultValue="large"
      onValueChange={setValue}
    >
      <div className="flex h-full w-full flex-col gap-y-2 rounded-md">
        <div className="flex w-full items-center justify-end gap-x-3">
          <TabsList className="h-fit border bg-background p-0.5 text-foreground">
            <TabsTrigger
              value="large"
              className="px-1.5 data-[state=active]:bg-muted data-[state=active]:shadow-none"
            >
              <Monitor className="size-3" />
              <span className="sr-only">Large screen</span>
            </TabsTrigger>
            <TabsTrigger
              value="medium"
              className="px-1.5 data-[state=active]:bg-muted data-[state=active]:shadow-none"
            >
              <Tablet className="size-3" />
              <span className="sr-only">Medium screen</span>
            </TabsTrigger>
            <TabsTrigger
              value="small"
              className="px-1.5 data-[state=active]:bg-muted data-[state=active]:shadow-none"
            >
              <Smartphone className="size-3" />
              <span className="sr-only">Small screen</span>
            </TabsTrigger>
          </TabsList>
          <Separator orientation="vertical" />
          <Badge>{currentSection.name}</Badge>
          <Separator orientation="vertical" />
          <Badge variant="secondary">Preview</Badge>
        </div>
        <div
          className={cn(
            'flex h-full w-full flex-col items-center justify-center rounded-md border border-border',
            value === 'medium' && 'max-w-screen-md',
            value === 'small' && 'max-w-80',
          )}
        >
          {currentSection.name}
        </div>
      </div>
    </Tabs>
  );
};
