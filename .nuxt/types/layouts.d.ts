import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "blank" | "components-default-layout-with-vertical-nav" | "components-footer" | "components-nav-items" | "components-navbar-theme-switcher" | "components-user-profile" | "default"
declare module "../../node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}