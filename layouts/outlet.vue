<script lang="ts" setup>
import OutletLayoutWithVerticalNav from './components/OutletLayoutWithVerticalNav.vue'


</script>

<template>
  <OutletLayoutWithVerticalNav>
    <slot />
  </OutletLayoutWithVerticalNav>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>
