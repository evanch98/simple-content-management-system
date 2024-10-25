'use client';

import { Navbar } from '@/components/dashboard/navbar';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
  return (
    <section className="mx-auto h-full w-full max-w-screen-2xl px-4 lg:px-8">
      <Navbar />
      {children}
    </section>
  );
};

export default DashboardLayout;
