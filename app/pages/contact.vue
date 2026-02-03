<script lang="ts" setup>
useSeoMeta({
  title: 'node-K | Contact',
  ogTitle: 'node-K | Contact',
  description: 'Links to our discord server and signal group',
  ogDescription: 'Links to our discord server and signal group'
})
</script>

<template>
  <UPageHero title="Contact">
    <UPageCTA
      title="Join the Discord Server!"
      description="Our Discord server is where we hang out together and announce any events or meetings, join to stay in touch!"
      :links="[{ label: 'Scan the code or click here', href: 'https://discord.gg/57xttcjcaS', icon: 'i-simple-icons-discord' }]"
      orientation="horizontal"
    >
      <NuxtImg
        class="justify-self-end h-full"
        src="/images/qr-discord.png"
        alt="QR-Code with the link to the node-K Discord Server"
      />
    </UPageCTA>
    <USeparator>or</USeparator>
    <UPageCTA
      title="Join the Signal Group!"
      description="If you're just interested in announcements, we'll also let you know in our signal group!"
      :links="[{ label: 'Scan the code or click here', href: 'https://signal.group/#CjQKIJFmnOuw7tTi8EGPW0Mqelrh1mzzDkp8lKfH-b2jnpr9EhBsYU35Q3l5CGJo_AElwWi3', icon: 'i-simple-icons-signal' }]"
      orientation="horizontal"
    >
      <NuxtImg
        class="justify-self-end h-full"
        src="/images/qr-signal.png"
        alt="QR-Code with the link to the node-K Signal Group"
      />
    </UPageCTA>
  </UPageHero>
</template>
