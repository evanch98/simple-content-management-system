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
    name: v.string(),
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
    pageId: v.id('pages'),
    projectId: v.id('projects'),
    userId: v.id('users'),
    updatedAt: v.number(),
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
  })
    .index('by_section', ['sectionId'])
    .index('by_page_section', ['pageId', 'sectionId'])
    .index('by_project_page_section', ['projectId', 'pageId', 'sectionId'])
    .index('by_user_project_page_section', [
      'userId',
      'projectId',
      'pageId',
      'sectionId',
    ])
    .index('by_section_type', ['sectionId', 'type']),
  media: defineTable({
    projectId: v.id('projects'),
    userId: v.id('users'),
    title: v.string(),
    file: v.id('_storage'),
  })
    .index('by_project', ['projectId'])
    .index('by_user_project', ['userId', 'projectId']),
});

export default schema;
