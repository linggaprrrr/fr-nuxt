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
      icon: 'x bx-store-alt',
      to: '/admin/units',
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
      title: 'Transactions',
      icon: 'bx bxs-receipt',      
      to: '/login',
    }"
  />

  <!-- 👉 User Interface -->
  <VerticalNavSectionTitle
    :item="{
      heading: 'Reports',
    }"
  />
    <VerticalNavLink
      :item="{
        title: 'Report 1',
        icon: 'bx bxs-report',
        to: '/login',
      }"
    />  

</template>
