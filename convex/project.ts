import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

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
