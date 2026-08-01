<script setup lang="ts">
/**
 * Title + description + trailing control row, for settings toggles/switches.
 * Replaces hand-rolled `d-flex justify-space-between` blocks with inline hex
 * borders scattered across access-methods.vue and similar pages.
 */
defineProps<{
  title: string
  description?: string
}>()
</script>

<template>
  <div class="settings-card">
    <div class="settings-card__text">
      <p class="settings-card__title">{{ title }}</p>
      <p v-if="description" class="settings-card__desc">{{ description }}</p>
    </div>
    <div class="settings-card__control">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.settings-card {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--sp-6);
  padding: var(--sp-6) 0;
}

.settings-card + .settings-card { border-top: var(--border-subtle); }

.settings-card__text { min-width: 0; }

.settings-card__title {
  font-size: var(--fs-md);
  font-weight: var(--fw-medium);
  color: var(--text-primary);
  margin: 0;
}

.settings-card__desc {
  font-size: var(--fs-sm);
  color: var(--text-tertiary);
  margin: var(--sp-1) 0 0;
  max-width: var(--measure);
}

.settings-card__control { flex: 0 0 auto; display: flex; align-items: center; gap: var(--sp-5); }
</style>
