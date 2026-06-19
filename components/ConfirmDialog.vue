<script setup lang="ts">
// Global confirmation dialog host. Mount once in app.vue. Driven by useConfirm().
const { state, _close } = useConfirm()
</script>

<template>
  <VDialog
    :model-value="state.open"
    max-width="420"
    @update:model-value="(v: boolean) => !v && _close(false)"
  >
    <VCard rounded="lg" class="pa-2">
      <VCardItem class="pb-2">
        <template #prepend>
          <VAvatar
            :color="state.tone === 'danger' ? 'error' : 'primary'"
            variant="tonal"
            rounded="lg"
            size="44"
          >
            <VIcon
              :icon="state.icon || (state.tone === 'danger' ? 'bx-trash' : 'bx-help-circle')"
              size="24"
            />
          </VAvatar>
        </template>
        <VCardTitle class="text-h6 text-wrap">
          {{ state.title }}
        </VCardTitle>
      </VCardItem>

      <VCardText class="text-body-1 text-medium-emphasis">
        {{ state.message }}
      </VCardText>

      <VCardActions class="px-4 pb-3 pt-1">
        <VSpacer />
        <VBtn
          variant="tonal"
          color="secondary"
          @click="_close(false)"
        >
          {{ state.cancelText }}
        </VBtn>
        <VBtn
          :color="state.tone === 'danger' ? 'error' : 'primary'"
          variant="flat"
          @click="_close(true)"
        >
          {{ state.confirmText }}
        </VBtn>
      </VCardActions>
    </VCard>
  </VDialog>
</template>
