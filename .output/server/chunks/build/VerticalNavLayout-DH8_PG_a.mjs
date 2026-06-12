import { _ as __nuxt_component_0 } from './nuxt-link-Co2TUpd4.mjs';
import { defineComponent, ref, h, watch, createVNode, resolveDynamicComponent, mergeProps, unref, withCtx, renderSlot, useSSRContext } from 'vue';
import { ssrRenderVNode, ssrRenderSlot, ssrRenderComponent } from 'vue/server-renderer';
import { PerfectScrollbar } from 'vue3-perfect-scrollbar';
import { l as logo } from './logo-C2NYPRdy.mjs';
import { z as useRoute$1, v as useDisplay, _ as _export_sfc } from './server.mjs';
import { a as useToggle, s as syncRef } from './index-CZ80b3Q4.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "VerticalNav",
  __ssrInlineRender: true,
  props: {
    tag: { default: "aside" },
    isOverlayNavActive: { type: Boolean },
    toggleIsOverlayNavActive: {}
  },
  setup(__props) {
    const props = __props;
    const { mdAndDown } = useDisplay();
    const refNav = ref();
    const route = useRoute$1();
    watch(
      () => route.path,
      () => {
        props.toggleIsOverlayNavActive(false);
      }
    );
    const isVerticalNavScrolled = ref(false);
    const updateIsVerticalNavScrolled = (val) => isVerticalNavScrolled.value = val;
    const handleNavScroll = (evt) => {
      isVerticalNavScrolled.value = evt.target.scrollTop > 0;
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(props.tag), mergeProps({
        ref_key: "refNav",
        ref: refNav,
        "data-allow-mismatch": "",
        class: ["layout-vertical-nav", [
          {
            "visible": _ctx.isOverlayNavActive,
            "scrolled": unref(isVerticalNavScrolled),
            "overlay-nav": unref(mdAndDown)
          }
        ]]
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<div class="nav-header" data-v-80be9a01${_scopeId}>`);
            ssrRenderSlot(_ctx.$slots, "nav-header", {}, () => {
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/",
                class: "app-logo app-title-wrapper"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  var _a;
                  if (_push3) {
                    _push3(`<div class="d-flex" data-v-80be9a01${_scopeId2}>${(_a = unref(logo)) != null ? _a : ""}</div><h1 class="leading-normal" data-v-80be9a01${_scopeId2}> sneat </h1>`);
                  } else {
                    return [
                      createVNode("div", {
                        class: "d-flex",
                        innerHTML: unref(logo)
                      }, null, 8, ["innerHTML"]),
                      createVNode("h1", { class: "leading-normal" }, " sneat ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
            _push2(`</div>`);
            ssrRenderSlot(_ctx.$slots, "before-nav-items", {}, () => {
              _push2(`<div class="vertical-nav-items-shadow" data-v-80be9a01${_scopeId}></div>`);
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "nav-items", { updateIsVerticalNavScrolled }, () => {
              _push2(ssrRenderComponent(unref(PerfectScrollbar), {
                tag: "ul",
                class: "nav-items",
                options: { wheelPropagation: false },
                onPsScrollY: handleNavScroll
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    ssrRenderSlot(_ctx.$slots, "default", {}, null, _push3, _parent3, _scopeId2);
                  } else {
                    return [
                      renderSlot(_ctx.$slots, "default", {}, void 0, true)
                    ];
                  }
                }),
                _: 3
              }, _parent2, _scopeId));
            }, _push2, _parent2, _scopeId);
            ssrRenderSlot(_ctx.$slots, "after-nav-items", {}, null, _push2, _parent2, _scopeId);
          } else {
            return [
              createVNode("div", { class: "nav-header" }, [
                renderSlot(_ctx.$slots, "nav-header", {}, () => [
                  createVNode(_component_NuxtLink, {
                    to: "/",
                    class: "app-logo app-title-wrapper"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: "d-flex",
                        innerHTML: unref(logo)
                      }, null, 8, ["innerHTML"]),
                      createVNode("h1", { class: "leading-normal" }, " sneat ")
                    ]),
                    _: 1
                  })
                ], true)
              ]),
              renderSlot(_ctx.$slots, "before-nav-items", {}, () => [
                createVNode("div", { class: "vertical-nav-items-shadow" })
              ], true),
              renderSlot(_ctx.$slots, "nav-items", { updateIsVerticalNavScrolled }, () => [
                createVNode(unref(PerfectScrollbar), {
                  tag: "ul",
                  class: "nav-items",
                  options: { wheelPropagation: false },
                  onPsScrollY: handleNavScroll
                }, {
                  default: withCtx(() => [
                    renderSlot(_ctx.$slots, "default", {}, void 0, true)
                  ]),
                  _: 3
                })
              ], true),
              renderSlot(_ctx.$slots, "after-nav-items", {}, void 0, true)
            ];
          }
        }),
        _: 3
      }), _parent);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("@layouts/components/VerticalNav.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const VerticalNav = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-80be9a01"]]);
const _sfc_main = defineComponent({
  setup(props, { slots }) {
    const isOverlayNavActive = ref(false);
    const isLayoutOverlayVisible = ref(false);
    const toggleIsOverlayNavActive = useToggle(isOverlayNavActive);
    const route = useRoute$1();
    const { mdAndDown } = useDisplay();
    syncRef(isOverlayNavActive, isLayoutOverlayVisible);
    return () => {
      var _a, _b, _c;
      const verticalNav = h(
        VerticalNav,
        { isOverlayNavActive: isOverlayNavActive.value, toggleIsOverlayNavActive },
        {
          "nav-header": () => {
            var _a2;
            return (_a2 = slots["vertical-nav-header"]) == null ? void 0 : _a2.call(slots, { toggleIsOverlayNavActive });
          },
          "before-nav-items": () => {
            var _a2;
            return (_a2 = slots["before-vertical-nav-items"]) == null ? void 0 : _a2.call(slots);
          },
          "default": () => {
            var _a2;
            return (_a2 = slots["vertical-nav-content"]) == null ? void 0 : _a2.call(slots);
          },
          "after-nav-items": () => {
            var _a2;
            return (_a2 = slots["after-vertical-nav-items"]) == null ? void 0 : _a2.call(slots);
          }
        }
      );
      const navbar = h(
        "header",
        { class: ["layout-navbar navbar-blur"] },
        [
          h(
            "div",
            { class: "navbar-content-container" },
            (_a = slots.navbar) == null ? void 0 : _a.call(slots, {
              toggleVerticalOverlayNavActive: toggleIsOverlayNavActive
            })
          )
        ]
      );
      const main = h(
        "main",
        { class: "layout-page-content" },
        h("div", { class: "page-content-container" }, (_b = slots.default) == null ? void 0 : _b.call(slots))
      );
      const footer = h(
        "footer",
        { class: "layout-footer" },
        [
          h(
            "div",
            { class: "footer-content-container" },
            (_c = slots.footer) == null ? void 0 : _c.call(slots)
          )
        ]
      );
      const layoutOverlay = h(
        "div",
        {
          class: ["layout-overlay", { visible: isLayoutOverlayVisible.value }],
          onClick: () => {
            isLayoutOverlayVisible.value = !isLayoutOverlayVisible.value;
          }
        }
      );
      return h(
        "div",
        {
          class: [
            "layout-wrapper layout-nav-type-vertical layout-navbar-static layout-footer-static layout-content-width-fluid",
            mdAndDown.value && "layout-overlay-nav",
            route.meta.layoutWrapperClasses
          ]
        },
        [
          verticalNav,
          h(
            "div",
            { class: "layout-content-wrapper" },
            [
              navbar,
              main,
              footer
            ]
          ),
          layoutOverlay
        ]
      );
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("@layouts/components/VerticalNavLayout.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _ };
