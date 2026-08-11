<script lang="ts" setup>
import VerticalNavSectionTitle from '@/@layouts/components/VerticalNavSectionTitle.vue'
import VerticalNavGroup from '../../@layouts/components/VerticalNavGroup.vue'
import VerticalNavLink from '../../@layouts/components/VerticalNavLink.vue'

// Grouped by how often a page is opened, not by which table it edits. The flat
// "Managements" list put a page staff open hourly (Upload Photo) next to one
// touched once a year (Units), so everything looked equally important and the
// daily work was buried. Four sections, ordered by frequency of use:
//
//   Operasional  — every shift: uploads, kiosk health, print/AI activity
//   Laporan      — periodic: revenue and usage reporting
//   Konten       — occasional: what customers can put on a photo
//   Konfigurasi  — rare: set up once, revisited when something changes
//
// Indonesian headings to match the rest of the admin. No page was removed.

const dashboardLink = Object.freeze({ title: 'Dashboard', icon: 'bx bx-home-smile', to: '/admin/dashboard' })
// Superadmin-only: it aggregates across every tenant. Only this nav file is
// rendered for superadmins, so the link is hidden from unit/outlet roles by
// living here — but the endpoint 404s for them regardless, which is the actual
// boundary.
const businessLink = Object.freeze({ title: 'Bisnis', icon: 'bx bx-trending-up', to: '/admin/business' })

// ── Operasional ──
const opsSection = Object.freeze({ heading: 'Operasional' })
const photosGroup = Object.freeze({ title: 'Photos', icon: 'bx bx-images' })
const uploadPhotoLink = Object.freeze({ title: 'Upload Photo', to: '/admin/upload-photo' })
const listPhotoLink = Object.freeze({ title: 'List Photo', to: '/admin/photos' })
const transactionsLink = Object.freeze({ title: 'History Transaction', icon: 'bx bxs-receipt', to: '/admin/transactions' })
const kioskFleetLink = Object.freeze({ title: 'Kiosk Fleet', icon: 'bx bx-desktop', to: '/admin/kiosk-fleet' })
const printAnalyticsLink = Object.freeze({ title: 'Print Analytics', icon: 'bx bx-printer', to: '/admin/print-analytics' })
const aiLogsLink = Object.freeze({ title: 'AI Call Logs', icon: 'bx bx-list-ul', to: '/admin/ai-logs' })

// ── Laporan ──
const reportsSection = Object.freeze({ heading: 'Laporan' })
const reportsGroup = Object.freeze({ title: 'Reports', icon: 'bx bxs-report' })
const reportsTransactionsLink = Object.freeze({ title: 'Transactions', to: '/admin/reports/transactions' })
const reportsUnitTransactionsLink = Object.freeze({ title: 'Unit Transactions', to: '/admin/reports/unit-transactions' })
const reportsOutletTransactionsLink = Object.freeze({ title: 'Outlet Transactions', to: '/admin/reports/outlet-transactions' })
const contentUsageLink = Object.freeze({ title: 'Content Usage', icon: 'bx bx-bar-chart-alt-2', to: '/admin/content-usage' })

// ── Konten ──
const contentSection = Object.freeze({ heading: 'Konten' })
const stickersLink = Object.freeze({ title: 'Stickers', icon: 'bx bxs-sticker', to: '/admin/stickers' })
const templatesLink = Object.freeze({ title: 'Templates', icon: 'bx bxs-palette', to: '/admin/templates' })
const aiTemplatesLink = Object.freeze({ title: 'AI Templates', icon: 'bx bx-bot', to: '/admin/ai-templates' })
const printTemplatesLink = Object.freeze({ title: 'Print Templates', icon: 'bx bx-image-alt', to: '/admin/print-templates' })

// ── Konfigurasi ──
const configSection = Object.freeze({ heading: 'Konfigurasi' })
const usersLink = Object.freeze({ title: 'Users', icon: 'bx bxs-user-account', to: '/admin/users' })
const unitsLink = Object.freeze({ title: 'Units', icon: 'bx bx-store-alt', to: '/admin/units' })
const outletsLink = Object.freeze({ title: 'Outlets', icon: 'bx bx-store', to: '/admin/outlets' })
const pricingLink = Object.freeze({ title: 'Pricing', icon: 'bx bxs-purchase-tag', to: '/admin/photo-pricing' })
const accessMethodsLink = Object.freeze({ title: 'Access Methods', icon: 'bx bx-log-in-circle', to: '/admin/access-methods' })
const promoCodesLink = Object.freeze({ title: 'Promo Codes', icon: 'bx bxs-discount', to: '/admin/promo-codes' })
const eventTicketsLink = Object.freeze({ title: 'Event Tickets', icon: 'bx bxs-coupon', to: '/admin/event-tickets' })
const eventsLink = Object.freeze({ title: 'Events', icon: 'bx bx-calendar-event', to: '/admin/events' })
const timeOperationLink = Object.freeze({ title: 'Time Operation', icon: 'bx bxs-time', to: '/admin/time-operation' })
</script>

<template>
  <VerticalNavLink :item="dashboardLink" />
  <VerticalNavLink :item="businessLink" />

  <VerticalNavSectionTitle :item="opsSection" />
  <VerticalNavGroup :item="photosGroup">
    <VerticalNavLink :item="uploadPhotoLink" />
    <VerticalNavLink :item="listPhotoLink" />
  </VerticalNavGroup>
  <VerticalNavLink :item="transactionsLink" />
  <!-- Promoted out of the Reports sub-menu: kiosk health is checked during a
       shift, not filed at the end of one. -->
  <VerticalNavLink :item="kioskFleetLink" />
  <VerticalNavLink :item="printAnalyticsLink" />
  <VerticalNavLink :item="aiLogsLink" />

  <VerticalNavSectionTitle :item="reportsSection" />
  <VerticalNavGroup :item="reportsGroup">
    <VerticalNavLink :item="reportsTransactionsLink" />
    <VerticalNavLink :item="reportsUnitTransactionsLink" />
    <VerticalNavLink :item="reportsOutletTransactionsLink" />
  </VerticalNavGroup>
  <VerticalNavLink :item="contentUsageLink" />

  <VerticalNavSectionTitle :item="contentSection" />
  <VerticalNavLink :item="stickersLink" />
  <VerticalNavLink :item="templatesLink" />
  <VerticalNavLink :item="aiTemplatesLink" />
  <VerticalNavLink :item="printTemplatesLink" />

  <VerticalNavSectionTitle :item="configSection" />
  <VerticalNavLink :item="usersLink" />
  <VerticalNavLink :item="unitsLink" />
  <VerticalNavLink :item="outletsLink" />
  <VerticalNavLink :item="pricingLink" />
  <VerticalNavLink :item="accessMethodsLink" />
  <VerticalNavLink :item="promoCodesLink" />
  <VerticalNavLink :item="eventTicketsLink" />
  <VerticalNavLink :item="eventsLink" />
  <VerticalNavLink :item="timeOperationLink" />
</template>
