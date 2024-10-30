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

export const titleFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Content should be at least 1 character.' }),
});

export const TitleComponentForm = ({
  pageId,
  sectionId,
  projectId,
  isEditing,
}: FormProps) => {
  const { onClose, componentId } = useComponentCreateModal();
  const createTitle = useMutation(api.component.create);
  const updateTitle = useMutation(api.component.update);

  const form = useForm<z.infer<typeof titleFormSchema>>({
    resolver: zodResolver(titleFormSchema),
    defaultValues: {
      title: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof titleFormSchema>) => {
    try {
      isEditing
        ? await updateTitle({
            id: componentId!,
            sectionId,
            pageId,
            projectId,
            content: {
              content: values.title,
            },
          })
        : await createTitle({
            sectionId,
            pageId,
            projectId,
            type: 'Title',
            content: {
              content: values.title,
            },
          });
      form.reset();
      onClose();
      toast(
        isEditing
          ? 'Successfully updated the title component.'
          : 'Successfully created a title component.',
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
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Section title"
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
