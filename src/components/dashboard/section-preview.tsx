import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Doc } from '../../../convex/_generated/dataModel';
import { Info, Monitor, Smartphone, Tablet } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { ButtonPreview } from '@/components/dashboard/preview/button-preview';
import { CardPreview } from '@/components/dashboard/preview/card-preview';

interface SectionPreviewProps {
  currentSection: Doc<'sections'>;
  components: Doc<'components'>[];
}

export const SectionPreview = ({
  currentSection,
  components,
}: SectionPreviewProps) => {
  const [value, setValue] = useState('large');

  const titleComponents = components.filter(
    (component) => component.type === 'Title',
  );

  const cardComponents = components.filter(
    (component) => component.type === 'Card',
  );

  const buttonComponents = components.filter(
    (component) => component.type === 'Button',
  );

  const textBlockComponents = components.filter(
    (component) => component.type === 'TextBlock',
  );

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
            'flex h-full w-full flex-col overflow-y-hidden rounded-md border border-border p-4',
            value === 'medium' && 'max-w-screen-md',
            value === 'small' && 'max-w-80',
          )}
        >
          <div className="flex w-full items-center text-xs">
            <Info className="mr-1 size-3 flex-shrink-0" />
            <p>
              This is a rough preview of the{' '}
              <span className="font-semibold">{currentSection.name}</span>{' '}
              section. The actual style depends on your website design.
            </p>
          </div>
          <Separator className="my-4" />
          <div className="flex h-full w-full flex-col items-center justify-center gap-y-4 overflow-hidden py-2">
            <div className="flex h-full w-full flex-col gap-y-8 overflow-y-auto">
              {components.length === 0 && (
                <p className="text-center text-xs text-muted-foreground">
                  You haven&apos;t added any component for this section.
                </p>
              )}
              {titleComponents.length !== 0 &&
                titleComponents.map((component) => (
                  <h1
                    key={component._id}
                    className="text-center text-3xl font-semibold text-foreground"
                  >
                    {component.content.content as string}
                  </h1>
                ))}
              {textBlockComponents.length !== 0 &&
                textBlockComponents.map((component) => (
                  <div
                    key={component._id}
                    className="flex flex-col gap-y-1 text-center"
                  >
                    <h2 className="text-lg font-semibold">
                      {component.content.text as string}
                    </h2>
                    <p className="text-sm text-muted-foreground">
                      {component.content.description as string}
                    </p>
                  </div>
                ))}
              {cardComponents.length !== 0 && (
                <div className="flex w-full flex-wrap items-center justify-center gap-2">
                  {cardComponents.map((component) => (
                    <CardPreview
                      key={component._id}
                      component={component}
                    />
                  ))}
                </div>
              )}
              {buttonComponents.length !== 0 && (
                <div className="flex w-full flex-wrap items-center justify-center gap-2">
                  {buttonComponents.map((component) => (
                    <ButtonPreview
                      key={component._id}
                      content={component.content.content as string}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Tabs>
  );
};
