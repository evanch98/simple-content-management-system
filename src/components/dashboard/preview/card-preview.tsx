/* eslint-disable @next/next/no-img-element */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Doc } from '../../../../convex/_generated/dataModel';
import { Button } from '@/components/ui/button';

interface CardPreviewProps {
  component: Doc<'components'>;
}

export const CardPreview = ({ component }: CardPreviewProps) => {
  const buttons = component.content.buttons as {
    content: string;
    href?: string;
  }[];

  const images = component.content.imgUrls as string[];

  return (
    <Card>
      <CardHeader>
        <CardTitle>{component.content.title as string}</CardTitle>
        <CardDescription>
          {component.content.description as string}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          {images !== undefined &&
            images.length !== 0 &&
            images.map((url, index) => (
              <div
                key={`${url}-${index}`}
                className="relative aspect-square w-24"
              >
                <img
                  src={url}
                  alt="Decorative Image"
                  className="object-cover"
                />
              </div>
            ))}
          <p className="text-sm text-muted-foreground">
            {component.content.content as string}
          </p>
        </div>
      </CardContent>
      <CardFooter className="gap-x-2">
        {buttons !== undefined &&
          buttons.length !== 0 &&
          buttons.map((button, index) => (
            <Button
              key={`${button.content}-${index}`}
              variant={index !== 0 ? 'outline' : undefined}
            >
              {button.content}
            </Button>
          ))}
      </CardFooter>
    </Card>
  );
};
