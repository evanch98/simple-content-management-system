import { Button, ButtonProps } from '@/components/ui/button';

interface ButtonPreviewProps extends ButtonProps {
  content: string;
}

export const ButtonPreview = ({ content, ...props }: ButtonPreviewProps) => {
  return <Button {...props}>{content}</Button>;
};
