<script lang="ts" setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '../../@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '../../@layouts/components/VerticalNavLink.vue'

const dashboardLink = Object.freeze({ title: 'Dashboard', icon: 'bx bx-home-smile', to: '/admin/dashboard' })
const managementSection = Object.freeze({ heading: 'Managements' })
const usersLink = Object.freeze({ title: 'Users', icon: 'bx bxs-user-account', to: '/admin/users' })
const unitsLink = Object.freeze({ title: 'Units', icon: 'bx bx-store-alt', to: '/admin/units' })
const outletsLink = Object.freeze({ title: 'Outlets', icon: 'bx  bx-store', to: '/admin/outlets' })
const pricingLink = Object.freeze({ title: 'Pricing', icon: 'bx bxs-purchase-tag', to: '/admin/photo-pricing' })
const photosGroup = Object.freeze({ title: 'Photos', icon: 'bx bx-images' })
const uploadPhotoLink = Object.freeze({ title: 'Upload Photo', to: '/admin/upload-photo' })
const listPhotoLink = Object.freeze({ title: 'List Photo', to: '/admin/photos' })
const timeOperationLink = Object.freeze({ title: 'Time Operation', icon: 'bx bxs-time', to: '/admin/time-operation' })
const promoCodesLink = Object.freeze({ title: 'Promo Codes', icon: 'bx bxs-discount', to: '/admin/promo-codes' })
const eventTicketsLink = Object.freeze({ title: 'Event Tickets', icon: 'bx bx-ticket', to: '/admin/event-tickets' })
const accessMethodsLink = Object.freeze({ title: 'Access Methods', icon: 'bx bx-log-in-circle', to: '/admin/access-methods' })
const transactionsLink = Object.freeze({ title: 'History Transaction', icon: 'bx bxs-receipt', to: '/admin/transactions' })
const reportsSection = Object.freeze({ heading: 'Reports' })
const reportsGroup = Object.freeze({ title: 'Reports', icon: 'bx bxs-report' })
const reportsTransactionsLink = Object.freeze({ title: 'Transactions', to: '/admin/reports/transactions' })
const reportsUnitTransactionsLink = Object.freeze({ title: 'Unit Transactions', to: '/admin/reports/unit-transactions' })
const reportsOutletTransactionsLink = Object.freeze({ title: 'Outlet Transactions', to: '/admin/reports/outlet-transactions' })
const reportsKioskFleetLink = Object.freeze({ title: 'Kiosk Fleet', to: '/admin/kiosk-fleet' })
const reportsPrintAnalyticsLink = Object.freeze({ title: 'Print Analytics', to: '/admin/print-analytics' })
const contentUsageLink = Object.freeze({ title: 'Content Usage', icon: 'bx bx-bar-chart-alt-2', to: '/admin/content-usage' })
const aiLogsLink = Object.freeze({ title: 'AI Call Logs', icon: 'bx bx-list-ul', to: '/admin/ai-logs' })

const stickersLink       = Object.freeze({ title: 'Stickers',        icon: 'bx bxs-sticker',   to: '/admin/stickers' })
const templatesLink      = Object.freeze({ title: 'Templates',       icon: 'bx bxs-palette',   to: '/admin/templates' })
const aiTemplatesLink    = Object.freeze({ title: 'AI Templates',    icon: 'bx bx-bot',        to: '/admin/ai-templates' })
const printTemplatesLink = Object.freeze({ title: 'Print Templates', icon: 'bx bx-image-alt',  to: '/admin/print-templates' })
</script>

<template>
  <VerticalNavLink :item="dashboardLink" />

  <VerticalNavSectionTitle :item="managementSection" />
  <VerticalNavLink :item="usersLink" />
  <VerticalNavLink :item="unitsLink" />
  <VerticalNavLink :item="outletsLink" />
  <VerticalNavLink :item="pricingLink" />
  <VerticalNavGroup :item="photosGroup">
    <VerticalNavLink :item="uploadPhotoLink" />
    <VerticalNavLink :item="listPhotoLink" />
  </VerticalNavGroup>
  <VerticalNavLink :item="timeOperationLink" />
  <VerticalNavLink :item="promoCodesLink" />
  <VerticalNavLink :item="eventTicketsLink" />
  <VerticalNavLink :item="accessMethodsLink" />
  <VerticalNavLink :item="transactionsLink" />
  <VerticalNavLink :item="stickersLink" />
  <VerticalNavLink :item="templatesLink" />
  <VerticalNavLink :item="aiTemplatesLink" />
  <VerticalNavLink :item="printTemplatesLink" />

  
  <VerticalNavSectionTitle :item="reportsSection" />
  <VerticalNavLink :item="contentUsageLink" />
  <VerticalNavLink :item="aiLogsLink" />
  <VerticalNavGroup :item="reportsGroup">
    <VerticalNavLink :item="reportsTransactionsLink" />
    <VerticalNavLink :item="reportsUnitTransactionsLink" />
    <VerticalNavLink :item="reportsOutletTransactionsLink" />
    <VerticalNavLink :item="reportsKioskFleetLink" />
    <VerticalNavLink :item="reportsPrintAnalyticsLink" />
  </VerticalNavGroup>
</template>
