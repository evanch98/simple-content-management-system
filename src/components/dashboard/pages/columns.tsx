'use client';

import { ColumnDef } from '@tanstack/react-table';
import { RedirectAction } from './redirect-action';
import { Button } from '@/components/ui/button';
import { CaretSortIcon } from '@radix-ui/react-icons';

export type PageColumn = {
  id: string;
  title: string;
  createdAt: number;
};

export const columns: ColumnDef<PageColumn>[] = [
  {
    accessorKey: 'id',
    header: '',
    cell: ({ row }) => {
      return <RedirectAction pageId={row.original.id} />;
    },
  },
  {
    accessorKey: 'title',
    header: 'Title',
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Created at
          <CaretSortIcon className="ml-2 size-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const time = new Date(row.getValue('createdAt') as number);
      return (
        <div className="ml-4">
          {time.getFullYear()}-{time.getMonth() + 1}-{time.getDate()}
        </div>
      );
    },
  },
];
