import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useComponentCreateModal } from '@/store/use-component-create-modal';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Id } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';

export const buttonFormSchema = z.object({
  content: z
    .string()
    .min(1, { message: 'Content should be at least 1 character.' })
    .max(20, { message: 'Content cannot be more than 20 characters.' }),
  href: z.string().optional(),
});

interface ButtonComponentFormProps {
  pageId: Id<'pages'>;
  sectionId: Id<'sections'>;
  projectId: Id<'projects'>;
}

export const ButtonComponentForm = ({
  pageId,
  sectionId,
  projectId,
}: ButtonComponentFormProps) => {
  const { onClose } = useComponentCreateModal();
  const createButton = useMutation(api.component.create);

  const form = useForm<z.infer<typeof buttonFormSchema>>({
    resolver: zodResolver(buttonFormSchema),
    defaultValues: {
      content: '',
      href: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof buttonFormSchema>) => {
    try {
      await createButton({
        sectionId,
        pageId,
        projectId,
        type: 'Button',
        content: {
          content: values.content,
          href: values.href || '',
        },
      });
      form.reset();
      onClose();
      toast('Successfully created a button component.');
    } catch (error) {
      toast('Something went wrong! Please try again.');
    }
  };

  return (
    <div className="space-y-4">
      <Form {...form}>
        <form className="space-y-2">
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Get started"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="href"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Hyperlink (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://your-app.com/landing"
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
      <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
        <Button
          disabled={form.formState.isSubmitting}
          onClick={onClose}
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
      </div>
    </div>
  );
};
