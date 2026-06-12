import { _ as __nuxt_component_0 } from './nuxt-link-Co2TUpd4.mjs';
import { _ as _sfc_main$4 } from './NuxtImg-3HNqV9w8.mjs';
import { defineComponent, resolveComponent, withCtx, renderSlot, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import _sfc_main$3 from './UnitNavItems-p5bNM1Qr.mjs';
import { _ as _sfc_main$1 } from './VerticalNavLayout-DH8_PG_a.mjs';
import _sfc_main$2 from './Footer-Dn9r9v8a.mjs';
import _sfc_main$5 from './NavbarThemeSwitcher-DkD0gPA7.mjs';
import _sfc_main$6 from './UserProfile-Czt_wppC.mjs';
import { _ as _export_sfc, b as VIcon } from './server.mjs';
import { V as VSpacer } from './VSpacer-CQpJ4yRI.mjs';
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
import '@unhead/shared';
import './VerticalNavSectionTitle-DyFkSzq-.mjs';
import './VerticalNavLink-B7Al52pd.mjs';
import 'vue3-perfect-scrollbar';
import './logo-C2NYPRdy.mjs';
import './index-CZ80b3Q4.mjs';
import './VTooltip-DZOCAHjt.mjs';
import './forwardRefs-BSTjJZPU.mjs';
import 'pinia';
import 'unhead';
import 'vue-router';
import './VMenu-CmFsZZaF.mjs';
import './index-ewhk7FTz.mjs';
import './ssrBoot-BtvJZs44.mjs';
import './VListSubheader-BbgyaiQc.mjs';
import './dialog-transition-D66jL1n_.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UnitLayoutWithVerticalNav",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconBtn = resolveComponent("IconBtn");
      const _component_NuxtLink = __nuxt_component_0;
      const _component_nuxt_img = _sfc_main$4;
      _push(ssrRenderComponent(_sfc_main$1, _attrs, {
        navbar: withCtx(({ toggleVerticalOverlayNavActive }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="d-flex h-100 align-center" data-v-13f8e234${_scopeId}>`);
            _push2(ssrRenderComponent(_component_IconBtn, {
              class: "ms-n3 d-lg-none",
              onClick: ($event) => toggleVerticalOverlayNavActive(true)
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VIcon, { icon: "bx-menu" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VIcon, { icon: "bx-menu" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VSpacer, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_IconBtn, null, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VIcon, { icon: "bx-bell" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VIcon, { icon: "bx-bell" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$5, { class: "me-1" }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(_sfc_main$6, null, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode("div", { class: "d-flex h-100 align-center" }, [
                createVNode(_component_IconBtn, {
                  class: "ms-n3 d-lg-none",
                  onClick: ($event) => toggleVerticalOverlayNavActive(true)
                }, {
                  default: withCtx(() => [
                    createVNode(VIcon, { icon: "bx-menu" })
                  ]),
                  _: 2
                }, 1032, ["onClick"]),
                createVNode(VSpacer),
                createVNode(_component_IconBtn, null, {
                  default: withCtx(() => [
                    createVNode(VIcon, { icon: "bx-bell" })
                  ]),
                  _: 1
                }),
                createVNode(_sfc_main$5, { class: "me-1" }),
                createVNode(_sfc_main$6)
              ])
            ];
          }
        }),
        "vertical-nav-header": withCtx(({ toggleIsOverlayNavActive }, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_component_NuxtLink, {
              to: "/",
              class: "app-logo app-title-wrapper"
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_nuxt_img, {
                    src: "/images/ownize_logo.png",
                    alt: "",
                    class: "float-left margin-fleche",
                    style: { "max-width": "120px", "height": "auto" }
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_nuxt_img, {
                      src: "/images/ownize_logo.png",
                      alt: "",
                      class: "float-left margin-fleche",
                      style: { "max-width": "120px", "height": "auto" }
                    })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_IconBtn, {
              class: "d-block d-lg-none",
              onClick: ($event) => toggleIsOverlayNavActive(false)
            }, {
              default: withCtx((_, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VIcon, { icon: "bx-x" }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VIcon, { icon: "bx-x" })
                  ];
                }
              }),
              _: 2
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(_component_NuxtLink, {
                to: "/",
                class: "app-logo app-title-wrapper"
              }, {
                default: withCtx(() => [
                  createVNode(_component_nuxt_img, {
                    src: "/images/ownize_logo.png",
                    alt: "",
                    class: "float-left margin-fleche",
                    style: { "max-width": "120px", "height": "auto" }
                  })
                ]),
                _: 1
              }),
              createVNode(_component_IconBtn, {
                class: "d-block d-lg-none",
                onClick: ($event) => toggleIsOverlayNavActive(false)
              }, {
                default: withCtx(() => [
                  createVNode(VIcon, { icon: "bx-x" })
                ]),
                _: 2
              }, 1032, ["onClick"])
            ];
          }
        }),
        "vertical-nav-content": withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$3, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$3)
            ];
          }
        }),
        footer: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(_sfc_main$2, null, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(_sfc_main$2)
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            ssrRenderSlot(_ctx.$slots, "default", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              renderSlot(_ctx.$slots, "default", {}, void 0, true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/UnitLayoutWithVerticalNav.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const UnitLayoutWithVerticalNav = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-13f8e234"]]);

export { UnitLayoutWithVerticalNav as default };
