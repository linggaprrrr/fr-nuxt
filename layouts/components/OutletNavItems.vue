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
      title: 'Pricing',
      icon: 'bx bxs-purchase-tag',
      to: '/outlets/photo-pricing',
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
        to: '/outlets/upload-photo',
      }"
    />
    
    <VerticalNavLink
      :item="{
        title: 'List Photo',
        to: '/outlets/photos',
      }"
    />
  </VerticalNavGroup>
  
  <VerticalNavLink
    :item="{
      title: 'History Transaction',
      icon: 'bx bxs-receipt',      
      to: '/outlets/transactions',
    }"
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
        to: '/outlets/reports/transactions',
      }"
    />
    
    <VerticalNavLink
      :item="{
        title: 'Unit Transactions',
        to: '/outlets/reports/unit-transactions',
      }"
    />
  </VerticalNavGroup>

</template>
