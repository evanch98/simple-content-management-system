import { Doc, Id } from '../convex/_generated/dataModel';

export type RouteType = {
  href: string;
  label: string;
  active: boolean;
};

export const ComponentEnum = [
  'Badge',
  'Button',
  'Card',
  'Image',
  'Title',
  'Text',
  'TextBlock',
  'Link',
] as const;

export type ComponentType = (typeof ComponentEnum)[number];

export type ComponentResponseType = {
  _creationTime: number;
  _id: string;
  updatedAt: number;
  type: ComponentType;
  content: Record<
    string,
    string | string[] | { content: string; href?: string }[]
  >;
};

export type SectionResponseType = {
  _creationTime: number;
  _id: string;
  name: string;
  updatedAt: number;
  components?: ComponentResponseType[];
};

export type PageResponseType = {
  _creationTime: number;
  _id: string;
  title: string;
  updatedAt: number;
  sections?: SectionResponseType[];
};

export type PublicResponseType = {
  project: Doc<'projects'>;
  pages: PageResponseType[];
};

export type PublicFetchParams = {
  projectId: Id<'projects'>;
  pageId?: Id<'pages'>;
  sectionId?: Id<'sections'>;
};
