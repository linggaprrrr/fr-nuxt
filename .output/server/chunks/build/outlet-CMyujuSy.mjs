import { defineComponent, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import OutletLayoutWithVerticalNav from './OutletLayoutWithVerticalNav-BdSpABXy.mjs';
import './nuxt-link-Co2TUpd4.mjs';
import '../nitro/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import 'ipx';
import './server.mjs';
import 'pinia';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import './NuxtImg-3HNqV9w8.mjs';
import './OutletNavItems-rGsrB9SX.mjs';
import './VerticalNavSectionTitle-DyFkSzq-.mjs';
import './VerticalNavLink-B7Al52pd.mjs';
import './VerticalNavLayout-DH8_PG_a.mjs';
import 'vue3-perfect-scrollbar';
import './logo-C2NYPRdy.mjs';
import './index-CZ80b3Q4.mjs';
import './Footer-Dn9r9v8a.mjs';
import './NavbarThemeSwitcher-DkD0gPA7.mjs';
import './VTooltip-DZOCAHjt.mjs';
import './forwardRefs-BSTjJZPU.mjs';
import './UserProfile-Czt_wppC.mjs';
import './VMenu-CmFsZZaF.mjs';
import './index-ewhk7FTz.mjs';
import './ssrBoot-BtvJZs44.mjs';
import './VListSubheader-BbgyaiQc.mjs';
import './dialog-transition-D66jL1n_.mjs';
import './VSpacer-CQpJ4yRI.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "outlet",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(OutletLayoutWithVerticalNav, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default")
            ];
          }
        }),
        _: 3
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/outlet.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
