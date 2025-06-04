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
        to: '/units/dashboard',
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
      title: 'Outlets',
      icon: 'bx  bx-store',
      to: '/units/outlets',      
    }"
  />  
  <VerticalNavLink
      :item="{
        title: 'Photos',
        icon: 'bx bx-images',
        to: '/units/photos',
      }"
    />  
    
  <VerticalNavLink
    :item="{
      title: 'History Transaction',
      icon: 'bx bxs-receipt',      
      to: '/units/transactions',
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
        to: '/units/reports/transactions',
      }"
    />
    
    <VerticalNavLink
      :item="{
        title: 'Unit Transactions',
        to: '/units/reports/unit-transactions',
      }"
    />
  </VerticalNavGroup>

</template>
