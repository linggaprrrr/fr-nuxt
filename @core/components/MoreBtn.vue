<script lang="ts" setup>
interface Props {
  menuList?: unknown[]
  itemProps?: boolean
  iconSize?: string
}

const { iconSize, itemProps, menuList } = defineProps<Props>()
</script>

<template>
  <IconBtn>
    <VIcon
      :size="iconSize"
      icon="bx-dots-vertical-rounded"
    />

    <VMenu
      v-if="menuList"
      activator="parent"
    >
      <VList
        :items="menuList"
        :item-props="itemProps"
      />
    </VMenu>
  </IconBtn>
</template>
