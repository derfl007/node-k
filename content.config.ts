import { defineCollection, defineContentConfig, z } from '@nuxt/content'

export default defineContentConfig({
  collections: {
    pages: defineCollection({
      type: 'page',
      source: {
        include: 'pages/*.md',
        prefix: '/'
      }
    }),
    blog: defineCollection({
      type: 'page',
      source: 'blog/*.md',
      schema: z.object({
        date: z.date(),
        title: z.string(),
        description: z.string(),
        badge: z.object({
          label: z.string(),
          color: z.union([z.literal('primary'), z.literal('secondary'), z.literal('success'), z.literal('info'), z.literal('warning'), z.literal('error'), z.literal('neutral')]).default('primary'),
          variant: z.union([z.literal('solid'), z.literal('outline'), z.literal('soft'), z.literal('subtle')]).default('subtle')
        }),
        body: z.object({
          type: z.string(),
          children: z.any(),
          toc: z.any()
        })
      }),
      indexes: [
        { columns: ['date'] }
      ]
    })
  }
})
