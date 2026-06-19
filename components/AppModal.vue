<script setup lang="ts">
import { useDisplay } from 'vuetify'

/**
 * Responsive modal shell with consistent header / scrollable body / footer.
 * - Fullscreen on mobile (prevents messy modals on small screens)
 * - Sticky header + footer, scrollable body for long forms
 * - Built-in primary/secondary actions with loading state (override via #footer)
 *
 * Usage:
 *   <AppModal v-model="show" title="Add outlet" icon="bx-store" :loading="isSubmitting" confirm-text="Save" @confirm="save">
 *     ...form fields...
 *   </AppModal>
 */
const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  subtitle?: string
  icon?: string
  maxWidth?: number | string
  loading?: boolean
  persistent?: boolean
  hideFooter?: boolean
  hideCancel?: boolean
  confirmText?: string
  cancelText?: string
  confirmColor?: string
  confirmDisabled?: boolean
}>(), {
  maxWidth: 600,
  confirmText: 'Save',
  cancelText: 'Cancel',
  confirmColor: 'primary',
})

const emit = defineEmits<{
  'update:modelValue': [boolean]
  'confirm': []
  'cancel': []
}>()

const { smAndDown } = useDisplay()

const isOpen = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
})

function onCancel() {
  emit('cancel')
  isOpen.value = false
}
</script>

<template>
  <VDialog
    v-model="isOpen"
    :max-width="smAndDown ? undefined : maxWidth"
    :fullscreen="smAndDown"
    :persistent="persistent || loading"
    transition="dialog-bottom-transition"
  >
    <VCard class="app-modal" :rounded="smAndDown ? 0 : 'lg'">
      <!-- Header -->
      <div class="app-modal__header">
        <slot name="header">
          <div class="d-flex align-center" style="gap: 0.75rem; min-width: 0;">
            <VAvatar
              v-if="icon"
              color="primary"
              variant="tonal"
              rounded="lg"
              size="40"
            >
              <VIcon :icon="icon" size="22" />
            </VAvatar>
            <div style="min-width: 0;">
              <h5 class="text-h6 mb-0 text-truncate">
                {{ title }}
              </h5>
              <span v-if="subtitle" class="text-body-2 text-medium-emphasis">{{ subtitle }}</span>
            </div>
          </div>
        </slot>
        <VBtn
          icon
          variant="text"
          size="small"
          :disabled="loading"
          class="flex-shrink-0"
          @click="onCancel"
        >
          <VIcon icon="bx-x" />
        </VBtn>
      </div>

      <VDivider />

      <!-- Body -->
      <div class="app-modal__body">
        <VForm @submit.prevent="emit('confirm')">
          <slot />
          <!-- hidden submit enables Enter-to-submit -->
          <button type="submit" class="d-none" aria-hidden="true" tabindex="-1" />
        </VForm>
      </div>

      <!-- Footer -->
      <template v-if="!hideFooter">
        <VDivider />
        <div class="app-modal__footer">
          <slot name="footer">
            <VBtn
              v-if="!hideCancel"
              variant="tonal"
              color="secondary"
              :disabled="loading"
              @click="onCancel"
            >
              {{ cancelText }}
            </VBtn>
            <VBtn
              :color="confirmColor"
              variant="flat"
              :loading="loading"
              :disabled="confirmDisabled || loading"
              @click="emit('confirm')"
            >
              {{ confirmText }}
            </VBtn>
          </slot>
        </div>
      </template>
    </VCard>
  </VDialog>
</template>

<style lang="scss" scoped>
.app-modal {
  display: flex;
  flex-direction: column;
  max-height: 90vh;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: 1rem 1.25rem;
    flex: 0 0 auto;
  }

  &__body {
    padding: 1.25rem;
    overflow-y: auto;
    flex: 1 1 auto;
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: 0.5rem;
    padding: 0.875rem 1.25rem;
    flex: 0 0 auto;
  }
}

@media (max-width: 600px) {
  .app-modal { max-height: 100vh; height: 100%; }
}
</style>
