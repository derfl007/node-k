<script setup lang="ts">

</script>

<template>
  <USeparator
    class="h-px"
  />

  <UFooter :ui="{ top: 'border-b border-default' }">
    <template #left>
      <p class="text-sm text-muted">
        © {{ new Date().getFullYear() }} node-K
      </p>
    </template>

    <template #right>
      <UButton
        to="https://discord.gg/57xttcjcaS"
        target="_blank"
        icon="i-simple-icons-discord"
        aria-label="Nuxt on Discord"
        color="neutral"
        variant="ghost"
      />
      <UButton
        to="https://signal.group/#CjQKIJFmnOuw7tTi8EGPW0Mqelrh1mzzDkp8lKfH-b2jnpr9EhBsYU35Q3l5CGJo_AElwWi3"
        target="_blank"
        icon="i-simple-icons-signal"
        aria-label="Nuxt on X"
        color="neutral"
        variant="ghost"
      />
    </template>
  </UFooter>
</template>
