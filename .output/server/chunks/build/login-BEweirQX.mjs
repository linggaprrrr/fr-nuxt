import { _ as __nuxt_component_0 } from './nuxt-link-Co2TUpd4.mjs';
import { _ as _sfc_main$1 } from './NuxtImg-3HNqV9w8.mjs';
import { defineComponent, ref, mergeProps, unref, withCtx, createVNode, useId, createTextVNode, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { a as authV1TopShape, b as authV1BottomShape } from './auth-v1-top-shape-smMuVKoE.mjs';
import { u as useAuth } from './useAuth-azgWfqZX.mjs';
import { an as VImg, a as VBtn, c as VDivider, b4 as navigateTo } from './server.mjs';
import { V as VCard, e as VCardItem, a as VCardText } from './VCard-DLk5PTHl.mjs';
import { V as VForm } from './VForm-CsHTnp-Y.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
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
import '@unhead/shared';
import 'pinia';
import 'unhead';
import 'vue-router';
import './forwardRefs-BSTjJZPU.mjs';
import './index-ewhk7FTz.mjs';
import './VCheckboxBtn-DaRBpQ2e.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "login",
  __ssrInlineRender: true,
  setup(__props) {
    const form = ref({
      email: "",
      password: "",
      remember: false
    });
    const isPasswordVisible = ref(false);
    const { login } = useAuth();
    const handleLogin = async () => {
      var _a;
      try {
        const user = await login(form.value.email, form.value.password);
        if (user) {
          const path = user.role === "superadmin" ? "/admin/dashboard" : "/photos";
          console.log("Redirecting to:", path);
          await navigateTo(path);
        }
      } catch (error) {
        alert("Login gagal: " + (((_a = error == null ? void 0 : error.data) == null ? void 0 : _a.message) || "Terjadi kesalahan"));
        console.error(error);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      const _component_nuxt_img = _sfc_main$1;
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
                      if (_push4) {
                        _push4(ssrRenderComponent(_component_nuxt_img, {
                          src: "/images/ownize_logo.png",
                          alt: "",
                          class: "float-left margin-fleche",
                          style: { "max-width": "120px", "height": "auto" }
                        }, null, _parent4, _scopeId3));
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
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_component_NuxtLink, {
                      to: "/",
                      class: "app-logo"
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
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<h4 class="text-h4 mb-1"${_scopeId2}> Welcome to Ownize! \u{1F44B}\u{1F3FB} </h4><p class="mb-0"${_scopeId2}> Please sign-in to your account and start the adventure </p>`);
                } else {
                  return [
                    createVNode("h4", { class: "text-h4 mb-1" }, " Welcome to Ownize! \u{1F44B}\u{1F3FB} "),
                    createVNode("p", { class: "mb-0" }, " Please sign-in to your account and start the adventure ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VForm, { onSubmit: handleLogin }, {
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
                                      modelValue: unref(form).email,
                                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                      autofocus: "",
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
                                        autofocus: "",
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
                                      placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                      type: unref(isPasswordVisible) ? "text" : "password",
                                      autocomplete: "password",
                                      "append-inner-icon": unref(isPasswordVisible) ? "bx-hide" : "bx-show",
                                      "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<div class="d-flex align-center justify-space-between flex-wrap my-6"${_scopeId5}>`);
                                    _push6(ssrRenderComponent(VCheckbox, {
                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                      modelValue: unref(form).remember,
                                      "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                      label: "Remember me"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<a class="text-primary" href="javascript:void(0)"${_scopeId5}> Forgot Password? </a></div>`);
                                    _push6(ssrRenderComponent(VBtn, {
                                      block: "",
                                      color: "#FB3AA2",
                                      type: "submit"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Login `);
                                        } else {
                                          return [
                                            createTextVNode(" Login ")
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
                                        placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                        type: unref(isPasswordVisible) ? "text" : "password",
                                        autocomplete: "password",
                                        "append-inner-icon": unref(isPasswordVisible) ? "bx-hide" : "bx-show",
                                        "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                      createVNode("div", { class: "d-flex align-center justify-space-between flex-wrap my-6" }, [
                                        createVNode(VCheckbox, {
                                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                          modelValue: unref(form).remember,
                                          "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                          label: "Remember me"
                                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                                        createVNode("a", {
                                          class: "text-primary",
                                          href: "javascript:void(0)"
                                        }, " Forgot Password? ")
                                      ]),
                                      createVNode(VBtn, {
                                        block: "",
                                        color: "#FB3AA2",
                                        type: "submit"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Login ")
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
                                class: "text-body-1 text-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="d-inline-block"${_scopeId5}> New on our platform? </span>`);
                                    _push6(ssrRenderComponent(_component_NuxtLink, {
                                      class: "text-primary ms-1 d-inline-block text-body-1",
                                      to: "/register"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Create an account `);
                                        } else {
                                          return [
                                            createTextVNode(" Create an account ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("span", { class: "d-inline-block" }, " New on our platform? "),
                                      createVNode(_component_NuxtLink, {
                                        class: "text-primary ms-1 d-inline-block text-body-1",
                                        to: "/register"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Create an account ")
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
                                    _push6(`<span class="mx-4 text-high-emphasis"${_scopeId5}>or</span>`);
                                    _push6(ssrRenderComponent(VDivider, null, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VDivider),
                                      createVNode("span", { class: "mx-4 text-high-emphasis" }, "or"),
                                      createVNode(VDivider)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                class: "d-flex align-center"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                      modelValue: unref(form).email,
                                      "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                      autofocus: "",
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
                                      placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                      type: unref(isPasswordVisible) ? "text" : "password",
                                      autocomplete: "password",
                                      "append-inner-icon": unref(isPasswordVisible) ? "bx-hide" : "bx-show",
                                      "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                    createVNode("div", { class: "d-flex align-center justify-space-between flex-wrap my-6" }, [
                                      createVNode(VCheckbox, {
                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                        modelValue: unref(form).remember,
                                        "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                        label: "Remember me"
                                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                                      createVNode("a", {
                                        class: "text-primary",
                                        href: "javascript:void(0)"
                                      }, " Forgot Password? ")
                                    ]),
                                    createVNode(VBtn, {
                                      block: "",
                                      color: "#FB3AA2",
                                      type: "submit"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Login ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  class: "text-body-1 text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "d-inline-block" }, " New on our platform? "),
                                    createVNode(_component_NuxtLink, {
                                      class: "text-primary ms-1 d-inline-block text-body-1",
                                      to: "/register"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Create an account ")
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
                                    createVNode("span", { class: "mx-4 text-high-emphasis" }, "or"),
                                    createVNode(VDivider)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  class: "d-flex align-center"
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
                                    modelValue: unref(form).email,
                                    "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                    autofocus: "",
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
                                    placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                    type: unref(isPasswordVisible) ? "text" : "password",
                                    autocomplete: "password",
                                    "append-inner-icon": unref(isPasswordVisible) ? "bx-hide" : "bx-show",
                                    "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                  createVNode("div", { class: "d-flex align-center justify-space-between flex-wrap my-6" }, [
                                    createVNode(VCheckbox, {
                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                      modelValue: unref(form).remember,
                                      "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                      label: "Remember me"
                                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                                    createVNode("a", {
                                      class: "text-primary",
                                      href: "javascript:void(0)"
                                    }, " Forgot Password? ")
                                  ]),
                                  createVNode(VBtn, {
                                    block: "",
                                    color: "#FB3AA2",
                                    type: "submit"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Login ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                class: "text-body-1 text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "d-inline-block" }, " New on our platform? "),
                                  createVNode(_component_NuxtLink, {
                                    class: "text-primary ms-1 d-inline-block text-body-1",
                                    to: "/register"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Create an account ")
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
                                  createVNode("span", { class: "mx-4 text-high-emphasis" }, "or"),
                                  createVNode(VDivider)
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                class: "d-flex align-center"
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
                      onSubmit: withModifiers(handleLogin, ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, { cols: "12" }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                  modelValue: unref(form).email,
                                  "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                  autofocus: "",
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
                                  placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                  type: unref(isPasswordVisible) ? "text" : "password",
                                  autocomplete: "password",
                                  "append-inner-icon": unref(isPasswordVisible) ? "bx-hide" : "bx-show",
                                  "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                                createVNode("div", { class: "d-flex align-center justify-space-between flex-wrap my-6" }, [
                                  createVNode(VCheckbox, {
                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                    modelValue: unref(form).remember,
                                    "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                    label: "Remember me"
                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                                  createVNode("a", {
                                    class: "text-primary",
                                    href: "javascript:void(0)"
                                  }, " Forgot Password? ")
                                ]),
                                createVNode(VBtn, {
                                  block: "",
                                  color: "#FB3AA2",
                                  type: "submit"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Login ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              class: "text-body-1 text-center"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "d-inline-block" }, " New on our platform? "),
                                createVNode(_component_NuxtLink, {
                                  class: "text-primary ms-1 d-inline-block text-body-1",
                                  to: "/register"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Create an account ")
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
                                createVNode("span", { class: "mx-4 text-high-emphasis" }, "or"),
                                createVNode(VDivider)
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              class: "d-flex align-center"
                            })
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
                      createVNode(_component_nuxt_img, {
                        src: "/images/ownize_logo.png",
                        alt: "",
                        class: "float-left margin-fleche",
                        style: { "max-width": "120px", "height": "auto" }
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode("h4", { class: "text-h4 mb-1" }, " Welcome to Ownize! \u{1F44B}\u{1F3FB} "),
                  createVNode("p", { class: "mb-0" }, " Please sign-in to your account and start the adventure ")
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode(VForm, {
                    onSubmit: withModifiers(handleLogin, ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, { cols: "12" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                modelValue: unref(form).email,
                                "onUpdate:modelValue": ($event) => unref(form).email = $event,
                                autofocus: "",
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
                                placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                type: unref(isPasswordVisible) ? "text" : "password",
                                autocomplete: "password",
                                "append-inner-icon": unref(isPasswordVisible) ? "bx-hide" : "bx-show",
                                "onClick:appendInner": ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"]),
                              createVNode("div", { class: "d-flex align-center justify-space-between flex-wrap my-6" }, [
                                createVNode(VCheckbox, {
                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                  modelValue: unref(form).remember,
                                  "onUpdate:modelValue": ($event) => unref(form).remember = $event,
                                  label: "Remember me"
                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue"]),
                                createVNode("a", {
                                  class: "text-primary",
                                  href: "javascript:void(0)"
                                }, " Forgot Password? ")
                              ]),
                              createVNode(VBtn, {
                                block: "",
                                color: "#FB3AA2",
                                type: "submit"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Login ")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            class: "text-body-1 text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "d-inline-block" }, " New on our platform? "),
                              createVNode(_component_NuxtLink, {
                                class: "text-primary ms-1 d-inline-block text-body-1",
                                to: "/register"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Create an account ")
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
                              createVNode("span", { class: "mx-4 text-high-emphasis" }, "or"),
                              createVNode(VDivider)
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            class: "d-flex align-center"
                          })
                        ]),
                        _: 1
                      })
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
      }, _parent));
      _push(`</div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/login.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
