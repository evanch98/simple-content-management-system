'use client';

import { useMutation, useQuery } from 'convex/react';
import { api } from '../../../../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '../../../../../../convex/_generated/dataModel';
import {
  Check,
  Copy,
  ImagePlus,
  ImageUpIcon,
  Loader,
  Trash2,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useImageUploadModal } from '@/store/use-image-upload-modal';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import { DeleteAlertDialog } from '@/components/dashboard/delete-alert-dialog';
import { toast } from 'sonner';
import { useState } from 'react';

const MediaPage = () => {
  const params = useParams();
  const { onOpen } = useImageUploadModal();
  const [isCopied, setIsCopied] = useState(false);

  const files = useQuery(api.media.getFiles, {
    projectId: params.projectId as Id<'projects'>,
  });
  const project = useQuery(api.project.get, {
    id: params.projectId as Id<'projects'>,
  });
  const deleteFile = useMutation(api.media.remove);

  if (files === undefined || project === undefined) {
    return (
      <main className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader className="size-4 animate-spin" />
      </main>
    );
  }

  const onCopy = (url: string) => {
    setIsCopied(true);
    navigator.clipboard.writeText(url);
    toast('Image address copied to the clipboard.');
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  const onDeleteFile = async (id: Id<'media'>, storageId: Id<'_storage'>) => {
    try {
      await deleteFile({ id, storageId });
      toast('Successfully deleted the image.');
    } catch (error) {
      toast('Something went wrong! Please try again.');
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
      <div className="flex h-full flex-col items-end gap-y-2">
        <Button
          size="sm"
          className="gap-x-1"
          onClick={onOpen}
        >
          <ImagePlus className="size-3.5" />
          Add new image
        </Button>
        <Card className="h-full w-full">
          <CardHeader>
            <CardTitle>Images</CardTitle>
            <CardDescription>Manage the images you uploaded.</CardDescription>
          </CardHeader>
          <CardContent>
            {files.length === 0 ? (
              <div className="absolute left-1/2 top-1/2 mt-[90px] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center gap-y-2 py-4">
                <p className="text-sm text-muted-foreground">
                  You don&apos;t have any image for this project.
                </p>
                <Button
                  size="sm"
                  onClick={onOpen}
                >
                  <ImageUpIcon className="mr-2 size-3.5" />
                  Upload image
                </Button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {files.map((file) => (
                  <div
                    key={file._id}
                    className="flex flex-col gap-y-1"
                  >
                    <p className="text-sm font-semibold text-muted-foreground">
                      {file.title}
                    </p>
                    <div className="group relative aspect-square w-64 overflow-hidden rounded-md shadow">
                      <Image
                        fill
                        src={file.url!}
                        alt={file.title}
                        className="object-cover"
                      />
                      <div className="absolute flex h-full w-full items-center justify-center gap-x-2 rounded-sm bg-black/30 opacity-0 shadow transition-opacity duration-300 group-hover:opacity-100">
                        <Button
                          variant="secondary"
                          size="icon"
                          onClick={() => onCopy(file.url!)}
                        >
                          {isCopied ? (
                            <Check className="size-4 cursor-pointer" />
                          ) : (
                            <Copy className="size-4 cursor-pointer" />
                          )}
                          <span className="sr-only">Copy</span>
                        </Button>
                        <DeleteAlertDialog
                          onConfirm={() => {
                            onDeleteFile(file._id, file.file);
                          }}
                          description="This action cannot be undone. This will permanently delete the image."
                        >
                          <Button
                            variant="destructive"
                            size="icon"
                          >
                            <Trash2 className="size-4 cursor-pointer" />
                            <span className="sr-only">Delete</span>
                          </Button>
                        </DeleteAlertDialog>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </main>
  );
};

export default MediaPage;
