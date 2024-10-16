'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';
import { Loader, PlusCircle } from 'lucide-react';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { columns, PageColumn } from '@/components/dashboard/pages/columns';
import { DataTable } from '@/components/dashboard/data-table';
import { usePageCreateModal } from '@/store/use-page-create-modal';

interface DashboardPageProps {
  params: { projectId: string };
}

const DashboardPage = ({ params }: DashboardPageProps) => {
  const { onOpen } = usePageCreateModal();

  const pages = useQuery(api.pages.get, {
    projectId: params.projectId as Id<'projects'>,
  });
  const project = useQuery(api.project.get, {
    id: params.projectId as Id<'projects'>,
  });

  if (project === undefined || pages === undefined) {
    return (
      <main className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader className="size-4 animate-spin" />
      </main>
    );
  }

  const data: PageColumn[] | undefined = pages?.map((page) => {
    return { id: page._id, title: page.title, createdAt: page._creationTime };
  });

  return (
    <main className="flex h-[calc(100%-3rem)] flex-col gap-y-4 py-4">
      <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/${project._id}`}>
              {project.title}
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Pages</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex h-full flex-col items-end gap-y-2">
        <Button
          size="sm"
          className="gap-x-1"
          onClick={onOpen}
        >
          <PlusCircle className="size-3.5" />
          Add new page
        </Button>
        <Card className="h-full w-full">
          <CardHeader>
            <CardTitle>Pages</CardTitle>
            <CardDescription>Manage the pages of your website.</CardDescription>
          </CardHeader>
          <CardContent>
            <DataTable
              columns={columns}
              data={data!}
            />
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default DashboardPage;
