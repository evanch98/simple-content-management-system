import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import { api } from './_generated/api';

export const create = mutation({
  args: {
    title: v.string(),
    projectId: v.id('projects'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const page = await ctx.db.insert('pages', {
      title: args.title,
      userId: userId,
      projectId: args.projectId,
      updatedAt: Date.now(),
    });

    await ctx.db.insert('sections', {
      name: 'Default',
      userId: userId,
      projectId: args.projectId,
      pageId: page,
      updatedAt: Date.now(),
    });

    return page;
  },
});

export const get = query({
  args: { id: v.id('pages') },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const page = await ctx.db.get(args.id);

    if (!page) {
      throw new Error('Not found');
    }

    if (page.userId !== userId) {
      throw new Error('Unauthorized');
    }

    return page;
  },
});

export const remove = mutation({
  args: { id: v.id('pages') },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const page = await ctx.db.get(args.id);

    if (!page) {
      throw new Error('Not found');
    }

    if (page.userId !== userId) {
      throw new Error('Unauthorized');
    }

    const sections = await ctx.runQuery(api.sections.get, {
      pageId: page._id,
      projectId: page.projectId,
    });

    sections.map(async (section) => {
      await ctx.db.delete(section._id);
    });

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id('pages'), title: v.string() },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const page = await ctx.db.get(args.id);

    if (!page) {
      throw new Error('Not found');
    }

    if (page.userId !== userId) {
      throw new Error('Unauthorized');
    }

    await ctx.db.patch(args.id, {
      title: args.title,
      updatedAt: Date.now(),
    });
  },
});
