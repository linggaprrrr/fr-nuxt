import { _ as __nuxt_component_0 } from './nuxt-link-Co2TUpd4.mjs';
import { an as VImg, b4 as navigateTo, a as VBtn, c as VDivider, aY as useTheme } from './server.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, useId, createTextVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList } from 'vue/server-renderer';
import { l as logo } from './logo-C2NYPRdy.mjs';
import { a as authV1TopShape, b as authV1BottomShape } from './auth-v1-top-shape-smMuVKoE.mjs';
import { V as VCard, e as VCardItem, a as VCardText } from './VCard-DLk5PTHl.mjs';
import { V as VForm } from './VForm-CsHTnp-Y.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VTextField, j as VLabel } from './VTextField-1oTGfZvz.mjs';
import { V as VCheckbox } from './VCheckbox-B9n4Yo8o.mjs';
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
import './index-ewhk7FTz.mjs';
import './VCheckboxBtn-DaRBpQ2e.mjs';

const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AuthProvider",
  __ssrInlineRender: true,
  setup(__props) {
    const { global } = useTheme();
    const authProviders = [
      {
        icon: "bxl-facebook",
        color: "#4267b2",
        colorInDark: "#4267b2"
      },
      {
        icon: "bxl-twitter",
        color: "#1da1f2",
        colorInDark: "#1da1f2"
      },
      {
        icon: "bxl-github",
        color: "#272727",
        colorInDark: "#fff"
      },
      {
        icon: "bxl-google",
        color: "#db4437",
        colorInDark: "#db4437"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      ssrRenderList(authProviders, (link) => {
        _push(ssrRenderComponent(VBtn, {
          key: link.icon,
          icon: link.icon,
          variant: "text",
          color: unref(global).name.value === "dark" ? link.colorInDark : link.color
        }, null, _parent));
      });
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/pages/authentication/AuthProvider.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "register",
  __ssrInlineRender: true,
  setup(__props) {
    const form = ref({
      username: "",
      email: "",
      password: "",
      privacyPolicies: false
    });
    const isPasswordVisible = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "auth-wrapper d-flex align-center justify-center pa-4" }, _attrs))}><div class="position-relative my-sm-16">`);
      _push(ssrRenderComponent(VImg, {
        src: unref(authV1TopShape),
        class: "text-primary auth-v1-top-shape d-none d-sm-block"
      }, null, _parent));
      _push(ssrRenderComponent(VImg, {
        src: unref(authV1BottomShape),
        class: "text-primary auth-v1-bottom-shape d-none d-sm-block"
      }, null, _parent));
      _push(ssrRenderComponent(VCard, {
        class: ["auth-card", _ctx.$vuetify.display.smAndUp ? "pa-6" : "pa-0"],
        "max-width": "460"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardItem, { class: "justify-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_component_NuxtLink, {
                    to: "/",
                    class: "app-logo"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      var _a;
                      if (_push4) {
                        _push4(`<div class="d-flex"${_scopeId3}>${(_a = unref(logo)) != null ? _a : ""}</div><h1 class="app-logo-title"${_scopeId3}> sneat </h1>`);
                      } else {
                        return [
                          createVNode("div", {
                            class: "d-flex",
                            innerHTML: unref(logo)
                          }, null, 8, ["innerHTML"]),
                          createVNode("h1", { class: "app-logo-title" }, " sneat ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtLink, {
                      to: "/",
                      class: "app-logo"
                    }, {
                      default: withCtx(() => [
                        createVNode("div", {
                          class: "d-flex",
                          innerHTML: unref(logo)
                        }, null, 8, ["innerHTML"]),
                        createVNode("h1", { class: "app-logo-title" }, " sneat ")
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h4 class="text-h4 mb-1"${_scopeId2}> Adventure starts here \u{1F680} </h4><p class="mb-0"${_scopeId2}> Make your app management easy and fun! </p>`);
                } else {
                  return [
                    createVNode("h4", { class: "text-h4 mb-1" }, " Adventure starts here \u{1F680} "),
                    createVNode("p", { class: "mb-0" }, " Make your app management easy and fun! ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VForm, {
                    onSubmit: ($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/")
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "12" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                      modelValue: unref(form).username,
                                      "onUpdate:modelValue": ($event) => unref(form).username = $event,
                                      autofocus: "",
                                      label: "Username",
                                      placeholder: "Johndoe"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                        modelValue: unref(form).username,
                                        "onUpdate:modelValue": ($event) => unref(form).username = $event,
                                        autofocus: "",
                                        label: "Username",
                                        placeholder: "Johndoe"
                                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "12" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                      modelValue: unref(form).email,
                                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                      label: "Email",
                                      type: "email",
                                      placeholder: "johndoe@email.com"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                        modelValue: unref(form).email,
                                        "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                        label: "Email",
                                        type: "email",
                                        placeholder: "johndoe@email.com"
                                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "12" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                      modelValue: unref(form).password,
                                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                      label: "Password",
                                      autocomplete: "password",
                                      placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                      type: unref(isPasswordVisible) ? "text" : "password",
                                      "append-inner-icon": unref(isPasswordVisible) ? "bx-hide" : "bx-show",
                                      "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div class="d-flex align-center my-6"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(VCheckbox, {
                                      id: "privacy-policy",
                                      modelValue: unref(form).privacyPolicies,
                                      "onUpdate:modelValue": ($event) => unref(form).privacyPolicies = $event,
                                      inline: ""
                                    }, null, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VLabel, {
                                      for: "privacy-policy",
                                      style: { "opacity": "1" }
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<span class="me-1 text-high-emphasis"${_scopeId6}>I agree to</span><a href="javascript:void(0)" class="text-primary"${_scopeId6}>privacy policy &amp; terms</a>`);
                                        } else {
                                          return [
                                            createVNode("span", { class: "me-1 text-high-emphasis" }, "I agree to"),
                                            createVNode("a", {
                                              href: "javascript:void(0)",
                                              class: "text-primary"
                                            }, "privacy policy & terms")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                    _push6(ssrRenderComponent(VBtn, {
                                      block: "",
                                      type: "submit"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Sign up `);
                                        } else {
                                          return [
                                            createTextVNode(" Sign up ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                        modelValue: unref(form).password,
                                        "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                        label: "Password",
                                        autocomplete: "password",
                                        placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                        type: unref(isPasswordVisible) ? "text" : "password",
                                        "append-inner-icon": unref(isPasswordVisible) ? "bx-hide" : "bx-show",
                                        "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                      createVNode("div", { class: "d-flex align-center my-6" }, [
                                        createVNode(VCheckbox, {
                                          id: "privacy-policy",
                                          modelValue: unref(form).privacyPolicies,
                                          "onUpdate:modelValue": ($event) => unref(form).privacyPolicies = $event,
                                          inline: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                        createVNode(VLabel, {
                                          for: "privacy-policy",
                                          style: { "opacity": "1" }
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("span", { class: "me-1 text-high-emphasis" }, "I agree to"),
                                            createVNode("a", {
                                              href: "javascript:void(0)",
                                              class: "text-primary"
                                            }, "privacy policy & terms")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      createVNode(VBtn, {
                                        block: "",
                                        type: "submit"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Sign up ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                class: "text-center text-base"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span${_scopeId5}>Already have an account?</span>`);
                                    _push6(ssrRenderComponent(_component_NuxtLink, {
                                      class: "text-primary ms-1",
                                      to: "/login"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Sign in instead `);
                                        } else {
                                          return [
                                            createTextVNode(" Sign in instead ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("span", null, "Already have an account?"),
                                      createVNode(_component_NuxtLink, {
                                        class: "text-primary ms-1",
                                        to: "/login"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Sign in instead ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                class: "d-flex align-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VDivider, null, null, _parent6, _scopeId5));
                                    _push6(`<span class="mx-4"${_scopeId5}>or</span>`);
                                    _push6(ssrRenderComponent(VDivider, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VDivider),
                                      createVNode("span", { class: "mx-4" }, "or"),
                                      createVNode(VDivider)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                class: "text-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(_sfc_main$1, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(_sfc_main$1)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                      modelValue: unref(form).username,
                                      "onUpdate:modelValue": ($event) => unref(form).username = $event,
                                      autofocus: "",
                                      label: "Username",
                                      placeholder: "Johndoe"
                                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                      modelValue: unref(form).email,
                                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                      label: "Email",
                                      type: "email",
                                      placeholder: "johndoe@email.com"
                                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                      modelValue: unref(form).password,
                                      "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                      label: "Password",
                                      autocomplete: "password",
                                      placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                      type: unref(isPasswordVisible) ? "text" : "password",
                                      "append-inner-icon": unref(isPasswordVisible) ? "bx-hide" : "bx-show",
                                      "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                    createVNode("div", { class: "d-flex align-center my-6" }, [
                                      createVNode(VCheckbox, {
                                        id: "privacy-policy",
                                        modelValue: unref(form).privacyPolicies,
                                        "onUpdate:modelValue": ($event) => unref(form).privacyPolicies = $event,
                                        inline: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                      createVNode(VLabel, {
                                        for: "privacy-policy",
                                        style: { "opacity": "1" }
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("span", { class: "me-1 text-high-emphasis" }, "I agree to"),
                                          createVNode("a", {
                                            href: "javascript:void(0)",
                                            class: "text-primary"
                                          }, "privacy policy & terms")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    createVNode(VBtn, {
                                      block: "",
                                      type: "submit"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Sign up ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  class: "text-center text-base"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", null, "Already have an account?"),
                                    createVNode(_component_NuxtLink, {
                                      class: "text-primary ms-1",
                                      to: "/login"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Sign in instead ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  class: "d-flex align-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VDivider),
                                    createVNode("span", { class: "mx-4" }, "or"),
                                    createVNode(VDivider)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  class: "text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(_sfc_main$1)
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "12" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                    modelValue: unref(form).username,
                                    "onUpdate:modelValue": ($event) => unref(form).username = $event,
                                    autofocus: "",
                                    label: "Username",
                                    placeholder: "Johndoe"
                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "12" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                    modelValue: unref(form).email,
                                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                    label: "Email",
                                    type: "email",
                                    placeholder: "johndoe@email.com"
                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "12" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                    modelValue: unref(form).password,
                                    "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                    label: "Password",
                                    autocomplete: "password",
                                    placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                    type: unref(isPasswordVisible) ? "text" : "password",
                                    "append-inner-icon": unref(isPasswordVisible) ? "bx-hide" : "bx-show",
                                    "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                  createVNode("div", { class: "d-flex align-center my-6" }, [
                                    createVNode(VCheckbox, {
                                      id: "privacy-policy",
                                      modelValue: unref(form).privacyPolicies,
                                      "onUpdate:modelValue": ($event) => unref(form).privacyPolicies = $event,
                                      inline: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                    createVNode(VLabel, {
                                      for: "privacy-policy",
                                      style: { "opacity": "1" }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("span", { class: "me-1 text-high-emphasis" }, "I agree to"),
                                        createVNode("a", {
                                          href: "javascript:void(0)",
                                          class: "text-primary"
                                        }, "privacy policy & terms")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode(VBtn, {
                                    block: "",
                                    type: "submit"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Sign up ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                class: "text-center text-base"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", null, "Already have an account?"),
                                  createVNode(_component_NuxtLink, {
                                    class: "text-primary ms-1",
                                    to: "/login"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Sign in instead ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                class: "d-flex align-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VDivider),
                                  createVNode("span", { class: "mx-4" }, "or"),
                                  createVNode(VDivider)
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                class: "text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode(_sfc_main$1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VForm, {
                      onSubmit: withModifiers(($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/"), ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                  modelValue: unref(form).username,
                                  "onUpdate:modelValue": ($event) => unref(form).username = $event,
                                  autofocus: "",
                                  label: "Username",
                                  placeholder: "Johndoe"
                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                  modelValue: unref(form).email,
                                  "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                  label: "Email",
                                  type: "email",
                                  placeholder: "johndoe@email.com"
                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                  modelValue: unref(form).password,
                                  "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                  label: "Password",
                                  autocomplete: "password",
                                  placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                  type: unref(isPasswordVisible) ? "text" : "password",
                                  "append-inner-icon": unref(isPasswordVisible) ? "bx-hide" : "bx-show",
                                  "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                createVNode("div", { class: "d-flex align-center my-6" }, [
                                  createVNode(VCheckbox, {
                                    id: "privacy-policy",
                                    modelValue: unref(form).privacyPolicies,
                                    "onUpdate:modelValue": ($event) => unref(form).privacyPolicies = $event,
                                    inline: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                  createVNode(VLabel, {
                                    for: "privacy-policy",
                                    style: { "opacity": "1" }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "me-1 text-high-emphasis" }, "I agree to"),
                                      createVNode("a", {
                                        href: "javascript:void(0)",
                                        class: "text-primary"
                                      }, "privacy policy & terms")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode(VBtn, {
                                  block: "",
                                  type: "submit"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Sign up ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              class: "text-center text-base"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", null, "Already have an account?"),
                                createVNode(_component_NuxtLink, {
                                  class: "text-primary ms-1",
                                  to: "/login"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Sign in instead ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              class: "d-flex align-center"
                            }, {
                              default: withCtx(() => [
                                createVNode(VDivider),
                                createVNode("span", { class: "mx-4" }, "or"),
                                createVNode(VDivider)
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              class: "text-center"
                            }, {
                              default: withCtx(() => [
                                createVNode(_sfc_main$1)
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["onSubmit"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardItem, { class: "justify-center" }, {
                default: withCtx(() => [
                  createVNode(_component_NuxtLink, {
                    to: "/",
                    class: "app-logo"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", {
                        class: "d-flex",
                        innerHTML: unref(logo)
                      }, null, 8, ["innerHTML"]),
                      createVNode("h1", { class: "app-logo-title" }, " sneat ")
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode("h4", { class: "text-h4 mb-1" }, " Adventure starts here \u{1F680} "),
                  createVNode("p", { class: "mb-0" }, " Make your app management easy and fun! ")
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode(VForm, {
                    onSubmit: withModifiers(($event) => ("navigateTo" in _ctx ? _ctx.navigateTo : unref(navigateTo))("/"), ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                modelValue: unref(form).username,
                                "onUpdate:modelValue": ($event) => unref(form).username = $event,
                                autofocus: "",
                                label: "Username",
                                placeholder: "Johndoe"
                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                modelValue: unref(form).email,
                                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                label: "Email",
                                type: "email",
                                placeholder: "johndoe@email.com"
                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                modelValue: unref(form).password,
                                "onUpdate:modelValue": ($event) => unref(form).password = $event,
                                label: "Password",
                                autocomplete: "password",
                                placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                type: unref(isPasswordVisible) ? "text" : "password",
                                "append-inner-icon": unref(isPasswordVisible) ? "bx-hide" : "bx-show",
                                "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                              createVNode("div", { class: "d-flex align-center my-6" }, [
                                createVNode(VCheckbox, {
                                  id: "privacy-policy",
                                  modelValue: unref(form).privacyPolicies,
                                  "onUpdate:modelValue": ($event) => unref(form).privacyPolicies = $event,
                                  inline: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                                createVNode(VLabel, {
                                  for: "privacy-policy",
                                  style: { "opacity": "1" }
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "me-1 text-high-emphasis" }, "I agree to"),
                                    createVNode("a", {
                                      href: "javascript:void(0)",
                                      class: "text-primary"
                                    }, "privacy policy & terms")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode(VBtn, {
                                block: "",
                                type: "submit"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Sign up ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            class: "text-center text-base"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", null, "Already have an account?"),
                              createVNode(_component_NuxtLink, {
                                class: "text-primary ms-1",
                                to: "/login"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Sign in instead ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            class: "d-flex align-center"
                          }, {
                            default: withCtx(() => [
                              createVNode(VDivider),
                              createVNode("span", { class: "mx-4" }, "or"),
                              createVNode(VDivider)
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            class: "text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$1)
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }, 8, ["onSubmit"])
                ]),
                _: 1
              })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/register.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
