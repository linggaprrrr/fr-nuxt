<script setup lang="ts">
/**
 * Groups related fields under an eyebrow title. Flex column with an
 * invariant gap — unlike VRow/VCol, spacing between fields no longer
 * depends on whether a sibling field has a hint (DESIGN_SPEC.md §1.3, §6.2).
 */
defineProps<{
  title?: string
  subtitle?: string
}>()
</script>

<template>
  <div class="form-section">
    <div v-if="title || subtitle" class="form-section__head">
      <h6 v-if="title" class="form-section__title">
        {{ title }}
      </h6>
      <p v-if="subtitle" class="form-section__subtitle">
        {{ subtitle }}
      </p>
    </div>
    <div class="form-section__fields">
      <slot />
    </div>
  </div>
</template>

<style scoped>
.form-section + .form-section {
  margin-top: var(--sp-9);
  padding-top: var(--sp-9);
  border-top: var(--border-subtle);
}

.form-section__head { margin-bottom: var(--sp-5); }

.form-section__title {
  font-size: var(--fs-2xs);
  font-weight: var(--fw-semibold);
  letter-spacing: var(--tracking-wide);
  text-transform: uppercase;
  color: var(--text-tertiary);
  margin: 0;
}

.form-section__subtitle {
  font-size: var(--fs-sm);
  color: var(--text-tertiary);
  margin: var(--sp-1) 0 0;
}

.form-section__fields {
  display: flex;
  flex-direction: column;
  gap: var(--sp-7);
}
</style>
