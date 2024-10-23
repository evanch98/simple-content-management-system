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
import { Textarea } from '@/components/ui/textarea';
import { FormProps } from '@/components/modals/component-create-modal';

export const textBlockFormSchema = z.object({
  text: z.string().min(1, { message: 'Text should be at least 1 character.' }),
  description: z.string().optional(),
});

export const TextBlockComponentForm = ({
  pageId,
  sectionId,
  projectId,
}: FormProps) => {
  const { onClose } = useComponentCreateModal();
  const createButton = useMutation(api.component.create);

  const form = useForm<z.infer<typeof textBlockFormSchema>>({
    resolver: zodResolver(textBlockFormSchema),
    defaultValues: {
      text: '',
      description: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof textBlockFormSchema>) => {
    try {
      await createButton({
        sectionId,
        pageId,
        projectId,
        type: 'TextBlock',
        content: {
          text: values.text,
          description: values.description || '',
        },
      });
      form.reset();
      onClose();
      toast('Successfully created a title component.');
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
            name="text"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Text</FormLabel>
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
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Section title"
                    rows={3}
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
          Create
        </Button>
      </div>
    </div>
  );
};