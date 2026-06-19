<script setup lang="ts">
withDefaults(defineProps<{
  text?: string
  size?: number
}>(), {
  size: 36,
})
</script>

<template>
  <div class="loading-state">
    <VProgressCircular
      indeterminate
      color="primary"
      :size="size"
      :width="3"
    />
    <span v-if="text" class="text-body-2 text-medium-emphasis mt-3">{{ text }}</span>
  </div>
</template>

<style scoped>
.loading-state {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 1.5rem;
}
</style>
