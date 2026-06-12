import { defineComponent, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { a as _sfc_main$1, _ as _sfc_main$2 } from './VerticalNavLink-B7Al52pd.mjs';
import './server.mjs';
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
import 'pinia';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import './nuxt-link-Co2TUpd4.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UserNavItems",
  __ssrInlineRender: true,
  setup(__props) {
    const photosGroup = Object.freeze({
      title: "Photos",
      icon: "bx bx-images"
    });
    const findPhotosLink = Object.freeze({
      title: "Find Yours",
      to: "/photos"
    });
    const purchasedPhotosLink = Object.freeze({
      title: "Purchased Photo",
      to: "/photos"
    });
    const transactionsLink = Object.freeze({
      title: "Transactions",
      icon: "bx bxs-receipt",
      to: "/login"
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, { item: unref(photosGroup) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, { item: unref(findPhotosLink) }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$2, { item: unref(purchasedPhotosLink) }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2, { item: unref(findPhotosLink) }, null, 8, ["item"]),
              createVNode(_sfc_main$2, { item: unref(purchasedPhotosLink) }, null, 8, ["item"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { item: unref(transactionsLink) }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/UserNavItems.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
