<script setup lang="ts">
import type { ThemeSwitcherTheme } from '@layouts/types'

const themes = Object.freeze<ThemeSwitcherTheme[]>([
  {
    name: 'light',
    icon: 'bx-sun',
  },
  {
    name: 'dark',
    icon: 'bx-moon',
  },
])
</script>

<template>
  <ThemeSwitcher :themes="themes" />
</template>
