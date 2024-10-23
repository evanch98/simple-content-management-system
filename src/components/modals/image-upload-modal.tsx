'use client';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useImageUploadModal } from '@/store/use-image-upload-modal';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';
import { useParams } from 'next/navigation';
import { Id } from '../../../convex/_generated/dataModel';
import { toast } from 'sonner';

const MAX_FILE_SIZE = 1024 * 1024 * 4; // 4MB
const ACCEPTED_FILE_TYPES = [
  'image/png',
  'image/jpg',
  'image/jpeg',
  'image/gif',
];

const formSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Title should be at least 2 characters.' })
    .max(20, { message: 'Title cannot be more than 20 characters.' }),
  file: z
    .instanceof(FileList)
    .refine((file: FileList) => file.length !== 0, 'File is required')
    .refine((file: FileList) => file[0].size < MAX_FILE_SIZE, 'Max size is 4MB')
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file[0].type),
      'Only jpg, jpeg, png, and gif formats are supported.',
    ),
});

export const ImageUploadModal = () => {
  const { isOpen, onClose } = useImageUploadModal();
  const generateUploadUrl = useMutation(api.media.generateUploadUrl);
  const uploadImage = useMutation(api.media.uploadFile);
  const params = useParams();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      file: undefined,
    },
  });

  const fileRef = form.register('file');

  const handleOnClose = () => {
    form.reset();
    onClose();
  };

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const postUrl = await generateUploadUrl();

    try {
      const result = await fetch(postUrl, {
        method: 'POST',
        headers: { 'Content-Type': values.file[0].type },
        body: values.file[0],
      });

      const { storageId } = await result.json();

      await uploadImage({
        storageId,
        projectId: params.projectId as Id<'projects'>,
        title: values.title,
      });

      form.reset();
      toast('Successfully uploaded an image.');
      onClose();
    } catch (error) {
      toast('Something went wrong! Please try again.');
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={handleOnClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Upload an image</DialogTitle>
          <DialogDescription>
            Upload an image for this project.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Image title"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="file"
              render={() => (
                <FormItem>
                  <FormLabel>Image file</FormLabel>
                  <FormControl>
                    <Input
                      type="file"
                      placeholder="Image title"
                      {...fileRef}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </form>
        </Form>
        <DialogFooter>
          <Button
            disabled={form.formState.isSubmitting}
            onClick={handleOnClose}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            disabled={form.formState.isSubmitting}
            onClick={form.handleSubmit(onSubmit)}
          >
            Create
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
