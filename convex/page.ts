import { v } from 'convex/values';
import { mutation } from './_generated/server';
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
