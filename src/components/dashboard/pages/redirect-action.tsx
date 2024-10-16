'use client';

import { Button } from '@/components/ui/button';
import { MdOutlineZoomOutMap } from 'react-icons/md';
import { useParams, useRouter } from 'next/navigation';

interface RedirectActionProps {
  pageId: string;
}

export const RedirectAction = ({ pageId }: RedirectActionProps) => {
  const params = useParams();
  const router = useRouter();

  const onClick = () => {
    router.push(`/${params.projectId}/pages/${pageId}`);
  };

  return (
    <Button
      onClick={onClick}
      size="sm"
      variant="outline"
    >
      <div className="flex items-center gap-x-2">
        <MdOutlineZoomOutMap className="size-4" />
        Open
      </div>
    </Button>
  );
};
