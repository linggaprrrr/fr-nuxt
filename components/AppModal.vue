<script setup lang="ts">
import { useDisplay } from 'vuetify'

/**
 * Responsive modal shell with consistent header / scrollable body / footer.
 * - Fullscreen on mobile (prevents messy modals on small screens)
 * - Sticky header + footer, scrollable body for long forms
 * - Built-in primary/secondary actions with loading state (override via #footer)
 * - Header/footer dividers only appear once the body is actually scrolled,
 *   instead of unconditionally (DESIGN_SPEC.md §1.7, §4.2)
 *
 * Usage:
 *   <AppModal v-model="show" title="Add outlet" description="test self service" size="sm" :loading="isSubmitting" confirm-text="Save" @confirm="save">
 *     ...form fields...
 *   </AppModal>
 *
 * `icon` (tonal avatar in the header) is a legacy affordance kept for pages
 * not yet migrated — new dialogs should prefer `description` and omit `icon`.
 */
const SIZE_WIDTH: Record<string, number> = { sm: 480, md: 600, lg: 800, xl: 1040 }

const props = withDefaults(defineProps<{
  modelValue: boolean
  title?: string
  subtitle?: string
  description?: string
  icon?: string
  size?: 'sm' | 'md' | 'lg' | 'xl'
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
  size: 'md',
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

const resolvedMaxWidth = computed(() => props.maxWidth ?? SIZE_WIDTH[props.size])

const isOpen = computed({
  get: () => props.modelValue,
  set: v => emit('update:modelValue', v),
})

function onCancel() {
  emit('cancel')
  isOpen.value = false
}

// Dividers appear only once there's something to divide from — a body that
// never scrolls has no business drawing a permanent seam under the header.
const bodyEl = ref<HTMLElement>()
const scrolledTop = ref(false)
const scrolledBottom = ref(false)

function onBodyScroll() {
  const el = bodyEl.value
  if (!el) return
  scrolledTop.value = el.scrollTop > 0
  scrolledBottom.value = Math.ceil(el.scrollTop + el.clientHeight) < el.scrollHeight
}

watch(isOpen, async open => {
  if (!open) return
  await nextTick()
  onBodyScroll()
})
</script>

<template>
  <VDialog
    v-model="isOpen"
    :max-width="smAndDown ? undefined : resolvedMaxWidth"
    :fullscreen="smAndDown"
    :persistent="persistent || loading"
    transition="dialog-bottom-transition"
  >
    <VCard class="app-modal" :rounded="smAndDown ? 0 : undefined">
      <!-- Header -->
      <div class="app-modal__header" :class="{ 'app-modal__header--shadow': scrolledTop }">
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
              <h5 class="app-modal__title text-truncate">
                {{ title }}
              </h5>
              <p v-if="description" class="app-modal__description text-truncate">{{ description }}</p>
              <span v-else-if="subtitle" class="text-body-2 text-medium-emphasis">{{ subtitle }}</span>
            </div>
          </div>
        </slot>
        <VBtn
          icon
          variant="text"
          size="small"
          :disabled="loading"
          class="flex-shrink-0"
          aria-label="Tutup"
          @click="onCancel"
        >
          <VIcon icon="bx-x" />
        </VBtn>
      </div>

      <!-- Body -->
      <div ref="bodyEl" class="app-modal__body" @scroll="onBodyScroll">
        <VForm @submit.prevent="emit('confirm')">
          <slot />
          <!-- hidden submit enables Enter-to-submit -->
          <button type="submit" class="d-none" aria-hidden="true" tabindex="-1" />
        </VForm>
      </div>

      <!-- Footer -->
      <template v-if="!hideFooter">
        <div class="app-modal__footer" :class="{ 'app-modal__footer--shadow': scrolledBottom }">
          <slot name="footer">
            <VBtn
              v-if="!hideCancel"
              variant="text"
              color="default"
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
  border-radius: var(--radius-xl);
  box-shadow: var(--shadow-dialog);

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    padding: var(--sp-7) var(--sp-8);
    flex: 0 0 auto;
    transition: box-shadow var(--dur-fast) var(--ease-in-out);

    &--shadow { box-shadow: var(--shadow-xs); position: relative; z-index: 1; }
  }

  &__title {
    font-size: var(--fs-lg);
    font-weight: var(--fw-semibold);
    color: var(--text-primary);
    margin: 0;
  }

  &__description {
    font-size: var(--fs-sm);
    color: var(--text-tertiary);
    margin: var(--sp-1) 0 0;
  }

  &__body {
    padding: var(--sp-8);
    overflow-y: auto;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    gap: var(--sp-9);
  }

  &__footer {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    gap: var(--sp-4);
    padding: var(--sp-6) var(--sp-8);
    flex: 0 0 auto;
    transition: box-shadow var(--dur-fast) var(--ease-in-out);

    &--shadow { box-shadow: 0 -1px 2px rgb(22 32 43 / .05); position: relative; z-index: 1; }
  }
}

@media (max-width: 600px) {
  .app-modal { max-height: 100vh; height: 100%; }
}
</style>
