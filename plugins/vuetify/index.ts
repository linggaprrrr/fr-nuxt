import { createVuetify } from 'vuetify'
import { VBtn } from 'vuetify/components/VBtn'
import defaults from './defaults'
import { icons } from './icons'
import { themes } from './theme'
import { VFileUpload } from 'vuetify/labs/VFileUpload'

// Styles

import '@core/scss/template/libs/vuetify/index.scss'
import 'vuetify/styles'


export default defineNuxtPlugin(nuxtApp => {
  const vuetify = createVuetify({
    ssr: true,
    aliases: {
      IconBtn: VBtn,
    },
    components: {
      VFileUpload,
    },
    defaults,
    icons,
    theme: {
      defaultTheme: 'light',
      themes,
    },
  })

  nuxtApp.vueApp.use(vuetify)
})
