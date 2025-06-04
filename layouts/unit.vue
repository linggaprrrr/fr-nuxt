<script lang="ts" setup>
import UnitLayoutWithVerticalNav from './components/UnitLayoutWithVerticalNav.vue'


</script>

<template>
  <UnitLayoutWithVerticalNav>
    <slot />
  </UnitLayoutWithVerticalNav>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>
