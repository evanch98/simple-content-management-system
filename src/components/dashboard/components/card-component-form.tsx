import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { z } from 'zod';
import { FieldArrayPath, useFieldArray, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import { useComponentCreateModal } from '@/store/use-component-create-modal';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Id } from '../../../../convex/_generated/dataModel';
import { useMutation } from 'convex/react';
import { api } from '../../../../convex/_generated/api';
import { PlusCircle, X } from 'lucide-react';

export const cardFormSchema = z.object({
  title: z
    .string()
    .min(1, { message: 'Content should be at least 1 character.' })
    .max(20, { message: 'Content cannot be more than 20 characters.' }),
  description: z.string().optional(),
  content: z.string().optional(),
  imgUrls: z.array(z.string().url()).optional(),
  buttons: z
    .array(z.object({ content: z.string(), href: z.string().optional() }))
    .optional(),
});

type FormValues = z.infer<typeof cardFormSchema>;

interface CardComponentFormProps {
  pageId: Id<'pages'>;
  sectionId: Id<'sections'>;
  projectId: Id<'projects'>;
}

export const CardComponentForm = ({
  pageId,
  sectionId,
  projectId,
}: CardComponentFormProps) => {
  const { onClose } = useComponentCreateModal();
  const createCard = useMutation(api.component.create);

  const form = useForm<z.infer<typeof cardFormSchema>>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      imgUrls: [''],
      buttons: [{ content: '', href: '' }],
    },
  });

  const {
    fields: buttonFields,
    append: appendButton,
    remove: removeButton,
  } = useFieldArray({
    control: form.control,
    name: 'buttons' as FieldArrayPath<FormValues>,
  });

  const {
    fields: imgUrlFields,
    append: appendImgUrl,
    remove: removeImgUrl,
  } = useFieldArray({
    control: form.control,
    name: 'imgUrls' as FieldArrayPath<FormValues>,
  });

  const onAppendImage = () => {
    // @ts-ignore
    appendImgUrl('');
  };

  const onSubmit = async (values: z.infer<typeof cardFormSchema>) => {
    try {
      await createCard({
        sectionId,
        pageId,
        projectId,
        type: 'Card',
        content: {
          title: values.title,
          description: values.description || '',
          content: values.content || '',
          imgUrls: values.imgUrls || [''],
          buttons: values.buttons || [{ content: '', href: '' }],
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
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Card title"
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
                <FormLabel>Description (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Card description"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="content"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Content (optional)</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Card content"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div>
            <FormLabel className="mr-2">Image URLs</FormLabel>
            {imgUrlFields.map((field, index) => (
              <FormField
                key={field.id}
                control={form.control}
                name={`imgUrls.${index}` as const}
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="my-2 flex items-center justify-center gap-x-2">
                        <Input
                          placeholder="Image URL"
                          {...field}
                        />
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          onClick={() => removeImgUrl(index)}
                        >
                          <X className="size-3.5 text-destructive" />
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={onAppendImage}
            >
              <PlusCircle className="mr-2 size-3.5" />
              Add Image
            </Button>
          </div>
          <div>
            <FormLabel>Buttons</FormLabel>
            {buttonFields.map((field, index) => (
              <div
                key={field.id}
                className="space-y-2"
              >
                <FormField
                  control={form.control}
                  name={`buttons.${index}.content` as const}
                  render={({ field }) => (
                    <FormItem className="my-2">
                      <FormControl>
                        <Input
                          placeholder="Button content"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`buttons.${index}.href` as const}
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          placeholder="Button Href (optional)"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex flex-col items-center gap-2 sm:flex-row">
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => appendButton({ content: '', href: '' })}
                  >
                    <PlusCircle className="mr-2 size-3.5" />
                    Add Button
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => removeButton(index)}
                    className="text-destructive"
                  >
                    <X className="mr-2 size-3.5" />
                    Remove Button
                  </Button>
                </div>
              </div>
            ))}
          </div>
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