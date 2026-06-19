<script setup lang="ts">
// Global toast host. Mount once in app.vue. Reads the queue from useToast().
const { toasts, remove } = useToast()

const iconFor: Record<string, string> = {
  success: 'bx-check-circle',
  error: 'bx-error-circle',
  warning: 'bx-error',
  info: 'bx-info-circle',
}
</script>

<template>
  <Teleport to="body">
    <TransitionGroup
      name="toast"
      tag="div"
      class="app-toaster"
    >
      <div
        v-for="t in toasts"
        :key="t.id"
        class="app-toast"
        :class="`app-toast--${t.color}`"
        role="alert"
      >
        <VIcon
          :icon="iconFor[t.color] || 'bx-info-circle'"
          size="22"
          class="app-toast__icon"
        />
        <span class="app-toast__msg">{{ t.message }}</span>
        <VBtn
          icon
          variant="text"
          size="x-small"
          class="app-toast__close"
          @click="remove(t.id)"
        >
          <VIcon icon="bx-x" size="18" />
        </VBtn>
      </div>
    </TransitionGroup>
  </Teleport>
</template>

<style lang="scss" scoped>
.app-toaster {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 3000;
  display: flex;
  flex-direction: column;
  gap: 0.625rem;
  width: min(380px, calc(100vw - 2rem));
  pointer-events: none;
}

.app-toast {
  pointer-events: auto;
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 0.75rem 0.75rem 0.75rem 1rem;
  border-radius: 10px;
  background: rgb(var(--v-theme-surface));
  border: 1px solid rgba(var(--v-border-color), 0.1);
  border-left: 4px solid rgb(var(--v-theme-info));
  box-shadow: 0 6px 24px rgba(var(--v-shadow-key-umbra-color), 0.16);

  &__icon { color: rgb(var(--v-theme-info)); flex: 0 0 auto; }
  &__msg { flex: 1 1 auto; font-size: 0.875rem; font-weight: 500; color: rgb(var(--v-theme-on-surface)); }
  &__close { flex: 0 0 auto; opacity: 0.6; }

  &--success { border-left-color: rgb(var(--v-theme-success)); .app-toast__icon { color: rgb(var(--v-theme-success)); } }
  &--error { border-left-color: rgb(var(--v-theme-error)); .app-toast__icon { color: rgb(var(--v-theme-error)); } }
  &--warning { border-left-color: rgb(var(--v-theme-warning)); .app-toast__icon { color: rgb(var(--v-theme-warning)); } }
  &--info { border-left-color: rgb(var(--v-theme-info)); .app-toast__icon { color: rgb(var(--v-theme-info)); } }
}

.toast-enter-active,
.toast-leave-active { transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1); }
.toast-enter-from { opacity: 0; transform: translateX(40px); }
.toast-leave-to { opacity: 0; transform: translateX(40px); }
.toast-leave-active { position: absolute; right: 0; width: 100%; }
</style>
