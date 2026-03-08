import dayjs from 'dayjs'
import { Feed } from 'feed'

export default defineEventHandler(async (event) => {
  const type = getRouterParam(event, 'type')

  const posts = await queryCollection(event, 'blog').order('date', 'DESC').limit(20).all()

  const feed = new Feed({
    title: 'Node-K Blog',
    description: 'Announcements and Meeting notes of the node-K Hackerspace in Carinthia',
    id: 'https://node-k.at',
    link: 'https://node-k.at/blog',
    language: 'en',
    image: 'https://node-k.at/images/nodes-static.png',
    favicon: 'https://node-k.at/favicon.ico',
    copyright: '© node-K Hackerspace',
    updated: dayjs(posts[0]?.date).toDate(),
    feedLinks: {
      rss: 'https://node-k.at/blog/rss.xml',
      json: 'https://node-k.at/blog/feed.json',
      atom: 'https://node-k.at/blog/atom.xml'
    }
  })

  posts.forEach((post) => {
    feed.addItem({
      title: post.title,
      description: post.description,
      id: post.id,
      link: `https://node-k.at/${post.id}`,
      date: dayjs(post.date).toDate()
    })
  })

  if (type === 'rss.xml') {
    setResponseHeader(event, 'content-type', 'application/xml')
    return feed.rss2()
  }
  if (type === 'feed.json') {
    setResponseHeader(event, 'content-type', 'application/feed+json')
    return feed.json1()
  }
  if (type === 'atom.xml') {
    setResponseHeader(event, 'content-type', 'application/xml')
    return feed.atom1()
  }

  setResponseHeader(event, 'content-type', 'text/plain')
  setResponseStatus(event, 404, 'Only `rss.xml`, `feed.json` and `atom.xml` are supported')
  return
})
