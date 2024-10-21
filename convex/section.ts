import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';
import { api } from './_generated/api';

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

    if (args.name === 'Default') {
      throw new Error('"Default" is not allowed to be used.');
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

export const remove = mutation({
  args: { id: v.id('sections') },
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

    const components = await ctx.runQuery(api.components.get, {
      pageId: section.pageId,
      projectId: section.projectId,
      sectionId: section._id,
    });

    components.map(async (component) => {
      await ctx.db.delete(component._id);
    });

    await ctx.db.delete(args.id);
  },
});

export const update = mutation({
  args: { id: v.id('sections'), name: v.string() },
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

    if (section.name === 'Default') {
      throw new Error('Cannot change the name of this section.');
    }

    await ctx.db.patch(args.id, {
      name: args.name,
      updatedAt: Date.now(),
    });
  },
});
