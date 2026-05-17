<script lang="ts" setup>
import VerticalNavSectionTitle from "@/@layouts/components/VerticalNavSectionTitle.vue";
import VerticalNavGroup from "@layouts/components/VerticalNavGroup.vue";
import VerticalNavLink from "@layouts/components/VerticalNavLink.vue";
</script>

<template>
  <!-- 👉 Dashboards -->
  <VerticalNavLink
      :item="{
        title: 'Dashboard',
        icon: 'bx bx-home-smile',        
        to: '/admin/dashboard',
      }"
    />

  <!-- 👉 Managements -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Managements',
    }"
  />
  
  <VerticalNavLink
    :item="{
      title: 'Users',
      icon: 'bx bxs-user-account',
      to: '/admin/users',
    }"
  />
   <VerticalNavLink
    :item="{
      title: 'Units',
      icon: 'bx bx-store-alt',
      to: '/admin/units',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Outlets',
      icon: 'bx  bx-store',
      to: '/admin/outlets',      
    }"
  />  
   <VerticalNavLink
    :item="{
      title: 'Pricing',
      icon: 'bx bxs-purchase-tag',
      to: '/admin/photo-pricing',
    }"
  />
  <VerticalNavGroup
    :item="{
      title: 'Photos',
      icon: 'bx bx-images',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Upload Photo',
        to: '/admin/upload-photo',
      }"
    />
    
    <VerticalNavLink
      :item="{
        title: 'List Photo',
        to: '/admin/photos',
      }"
    />
  </VerticalNavGroup>
  <VerticalNavLink
    :item="{
      title: 'Time Operation',
      icon: 'bx bxs-time',
      to: '/admin/time-operation',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Promo Codes',
      icon: 'bx bxs-discount',
      to: '/admin/promo-codes',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'History Transaction',
      icon: 'bx bxs-receipt',
      to: '/admin/transactions',
    }"
  />
  <!-- <VerticalNavLink
    :item="{
      title: 'Stickers',
      icon: 'bx bxs-smile',
      to: '/admin/stickers',
    }"
  />
  <VerticalNavLink
    :item="{
      title: 'Layout Templates',
      icon: 'bx bx-layout',
      to: '/admin/templates',
    }" -->
  />
  

  <!-- 👉 User Interface -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Reports',
    }"
  />
  <VerticalNavGroup
    :item="{
      title: 'Reports',
      icon: 'bx bxs-report',
    }"
  >
    <VerticalNavLink
      :item="{
        title: 'Transactions',
        to: '/admin/reports/transactions',
      }"
    />
    
    <VerticalNavLink
      :item="{
        title: 'Unit Transactions',
        to: '/admin/reports/unit-transactions',
      }"
    />
    <VerticalNavLink
      :item="{
        title: 'Outlet Transactions',
        to: '/admin/reports/outlet-transactions',
      }"
    />

    
  </VerticalNavGroup>

</template>
