<script lang="ts" setup>
import UserLayoutWithVerticalNav from './components/UserLayoutWithVerticalNav.vue'


</script>

<template>
  <UserLayoutWithVerticalNav>
    <slot />
  </UserLayoutWithVerticalNav>
</template>

<style lang="scss">
// As we are using `layouts` plugin we need its styles to be imported
@use "@layouts/styles/default-layout";
</style>
