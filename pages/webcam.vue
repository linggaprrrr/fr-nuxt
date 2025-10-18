<template>
  <div class="p-4 flex flex-col items-center">
    <h1 class="text-2xl font-bold mb-4">📤 Upload Foto Wajah</h1>

    <!-- Input file untuk upload -->
    <input
      type="file"
      accept="image/*"
      @change="handleFileUpload"
      class="border p-2 rounded shadow w-full max-w-md mb-4"
    />

    <!-- Preview gambar -->
    <div v-if="previewUrl" class="mb-4">
      <img :src="previewUrl" alt="Preview" class="w-full max-w-md rounded shadow" />
    </div>

    <div class="mt-4 flex gap-4 mb-4">
      <VBtn
        color="primary"
        @click="uploadAndSend"
        :disabled="!selectedFile"
        class="mr-2"
      >
        Kirim
      </VBtn>
      <VBtn color="error" @click="resetReference">Reset Reference</VBtn>
    </div>

    <div v-if="searchResults.length" class="mt-6 w-full max-w-md">
      <h2 class="text-lg font-semibold mb-2 text-center">🔍 Hasil Pencarian Wajah</h2>
      <div v-if="processingTime !== null" class="text-md text-gray-600 mt-2 text-center mb-4">
        ⏱️ Processing time: {{ processingTime }} seconds
      </div>

      <v-row>
        <v-col
          v-for="(result, index) in searchResults"
          :key="index"
          cols="12"
          sm="6"
          md="2"
        >
          <div class="text-center">
            <img
              :src="result.compressed_path"
              alt="Matched face"
              class="w-24 h-24 object-cover rounded shadow mx-auto"
              style="width: 300px;"
            />
            <div class="text-md text-gray-600 mt-1">
              Score/Akurasi: {{ (result.score * 100).toFixed(2) }}%
            </div>
          </div>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useFetch } from '#app'

const selectedFile = ref(null)
const previewUrl = ref(null)
const searchResults = ref([])
const processingTime = ref(null)

const userId = '2fecc2b3-0b2b-4d69-9ae7-5a1debb5caa4' // Ganti sesuai konteks pengguna

const handleFileUpload = (e) => {
  const file = e.target.files[0]
  if (file) {
    selectedFile.value = file
    previewUrl.value = URL.createObjectURL(file)
  }
}

const uploadAndSend = async () => {
  if (!selectedFile.value) {
    alert('❌ Silakan pilih foto terlebih dahulu!')
    return
  }

  const formData = new FormData()
  formData.append('file', selectedFile.value)
  const token = import.meta.client ? localStorage.getItem('access_token') : null

  try {
    // Kirim foto ke endpoint register-reference
    const { error } = await useFetch('http://localhost:8001/faces/register-reference?is_reference=true', {
      method: 'POST',
      body: formData,
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (error.value) {
      alert('❌ Gagal kirim: ' + error.value.message)
      return
    }

    alert('✅ Foto berhasil dikirim! Mencari wajah...')

    // Setelah register, panggil search API
    const { data: searchData, error: searchError } = await useFetch(`http://localhost:8001/faces/search?user_id=${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })

    if (searchError.value) {
      alert('❌ Gagal mencari wajah: ' + searchError.value.message)
    } else {
      searchResults.value = searchData.value?.results || []
      processingTime.value = searchData.value?.processing_time_seconds
    }
  } catch (err) {
    alert('❌ Error: ' + err.message)
  }
}

const resetReference = async () => {
  const token = import.meta.client ? localStorage.getItem('access_token') : null
  try {
    const { error } = await useFetch('http://localhost:8001/faces/reset-reference', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ user_id: userId })
    })

    if (error.value) {
      alert('❌ Reset gagal: ' + error.value.message)
    } else {
      alert('🧹 Reference berhasil direset!')
      searchResults.value = []
      selectedFile.value = null
      previewUrl.value = null
    }
  } catch (err) {
    alert('❌ Error: ' + err.message)
  }
}
</script>
