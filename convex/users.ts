import { getAuthUserId } from '@convex-dev/auth/server';
import { query } from './_generated/server';

export const currentUser = query({
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);

    if (!userId) {
      throw new Error('Not authenticated');
    }

    const user = ctx.db.get(userId);

    return user;
  },
});
