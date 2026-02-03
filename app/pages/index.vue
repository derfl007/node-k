<script setup lang="ts">
useSeoMeta({
  title: 'node-K',
  ogTitle: 'node-K',
  description: 'Your hackerspace in Klagenfurt',
  ogDescription: 'Your hackerspace in Klagenfurt'
})

const jsEnabled = ref(false)

onMounted(() => {
  jsEnabled.value = true
})
</script>

<template>
  <div
    class="relative"
  >
    <UPageHero
      description="Your hackerspace in Klagenfurt"
      title="node-K"
    >
      <template #body>
        <NodeBg />
      </template>
    </UPageHero>
  </div>
</template>
