<script lang="ts" setup>
const route = useRoute()

const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection('pages').path(route.path).first()
})

useSeoMeta(page.value
  ? {
      title: page.value.title + ' | node-K',
      description: page.value.description,
      ogTitle: page.value.title + ' | node-K',
      ogDescription: page.value.description,
      ogUrl: `https://node-k.at/${route.path}`,
      twitterTitle: page.value.title + ' | node-K',
      twitterDescription: page.value.description
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
  <ContentRenderer
    v-if="page"
    :value="page"
  />
</template>
