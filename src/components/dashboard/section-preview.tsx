import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Doc } from '../../../convex/_generated/dataModel';
import { Info, Monitor, Smartphone, Tablet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';

interface SectionPreviewProps {
  currentSection: Doc<'sections'>;
  components: Doc<'components'>[];
}

export const SectionPreview = ({
  currentSection,
  components,
}: SectionPreviewProps) => {
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
            'flex h-full w-full flex-col rounded-md border border-border p-4',
            value === 'medium' && 'max-w-screen-md',
            value === 'small' && 'max-w-80',
          )}
        >
          <p className="flex items-center text-xs">
            <Info className="mr-1 size-3" />
            This is a rough preview of the{' '}
            <span className="mx-1 font-semibold">
              {currentSection.name}
            </span>{' '}
            section. The actual style depends on your website design.
          </p>
          <div className="-mt-4 flex h-full w-full flex-col items-center justify-center">
            {components.map((component) => {
              if (component.type === 'Button') {
                return (
                  <Button key={component._id}>
                    {component.content.content}
                  </Button>
                );
              }
            })}
          </div>
        </div>
      </div>
    </Tabs>
  );
};
