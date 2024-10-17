import { getAuthUserId } from '@convex-dev/auth/server';
import { query } from './_generated/server';
import { v } from 'convex/values';

export const get = query({
  args: { projectId: v.id('projects'), pageId: v.id('pages') },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const sections = await ctx.db
      .query('sections')
      .withIndex('by_user_project_page', (q) =>
        q
          .eq('userId', userId)
          .eq('projectId', args.projectId)
          .eq('pageId', args.pageId),
      )
      .collect();

    return sections;
  },
});
