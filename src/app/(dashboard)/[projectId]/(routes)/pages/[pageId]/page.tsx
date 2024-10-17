'use client';

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '@/components/ui/breadcrumb';
import { useMutation, useQuery } from 'convex/react';
import { useParams, useRouter } from 'next/navigation';
import { api } from '../../../../../../../convex/_generated/api';
import { Id } from '../../../../../../../convex/_generated/dataModel';
import { Loader, Pencil, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteAlertDialog } from '@/components/dashboard/delete-alert-dialog';
import { useEffect, useState } from 'react';
import { usePageEditModal } from '@/store/use-page-edit-modal';

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const { onOpen } = usePageEditModal();

  const project = useQuery(api.project.get, {
    id: params.projectId as Id<'projects'>,
  });

  useEffect(() => {
    if (isDeleting) {
      router.replace(`/${project?._id}`);
    }
  }, [isDeleting, project?._id, router]);

  const page = useQuery(api.page.get, {
    id: params.pageId as Id<'pages'>,
  });

  const deletePage = useMutation(api.page.remove);

  if (project === undefined || page === undefined) {
    return (
      <main className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader className="size-4 animate-spin" />
      </main>
    );
  }

  const onDeletePage = async () => {
    try {
      setIsDeleting(true);
      await deletePage({ id: page._id });
    } catch (e) {
      // TODO: add toast
    } finally {
      setIsDeleting(false);
    }
  };

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
            <BreadcrumbLink href={`/${project._id}`}>Pages</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>{page.title}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex h-full flex-col items-end gap-y-2">
        <div className="flex gap-x-2">
          <DeleteAlertDialog
            onConfirm={onDeletePage}
            description={`This action cannot be undone. This will permanently delete the ${page.title} page and the corresponding sections.`}
          >
            <Button
              variant="destructive"
              size="sm"
            >
              <Trash2 className="mr-1 size-3.5" />
              Delete page
            </Button>
          </DeleteAlertDialog>
          <Button
            onClick={() => onOpen(page.title)}
            size="sm"
          >
            <Pencil className="mr-1 size-3.5" />
            Edit page
          </Button>
        </div>
      </div>
    </main>
  );
};

export default Page;
