<script setup lang="ts">
import { ref } from 'vue'

const files = ref<File[]>([])  // To hold multiple files
const loading = ref(false)  // To track upload progress
const progress = ref(0)  // To track progress of upload
const showAlert = ref(false)  // Control the visibility of the alert
const uploadStatus = ref<{ type: string, message: string } | null>(null)  // For alert messages

// Your custom composable for uploading
const { uploadImages } = useFaces()

const handleUpload = async () => {
  if (files.value.length === 0 || loading.value) return  // Don't allow upload if already uploading
  loading.value = true  // Start loading

  try {
    const response = await uploadImages(files.value, (uploadedPercentage: number) => {
      progress.value = uploadedPercentage  // Update progress for each file
    })
    console.log('Upload success:', response)
    uploadStatus.value = { type: 'success', message: 'Files uploaded successfully!' }
    showAlert.value = true  // Show success alert
    files.value = []  // Clear files after upload success
    
    // Automatically hide the alert after 5 seconds
    setTimeout(() => {
      showAlert.value = false  // Hide alert after 5 seconds
    }, 5000)

  } catch (error) {
    console.error('Upload failed:', error)
    uploadStatus.value = { type: 'error', message: 'Upload failed. Please try again.' }
    showAlert.value = true  // Show error alert
    
    // Automatically hide the alert after 5 seconds
    setTimeout(() => {
      showAlert.value = false  // Hide alert after 5 seconds
    }, 5000)
  } finally {
    loading.value = false  // End loading
  }
}
</script>


<template>
     <v-alert
      v-if="uploadStatus"
      :type="uploadStatus.type"
      dismissible
      transition="fade-transition" 
      class="mb-4"
      v-model="showAlert" 
    >
      {{ uploadStatus.message }}
    </v-alert>
    <v-card elevation="16">
        <v-file-upload    
        v-model="files"
        accept="image/*"
        clearable
        prepend-icon="bx bx-upload"
        multiple  
        :disabled="loading" 
        @change="handleUpload"
        class="mb-4"
        />
    </v-card>
  
  
    <v-progress-linear
      v-if="loading"
      :value="progress"
      color="primary"
      height="20"
      striped
      indeterminate
      class="mb-4"
      
    >
      Uploading...
    </v-progress-linear>
  

   
  </template>
  