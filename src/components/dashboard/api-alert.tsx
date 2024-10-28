import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { GeistMono } from 'geist/font/mono';
import { useState } from 'react';
import { TbApi } from 'react-icons/tb';
import { toast } from 'sonner';
import { Button } from '../ui/button';
import { Check, Copy } from 'lucide-react';

interface ApiAlertProps {
  projectId: string;
}

export const ApiAlert = ({ projectId }: ApiAlertProps) => {
  const [isCopied, setIsCopied] = useState(false);
  const url = `https://enchanted-newt-444.convex.site/project?projectId=${projectId}`;

  const onCopy = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(url);
    toast('Url copied to the clipboard.');
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <Alert className={GeistMono.className}>
      <AlertTitle className="flex items-center justify-between">
        <div className="flex items-center w-full">
          <TbApi className="mr-2 size-5 flex-shrink-0" />
          <p className="truncate text-xs font-semibold">{url}</p>
        </div>
        <Button
          variant="outline"
          size="icon"
          onClick={onCopy}
          className="flex-shrink-0"
        >
          {isCopied ? (
            <Check className="size-3.5 flex-shrink-0 cursor-pointer" />
          ) : (
            <Copy className="size-3.5 flex-shrink-0 cursor-pointer" />
          )}
          <span className="sr-only">Copy</span>
        </Button>
      </AlertTitle>
    </Alert>
  );
};
