import { defineSchema, defineTable } from 'convex/server';
import { authTables } from '@convex-dev/auth/server';
import { v } from 'convex/values';

const schema = defineSchema({
  ...authTables,
  projects: defineTable({
    title: v.string(),
    userId: v.id('users'),
    updatedAt: v.number(),
  }).index('by_user', ['userId']),
  pages: defineTable({
    title: v.string(),
    projectId: v.id('projects'),
    userId: v.id('users'),
    updatedAt: v.number(),
  })
    .index('by_project', ['projectId'])
    .index('by_user_project', ['userId', 'projectId']),
  sections: defineTable({
    type: v.string(),
    pageId: v.id('pages'),
    projectId: v.id('projects'),
    userId: v.id('users'),
    updatedAt: v.number(),
  })
    .index('by_page', ['pageId'])
    .index('by_project_page', ['projectId', 'pageId'])
    .index('by_user_project_page', ['userId', 'projectId', 'pageId']),
  components: defineTable({
    sectionId: v.id('sections'),
  }),
});

export default schema;
