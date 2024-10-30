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
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { FormProps } from '@/components/modals/component-create-modal';

export const linkFormSchema = z.object({
  title: z.string().optional(),
  href: z.string().min(1, { message: 'Required' }),
});

export const LinkComponentForm = ({
  pageId,
  sectionId,
  projectId,
  isEditing,
}: FormProps) => {
  const { onClose, componentId } = useComponentCreateModal();
  const createLink = useMutation(api.component.create);
  const updateLink = useMutation(api.component.update);

  const form = useForm<z.infer<typeof linkFormSchema>>({
    resolver: zodResolver(linkFormSchema),
    defaultValues: {
      title: '',
      href: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof linkFormSchema>) => {
    try {
      isEditing
        ? await updateLink({
            id: componentId!,
            sectionId,
            pageId,
            projectId,
            content: {
              title: values.title || '',
              href: values.href,
            },
          })
        : await createLink({
            sectionId,
            pageId,
            projectId,
            type: 'Link',
            content: {
              title: values.title || '',
              href: values.href,
            },
          });
      form.reset();
      onClose();
      toast(
        isEditing
          ? 'Successfully update the link component.'
          : 'Successfully created a link component.',
      );
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title (Optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Link title"
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
                <FormLabel>Hyperlink</FormLabel>
                <FormControl>
                  <Input
                    placeholder="https://your-app.com/landing"
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
          onClick={onClose}
          variant="outline"
        >
          Cancel
        </Button>
        <Button
          disabled={form.formState.isSubmitting}
          onClick={form.handleSubmit(onSubmit)}
        >
          {isEditing ? 'Save' : 'Create'}
        </Button>
      </div>
    </div>
  );
};
