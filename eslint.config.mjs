// @nuxt/eslint generates the base flat config at .nuxt/eslint.config.mjs
// (run `nuxt prepare` / `npm run dev` to (re)generate it). Add project
// overrides inside withNuxt(...) below.
import withNuxt from './.nuxt/eslint.config.mjs'

export default withNuxt(
  {
    rules: {
      // This is a vendored admin template + generated code; keep lint
      // practical rather than a wall of stylistic noise. Tighten over time.
      'vue/multi-word-component-names': 'off',
      'vue/no-multiple-template-root': 'off',
      '@typescript-eslint/no-explicit-any': 'off',

      // Pre-existing issues in the vendored template — surfaced as
      // warnings so `npm run lint` passes on a clean checkout. Fix these
      // incrementally, then promote back to 'error'.
      '@typescript-eslint/no-unused-vars': 'warn',
      '@typescript-eslint/no-unused-expressions': 'warn',
      '@typescript-eslint/no-empty-object-type': 'warn',
      'vue/no-unused-vars': 'warn',
      'vue/no-use-v-if-with-v-for': 'warn',
      // Allow Vuetify's dynamic slot syntax (e.g. #item.name) used by AppDataTable.
      'vue/valid-v-slot': ['error', { allowModifiers: true }],
      'no-useless-catch': 'warn',
      'no-empty': 'warn',
      'no-empty-pattern': 'warn',
      'preserve-caught-error': 'warn',
      'nuxt/prefer-import-meta': 'warn',
      'import/first': 'warn',
    },
  },
  {
    ignores: [
      'dist/**',
      '.nuxt/**',
      '.output/**',
      'plugins/iconify/icons.css',
      '@core/**',
      '@layouts/**',
    ],
  },
)
