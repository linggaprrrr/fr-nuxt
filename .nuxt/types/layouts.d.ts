import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "blank" | "components-default-layout-with-vertical-nav" | "components-footer" | "components-nav-items" | "components-navbar-theme-switcher" | "components-user-layout-with-vertical-nav" | "components-user-nav-items" | "components-user-profile" | "default" | "user"
declare module "../../node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}