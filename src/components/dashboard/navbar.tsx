'use client';

import { Skeleton } from '@/components/ui/skeleton';
import { useQuery } from 'convex/react';
import { UserButton } from './user-button';
import { api } from '../../../convex/_generated/api';
import Link from 'next/link';
import { useParams, usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { ProjectSwitcher } from './project-switcher';
import { RouteType } from '@/types';
import { MobileNavbar } from './mobile-navbar';
import { ModeToggle } from '@/components/ui/mode-toggle';

export const Navbar = () => {
  const user = useQuery(api.users.currentUser);
  const projects = useQuery(api.projects.get);

  const pathname = usePathname();
  const params = useParams();

  const routes: RouteType[] = [
    {
      href: `/${params.projectId}`,
      label: 'Pages',
      active: pathname === `/${params.projectId}` || pathname.includes('pages'),
    },
    {
      href: `/${params.projectId}/media`,
      label: 'Media',
      active: pathname === `/${params.projectId}/media`,
    },
    {
      href: `/${params.projectId}/endpoints`,
      label: 'Endpoints',
      active: pathname === `/${params.projectId}/endpoints`,
    },
    {
      href: `/${params.projectId}/settings`,
      label: 'Settings',
      active: pathname === `/${params.projectId}/settings`,
    },
  ];

  if (user === undefined) {
    return (
      <div className="flex w-full items-center justify-between py-2">
        <Skeleton className="h-6 w-64" />
        <Skeleton className="size-8 rounded-full" />
      </div>
    );
  }

  return (
    <nav className="flex w-full items-center justify-between py-2">
      <MobileNavbar
        routes={routes}
        projects={projects}
      />
      <div className="hidden items-center gap-x-3 md:flex md:gap-x-6">
        <ProjectSwitcher projects={projects} />
        {routes.map((route) => (
          <Link
            key={route.href}
            href={route.href}
            className={cn(
              'text-sm font-medium transition-colors hover:text-foreground',
              route.active ? 'text-foreground' : 'text-muted-foreground',
            )}
          >
            {route.label}
          </Link>
        ))}
      </div>
      <div className="flex items-center gap-x-2">
        <ModeToggle />
        <UserButton
          profileUrl={user?.image}
          profileName={user?.name}
        />
      </div>
    </nav>
  );
};
