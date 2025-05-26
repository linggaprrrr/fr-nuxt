<script setup lang="ts">
interface Props {
  title: string
  color?: string
  icon: string
  stats: string  
}

const props = withDefaults(defineProps<Props>(), {
  color: 'primary',
})

</script>

<template>
  <VCard>
    <VCardText class="d-flex align-center">
      <VAvatar
        size="44"
        rounded
        :color="props.color"
        variant="tonal"
        class="me-4"
      >
        <VIcon
          :icon="props.icon"
          size="30"
        />
      </VAvatar>

      <div>
        <span class="text-caption">{{ props.title }}</span>
        <div class="d-flex align-center flex-wrap">
          <span class="text-h6 font-weight-semibold">{{ props.stats }}</span>   
        </div>
      </div>
    </VCardText>
  </VCard>
</template>
