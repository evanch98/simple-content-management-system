'use client';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useMutation, useQuery } from 'convex/react';
import { useParams } from 'next/navigation';
import { api } from '../../../../../../convex/_generated/api';
import { Id } from '../../../../../../convex/_generated/dataModel';
import { Loader } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { ProjectUpdateForm } from '@/components/dashboard/project-update-form';
import { DeleteAlertDialog } from '@/components/dashboard/delete-alert-dialog';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const SettingsPage = () => {
  const params = useParams();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  const project = useQuery(api.project.get, {
    id: params.projectId as Id<'projects'>,
  });

  const deleteProject = useMutation(api.project.remove);

  useEffect(() => {
    if (isDeleting) {
      router.replace('/');
    }
  }, [isDeleting, router]);

  if (project === undefined) {
    return (
      <main className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader className="size-4 animate-spin" />
      </main>
    );
  }

  const onDeleteProject = async () => {
    try {
      setIsDeleting(true);
      await deleteProject({ id: params.projectId as Id<'projects'> });
      toast('Successfully deleted the project.');
    } catch (e) {
      toast('Something went wrong! Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

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
            <BreadcrumbPage>Media</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="h-full w-full">
        <CardHeader>
          <CardTitle>Settings</CardTitle>
          <CardDescription>Manage the {project.title} project.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-full w-full flex-col gap-y-4 py-4">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-sm font-semibold">
                Update your project name
              </h1>
              <ProjectUpdateForm project={project} />
            </div>
            <Separator />
            <div className="flex flex-col gap-y-2">
              <h1 className="text-sm font-semibold text-destructive">
                Danger zone
              </h1>
              <DeleteAlertDialog
                description={`This action cannot be undone. This will permanently delete the ${project.title} project and the corresponding pages, sections components, and images.`}
                onConfirm={onDeleteProject}
              >
                <Button
                  className="w-fit"
                  variant="destructive"
                  size="sm"
                >
                  Delete this project
                </Button>
              </DeleteAlertDialog>
            </div>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};

export default SettingsPage;
