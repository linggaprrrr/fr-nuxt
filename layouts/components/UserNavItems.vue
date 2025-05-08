<script lang="ts" setup>
import VerticalNavGroup from "@layouts/components/VerticalNavGroup.vue";
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue";
</script>

<template>

  <VerticalNavGroup
    :item="{
      title: 'Photos',
      icon: 'bx bx-images',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Find Yours',
        to: '/photos',
      }"
    />
    
    <VerticalNavLink
      :item="{
        title: 'Purchased Photo',
        to: '/photos',
      }"
    />
  </VerticalNavGroup>
  
  <VerticalNavLink
    :item="{
      title: 'Transactions',
      icon: 'bx bxs-receipt',      
      to: '/login',
    }"
  />

  

</template>
