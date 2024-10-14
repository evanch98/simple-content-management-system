'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAuthActions } from '@convex-dev/auth/react';
import { SiGithub } from 'react-icons/si';

export const SignInCard = () => {
  const { signIn } = useAuthActions();

  const handleSignIn = () => {
    signIn('github', { redirectTo: '/' });
  };

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        <CardDescription>Use your GitHub account to sign in.</CardDescription>
      </CardHeader>
      <CardFooter>
        <Button
          onClick={handleSignIn}
          className="w-full"
        >
          <div className="flex items-center justify-center gap-x-2">
            <SiGithub className="size-4" />
            Sign in with GitHub
          </div>
        </Button>
      </CardFooter>
    </Card>
  );
};
