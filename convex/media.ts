import { v } from 'convex/values';
import { mutation, query } from './_generated/server';
import { getAuthUserId } from '@convex-dev/auth/server';

export const generateUploadUrl = mutation(async (ctx) => {
  return await ctx.storage.generateUploadUrl();
});

export const uploadFile = mutation({
  args: {
    storageId: v.id('_storage'),
    projectId: v.id('projects'),
    title: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    await ctx.db.insert('media', {
      userId,
      projectId: args.projectId,
      title: args.title,
      file: args.storageId,
    });
  },
});

export const getFiles = query({
  args: {
    projectId: v.id('projects'),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const files = await ctx.db
      .query('media')
      .withIndex('by_user_project', (q) =>
        q.eq('userId', userId).eq('projectId', args.projectId),
      )
      .collect();

    return Promise.all(
      files.map(async (file) => ({
        ...file,
        ...{ url: await ctx.storage.getUrl(file.file) },
      })),
    );
  },
});
