import { v } from 'convex/values';
import { query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

export const get = query({
  args: { projectId: v.id('projects') },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const pages = await ctx.db
      .query('pages')
      .withIndex('by_user_project', (q) =>
        q.eq('userId', userId).eq('projectId', args.projectId),
      )
      .collect();

    return pages;
  },
});
