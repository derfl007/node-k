<script lang="ts" setup>
const route = useRoute()

console.log(route.path)

const { data: post } = await useAsyncData(route.path, () => {
  return queryCollection('blog').path(route.path).first()
})

const { data: surround } = await useAsyncData(`${route.path}-surround`, () => {
  return queryCollectionItemSurroundings('blog', route.path, {
    fields: ['description']
  })
})

useSeoMeta(post.value
  ? {
      title: post.value.title + ' | node-K',
      description: post.value.description,
      ogTitle: post.value.title + ' | node-K',
      ogDescription: post.value.description,
      ogUrl: `https://node-k.at/${route.path}`,
      twitterTitle: post.value.title + ' | node-K',
      twitterDescription: post.value.description
    }
  : {
      title: '404 | node-K',
      description: 'Sorry, we couldn\'t find this page',
      ogTitle: '404 | node-K',
      ogDescription: 'Sorry, we couldn\'t find this page',
      ogUrl: 'https://node-k.at/',
      twitterTitle: '404 | node-K',
      twitterDescription: 'Sorry, we couldn\'t find this page'
    })
</script>

<template>
  <UContainer v-if="post">
    <UPage>
      <UPageHeader
        v-bind="post"
      >
        <template #headline>
          <UBadge
            v-bind="post.badge"
          />
          <span class="text-muted">&middot;</span>
          <time class="text-muted">{{ new Date(post.date).toLocaleDateString('en', { year: 'numeric', month: 'short', day: 'numeric' }) }}</time>
        </template>
      </UPageHeader>
      <UPageBody>
        <ContentRenderer
          :value="post"
        />
        <USeparator />
        <UContentSurround :surround="surround" />
      </UPageBody>
    </UPage>
  </UContainer>
</template>
