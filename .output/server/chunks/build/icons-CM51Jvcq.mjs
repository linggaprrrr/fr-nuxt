import { defineComponent, withCtx, createVNode, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderList, ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { V as VCard, a as VCardText } from './VCard-DLk5PTHl.mjs';
import { b as VIcon, a as VBtn } from './server.mjs';
import { V as VTooltip } from './VTooltip-DZOCAHjt.mjs';
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
import './forwardRefs-BSTjJZPU.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "icons",
  __ssrInlineRender: true,
  setup(__props) {
    const iconsList = [
      "bx-abacus",
      "bx-accessibility",
      "bx-add-to-queue",
      "bx-adjust",
      "bx-alarm",
      "bx-alarm-add",
      "bx-alarm-exclamation",
      "bx-alarm-off",
      "bx-alarm-snooze",
      "bx-album",
      "bx-align-justify",
      "bx-align-left",
      "bx-align-middle",
      "bx-align-right",
      "bx-analyse",
      "bx-anchor",
      "bx-angry",
      "bx-aperture",
      "bx-arch",
      "bx-archive",
      "bx-archive-in",
      "bx-archive-out",
      "bx-area",
      "bx-arrow-back",
      "bx-arrow-from-bottom",
      "bx-arrow-from-left",
      "bx-arrow-from-right",
      "bx-arrow-from-top",
      "bx-arrow-to-bottom",
      "bx-arrow-to-left",
      "bx-arrow-to-right",
      "bx-arrow-to-top",
      "bx-at",
      "bx-atom",
      "bx-award",
      "bx-badge",
      "bx-badge-check",
      "bx-baguette",
      "bx-ball",
      "bx-band-aid",
      "bx-bar-chart",
      "bx-bar-chart-alt",
      "bx-bar-chart-alt-2",
      "bx-bar-chart-square",
      "bx-barcode",
      "bx-barcode-reader",
      "bx-baseball",
      "bx-basket"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><div class="d-flex align-center flex-wrap"><!--[-->`);
      ssrRenderList(iconsList, (icon) => {
        _push(ssrRenderComponent(VCard, {
          key: icon,
          class: "mb-6 me-6"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(VCardText, { class: "py-3 px-4" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VIcon, {
                      size: "30",
                      icon
                    }, null, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VIcon, {
                        size: "30",
                        icon
                      }, null, 8, ["icon"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
              _push2(ssrRenderComponent(VTooltip, {
                location: "top",
                activator: "parent"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(icon)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(icon), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(VCardText, { class: "py-3 px-4" }, {
                  default: withCtx(() => [
                    createVNode(VIcon, {
                      size: "30",
                      icon
                    }, null, 8, ["icon"])
                  ]),
                  _: 2
                }, 1024),
                createVNode(VTooltip, {
                  location: "top",
                  activator: "parent"
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(icon), 1)
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 2
        }, _parent));
      });
      _push(`<!--]--></div><div class="text-center">`);
      _push(ssrRenderComponent(VBtn, {
        href: "https://boxicons.com/",
        rel: "noopener noreferrer",
        color: "primary",
        target: "_blank"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` View All Box Icons `);
          } else {
            return [
              createTextVNode(" View All Box Icons ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/icons.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
