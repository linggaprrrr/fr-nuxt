import { defineComponent, unref, withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _sfc_main$2 } from './VerticalNavSectionTitle-DyFkSzq-.mjs';
import { _ as _sfc_main$1, a as _sfc_main$1$1 } from './VerticalNavLink-B7Al52pd.mjs';
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
  __name: "NavItems",
  __ssrInlineRender: true,
  setup(__props) {
    const dashboardLink = Object.freeze({ title: "Dashboard", icon: "bx bx-home-smile", to: "/admin/dashboard" });
    const managementSection = Object.freeze({ heading: "Managements" });
    const usersLink = Object.freeze({ title: "Users", icon: "bx bxs-user-account", to: "/admin/users" });
    const unitsLink = Object.freeze({ title: "Units", icon: "bx bx-store-alt", to: "/admin/units" });
    const outletsLink = Object.freeze({ title: "Outlets", icon: "bx  bx-store", to: "/admin/outlets" });
    const pricingLink = Object.freeze({ title: "Pricing", icon: "bx bxs-purchase-tag", to: "/admin/photo-pricing" });
    const photosGroup = Object.freeze({ title: "Photos", icon: "bx bx-images" });
    const uploadPhotoLink = Object.freeze({ title: "Upload Photo", to: "/admin/upload-photo" });
    const listPhotoLink = Object.freeze({ title: "List Photo", to: "/admin/photos" });
    const timeOperationLink = Object.freeze({ title: "Time Operation", icon: "bx bxs-time", to: "/admin/time-operation" });
    const promoCodesLink = Object.freeze({ title: "Promo Codes", icon: "bx bxs-discount", to: "/admin/promo-codes" });
    const transactionsLink = Object.freeze({ title: "History Transaction", icon: "bx bxs-receipt", to: "/admin/transactions" });
    const reportsSection = Object.freeze({ heading: "Reports" });
    const reportsGroup = Object.freeze({ title: "Reports", icon: "bx bxs-report" });
    const reportsTransactionsLink = Object.freeze({ title: "Transactions", to: "/admin/reports/transactions" });
    const reportsUnitTransactionsLink = Object.freeze({ title: "Unit Transactions", to: "/admin/reports/unit-transactions" });
    const reportsOutletTransactionsLink = Object.freeze({ title: "Outlet Transactions", to: "/admin/reports/outlet-transactions" });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_sfc_main$1, { item: unref(dashboardLink) }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { item: unref(managementSection) }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { item: unref(usersLink) }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { item: unref(unitsLink) }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { item: unref(outletsLink) }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { item: unref(pricingLink) }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1$1, { item: unref(photosGroup) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, { item: unref(uploadPhotoLink) }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, { item: unref(listPhotoLink) }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, { item: unref(uploadPhotoLink) }, null, 8, ["item"]),
              createVNode(_sfc_main$1, { item: unref(listPhotoLink) }, null, 8, ["item"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { item: unref(timeOperationLink) }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { item: unref(promoCodesLink) }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1, { item: unref(transactionsLink) }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$2, { item: unref(reportsSection) }, null, _parent));
      _push(ssrRenderComponent(_sfc_main$1$1, { item: unref(reportsGroup) }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$1, { item: unref(reportsTransactionsLink) }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, { item: unref(reportsUnitTransactionsLink) }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$1, { item: unref(reportsOutletTransactionsLink) }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$1, { item: unref(reportsTransactionsLink) }, null, 8, ["item"]),
              createVNode(_sfc_main$1, { item: unref(reportsUnitTransactionsLink) }, null, 8, ["item"]),
              createVNode(_sfc_main$1, { item: unref(reportsOutletTransactionsLink) }, null, 8, ["item"])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/NavItems.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
