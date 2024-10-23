import { v } from 'convex/values';
import { mutation } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

export const create = mutation({
  args: {
    type: v.union(
      v.literal('Badge'),
      v.literal('Button'),
      v.literal('Card'),
      v.literal('Image'),
      v.literal('Title'),
      v.literal('TextBlock'),
    ),
    content: v.record(
      v.string(),
      v.union(
        v.string(),
        v.array(v.string()),
        v.array(
          v.object({ content: v.string(), href: v.optional(v.string()) }),
        ),
      ),
    ),
    sectionId: v.id('sections'),
    pageId: v.id('pages'),
    projectId: v.id('projects'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const component = await ctx.db.insert('components', {
      type: args.type,
      content: args.content,
      sectionId: args.sectionId,
      userId: userId,
      projectId: args.projectId,
      pageId: args.pageId,
      updatedAt: Date.now(),
    });

    return component;
  },
});

export const remove = mutation({
  args: { id: v.id('components') },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const component = await ctx.db.get(args.id);

    if (!component) {
      throw new Error('Not found');
    }

    if (component.userId !== userId) {
      throw new Error('Unauthorized');
    }

    await ctx.db.delete(args.id);
  },
});
