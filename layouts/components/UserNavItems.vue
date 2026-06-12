<script lang="ts" setup>
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'

const photosGroup = Object.freeze({
  title: 'Photos',
  icon: 'bx bx-images',
})

const findPhotosLink = Object.freeze({
  title: 'Find Yours',
  to: '/photos',
})

const purchasedPhotosLink = Object.freeze({
  title: 'Purchased Photo',
  to: '/photos',
})

const transactionsLink = Object.freeze({
  title: 'Transactions',
  icon: 'bx bxs-receipt',
  to: '/login',
})
</script>

<template>
  <VerticalNavGroup :item="photosGroup">
    <VerticalNavLink :item="findPhotosLink" />
    <VerticalNavLink :item="purchasedPhotosLink" />
  </VerticalNavGroup>

  <VerticalNavLink :item="transactionsLink" />
</template>
