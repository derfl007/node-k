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
    meetings: defineCollection({
      type: 'data',
      source: 'meetings/*.md',
      schema: z.object({
        date: z.date(),
        title: z.string(),
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
