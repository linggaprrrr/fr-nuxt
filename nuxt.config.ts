import { fileURLToPath } from 'node:url'
import svgLoader from 'vite-svg-loader'
import vuetify from 'vite-plugin-vuetify'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  app: {
    head: {
      titleTemplate: '%s - Find Your Photos with Just Your Face',
      title: 'Ownize',

      link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.png',
      }],
    },
  },
  

  googleSignIn: {
    clientId: '274025832444-7k0601rlv9p1fjlsqlff56hejao8lqgv.apps.googleusercontent.com',    
  },

  // Add nitro server options

  runtimeConfig: {
    public: {
      apiBase: 'https://api.ownize.app',    
      
    }
  },

  devtools: {
    enabled: true,
  },

  css: [
    '@core/scss/template/index.scss',
    '@styles/styles.scss',
    '@/plugins/iconify/icons.css',
    '@layouts/styles/index.scss',
    'boxicons/css/boxicons.min.css',
  ],

  components: {
    dirs: [{
      path: '@/@core/components',
      pathPrefix: false,
    }, {
      path: '~/components/global',
      global: true,
    }, {
      path: '~/components',
      pathPrefix: false,
    }],
  },

  plugins: ['@/plugins/vuetify/index.ts', '@/plugins/iconify/index.ts'],

  imports: {
    dirs: ['./@core/utils', './@core/composable/', './plugins/*/composables/*'],
  },

  hooks: {},

  experimental: {
    typedPages: true,
  },

  typescript: {
    tsConfig: {
      compilerOptions: {
        paths: {
          '@/*': ['../*'],
          '@layouts/*': ['../@layouts/*'],
          '@layouts': ['../@layouts'],
          '@core/*': ['../@core/*'],
          '@core': ['../@core'],
          '@images/*': ['../assets/images/*'],
          '@styles/*': ['../assets/styles/*'],
        },
      },
    },
  },

  // ℹ️ Disable source maps until this is resolved: https://github.com/vuetifyjs/vuetify-loader/issues/290
  sourcemap: {
    server: false,
    client: false,
  },

  vue: {
    compilerOptions: {
      isCustomElement: tag => tag === 'swiper-container' || tag === 'swiper-slide',
    },
  },

  vite: {
    define: { 'process.env': {} },
    server: {
       headers: {},
      allowedHosts: [
        'fr.funclick-kasir.com',
        'localhost',
        '0.0.0.0'
      ]
    },
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('.', import.meta.url)),
        '@core': fileURLToPath(new URL('./@core', import.meta.url)),
        '@layouts': fileURLToPath(new URL('./@layouts', import.meta.url)),
        '@images': fileURLToPath(new URL('./assets/images/', import.meta.url)),
        '@styles': fileURLToPath(new URL('./assets/styles/', import.meta.url)),
        '@configured-variables': fileURLToPath(new URL('./assets/styles/variables/_template.scss', import.meta.url)),
      },
    },
     ssr: {
      noExternal: ['vuetify'], 
    },
    build: {
      chunkSizeWarningLimit: 5000,
    },

    optimizeDeps: {
      exclude: ['vuetify'],
      entries: [
        './**/*.vue',
      ],
    },

    plugins: [
      svgLoader(),
      vuetify({
        styles: {
          configFile: 'assets/styles/variables/_vuetify.scss',
        },
      }),
    ],
  },

  build: {
    transpile: ['vuetify'],
  },

  modules: ['@vueuse/nuxt', '@nuxtjs/device', '@pinia/nuxt', 'nuxt-vue3-google-signin', '@nuxt/image'],
  compatibilityDate: '2025-05-05',
})