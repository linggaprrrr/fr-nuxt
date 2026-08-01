<script setup lang="ts">
/**
 * Label-above field wrapper — the fix for Vuetify's floating-label/value collision.
 * Owns label + helper/error text; the slot renders a plain VTextField/VSelect/etc.
 * (no label prop on those — this is the label). See DESIGN_SPEC.md §3.1, §6.1.
 *
 * Usage:
 *   <FormField label="Jumlah kertas terpasang" helper="Isi setelah mengganti kertas.">
 *     <template #default="{ id, describedBy }">
 *       <VTextField :id="id" v-model="x" :aria-describedby="describedBy" placeholder="cth: 1000" />
 *     </template>
 *   </FormField>
 */
const props = defineProps<{
  label: string
  helper?: string
  error?: string
  optional?: boolean
  hint?: string
  width?: 'full' | 'num' | 'date' | 'code'
}>()

const id = useId()
const helperId = `${id}-helper`
const describedBy = computed(() => (props.error || props.helper) ? helperId : undefined)
</script>

<template>
  <div class="form-field" :class="width ? `form-field--${width}` : undefined">
    <div class="form-field__labelrow">
      <label :for="id" class="form-field__label">{{ label }}</label>
      <VTooltip v-if="hint" location="top">
        <template #activator="{ props: tip }">
          <VIcon v-bind="tip" icon="bx-info-circle" size="14" class="form-field__hint" tabindex="0" />
        </template>
        {{ hint }}
      </VTooltip>
      <span v-if="optional" class="form-field__optional">Opsional</span>
    </div>

    <slot :id="id" :described-by="describedBy" :invalid="!!error" />

    <p
      v-if="error || helper"
      :id="helperId"
      class="form-field__msg"
      :class="{ 'form-field__msg--error': error }"
      :role="error ? 'alert' : undefined"
    >
      {{ error || helper }}
    </p>
  </div>
</template>

<style scoped>
.form-field { display: flex; flex-direction: column; }

.form-field--num { max-width: var(--input-w-num); }
.form-field--date { max-width: var(--input-w-date); }
.form-field--code { max-width: var(--input-w-code); }

.form-field__labelrow {
  display: flex;
  align-items: center;
  gap: var(--sp-2);
  margin-bottom: var(--sp-3);
}

.form-field__label {
  font-size: var(--fs-sm);
  font-weight: var(--fw-medium);
  color: var(--text-secondary);
}

.form-field__hint { color: var(--text-tertiary); cursor: help; }

.form-field__optional {
  margin-left: auto;
  font-size: var(--fs-xs);
  color: var(--text-tertiary);
}

.form-field__msg {
  margin: var(--sp-3) 0 0;
  font-size: var(--fs-sm);
  color: var(--text-tertiary);
  max-width: var(--measure);
}

.form-field__msg--error { color: var(--danger-text); }
</style>
