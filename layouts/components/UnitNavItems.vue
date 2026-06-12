<script lang="ts" setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '../../@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '../../@layouts/components/VerticalNavLink.vue'

const dashboardLink = Object.freeze({ title: 'Dashboard', icon: 'bx bx-home-smile', to: '/units/dashboard' })
const managementSection = Object.freeze({ heading: 'Managements' })
const outletsLink = Object.freeze({ title: 'Outlets', icon: 'bx  bx-store', to: '/units/outlets' })
const photosLink = Object.freeze({ title: 'Photos', icon: 'bx bx-images', to: '/units/photos' })
const transactionsLink = Object.freeze({ title: 'History Transaction', icon: 'bx bxs-receipt', to: '/units/transactions' })
const reportsSection = Object.freeze({ heading: 'Reports' })
const reportsGroup = Object.freeze({ title: 'Reports', icon: 'bx bxs-report' })
const reportsTransactionsLink = Object.freeze({ title: 'Transactions', to: '/units/reports/transactions' })
const reportsUnitTransactionsLink = Object.freeze({ title: 'Unit Transactions', to: '/units/reports/unit-transactions' })
</script>

<template>
  <VerticalNavLink :item="dashboardLink" />

  <VerticalNavSectionTitle :item="managementSection" />
  <VerticalNavLink :item="outletsLink" />
  <VerticalNavLink :item="photosLink" />
  <VerticalNavLink :item="transactionsLink" />

  <VerticalNavSectionTitle :item="reportsSection" />
  <VerticalNavGroup :item="reportsGroup">
    <VerticalNavLink :item="reportsTransactionsLink" />
    <VerticalNavLink :item="reportsUnitTransactionsLink" />
  </VerticalNavGroup>
</template>
