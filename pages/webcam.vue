<template>
  <div class="p-4 flex flex-col items-center">
    <h1 class="text-2xl font-bold mb-4">📸 Webcam Snapshot</h1>

    <video ref="videoRef" autoplay playsinline class="border rounded shadow w-full max-w-md" />

    <div class="mt-4 flex gap-4 mb-4">
      <VBtn color="primary" @click="captureAndSend" class="mr-2">Kirim</VBtn>
      <VBtn color="error" @click="resetReference">Reset Reference</VBtn>
    </div>


    <canvas ref="canvasRef" class="hidden"></canvas>

    <div v-if="searchResults.length" class="mt-6 w-full max-w-md">
      <h2 class="text-lg font-semibold mb-2 text-center">🔍 Hasil Pencarian Wajah </h2>
      <div v-if="processingTime !== null" class="text-md text-gray-600 mt-2 text-center mb-4">
      ⏱️ Processing time: {{ processingTime }} seconds
    </div>
    <v-row>
      <v-col
          v-for="(result, index) in searchResults" :key="index"
          cols="12"
          sm="6"
          md="2"
        >
        <div  class="text-center">
          <img
            :src="result.compressed_path"
            alt="Matched face"
            class="w-24 h-24 object-cover rounded shadow mx-auto"
            style="width: 300px;"
          />
          <div class="text-md text-gray-600 mt-1">Score/Akurasi: {{ result.score.toFixed(2) * 100 }}%</div>
        </div>
      </v-col>
    </v-row>
     
      
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useFetch } from '#app'

const videoRef = ref(null)
const canvasRef = ref(null)
const searchResults = ref([])

const userId = 'ac4fb862-cb2a-4714-ba5d-fbbf5452a6df' // Ganti sesuai konteks pengguna
const processingTime = ref(null)

onMounted(async () => {
  const stream = await navigator.mediaDevices.getUserMedia({ video: true })
  videoRef.value.srcObject = stream
})

const captureAndSend = async () => {
  const video = videoRef.value
  const canvas = canvasRef.value
  const ctx = canvas.getContext('2d')

  canvas.width = video.videoWidth
  canvas.height = video.videoHeight
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)

  canvas.toBlob(async (blob) => {
    const formData = new FormData()
    formData.append('file', blob, 'snapshot.jpg')
    const token = import.meta.client ? localStorage.getItem('access_token') : null

    try {
      const { error } = await useFetch('https://api.frameitalbum.com/faces/register-reference?is_reference=true', {
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

      // ✅ Panggil search setelah register-reference
      const { data: searchData, error: searchError } = await useFetch(`https://api.frameitalbum.com/faces/search?user_id=${userId}`, {
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
  }, 'image/jpeg')
}

const resetReference = async () => {
  const token = import.meta.client ? localStorage.getItem('access_token') : null
  try {
    const { data, error } = await useFetch('https://api.frameitalbum.com/faces/reset-reference', {
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
    }
  } catch (err) {
    alert('❌ Error: ' + err.message)
  }
}


</script>
