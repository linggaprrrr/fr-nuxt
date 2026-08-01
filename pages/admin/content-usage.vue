<script setup lang="ts">
import { useContentUsage } from '@/composables/useContentUsage'
import { useOutlets } from '@/composables/useOutlets'

const { data, loading, error, getContentUsage } = useContentUsage()
const toast = useToast()

const outlets      = ref<any[]>([])
const outletFilter = ref('')
const startDate    = ref('')
const endDate      = ref('')

async function fetchAll() {
  await getContentUsage({
    outlet_id:  outletFilter.value || undefined,
    start_date: startDate.value  || null,
    end_date:   endDate.value    || null,
  })
  if (error.value) toast.error(error.value)
}

async function fetchOutlets() {
  const { getOutlets } = useOutlets()
  const res = await getOutlets({ page: 1, limit: 9999 })
  outlets.value = res?.data || []
}

const outletItems = computed(() => [
  { title: 'Semua Outlet', value: '' },
  ...outlets.value.map(o => ({ title: o.name, value: o.id })),
])

// Max uses across the list — used to compute progress bar widths
function maxUses(items: { uses: number }[]) {
  return Math.max(1, ...items.map(i => i.uses))
}

onMounted(() => { fetchOutlets(); fetchAll() })
</script>

<template>
  <div>
    <PageHeader
      title="Content Usage"
      subtitle="Statistik pemakaian AI Template, Frame, dan Sticker oleh pelanggan kiosk."
    />

    <!-- Filters -->
    <VCard flat border rounded="lg" class="mb-4">
      <VCardText class="py-3">
        <div class="d-flex align-center gap-3 flex-wrap">
          <VSelect
            v-model="outletFilter"
            :items="outletItems"
            label="Outlet"
            hide-details
            style="max-width:240px"
            @update:modelValue="fetchAll"
          />
          <VTextField
            v-model="startDate"
            type="date"
            label="Dari"
            hide-details
            style="max-width:180px"
            @update:modelValue="fetchAll"
          />
          <VTextField
            v-model="endDate"
            type="date"
            label="Sampai"
            hide-details
            style="max-width:180px"
            @update:modelValue="fetchAll"
          />
          <VBtn variant="tonal" color="primary" @click="fetchAll" :loading="loading">
            <VIcon>bx-refresh</VIcon>
          </VBtn>
        </div>
      </VCardText>
    </VCard>

    <VProgressLinear v-if="loading" indeterminate color="primary" class="mb-4" />

    <VRow v-if="data">
      <!-- AI Templates -->
      <VCol cols="12" md="4">
        <VCard flat border rounded="lg">
          <VCardTitle class="d-flex align-center gap-2 pa-4 pb-2">
            <VIcon color="primary">bx-bot</VIcon>
            AI Templates
            <VSpacer />
            <VChip size="x-small" color="primary" variant="tonal">{{ data.ai_templates.length }}</VChip>
          </VCardTitle>
          <VDivider />
          <VCardText class="pa-0">
            <div v-if="!data.ai_templates.length" class="text-center pa-8 text-medium-emphasis">
              <p class="text-caption">Belum ada data</p>
            </div>
            <div
              v-for="item in data.ai_templates"
              :key="item.id"
              class="usage-row"
            >
              <div class="usage-label">{{ item.label }}</div>
              <div class="usage-bar-wrap">
                <div
                  class="usage-bar"
                  :style="{ width: `${(item.uses / maxUses(data.ai_templates)) * 100}%`, background: 'rgb(var(--v-theme-primary))' }"
                />
              </div>
              <div class="usage-count">{{ item.uses }}</div>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Frame Templates -->
      <VCol cols="12" md="4">
        <VCard flat border rounded="lg">
          <VCardTitle class="d-flex align-center gap-2 pa-4 pb-2">
            <VIcon color="secondary">bx-layout</VIcon>
            Frame Templates
            <VSpacer />
            <VChip size="x-small" color="secondary" variant="tonal">{{ data.templates.length }}</VChip>
          </VCardTitle>
          <VDivider />
          <VCardText class="pa-0">
            <div v-if="!data.templates.length" class="text-center pa-8 text-medium-emphasis">
              <p class="text-caption">Belum ada data</p>
            </div>
            <div
              v-for="item in data.templates"
              :key="item.id"
              class="usage-row"
            >
              <div class="usage-label">{{ item.label }}</div>
              <div class="usage-bar-wrap">
                <div
                  class="usage-bar"
                  :style="{ width: `${(item.uses / maxUses(data.templates)) * 100}%`, background: 'rgb(var(--v-theme-secondary))' }"
                />
              </div>
              <div class="usage-count">{{ item.uses }}</div>
            </div>
          </VCardText>
        </VCard>
      </VCol>

      <!-- Stickers -->
      <VCol cols="12" md="4">
        <VCard flat border rounded="lg">
          <VCardTitle class="d-flex align-center gap-2 pa-4 pb-2">
            <VIcon color="warning">bx-sticker</VIcon>
            Stickers
            <VSpacer />
            <VChip size="x-small" color="warning" variant="tonal">{{ data.stickers.length }}</VChip>
          </VCardTitle>
          <VDivider />
          <VCardText class="pa-0">
            <div v-if="!data.stickers.length" class="text-center pa-8 text-medium-emphasis">
              <p class="text-caption">Belum ada data</p>
            </div>
            <div
              v-for="item in data.stickers"
              :key="item.id"
              class="usage-row"
            >
              <div class="usage-label">{{ item.label }}</div>
              <div class="usage-bar-wrap">
                <div
                  class="usage-bar"
                  :style="{ width: `${(item.uses / maxUses(data.stickers)) * 100}%`, background: 'rgb(var(--v-theme-warning))' }"
                />
              </div>
              <div class="usage-count">{{ item.uses }}</div>
            </div>
          </VCardText>
        </VCard>
      </VCol>
    </VRow>
  </div>
</template>

<style scoped>
.usage-row {
  display: grid;
  grid-template-columns: 1fr 2fr 36px;
  align-items: center;
  gap: 10px;
  padding: 8px 16px;
  border-bottom: 1px solid var(--n-100);
}
.usage-row:last-child { border-bottom: none; }
.usage-label { font-size: 13px; font-weight: 500; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.usage-bar-wrap { height: 8px; background: var(--n-100); border-radius: 999px; overflow: hidden; }
.usage-bar { height: 100%; border-radius: 999px; transition: width 0.4s ease; min-width: 4px; }
.usage-count { font-size: 12px; font-weight: 700; text-align: right; color: var(--text-tertiary); }
</style>
