'use client';

import { useQuery } from 'convex/react';
import { api } from '../../../../../convex/_generated/api';
import { Id } from '../../../../../convex/_generated/dataModel';

interface DashboardPageProps {
  params: { projectId: string };
}

const DashboardPage = ({ params }: DashboardPageProps) => {
  const project = useQuery(api.project.get, {
    id: params.projectId as Id<'projects'>,
  });

  return <main>{project?.title}</main>;
};

export default DashboardPage;
