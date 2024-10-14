import { getAuthUserId } from '@convex-dev/auth/server';
import { query } from './_generated/server';

export const get = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const projects = await ctx.db
      .query('projects')
      .withIndex('by_user', (q) => q.eq('userId', userId))
      .collect();

    return projects;
  },
});
