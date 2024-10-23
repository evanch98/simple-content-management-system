'use client';

import { useMutation, useQuery } from 'convex/react';
import { api } from '../../convex/_generated/api';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
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
import { Loader } from 'lucide-react';

const formSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title should be at least 2 characters.' })
    .max(50),
});

export default function Home() {
  const router = useRouter();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const projects = useQuery(api.projects.get);
  const createProject = useMutation(api.project.create);

  const onDialogClose = () => {
    if (!projects || projects.length === 0) {
      setDialogOpen(true);
    } else {
      setDialogOpen(false);
    }
  };

  useEffect(() => {
    if (projects === undefined) {
      setIsLoading(true);
    } else if (projects.length === 0) {
      setDialogOpen(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      router.replace(`/${projects[0]?._id}`);
    }
  }, [projects, router]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const newProject = await createProject({ title: values.title });
    router.replace(`/${newProject}`);
  };

  if (isLoading) {
    return (
      <main className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <Loader className="size-4 animate-spin" />
      </main>
    );
  }

  return (
    <div>
      <Dialog
        open={dialogOpen}
        onOpenChange={() => onDialogClose()}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new project</DialogTitle>
            <DialogDescription>Create a project to continue.</DialogDescription>
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
            <Button onClick={form.handleSubmit(onSubmit)}>Create</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
