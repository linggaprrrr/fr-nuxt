<script setup lang="ts">
/**
 * Lightweight tinted callout for consequential copy that shouldn't live in
 * helper text (destructive side effects, form-level errors). Not VAlert —
 * Vuetify's tonal alert is heavier and its text relies on opacity, which
 * isn't contrast-safe on a tinted background. See DESIGN_SPEC.md §1.4, §6.4.
 */
withDefaults(defineProps<{
  tone?: 'info' | 'warning' | 'danger' | 'success'
}>(), {
  tone: 'info',
})

const iconFor: Record<string, string> = {
  info: 'bx-info-circle',
  warning: 'bx-error',
  danger: 'bx-error-circle',
  success: 'bx-check-circle',
}
</script>

<template>
  <div class="inline-alert" :class="`inline-alert--${tone}`" role="alert">
    <VIcon :icon="iconFor[tone]" size="16" class="inline-alert__icon" />
    <div class="inline-alert__body"><slot /></div>
  </div>
</template>

<style scoped>
.inline-alert {
  display: flex;
  align-items: flex-start;
  gap: var(--sp-4);
  padding: var(--sp-5);
  border-radius: var(--radius-lg);
  font-size: var(--fs-sm);
  line-height: 1.45;
}

.inline-alert__icon { flex: 0 0 auto; margin-top: 1px; }
.inline-alert__body { max-width: var(--measure); }

.inline-alert--info { background: var(--n-50); border: 1px solid var(--n-200); color: var(--text-secondary); }
.inline-alert--info .inline-alert__icon { color: var(--text-tertiary); }

.inline-alert--warning { background: var(--warning-bg); border: 1px solid var(--warning-border); color: var(--warning-text); }
.inline-alert--warning .inline-alert__icon { color: var(--warning); }

.inline-alert--danger { background: var(--danger-bg); border: 1px solid var(--danger-border); color: var(--danger-text); }
.inline-alert--danger .inline-alert__icon { color: var(--danger); }

.inline-alert--success { background: var(--success-bg); border: 1px solid var(--success-border); color: var(--success-text); }
.inline-alert--success .inline-alert__icon { color: var(--success); }
</style>
