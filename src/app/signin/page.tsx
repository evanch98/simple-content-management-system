'use client';

import { useAuthActions } from '@convex-dev/auth/react';

export default function SignIn() {
  const { signIn } = useAuthActions();

  const handleSignIn = () => {
    signIn('github');
  };

  return <button onClick={handleSignIn}>Sign in with GitHub</button>;
}
