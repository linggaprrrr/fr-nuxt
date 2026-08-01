<template>
  <div class="ai-logs-page">
    <div class="page-header">
      <div>
        <h4 class="text-h5 font-weight-bold">AI Call Logs</h4>
        <p class="text-body-2 text-medium-emphasis mb-0">
          Every Gemini API call — kiosk customers &amp; admin previews
        </p>
      </div>
      <VBtn
        prepend-icon="bx bx-refresh"
        variant="tonal"
        color="primary"
        :loading="loading"
        @click="load"
      >
        Refresh
      </VBtn>
    </div>

    <!-- Filters -->
    <VCard class="mb-5" variant="outlined">
      <VCardText class="py-3">
        <VRow dense align="center">
          <VCol cols="12" sm="4" md="3">
            <VSelect
              v-model="filterSource"
              :items="sourceOptions"
              label="Source"
              clearable
              hide-details
              @update:model-value="load"
            />
          </VCol>
          <VCol cols="12" sm="4" md="3">
            <VSelect
              v-model="filterResult"
              :items="resultOptions"
              label="Result"
              clearable
              hide-details
              @update:model-value="load"
            />
          </VCol>
          <VCol cols="12" sm="4" md="3">
            <VTextField
              v-model="filterTemplate"
              label="Template ID"
              clearable
              hide-details
              @keyup.enter="load"
              @click:clear="load"
            />
          </VCol>
        </VRow>
      </VCardText>
    </VCard>

    <!-- Error -->
    <VAlert v-if="error" type="error" class="mb-4" closable @click:close="error = null">
      {{ error }}
    </VAlert>

    <!-- Table -->
    <VCard variant="outlined">
      <VTable class="logs-table" :loading="loading">
        <thead>
          <tr>
            <th>Waktu</th>
            <th>Source</th>
            <th>Template</th>
            <th>Model</th>
            <th>Durasi</th>
            <th>Hasil</th>
            <th>Detail</th>
          </tr>
        </thead>
        <tbody>
          <tr v-if="loading && logs.length === 0">
            <td colspan="7" class="text-center py-6 text-medium-emphasis">Memuat...</td>
          </tr>
          <tr v-else-if="!loading && logs.length === 0">
            <td colspan="7" class="text-center py-6 text-medium-emphasis">Belum ada log.</td>
          </tr>
          <template v-else>
            <tr v-for="log in logs" :key="log.id" class="log-row">
              <td class="text-caption text-no-wrap">
                {{ formatTs(log.created_at) }}
              </td>
              <td>
                <VChip
                  size="x-small"
                  :color="log.source === 'kiosk' ? 'info' : 'secondary'"
                  label
                >
                  {{ log.source === 'kiosk' ? 'Kiosk' : 'Admin Preview' }}
                </VChip>
              </td>
              <td>
                <span v-if="log.template_label" class="text-body-2">
                  {{ log.template_label }}
                </span>
                <span v-else class="text-medium-emphasis text-caption">—</span>
              </td>
              <td class="text-caption text-no-wrap">{{ shortModel(log.model) }}</td>
              <td class="text-caption text-no-wrap">
                {{ log.duration_ms != null ? `${log.duration_ms} ms` : '—' }}
              </td>
              <td>
                <VChip
                  size="x-small"
                  :color="log.image_generated ? 'success' : 'error'"
                  label
                >
                  <VIcon start size="12">
                    {{ log.image_generated ? 'bx bx-check' : 'bx bx-x' }}
                  </VIcon>
                  {{ log.image_generated ? 'Gambar dihasilkan' : 'Tidak ada gambar' }}
                </VChip>
              </td>
              <td>
                <VBtn
                  size="x-small"
                  variant="tonal"
                  color="primary"
                  icon
                  @click="openDetail(log)"
                >
                  <VIcon size="16">bx bx-expand-alt</VIcon>
                </VBtn>
              </td>
            </tr>
          </template>
        </tbody>
      </VTable>

      <!-- Pagination -->
      <VDivider v-if="totalPages > 1" />
      <div v-if="totalPages > 1" class="d-flex align-center justify-space-between px-4 py-2">
        <span class="text-caption text-medium-emphasis">
          {{ total }} log total
        </span>
        <VPagination
          v-model="page"
          :length="totalPages"
          :total-visible="5"
          size="small"
          @update:model-value="load"
        />
      </div>
    </VCard>

    <!-- Detail dialog -->
    <AppModal
      v-model="showDetail"
      title="Detail Log"
      size="lg"
      hide-footer
    >
      <template v-if="detailLog">
        <!-- Meta chips -->
        <div class="d-flex flex-wrap gap-2">
          <VChip size="small" :color="detailLog.source === 'kiosk' ? 'info' : 'secondary'" label>
            {{ detailLog.source === 'kiosk' ? 'Kiosk' : 'Admin Preview' }}
          </VChip>
          <VChip size="small" :color="detailLog.image_generated ? 'success' : 'error'" label>
            {{ detailLog.image_generated ? 'Image generated' : 'No image' }}
          </VChip>
          <VChip size="small" variant="outlined" label>
            {{ shortModel(detailLog.model) }}
          </VChip>
          <VChip v-if="detailLog.duration_ms != null" size="small" variant="outlined" label>
            {{ detailLog.duration_ms }} ms
          </VChip>
        </div>

        <!-- Metadata grid -->
        <VTable density="compact" class="meta-table">
          <tbody>
            <tr>
              <td class="text-caption text-medium-emphasis" style="width:140px">Waktu</td>
              <td class="text-body-2">{{ formatTs(detailLog.created_at) }}</td>
            </tr>
            <tr v-if="detailLog.template_label">
              <td class="text-caption text-medium-emphasis">Template</td>
              <td class="text-body-2">{{ detailLog.template_label }}</td>
            </tr>
            <tr v-if="detailLog.device_id">
              <td class="text-caption text-medium-emphasis">Device ID</td>
              <td class="text-caption font-mono">{{ detailLog.device_id }}</td>
            </tr>
            <tr v-if="detailLog.input_mime_type">
              <td class="text-caption text-medium-emphasis">Input MIME</td>
              <td class="text-caption">{{ detailLog.input_mime_type }}</td>
            </tr>
          </tbody>
        </VTable>

        <!-- Prompt -->
        <div>
          <div class="section-label">Prompt</div>
          <div class="prompt-box" @click="promptExpanded = !promptExpanded">
            <div :class="['prompt-text', { collapsed: !promptExpanded }]">
              {{ detailLog.prompt_text || '—' }}
            </div>
            <div v-if="(detailLog.prompt_text?.length ?? 0) > 280" class="expand-hint text-caption text-primary">
              {{ promptExpanded ? 'Tutup' : 'Tampilkan semua' }}
            </div>
          </div>
        </div>

        <!-- Request JSON -->
        <div>
          <div class="section-label">Request JSON <span class="text-caption text-medium-emphasis">(base64 dihapus)</span></div>
          <pre class="json-block">{{ formatJson(detailLog.request_json) }}</pre>
        </div>

        <!-- Output image -->
        <div v-if="detailLog.image_generated && detailLog.output_image_url">
          <div class="section-label">Output Image</div>
          <div class="output-img-wrap">
            <img :src="detailLog.output_image_url" alt="AI output" class="output-img">
          </div>
        </div>

        <!-- Error -->
        <div v-if="detailLog.error_detail">
          <div class="section-label error-label">Error Detail</div>
          <div class="error-box">{{ detailLog.error_detail }}</div>
        </div>
      </template>
    </AppModal>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useAiLogs, type AiCallLog } from '~/composables/useAiLogs'

const { logs, total, loading, error, fetchLogs } = useAiLogs()

const page = ref(1)
const perPage = 20
const filterSource = ref<string | null>(null)
const filterResult = ref<string | null>(null)
const filterTemplate = ref('')

const sourceOptions = [
  { title: 'Kiosk', value: 'kiosk' },
  { title: 'Admin Preview', value: 'admin_preview' },
]
const resultOptions = [
  { title: 'Gambar dihasilkan', value: 'true' },
  { title: 'Tidak ada gambar', value: 'false' },
]

const totalPages = computed(() => Math.max(1, Math.ceil(total.value / perPage)))

function load() {
  const imageGeneratedParam =
    filterResult.value === 'true' ? true :
    filterResult.value === 'false' ? false : null

  fetchLogs({
    page: page.value,
    per_page: perPage,
    source: filterSource.value || undefined,
    template_id: filterTemplate.value || undefined,
    image_generated: imageGeneratedParam,
  })
}

// Detail dialog
const showDetail = ref(false)
const detailLog = ref<AiCallLog | null>(null)
const promptExpanded = ref(false)

function openDetail(log: AiCallLog) {
  detailLog.value = log
  promptExpanded.value = false
  showDetail.value = true
}

function formatTs(ts: string | null) {
  if (!ts) return '—'
  const d = new Date(ts)
  return d.toLocaleString('id-ID', {
    day: '2-digit', month: 'short', year: 'numeric',
    hour: '2-digit', minute: '2-digit', second: '2-digit',
  })
}

function shortModel(model: string) {
  return model.replace(/^models\//, '')
}

function formatJson(obj: Record<string, unknown> | null) {
  if (!obj) return '—'
  return JSON.stringify(obj, null, 2)
}

onMounted(load)
</script>

<style scoped>
.ai-logs-page {
  padding: 24px;
  max-width: 1200px;
  margin: 0 auto;
}

.page-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 24px;
}

.logs-table th {
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.04em;
  color: rgba(var(--v-theme-on-surface), 0.6);
  white-space: nowrap;
}

.log-row:hover td {
  background: rgba(var(--v-theme-primary), 0.04);
}

/* Detail dialog */
.meta-table td {
  padding: 4px 8px !important;
  border-bottom: none !important;
}

.section-label {
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(var(--v-theme-on-surface), 0.5);
  margin-bottom: 6px;
}
.error-label { color: rgb(var(--v-theme-error)); }

.prompt-box {
  background: rgba(var(--v-theme-on-surface), 0.04);
  border-radius: 6px;
  padding: 12px 14px;
  cursor: pointer;
  user-select: text;
}
.prompt-text {
  font-size: 0.85rem;
  line-height: 1.55;
  white-space: pre-wrap;
  word-break: break-word;
}
.prompt-text.collapsed {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.expand-hint {
  margin-top: 6px;
  cursor: pointer;
  font-weight: 500;
}

.json-block {
  background: rgba(var(--v-theme-on-surface), 0.04);
  border-radius: 6px;
  padding: 12px 14px;
  font-size: 0.78rem;
  line-height: 1.5;
  font-family: 'JetBrains Mono', 'Fira Code', monospace;
  white-space: pre-wrap;
  word-break: break-all;
  max-height: 300px;
  overflow: auto;
}

.output-img-wrap {
  background: rgba(var(--v-theme-on-surface), 0.04);
  border-radius: 8px;
  padding: 8px;
  display: inline-block;
}
.output-img {
  max-width: 100%;
  max-height: 320px;
  border-radius: 4px;
  display: block;
}

.error-box {
  background: rgba(var(--v-theme-error), 0.08);
  color: rgb(var(--v-theme-error));
  border-radius: 6px;
  padding: 10px 14px;
  font-size: 0.85rem;
  white-space: pre-wrap;
  word-break: break-word;
}

.font-mono { font-family: 'JetBrains Mono', 'Fira Code', monospace; }
.gap-2 { gap: 8px; }
</style>
