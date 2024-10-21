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
import { Loader, Pencil, Trash2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { DeleteAlertDialog } from '@/components/dashboard/delete-alert-dialog';
import { useEffect, useState } from 'react';
import { usePageEditModal } from '@/store/use-page-edit-modal';
import { SectionSwitcher } from '@/components/dashboard/section-switcher';
import { TbNewSection } from 'react-icons/tb';
import { useSectionCreateModal } from '@/store/use-section-create-modal';
import { useSectionEditModal } from '@/store/use-section-edit-modal';
import { toast } from 'sonner';
import { SectionPreview } from '@/components/dashboard/section-preview';
import { Separator } from '@/components/ui/separator';
import { ComponentDropdown } from '@/components/dashboard/component-dropdown';
import { ComponentCard } from '@/components/dashboard/component-card';

const Page = () => {
  const params = useParams();
  const router = useRouter();
  const pageEditModal = usePageEditModal();
  const sectionCreateModal = useSectionCreateModal();
  const sectionEditModal = useSectionEditModal();
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentSectionIndex, setCurrentSectionIndex] = useState(0);

  const project = useQuery(api.project.get, {
    id: params.projectId as Id<'projects'>,
  });
  const page = useQuery(api.page.get, {
    id: params.pageId as Id<'pages'>,
  });
  const deletePage = useMutation(api.page.remove);
  const sections = useQuery(api.sections.get, {
    projectId: params.projectId as Id<'projects'>,
    pageId: params.pageId as Id<'pages'>,
  });
  const deleteSection = useMutation(api.section.remove);
  const components = useQuery(api.components.get, {
    projectId: params.projectId as Id<'projects'>,
    pageId: params.pageId as Id<'pages'>,
    sectionId: sections?.[currentSectionIndex]._id!,
  });

  useEffect(() => {
    if (isDeleting) {
      router.replace(`/${project?._id}`);
    }
  }, [isDeleting, project?._id, router]);

  if (
    project === undefined ||
    page === undefined ||
    sections === undefined ||
    components === undefined
  ) {
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
      toast('Successfully deleted the page.');
    } catch (e) {
      toast('Something went wrong! Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  const currentSection = sections[currentSectionIndex];

  const onDeleteSection = async () => {
    if (currentSection.name === 'Default') {
      return toast('Cannot remove this section.');
    }
    try {
      setCurrentSectionIndex(0);
      await deleteSection({ id: currentSection._id });
      toast('Successfully removed the section.');
    } catch (e) {
      toast('Something went wrong! Please try again.');
    }
  };

  return (
    <main className="flex h-[calc(100%-3.25rem)] flex-col gap-y-4 py-4">
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
      <div className="flex h-full flex-col items-end gap-y-4">
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
            onClick={() => pageEditModal.onOpen(page.title)}
            size="sm"
          >
            <Pencil className="mr-1 size-3.5" />
            Edit page
          </Button>
        </div>
        <Separator />
        <div className="flex h-full w-full items-start gap-x-4">
          <div className="flex h-full w-[35%] flex-col gap-y-2 pt-[24px]">
            <form className="grid w-full items-start gap-1">
              <fieldset className="flex flex-col gap-1 rounded-lg border p-4 pb-2">
                <legend className="-ml-1 text-xs font-medium">Sections</legend>
                <div className="flex gap-2">
                  <SectionSwitcher
                    sections={sections}
                    currentSectionIndex={currentSectionIndex}
                    setCurrentSectionIndex={setCurrentSectionIndex}
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => {
                      if (currentSection.name === 'Default') {
                        return toast('Cannot change the name of this section.');
                      }
                      sectionEditModal.onOpen(
                        currentSection.name,
                        currentSection._id,
                      );
                    }}
                  >
                    <Pencil className="mr-1 size-3.5" />
                    Edit
                  </Button>
                  <Button
                    type="button"
                    size="sm"
                    onClick={() => sectionCreateModal.onOpen(page._id)}
                  >
                    <TbNewSection className="mr-2 size-3.5" />
                    Add
                  </Button>
                </div>
                <DeleteAlertDialog
                  onConfirm={onDeleteSection}
                  description={`This action cannot be undone. This will permanently delete the ${currentSection.name} section and the corresponding components.`}
                >
                  <Button
                    variant="link"
                    className="w-fit p-0 text-xs text-destructive"
                    size="sm"
                  >
                    <X className="mr-1 size-3.5" />
                    Remove this section
                  </Button>
                </DeleteAlertDialog>
              </fieldset>
            </form>
            <form className="grid h-full w-full items-start gap-1">
              <fieldset className="flex h-full flex-col gap-2 rounded-lg border px-4 py-1">
                <legend className="-ml-1 text-xs font-medium">
                  Components
                </legend>
                <div className="flex w-full justify-end">
                  <ComponentDropdown
                    pageId={page._id}
                    sectionId={currentSection._id}
                  />
                </div>
                {components?.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center gap-y-2">
                    <p className="text-center text-xs text-muted-foreground">
                      You haven&apos;t added any component for this section.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    {components.map((component) => (
                      <ComponentCard
                        key={component._id}
                        component={component}
                      />
                    ))}
                  </div>
                )}
              </fieldset>
            </form>
          </div>
          <div className="hidden h-full w-full flex-col items-center justify-center lg:flex">
            <SectionPreview
              currentSection={currentSection}
              components={components}
            />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
