<script setup lang="ts">
/**
 * Groups related fields in long modal forms with an optional section title.
 * Renders a VRow so children are placed in VCol as usual.
 */
defineProps<{
  title?: string
  subtitle?: string
}>()
</script>

<template>
  <div class="form-section">
    <div v-if="title || subtitle" class="form-section__head">
      <h6 class="text-subtitle-1 font-weight-medium mb-0">
        {{ title }}
      </h6>
      <p v-if="subtitle" class="text-caption text-medium-emphasis mb-0">
        {{ subtitle }}
      </p>
    </div>
    <VRow>
      <slot />
    </VRow>
  </div>
</template>

<style scoped>
.form-section + .form-section {
  margin-top: 1.5rem;
}

.form-section__head {
  margin-bottom: 0.5rem;
}
</style>
