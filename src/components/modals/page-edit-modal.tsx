'use client';

import { usePageEditModal } from '@/store/use-page-edit-modal';
import { useMutation } from 'convex/react';
import { z } from 'zod';
import { api } from '../../../convex/_generated/api';
import { Id } from '../../../convex/_generated/dataModel';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  DialogHeader,
  DialogFooter,
  DialogContent,
  Dialog,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useParams } from 'next/navigation';
import { toast } from 'sonner';

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title should be at least 2 characters.' })
    .max(50),
});

export const PageEditModal = () => {
  const params = useParams();
  const { isOpen, onClose, title } = usePageEditModal();

  const editPage = useMutation(api.page.update);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title,
    },
  });

  useEffect(() => {
    form.reset({ title });
  }, [form, title]);

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      await editPage({
        title: values.title,
        id: params.pageId as Id<'pages'>,
      });
      onClose();
      toast('Successfully updated the page.');
    } catch (error) {
      toast('Something went wrong! Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog
      open={isOpen}
      onOpenChange={onClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit the page</DialogTitle>
          <DialogDescription>Update your page title.</DialogDescription>
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
                      placeholder="Home page"
                      {...field}
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
            disabled={isLoading}
            onClick={onClose}
            variant="outline"
          >
            Cancel
          </Button>
          <Button
            disabled={isLoading}
            onClick={form.handleSubmit(onSubmit)}
          >
            Save
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
