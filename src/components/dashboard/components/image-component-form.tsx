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

export const imageFormSchema = z.object({
  url: z.string().url(),
});

export const ImageComponentForm = ({
  pageId,
  sectionId,
  projectId,
  isEditing,
}: FormProps) => {
  const { onClose, componentId } = useComponentCreateModal();
  const createImage = useMutation(api.component.create);
  const updateImage = useMutation(api.component.update);

  const form = useForm<z.infer<typeof imageFormSchema>>({
    resolver: zodResolver(imageFormSchema),
    defaultValues: {
      url: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof imageFormSchema>) => {
    try {
      isEditing
        ? await updateImage({
            id: componentId!,
            sectionId,
            pageId,
            projectId,
            content: {
              url: values.url,
            },
          })
        : await createImage({
            sectionId,
            pageId,
            projectId,
            type: 'Image',
            content: {
              url: values.url,
            },
          });
      form.reset();
      onClose();
      toast(
        isEditing
          ? 'Successfully updated the image component.'
          : 'Successfully created an image component.',
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
            name="url"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Image URL</FormLabel>
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
