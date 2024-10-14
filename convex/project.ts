import { v } from 'convex/values';
import {
  httpAction,
  internalQuery,
  mutation,
  query,
} from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import { Id } from './_generated/dataModel';
import { internal } from './_generated/api';

export const create = mutation({
  args: {
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const project = await ctx.db.insert('projects', {
      title: args.title,
      userId: userId,
      updatedAt: Date.now(),
    });

    return project;
  },
});

export const get = query({
  args: { id: v.id('projects') },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const project = await ctx.db.get(args.id);

    if (!project) {
      throw new Error('Not found');
    }

    if (project.userId !== userId) {
      throw new Error('Unauthorized');
    }

    return project;
  },
});

export const publicGet = httpAction(async (ctx, request) => {
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
    const project = await ctx.runQuery(internal.project.fetchProject, {
      id: projectId as Id<'projects'>,
    });

    return Response.json(project);
  } catch (error) {
    return new Response(`${error}`, { status: 404 });
  }
});

export const fetchProject = internalQuery({
  args: { id: v.id('projects') },
  handler: async (ctx, args) => {
    const project = await ctx.db.get(args.id);

    if (!project) {
      throw new Error('Not found');
    }

    return project;
  },
});
