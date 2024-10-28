import { v } from 'convex/values';
import { httpAction, internalQuery } from './_generated/server';
import { internal } from './_generated/api';
import { Doc, Id } from './_generated/dataModel';
import {
  ComponentResponseType,
  PageResponseType,
  PublicFetchParams,
  PublicResponseType,
  SectionResponseType,
} from '@/types';
import { GenericActionCtx } from 'convex/server';

export const fetchProject = internalQuery({
  args: { id: v.id('projects') },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);

    if (!project) {
      throw new Error('Project not found.');
    }

    return project;
  },
});

export const fetchPages = internalQuery({
  args: { projectId: v.id('projects') },
  handler: async (ctx, args) => {
    const pages = await ctx.db
      .query('pages')
      .withIndex('by_project', (q) => q.eq('projectId', args.projectId))
      .collect();

    return pages;
  },
});

export const fetchSections = internalQuery({
  args: { projectId: v.id('projects'), pageId: v.id('pages') },
  handler: async (ctx, args) => {
    const sections = await ctx.db
      .query('sections')
      .withIndex('by_project_page', (q) =>
        q.eq('projectId', args.projectId).eq('pageId', args.pageId),
      )
      .collect();

    return sections;
  },
});

export const fetchComponents = internalQuery({
  args: {
    projectId: v.id('projects'),
    pageId: v.id('pages'),
    sectionId: v.id('sections'),
  },
  handler: async (ctx, args) => {
    const components = await ctx.db
      .query('components')
      .withIndex('by_project_page_section', (q) =>
        q
          .eq('projectId', args.projectId)
          .eq('pageId', args.pageId)
          .eq('sectionId', args.sectionId),
      )
      .collect();

    return components;
  },
});

export const transformComponent = (
  component: Doc<'components'>,
): ComponentResponseType => ({
  _id: component._id,
  _creationTime: component._creationTime,
  type: component.type,
  content: component.content,
  updatedAt: component.updatedAt,
});

const fetchAndTransformComponents = async (
  ctx: GenericActionCtx<any>,
  params: PublicFetchParams,
): Promise<ComponentResponseType[]> => {
  const components = await ctx.runQuery(internal.public.fetchComponents, {
    projectId: params.projectId,
    pageId: params.pageId!,
    sectionId: params.sectionId!,
  });

  return components.map(transformComponent);
};

const transformSection = async (
  ctx: GenericActionCtx<any>,
  params: PublicFetchParams,
  section: Doc<'sections'>,
): Promise<SectionResponseType> => {
  const components = await fetchAndTransformComponents(ctx, {
    ...params,
    sectionId: section._id,
  });

  return {
    _id: section._id,
    _creationTime: section._creationTime,
    name: section.name,
    updatedAt: section.updatedAt,
    components,
  };
};

const fetchAndTransformSections = async (
  ctx: GenericActionCtx<any>,
  params: PublicFetchParams,
): Promise<SectionResponseType[]> => {
  const sections = await ctx.runQuery(internal.public.fetchSections, {
    projectId: params.projectId,
    pageId: params.pageId!,
  });

  return Promise.all(
    sections.map((section) => transformSection(ctx, params, section)),
  );
};

const transformPage = async (
  ctx: GenericActionCtx<any>,
  page: Doc<'pages'>,
  params: PublicFetchParams,
): Promise<PageResponseType> => {
  const sections = await fetchAndTransformSections(ctx, {
    ...params,
    pageId: page._id,
  });

  return {
    _id: page._id,
    _creationTime: page._creationTime,
    title: page.title,
    updatedAt: page.updatedAt,
    sections,
  };
};

export const get = httpAction(async (ctx, request) => {
  const url = new URL(request.url);

  const projectId =
    url.searchParams.get('projectId') ??
    request.headers.get('projectId') ??
    null;

  if (projectId === null) {
    return new Response('Did not specify project id as query param or header', {
      status: 400,
    });
  }

  try {
    const project = await ctx.runQuery(internal.public.fetchProject, {
      id: projectId as Id<'projects'>,
    });

    const pages = await ctx.runQuery(internal.public.fetchPages, {
      projectId: project._id,
    });

    const transformedPages = await Promise.all(
      pages.map((page) => transformPage(ctx, page, { projectId: project._id })),
    );

    const response: PublicResponseType = {
      project: project,
      pages: transformedPages,
    };

    return Response.json(response);
  } catch (error) {
    return new Response(`${error}`, { status: 404 });
  }
});
