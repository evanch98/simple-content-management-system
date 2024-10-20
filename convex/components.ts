import { v } from 'convex/values';
import { query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

export const get = query({
  args: {
    projectId: v.id('projects'),
    pageId: v.id('pages'),
    sectionId: v.id('sections'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const components = await ctx.db
      .query('components')
      .withIndex('by_user_project_page_section', (q) =>
        q
          .eq('userId', userId)
          .eq('projectId', args.projectId)
          .eq('pageId', args.pageId)
          .eq('sectionId', args.sectionId),
      )
      .collect();

    return components;
  },
});
