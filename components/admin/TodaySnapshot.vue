<script setup lang="ts">
import type { TodaySnapshot } from '@/composables/useReports'

// Today vs the same elapsed window yesterday, plus which outlets are actually
// trading. The four standalone totals above this tell you a number; they do
// not tell you whether it is good, or which outlet has been silent all
// morning. Both of those are the questions someone opens this page to answer.
const { getTodaySnapshot } = useReports()

const snap = ref<TodaySnapshot | null>(null)
const loaded = ref(false)

onMounted(async () => {
  try {
    snap.value = await getTodaySnapshot()
  } catch {
    // Leave it unrendered rather than showing zeroes that read as "no sales".
  } finally {
    loaded.value = true
  }
})

const rupiah = (n: number) => (n ?? 0).toLocaleString('id-ID', {
  style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
})

// null delta = nothing to compare against, shown as an em dash. Rendering 0%
// there would claim "flat" when the truth is "yesterday had no sales at all".
function deltaText(pct: number | null) {
  if (pct === null || pct === undefined) return '—'
  return `${pct > 0 ? '+' : ''}${pct}%`
}
function deltaColor(pct: number | null) {
  if (pct === null || pct === undefined) return 'text-medium-emphasis'
  if (pct > 0) return 'text-success'
  if (pct < 0) return 'text-error'
  return 'text-medium-emphasis'
}

function sinceText(iso: string | null) {
  if (!iso) return 'belum ada transaksi'
  const mins = Math.floor((Date.now() - new Date(iso.replace(' ', 'T')).getTime()) / 60000)
  if (mins < 1) return 'baru saja'
  if (mins < 60) return `${mins} menit lalu`
  return `${Math.floor(mins / 60)} jam lalu`
}
</script>

<template>
  <VRow v-if="loaded && snap" class="mt-1">
    <VCol cols="12" md="6">
      <VCard flat border rounded="lg" height="100%">
        <VCardText>
          <div class="text-caption text-medium-emphasis mb-1">Hari ini vs kemarin</div>

          <div class="d-flex align-baseline flex-wrap" style="gap: 10px;">
            <span class="text-h5 font-weight-bold">{{ rupiah(snap.revenue_today) }}</span>
            <span class="text-body-2 font-weight-bold" :class="deltaColor(snap.revenue_delta_pct)">
              {{ deltaText(snap.revenue_delta_pct) }}
            </span>
          </div>
          <div class="text-caption text-medium-emphasis">
            kemarin {{ rupiah(snap.revenue_yesterday) }}
          </div>

          <VDivider class="my-3" />

          <div class="d-flex align-baseline flex-wrap" style="gap: 10px;">
            <span class="text-h6 font-weight-bold">{{ snap.transactions_today }} transaksi</span>
            <span class="text-body-2 font-weight-bold" :class="deltaColor(snap.transactions_delta_pct)">
              {{ deltaText(snap.transactions_delta_pct) }}
            </span>
          </div>
          <div class="text-caption text-medium-emphasis">
            kemarin {{ snap.transactions_yesterday }}
          </div>
        </VCardText>
      </VCard>
    </VCol>

    <VCol cols="12" md="6">
      <VCard flat border rounded="lg" height="100%">
        <VCardText>
          <div class="text-caption text-medium-emphasis mb-2">Outlet hari ini</div>

          <div v-if="!snap.outlets.length" class="text-body-2 text-medium-emphasis">
            Belum ada transaksi hari ini.
          </div>

          <div v-else class="d-flex flex-column" style="gap: 8px;">
            <div
              v-for="o in snap.outlets"
              :key="o.outlet_id"
              class="d-flex align-center justify-space-between"
              style="gap: 12px;"
            >
              <div class="d-flex flex-column" style="min-width: 0;">
                <span class="text-body-2 font-weight-medium text-truncate">{{ o.outlet_name }}</span>
                <!-- "when did this outlet last sell" is the tell for a kiosk
                     that is up but not actually working. -->
                <span class="text-caption text-medium-emphasis">{{ sinceText(o.last_transaction_at) }}</span>
              </div>
              <div class="text-end flex-shrink-0">
                <div class="text-body-2 font-weight-bold">{{ rupiah(o.revenue) }}</div>
                <div class="text-caption text-medium-emphasis">{{ o.transactions }} trx</div>
              </div>
            </div>
          </div>
        </VCardText>
      </VCard>
    </VCol>
  </VRow>
</template>
