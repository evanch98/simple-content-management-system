'use client';

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Doc } from '../../../convex/_generated/dataModel';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { useMutation } from 'convex/react';
import { api } from '../../../convex/_generated/api';

export const projectUpdateFormSchema = z.object({
  title: z
    .string()
    .min(2, { message: 'Title should be at least 2 characters.' })
    .max(50),
});

interface ProjectUpdateFormProps {
  project: Doc<'projects'>;
}

export const ProjectUpdateForm = ({ project }: ProjectUpdateFormProps) => {
  const editProject = useMutation(api.project.update);

  const form = useForm<z.infer<typeof projectUpdateFormSchema>>({
    resolver: zodResolver(projectUpdateFormSchema),
    defaultValues: {
      title: project.title,
    },
  });

  const onSubmit = async (values: z.infer<typeof projectUpdateFormSchema>) => {
    try {
      await editProject({
        title: values.title,
        id: project._id,
      });
      toast('Successfully updated the project title.');
    } catch (error) {
      toast('Something went wrong! Please try again.');
    }
  };

  return (
    <div className="w-full max-w-96 space-y-4">
      <Form {...form}>
        <form className="space-y-2">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="New title"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
        <Button
          disabled={form.formState.isSubmitting}
          onClick={form.handleSubmit(onSubmit)}
        >
          Save
        </Button>
      </div>
    </div>
  );
};
