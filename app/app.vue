<script setup lang="ts">
const colorMode = useColorMode()

const color = computed(() => colorMode.value === 'dark' ? '#171717' : 'white')

useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
    { key: 'theme-color', name: 'theme-color', content: color }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'alternate', href: '/blog/rss.xml', type: 'application/rss+xml', title: 'node-K RSS Feed' },
    { rel: 'alternate', href: '/blog/atom.xml', type: 'application/atom+xml', title: 'node-K Atom Feed' },
    { rel: 'alternate', href: '/blog/feed.json', type: 'application/feed+json', title: 'node-K JSON Feed' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

useSeoMeta({
  ogSiteName: 'node-K',
  ogImage: 'https://node-k.at/images/nodes-static.png',
  twitterImage: 'https://node-k.at/images/nodes-static.png',
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <UApp :toaster="{ expand: false }">
    <AppHeader />

    <UMain>
      <NuxtPage />
    </UMain>

    <AppFooter />
  </UApp>
</template>
