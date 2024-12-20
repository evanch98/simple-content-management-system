'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useAuthActions } from '@convex-dev/auth/react';
import { useRouter } from 'next/navigation';

interface UserButtonProps {
  profileUrl?: string;
  profileName?: string;
}

export const UserButton = ({
  profileName = 'SCMS',
  profileUrl,
}: UserButtonProps) => {
  const initials = profileName.substring(0, 2).toUpperCase();
  const { signOut } = useAuthActions();

  const router = useRouter();

  const handleSignOut = () => {
    signOut();
    router.replace('/auth');
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Avatar className="size-8">
          <AvatarImage src={profileUrl} />
          <AvatarFallback>{initials}</AvatarFallback>
        </Avatar>
      </PopoverTrigger>
      <PopoverContent
        className="w-36 p-1"
        side="left"
      >
        <Button
          onClick={handleSignOut}
          variant="outline"
          className="w-full"
        >
          Sign out
        </Button>
      </PopoverContent>
    </Popover>
  );
};
