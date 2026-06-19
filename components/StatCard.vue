<script setup lang="ts">
withDefaults(defineProps<{
  title?: string
  value?: string | number
  icon?: string
  color?: string
  subtitle?: string
}>(), {
  color: 'primary',
})
</script>

<template>
  <VCard class="stat-card" rounded="lg">
    <VCardText class="d-flex align-center" style="gap: 1rem;">
      <VAvatar
        v-if="icon"
        :color="color"
        variant="tonal"
        rounded="lg"
        size="52"
      >
        <VIcon :icon="icon" size="28" />
      </VAvatar>
      <div class="flex-grow-1" style="min-width: 0;">
        <div class="text-body-2 text-medium-emphasis mb-1 text-truncate">
          {{ title }}
        </div>
        <div class="text-h5 font-weight-medium">
          {{ value }}
        </div>
        <div v-if="subtitle" class="text-caption text-medium-emphasis">
          {{ subtitle }}
        </div>
      </div>
      <slot name="append" />
    </VCardText>
  </VCard>
</template>
