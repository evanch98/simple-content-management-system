import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { Doc } from '../../../convex/_generated/dataModel';
import { cn } from '@/lib/utils';
import { GeistMono } from 'geist/font/mono';

interface ComponentCardProps {
  component: Doc<'components'>;
}

export const ComponentCard = ({ component }: ComponentCardProps) => {
  const content = Object.keys(component.content);

  return (
    <Card className="rounded-md">
      <CardHeader className="px-4 py-1">
        <CardTitle className="flex items-center justify-between">
          <HoverCard>
            <HoverCardTrigger asChild>
              <Button
                type="button"
                variant="link"
                className="p-0"
              >
                {component.type}
              </Button>
            </HoverCardTrigger>
            <HoverCardContent
              align="start"
              sideOffset={8}
            >
              <div className="flex flex-col gap-y-2">
                <h1 className="text-xs font-semibold text-muted-foreground">
                  Content
                </h1>
                <div className="flex flex-col gap-y-1">
                  {content.map((item) => {
                    return (
                      <p
                        key={item}
                        className="text-xs font-medium"
                      >
                        <span>{item}:</span>
                        <span
                          className={cn(
                            'ml-0.5',
                            !component.content[item] ||
                              (component.content[item].length === 0 &&
                                `text-destructive ${GeistMono.className}`),
                          )}
                        >
                          {typeof component.content[item] === 'string'
                            ? component.content[item]
                            : !component.content[item] ||
                                component.content[item].length === 0
                              ? 'undefined'
                              : component.content[item].map(
                                  (innerContent, index) => (
                                    <span key={`${innerContent}-${index}`}>
                                      {innerContent.toString()}
                                    </span>
                                  ),
                                )}
                        </span>
                      </p>
                    );
                  })}
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          <div className="flex items-center gap-x-2">
            <Button
              variant="link"
              size="sm"
              className="p-0"
              type="button"
            >
              Edit
            </Button>
            <Button
              variant="link"
              size="sm"
              className="p-0 text-destructive"
              type="button"
            >
              Delete
            </Button>
          </div>
        </CardTitle>
      </CardHeader>
    </Card>
  );
};
