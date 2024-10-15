import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet';
import { RouteType } from '@/types';
import { MenuIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Doc } from '../../../convex/_generated/dataModel';
import { ProjectSwitcher } from './project-switcher';
import Link from 'next/link';
import { cn } from '@/lib/utils';

interface MobileNavbarProps {
  routes: RouteType[];
  projects: Doc<'projects'>[] | undefined;
}

export const MobileNavbar = ({ routes, projects }: MobileNavbarProps) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="md:hidden"
        >
          <MenuIcon className="size-4" />
          <span className="sr-only">Toggle navigation menu</span>
        </Button>
      </SheetTrigger>
      <SheetContent
        side="left"
        className="w-[400px] sm:w-[540px] md:hidden"
      >
        <SheetHeader>
          <ProjectSwitcher
            projects={projects}
            className="md:hidden"
          />
        </SheetHeader>
        <nav className="flex flex-col gap-y-6 pt-8 md:hidden">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={cn(
                'text-lg font-medium transition-colors hover:text-foreground',
                route.active ? 'text-foreground' : 'text-muted-foreground',
              )}
            >
              {route.label}
            </Link>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  );
};
