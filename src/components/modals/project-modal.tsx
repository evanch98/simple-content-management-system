'use client';

import { useMutation } from 'convex/react';
import { useRouter } from 'next/navigation';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { useProjectModal } from '@/store/use-project-modal';
import { api } from '../../../convex/_generated/api';
import { useState } from 'react';

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title should be at least 2 characters.' })
    .max(50),
});

export const ProjectModal = () => {
  const router = useRouter();
  const projectModal = useProjectModal();

  const createProject = useMutation(api.project.create);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsLoading(true);
      const newProject = await createProject({ title: values.title });
      router.push(`/${newProject}`);
    } catch (error) {
      // TODO: add toast
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog
        open={projectModal.isOpen}
        onOpenChange={projectModal.onClose}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new project</DialogTitle>
            <DialogDescription>Ready to start a new project?</DialogDescription>
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
                        placeholder="Simple CMS"
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
              onClick={projectModal.onClose}
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              disabled={isLoading}
              onClick={form.handleSubmit(onSubmit)}
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};
