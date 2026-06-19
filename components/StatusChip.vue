<script setup lang="ts">
/**
 * Semantic status badge. Maps common status strings to theme colors.
 * Override or extend with the `map` prop.
 */
const props = defineProps<{
  status: string
  label?: string
  map?: Record<string, string>
}>()

const defaultMap: Record<string, string> = {
  active: 'success', success: 'success', paid: 'success', completed: 'success', approved: 'success', done: 'success', enabled: 'success',
  pending: 'warning', processing: 'warning', waiting: 'warning', ongoing: 'warning',
  inactive: 'secondary', draft: 'secondary', disabled: 'secondary', closed: 'secondary',
  expired: 'error', failed: 'error', cancelled: 'error', canceled: 'error', rejected: 'error', error: 'error',
}

const color = computed(() => {
  const key = props.status?.toLowerCase?.() ?? ''
  return props.map?.[key] ?? defaultMap[key] ?? 'secondary'
})
</script>

<template>
  <VChip
    :color="color"
    size="small"
    label
    class="text-capitalize font-weight-medium"
  >
    {{ label ?? status }}
  </VChip>
</template>
