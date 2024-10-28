'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useQuery } from 'convex/react';
import { api } from '../../../../../../convex/_generated/api';
import { Id } from '../../../../../../convex/_generated/dataModel';
import { useParams } from 'next/navigation';
import { Loader } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

const EndpointsPage = () => {
  const params = useParams();
  const project = useQuery(api.project.get, {
    id: params.projectId as Id<'projects'>,
  });

  if (project === undefined) {
    return (
      <main className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader className="size-4 animate-spin" />
      </main>
    );
  }

  return (
    <main className="flex h-[calc(100%-3.25rem)] flex-col gap-y-4 py-4">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${params.projectId}`}>
              {project.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Endpoints</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="h-full w-full">
        <CardHeader>
          <CardTitle>Endpoints</CardTitle>
          <CardDescription>
            The API endpoints for your user-facing websites.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-full w-full flex-col gap-y-4">
            ENDPOINTS
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default EndpointsPage;
