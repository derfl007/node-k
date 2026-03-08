<script lang="ts" setup>
const { data: meetings } = await useAsyncData('meetings', () => queryCollection('blog').order('date', 'DESC').all())
</script>

<template>
  <UBlogPosts>
    <UBlogPost
      v-for="meeting in meetings"
      :key="meeting.id"
      :title="meeting.title"
      :date="meeting.date"
      :to="meeting.path"
      :badge="meeting.badge"
    >
      <template #title>
        <h2
          :id="meeting.id"
          class="relative text-xl text-pretty font-semibold text-highlighted scroll-mt-(--ui-header-height)"
        >
          {{ meeting.title }}
        </h2>
      </template>
      <template #description>
        {{ meeting.description }}
      </template>
    </UBlogPost>
  </UBlogPosts>
</template>
