<script setup lang="ts">
interface Props {
  statusCode?: string | number
  title?: string
  description?: string
}

const { description, statusCode, title } = defineProps<Props>()
</script>

<template>
  <div class="text-center">
    <!-- 👉 Title and subtitle -->
    <h1
      v-if="statusCode"
      class="header-title font-weight-medium mb-2"
    >
      {{ statusCode }}
    </h1>
    <h4
      v-if="title"
      class="text-h4 font-weight-medium mb-2"
    >
      {{ title }}
    </h4>
    <p
      v-if="description"
      class="text-body-1 mb-6"
    >
      {{ description }}
    </p>
  </div>
</template>

<style lang="scss" scoped>
.header-title {
  font-size: clamp(3rem, 5vw, 6rem);
  line-height: clamp(3rem, 5vw, 6rem);
}
</style>
