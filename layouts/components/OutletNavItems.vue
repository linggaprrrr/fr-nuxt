<script lang="ts" setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '@layouts/components/VerticalNavLink.vue'

const dashboardLink = Object.freeze({ title: 'Dashboard', icon: 'bx bx-home-smile', to: '/admin/dashboard' })
const managementSection = Object.freeze({ heading: 'Managements' })
const pricingLink = Object.freeze({ title: 'Pricing', icon: 'bx bxs-purchase-tag', to: '/outlets/photo-pricing' })
const photosGroup = Object.freeze({ title: 'Photos', icon: 'bx bx-images' })
const uploadPhotoLink = Object.freeze({ title: 'Upload Photo', to: '/outlets/upload-photo' })
const listPhotoLink = Object.freeze({ title: 'List Photo', to: '/outlets/photos' })
const transactionsLink = Object.freeze({ title: 'History Transaction', icon: 'bx bxs-receipt', to: '/outlets/transactions' })
const reportsSection = Object.freeze({ heading: 'Reports' })
const reportsGroup = Object.freeze({ title: 'Reports', icon: 'bx bxs-report' })
const reportsTransactionsLink = Object.freeze({ title: 'Transactions', to: '/outlets/reports/transactions' })
const reportsUnitTransactionsLink = Object.freeze({ title: 'Unit Transactions', to: '/outlets/reports/unit-transactions' })
</script>

<template>
  <VerticalNavLink :item="dashboardLink" />

  <VerticalNavSectionTitle :item="managementSection" />
  <VerticalNavLink :item="pricingLink" />
  <VerticalNavGroup :item="photosGroup">
    <VerticalNavLink :item="uploadPhotoLink" />
    <VerticalNavLink :item="listPhotoLink" />
  </VerticalNavGroup>
  <VerticalNavLink :item="transactionsLink" />

  <VerticalNavSectionTitle :item="reportsSection" />
  <VerticalNavGroup :item="reportsGroup">
    <VerticalNavLink :item="reportsTransactionsLink" />
    <VerticalNavLink :item="reportsUnitTransactionsLink" />
  </VerticalNavGroup>
</template>
