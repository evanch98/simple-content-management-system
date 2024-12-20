import { v } from 'convex/values';
import {
  httpAction,
  internalQuery,
  mutation,
  query,
} from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import { Id } from './_generated/dataModel';
import { api, internal } from './_generated/api';

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

export const update = mutation({
  args: { id: v.id('projects'), title: v.string() },
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

    await ctx.db.patch(args.id, {
      title: args.title,
      updatedAt: Date.now(),
    });
  },
});

export const remove = mutation({
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

    const pages = await ctx.runQuery(api.pages.get, {
      projectId: project._id,
    });

    pages.map(async (page) => {
      await ctx.runMutation(api.page.remove, { id: page._id });
    });

    const files = await ctx.runQuery(api.media.getFiles, {
      projectId: project._id,
    });

    files.map(async (file) => {
      await ctx.runMutation(api.media.remove, {
        id: file._id,
        storageId: file.file,
      });
    });

    await ctx.db.delete(args.id);
  },
});
