<script setup lang="ts">

</script>
<template>
  <VApp>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>

    <!-- Global UI hosts (toasts + confirm dialog) -->
    <AppToaster />
    <ConfirmDialog />
  </VApp>
</template>
