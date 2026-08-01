<script setup lang="ts">
import type { BusinessOverview } from '@/composables/useReports'
import { getApiErrorMessage } from '@/utils/apiHelpers'

// Owner view: is the business growing, which outlets carry it, and what share
// of people who scan actually buy. Superadmin only — it aggregates across every
// tenant. The backend 404s for anyone else; hiding the nav link is presentation,
// not the boundary.
definePageMeta({ layout: 'default' })

const { getBusinessOverview } = useReports()
const toast = useToast()

const PERIODS = [
  { title: '7 hari', value: 7 },
  { title: '30 hari', value: 30 },
  { title: '90 hari', value: 90 },
]

const days = ref(30)
const data = ref<BusinessOverview | null>(null)
const loading = ref(true)

async function load() {
  loading.value = true
  try {
    data.value = await getBusinessOverview(days.value)
  } catch (e: any) {
    toast.error(getApiErrorMessage(e))
  } finally {
    loading.value = false
  }
}

watch(days, load)
onMounted(load)

const rupiah = (n: number) => (n ?? 0).toLocaleString('id-ID', {
  style: 'currency', currency: 'IDR', minimumFractionDigits: 0,
})

// An em dash, never 0%: "no basis to compare" and "flat" are different claims.
const deltaText = (p: number | null) => (p === null || p === undefined ? '—' : `${p > 0 ? '+' : ''}${p}%`)
const deltaClass = (p: number | null) => {
  if (p === null || p === undefined) return 'text-medium-emphasis'
  return p > 0 ? 'text-success' : p < 0 ? 'text-error' : 'text-medium-emphasis'
}

const pctText = (p: number | null) => (p === null || p === undefined ? '—' : `${p}%`)
</script>

<template>
  <div>
    <PageHeader title="Bisnis" subtitle="Pertumbuhan, performa outlet, dan konversi." />

    <div class="d-flex justify-end mb-4">
      <VSelect
        v-model="days"
        :items="PERIODS"
        density="compact"
        hide-details
        style="max-width: 160px;"
      />
    </div>

    <VProgressLinear v-if="loading" indeterminate color="primary" class="mb-4" />

    <template v-if="data && !loading">
      <!-- Headline: period vs the period before it -->
      <VRow>
        <VCol cols="12" md="6">
          <VCard flat border rounded="lg" height="100%">
            <VCardText>
              <div class="text-caption text-medium-emphasis mb-1">
                Pendapatan {{ data.period_days }} hari
              </div>
              <div class="d-flex align-baseline flex-wrap" style="gap: 10px;">
                <span class="text-h5 font-weight-bold">{{ rupiah(data.revenue) }}</span>
                <span class="text-body-2 font-weight-bold" :class="deltaClass(data.revenue_delta_pct)">
                  {{ deltaText(data.revenue_delta_pct) }}
                </span>
              </div>
              <div class="text-caption text-medium-emphasis">
                periode sebelumnya {{ rupiah(data.revenue_prev) }}
              </div>
            </VCardText>
          </VCard>
        </VCol>

        <VCol cols="12" md="6">
          <VCard flat border rounded="lg" height="100%">
            <VCardText>
              <div class="text-caption text-medium-emphasis mb-1">Transaksi</div>
              <div class="d-flex align-baseline flex-wrap" style="gap: 10px;">
                <span class="text-h5 font-weight-bold">{{ data.transactions }}</span>
                <span class="text-body-2 font-weight-bold" :class="deltaClass(data.transactions_delta_pct)">
                  {{ deltaText(data.transactions_delta_pct) }}
                </span>
              </div>
              <div class="text-caption text-medium-emphasis">
                periode sebelumnya {{ data.transactions_prev }}
              </div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>

      <!-- Funnel -->
      <VRow class="mt-1">
        <VCol cols="12">
          <VCard flat border rounded="lg">
            <VCardText>
              <div class="text-caption text-medium-emphasis mb-3">
                Konversi — dari pindai wajah sampai bayar
              </div>
              <VRow>
                <VCol cols="6" md="3">
                  <div class="text-h6 font-weight-bold">{{ data.funnel.scans }}</div>
                  <div class="text-caption text-medium-emphasis">Pindai wajah</div>
                </VCol>
                <VCol cols="6" md="3">
                  <div class="text-h6 font-weight-bold">{{ data.funnel.scans_with_matches }}</div>
                  <div class="text-caption text-medium-emphasis">
                    Foto ditemukan ({{ pctText(data.funnel.match_rate_pct) }})
                  </div>
                </VCol>
                <VCol cols="6" md="3">
                  <div class="text-h6 font-weight-bold">{{ data.funnel.paid_transactions }}</div>
                  <div class="text-caption text-medium-emphasis">Dibayar</div>
                </VCol>
                <VCol cols="6" md="3">
                  <div class="text-h6 font-weight-bold text-primary">
                    {{ pctText(data.funnel.conversion_pct) }}
                  </div>
                  <!-- Against matched scans, not all scans: a scan that found
                       nothing never had a chance to convert. -->
                  <div class="text-caption text-medium-emphasis">
                    Konversi (dari yang ketemu)
                  </div>
                </VCol>
              </VRow>
              <VAlert
                v-if="!data.funnel.scans"
                type="info"
                variant="tonal"
                density="compact"
                class="text-caption mt-3"
              >
                Belum ada data pindai untuk periode ini — pencatatan dimulai sejak fitur ini aktif.
              </VAlert>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>

      <!-- Unit economics -->
      <VRow class="mt-1">
        <VCol cols="12" md="4">
          <VCard flat border rounded="lg" height="100%">
            <VCardText>
              <div class="text-h6 font-weight-bold">{{ rupiah(data.avg_basket) }}</div>
              <div class="text-caption text-medium-emphasis">Rata-rata per transaksi</div>
            </VCardText>
          </VCard>
        </VCol>
        <VCol cols="12" md="4">
          <VCard flat border rounded="lg" height="100%">
            <VCardText>
              <div class="text-h6 font-weight-bold">{{ rupiah(data.revenue_per_photo) }}</div>
              <div class="text-caption text-medium-emphasis">Rata-rata per foto</div>
            </VCardText>
          </VCard>
        </VCol>
        <VCol cols="12" md="4">
          <VCard flat border rounded="lg" height="100%">
            <VCardText>
              <div class="text-h6 font-weight-bold">{{ data.photos_sold }}</div>
              <div class="text-caption text-medium-emphasis">Foto terjual</div>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>

      <!-- Outlet leaderboard -->
      <VRow class="mt-1">
        <VCol cols="12">
          <VCard flat border rounded="lg">
            <VCardText>
              <div class="text-caption text-medium-emphasis mb-2">Performa outlet</div>
              <div v-if="!data.leaderboard.length" class="text-body-2 text-medium-emphasis">
                Belum ada transaksi pada periode ini.
              </div>
              <VTable v-else density="compact">
                <thead>
                  <tr>
                    <th>Outlet</th>
                    <th class="text-end">Pendapatan</th>
                    <th class="text-end">Transaksi</th>
                    <th class="text-end">Foto</th>
                    <th class="text-end">Rata-rata</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="o in data.leaderboard" :key="o.outlet_id">
                    <td>{{ o.outlet_name }}</td>
                    <td class="text-end font-weight-bold">{{ rupiah(o.revenue) }}</td>
                    <td class="text-end">{{ o.transactions }}</td>
                    <td class="text-end">{{ o.photos }}</td>
                    <td class="text-end">{{ rupiah(o.avg_basket) }}</td>
                  </tr>
                </tbody>
              </VTable>
            </VCardText>
          </VCard>
        </VCol>
      </VRow>
    </template>
  </div>
</template>
