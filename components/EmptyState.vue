<script setup lang="ts">
withDefaults(defineProps<{
  icon?: string
  title?: string
  description?: string
}>(), {
  icon: 'bx-folder-open',
  title: 'Nothing here yet',
})
</script>

<template>
  <div class="empty-state">
    <VAvatar
      size="64"
      color="primary"
      variant="tonal"
      rounded="lg"
      class="mb-4"
    >
      <VIcon :icon="icon" size="32" />
    </VAvatar>
    <h6 class="text-h6 mb-1">
      {{ title }}
    </h6>
    <p
      v-if="description"
      class="text-body-2 text-medium-emphasis mb-4 mx-auto"
      style="max-width: 360px;"
    >
      {{ description }}
    </p>
    <slot />
  </div>
</template>

<style scoped>
.empty-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 2rem 1rem;
}
</style>
