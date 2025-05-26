<script setup lang="ts">
interface Props {
  title: string
  image: string    // class icon, contoh: "bx bxs-user-account"
  stats: string
  change?: number
}

const props = defineProps<Props>()

const isPositive = controlledComputed(() => props.change, () => Math.sign(props.change ?? 0) === 1)

const moreList = [
  { title: 'Yesterday', value: 'Yesterday' },
  { title: 'Last Week', value: 'Last Week' },
  { title: 'Last Month', value: 'Last Month' },
]
</script>

<template>
  <VCard>
    <VCardText class="d-flex align-center pb-4">
      <!-- Ganti dari img ke i dengan class icon -->
      <i :class="props.image" style="font-size: 42px;"></i>

      <VSpacer />

      <MoreBtn
        class="me-n3 mt-n4"
        :menu-list="moreList"
      />
    </VCardText>

    <VCardText>
      <p class="mb-1">
        {{ props.title }}
      </p>
      <h5 class="text-h5 text-no-wrap mb-3">
        {{ props.stats }}
      </h5>
      <span
        :class="isPositive ? 'text-success' : 'text-error'"
        class="d-flex align-center gap-1 text-sm"
      >        
        
      </span>
    </VCardText>
  </VCard>
</template>
