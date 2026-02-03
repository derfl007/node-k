<script lang="ts" setup>
const { data: meetings } = await useAsyncData('meetings', () => queryCollection('meetings').order('date', 'DESC').all())
</script>

<template>
  <UPageHero title="Meetings">
    <UChangelogVersions>
      <UChangelogVersion
        v-for="meeting in meetings"
        :key="meeting.id"
        :title="meeting.title"
        :date="meeting.date"
      >
        <template #description>
          <ContentRenderer :value="meeting.body" />
        </template>
      </UChangelogVersion>
    </UChangelogVersions>
  </UPageHero>
</template>
