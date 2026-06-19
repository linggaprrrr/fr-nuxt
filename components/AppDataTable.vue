<script setup lang="ts">
export interface DataTableHeader {
  key: string
  title: string
  align?: 'start' | 'center' | 'end'
  width?: string | number
  nowrap?: boolean
}

/**
 * Consistent list table: toolbar slot + auto row index + built-in empty,
 * loading and pagination states. Render custom cells with #item.<key> slots.
 *
 * <AppDataTable :headers="headers" :items="rows" :loading="isLoading" show-index
 *   :page="page" :items-per-page="limit" :total="total" @update:page="p => page = p">
 *   <template #toolbar> ...search/filters... </template>
 *   <template #item.status="{ item }"><StatusChip :status="item.status" /></template>
 *   <template #item.actions="{ item }"> ...buttons... </template>
 * </AppDataTable>
 */
const props = withDefaults(defineProps<{
  headers: DataTableHeader[]
  items: any[]
  loading?: boolean
  showIndex?: boolean
  page?: number
  itemsPerPage?: number
  total?: number
  itemKey?: string
  emptyTitle?: string
  emptyText?: string
  emptyIcon?: string
}>(), {
  loading: false,
  showIndex: false,
  page: 1,
  itemsPerPage: 10,
  total: 0,
  itemKey: 'id',
  emptyTitle: 'No data found',
  emptyIcon: 'bx-folder-open',
})

const emit = defineEmits<{ 'update:page': [number] }>()

const pageModel = computed({
  get: () => props.page,
  set: v => emit('update:page', v),
})

const pageCount = computed(() => Math.max(1, Math.ceil((props.total || 0) / props.itemsPerPage)))
const colspan = computed(() => props.headers.length + (props.showIndex ? 1 : 0))
</script>

<template>
  <div class="app-data-table">
    <div v-if="$slots.toolbar" class="app-data-table__toolbar">
      <slot name="toolbar" />
    </div>

    <VTable class="app-data-table__table">
      <thead>
        <tr>
          <th v-if="showIndex" style="width: 56px;">
            #
          </th>
          <th
            v-for="h in headers"
            :key="h.key"
            :style="{ textAlign: h.align || 'start', width: typeof h.width === 'number' ? `${h.width}px` : h.width }"
          >
            {{ h.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-if="loading" class="app-data-table__state-row">
          <td :colspan="colspan">
            <LoadingState class="py-8" />
          </td>
        </tr>

        <tr v-else-if="!items.length" class="app-data-table__state-row">
          <td :colspan="colspan">
            <EmptyState
              :icon="emptyIcon"
              :title="emptyTitle"
              :description="emptyText"
              class="py-6"
            />
          </td>
        </tr>

        <tr
          v-for="(item, index) in items"
          v-else
          :key="item[itemKey] ?? index"
        >
          <td v-if="showIndex" class="text-medium-emphasis">
            {{ index + 1 + (pageModel - 1) * itemsPerPage }}
          </td>
          <td
            v-for="h in headers"
            :key="h.key"
            :style="{ textAlign: h.align || 'start' }"
            :class="{ 'text-no-wrap': h.nowrap }"
          >
            <slot
              :name="`item.${h.key}`"
              :item="item"
              :index="index"
              :value="item[h.key]"
            >
              {{ item[h.key] }}
            </slot>
          </td>
        </tr>
      </tbody>
    </VTable>

    <div v-if="pageCount > 1" class="app-data-table__footer">
      <VPagination
        v-model="pageModel"
        :length="pageCount"
        :total-visible="5"
        density="comfortable"
        prev-icon="bx-chevron-left"
        next-icon="bx-chevron-right"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.app-data-table {
  &__toolbar {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    padding: 1rem 1.25rem 0.5rem;
    flex-wrap: wrap;
  }

  &__table {
    :deep(th) {
      font-size: 0.75rem !important;
      font-weight: 600 !important;
      text-transform: uppercase;
      letter-spacing: 0.04em;
      color: rgba(var(--v-theme-on-surface), 0.6) !important;
      white-space: nowrap;
    }

    :deep(td) {
      font-size: 0.9375rem;
    }
  }

  &__state-row:hover {
    background: transparent !important;
  }

  &__footer {
    display: flex;
    justify-content: center;
    padding: 1rem;
  }
}
</style>
