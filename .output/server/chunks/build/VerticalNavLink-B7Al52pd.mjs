import { defineComponent, ref, mergeProps, unref, createVNode, resolveDynamicComponent, withCtx, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderClass, ssrRenderSlot, ssrRenderVNode } from 'vue/server-renderer';
import { b as VIcon } from './server.mjs';
import { _ as __nuxt_component_0 } from './nuxt-link-Co2TUpd4.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "VerticalNavGroup",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    const isOpen = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({
        class: ["nav-group", unref(isOpen) && "open"]
      }, _attrs))}><div class="nav-group-label">`);
      _push(ssrRenderComponent(VIcon, {
        icon: _ctx.item.icon || "bxs-circle",
        class: "nav-item-icon"
      }, null, _parent));
      _push(`<span class="nav-item-title">${ssrInterpolate(_ctx.item.title)}</span><span class="${ssrRenderClass([_ctx.item.badgeClass, "nav-item-badge"])}">${ssrInterpolate(_ctx.item.badgeContent)}</span>`);
      _push(ssrRenderComponent(VIcon, {
        icon: "bx-chevron-right",
        class: "nav-group-arrow"
      }, null, _parent));
      _push(`</div><div class="nav-group-children-wrapper"><ul class="nav-group-children">`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</ul></div></li>`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("@layouts/components/VerticalNavGroup.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "VerticalNavLink",
  __ssrInlineRender: true,
  props: {
    item: {}
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<li${ssrRenderAttrs(mergeProps({
        class: ["nav-link", { disabled: _ctx.item.disable }]
      }, _attrs))}>`);
      ssrRenderVNode(_push, createVNode(resolveDynamicComponent(_ctx.item.to ? unref(__nuxt_component_0) : "a"), {
        to: _ctx.item.to,
        href: _ctx.item.href,
        target: _ctx.item.target
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VIcon, {
              icon: _ctx.item.icon || "bxs-circle",
              class: "nav-item-icon"
            }, null, _parent2, _scopeId));
            _push2(`<span class="nav-item-title"${_scopeId}>${ssrInterpolate(_ctx.item.title)}</span><span class="${ssrRenderClass([_ctx.item.badgeClass, "nav-item-badge"])}"${_scopeId}>${ssrInterpolate(_ctx.item.badgeContent)}</span>`);
          } else {
            return [
              createVNode(VIcon, {
                icon: _ctx.item.icon || "bxs-circle",
                class: "nav-item-icon"
              }, null, 8, ["icon"]),
              createVNode("span", { class: "nav-item-title" }, toDisplayString(_ctx.item.title), 1),
              createVNode("span", {
                class: ["nav-item-badge", _ctx.item.badgeClass]
              }, toDisplayString(_ctx.item.badgeContent), 3)
            ];
          }
        }),
        _: 1
      }), _parent);
      _push(`</li>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("@layouts/components/VerticalNavLink.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as _, _sfc_main$1 as a };
