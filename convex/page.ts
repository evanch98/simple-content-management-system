import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

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
