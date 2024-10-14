import { SignInCard } from '@/components/auth/sign-in-card';

const AuthPage = () => {
  return (
    <main className="flex h-full w-full flex-col items-center justify-center px-2 sm:px-0">
      <SignInCard />
    </main>
  );
};

export default AuthPage;
