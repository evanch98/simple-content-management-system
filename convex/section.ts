import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

export const create = mutation({
  args: {
    name: v.string(),
    projectId: v.id('projects'),
    pageId: v.id('pages'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const section = await ctx.db.insert('sections', {
      name: args.name,
      userId: userId,
      projectId: args.projectId,
      pageId: args.pageId,
      updatedAt: Date.now(),
    });

    return section;
  },
});

export const get = query({
  args: {
    id: v.id('sections'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const section = await ctx.db.get(args.id);

    if (!section) {
      throw new Error('Not found');
    }

    if (section.userId !== userId) {
      throw new Error('Unauthorized');
    }

    return section;
  },
});
