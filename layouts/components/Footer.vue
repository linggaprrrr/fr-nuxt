<script setup lang="ts">
const currentYear = new Date().getFullYear()
</script>

<template>
  <div class="h-100 d-flex align-center justify-md-space-between justify-center">
    <!-- 👉 Footer: left content -->
    <span class="d-flex align-center">
      &copy;
      {{ currentYear }}

      Ownize
    </span>
    
  </div>
</template>
