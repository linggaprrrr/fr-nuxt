import { defineComponent, withCtx, createVNode, ref, mergeProps, unref, isRef, useId, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent } from 'vue/server-renderer';
import { V as VForm } from './VForm-CsHTnp-Y.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
import { V as VCheckbox } from './VCheckbox-B9n4Yo8o.mjs';
import { a as VBtn } from './server.mjs';
import { V as VCard, a as VCardText } from './VCard-DLk5PTHl.mjs';
import './forwardRefs-BSTjJZPU.mjs';
import './index-ewhk7FTz.mjs';
import './VCheckboxBtn-DaRBpQ2e.mjs';
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

const _sfc_main$5 = /* @__PURE__ */ defineComponent({
  __name: "DemoFormLayoutHorizontalForm",
  __ssrInlineRender: true,
  setup(__props) {
    const firstName = ref("");
    const email = ref("");
    const mobile = ref();
    const password = ref();
    const checkbox = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VForm, mergeProps({ onSubmit: () => {
      } }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<label for="firstName"${_scopeId5}>First Name</label>`);
                                  } else {
                                    return [
                                      createVNode("label", { for: "firstName" }, "First Name")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      id: "firstName",
                                      modelValue: unref(firstName),
                                      "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                                      placeholder: "John",
                                      "persistent-placeholder": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        id: "firstName",
                                        modelValue: unref(firstName),
                                        "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                                        placeholder: "John",
                                        "persistent-placeholder": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("label", { for: "firstName" }, "First Name")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "9"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      id: "firstName",
                                      modelValue: unref(firstName),
                                      "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                                      placeholder: "John",
                                      "persistent-placeholder": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode("label", { for: "firstName" }, "First Name")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    id: "firstName",
                                    modelValue: unref(firstName),
                                    "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                                    placeholder: "John",
                                    "persistent-placeholder": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<label for="email"${_scopeId5}>Email</label>`);
                                  } else {
                                    return [
                                      createVNode("label", { for: "email" }, "Email")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      id: "email",
                                      modelValue: unref(email),
                                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                      placeholder: "johndoe@email.com",
                                      "persistent-placeholder": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        id: "email",
                                        modelValue: unref(email),
                                        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                        placeholder: "johndoe@email.com",
                                        "persistent-placeholder": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("label", { for: "email" }, "Email")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "9"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      id: "email",
                                      modelValue: unref(email),
                                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                      placeholder: "johndoe@email.com",
                                      "persistent-placeholder": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode("label", { for: "email" }, "Email")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    id: "email",
                                    modelValue: unref(email),
                                    "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                    placeholder: "johndoe@email.com",
                                    "persistent-placeholder": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<label for="mobile"${_scopeId5}>Mobile</label>`);
                                  } else {
                                    return [
                                      createVNode("label", { for: "mobile" }, "Mobile")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      id: "mobile",
                                      modelValue: unref(mobile),
                                      "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                                      type: "number",
                                      placeholder: "+1 123 456 7890",
                                      "persistent-placeholder": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        id: "mobile",
                                        modelValue: unref(mobile),
                                        "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                                        type: "number",
                                        placeholder: "+1 123 456 7890",
                                        "persistent-placeholder": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("label", { for: "mobile" }, "Mobile")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "9"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      id: "mobile",
                                      modelValue: unref(mobile),
                                      "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                                      type: "number",
                                      placeholder: "+1 123 456 7890",
                                      "persistent-placeholder": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode("label", { for: "mobile" }, "Mobile")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    id: "mobile",
                                    modelValue: unref(mobile),
                                    "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                                    type: "number",
                                    placeholder: "+1 123 456 7890",
                                    "persistent-placeholder": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<label for="password"${_scopeId5}>Password</label>`);
                                  } else {
                                    return [
                                      createVNode("label", { for: "password" }, "Password")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      id: "password",
                                      modelValue: unref(password),
                                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                      autocomplete: "on",
                                      type: "password",
                                      placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                      "persistent-placeholder": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        id: "password",
                                        modelValue: unref(password),
                                        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                        autocomplete: "on",
                                        type: "password",
                                        placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                        "persistent-placeholder": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("label", { for: "password" }, "Password")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "9"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      id: "password",
                                      modelValue: unref(password),
                                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                      autocomplete: "on",
                                      type: "password",
                                      placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                      "persistent-placeholder": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode("label", { for: "password" }, "Password")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    id: "password",
                                    modelValue: unref(password),
                                    "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                    autocomplete: "on",
                                    type: "password",
                                    placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                    "persistent-placeholder": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "3"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCheckbox, {
                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                      modelValue: unref(checkbox),
                                      "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                                      label: "Remember me"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCheckbox, {
                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                        modelValue: unref(checkbox),
                                        "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                                        label: "Remember me"
                                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "3"
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "9"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCheckbox, {
                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                      modelValue: unref(checkbox),
                                      "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                                      label: "Remember me"
                                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
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
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "3"
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCheckbox, {
                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                    modelValue: unref(checkbox),
                                    "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                                    label: "Remember me"
                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "3"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, {
                                      type: "submit",
                                      class: "me-4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Submit `);
                                        } else {
                                          return [
                                            createTextVNode(" Submit ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      color: "secondary",
                                      variant: "tonal",
                                      type: "reset"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Reset `);
                                        } else {
                                          return [
                                            createTextVNode(" Reset ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VBtn, {
                                        type: "submit",
                                        class: "me-4"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Submit ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VBtn, {
                                        color: "secondary",
                                        variant: "tonal",
                                        type: "reset"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Reset ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "3"
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "9"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      type: "submit",
                                      class: "me-4"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Submit ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VBtn, {
                                      color: "secondary",
                                      variant: "tonal",
                                      type: "reset"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Reset ")
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "3"
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    type: "submit",
                                    class: "me-4"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Submit ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, {
                                    color: "secondary",
                                    variant: "tonal",
                                    type: "reset"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Reset ")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode("label", { for: "firstName" }, "First Name")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "9"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  id: "firstName",
                                  modelValue: unref(firstName),
                                  "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                                  placeholder: "John",
                                  "persistent-placeholder": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode("label", { for: "email" }, "Email")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "9"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  id: "email",
                                  modelValue: unref(email),
                                  "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                  placeholder: "johndoe@email.com",
                                  "persistent-placeholder": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode("label", { for: "mobile" }, "Mobile")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "9"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  id: "mobile",
                                  modelValue: unref(mobile),
                                  "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                                  type: "number",
                                  placeholder: "+1 123 456 7890",
                                  "persistent-placeholder": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode("label", { for: "password" }, "Password")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "9"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  id: "password",
                                  modelValue: unref(password),
                                  "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                  autocomplete: "on",
                                  type: "password",
                                  placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                  "persistent-placeholder": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "9"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCheckbox, {
                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                  modelValue: unref(checkbox),
                                  "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                                  label: "Remember me"
                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "9"
                            }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  type: "submit",
                                  class: "me-4"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Submit ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "secondary",
                                  variant: "tonal",
                                  type: "reset"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Reset ")
                                  ]),
                                  _: 1
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode("label", { for: "firstName" }, "First Name")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "9"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                id: "firstName",
                                modelValue: unref(firstName),
                                "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                                placeholder: "John",
                                "persistent-placeholder": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode("label", { for: "email" }, "Email")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "9"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                id: "email",
                                modelValue: unref(email),
                                "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                placeholder: "johndoe@email.com",
                                "persistent-placeholder": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode("label", { for: "mobile" }, "Mobile")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "9"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                id: "mobile",
                                modelValue: unref(mobile),
                                "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                                type: "number",
                                placeholder: "+1 123 456 7890",
                                "persistent-placeholder": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode("label", { for: "password" }, "Password")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "9"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                id: "password",
                                modelValue: unref(password),
                                "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                autocomplete: "on",
                                type: "password",
                                placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                "persistent-placeholder": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "3"
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "9"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCheckbox, {
                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                modelValue: unref(checkbox),
                                "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                                label: "Remember me"
                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "3"
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "9"
                          }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                type: "submit",
                                class: "me-4"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Submit ")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                color: "secondary",
                                variant: "tonal",
                                type: "reset"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Reset ")
                                ]),
                                _: 1
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
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/pages/form-layouts/DemoFormLayoutHorizontalForm.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const _sfc_main$4 = /* @__PURE__ */ defineComponent({
  __name: "DemoFormLayoutHorizontalFormWithIcons",
  __ssrInlineRender: true,
  setup(__props) {
    const firstName = ref("");
    const email = ref("");
    const mobile = ref();
    const password = ref();
    const checkbox = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VForm, mergeProps({ onSubmit: () => {
      } }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<label for="firstNameHorizontalIcons"${_scopeId5}>First Name</label>`);
                                  } else {
                                    return [
                                      createVNode("label", { for: "firstNameHorizontalIcons" }, "First Name")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      id: "firstNameHorizontalIcons",
                                      modelValue: unref(firstName),
                                      "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                                      "prepend-inner-icon": "bx-user",
                                      placeholder: "John",
                                      "persistent-placeholder": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        id: "firstNameHorizontalIcons",
                                        modelValue: unref(firstName),
                                        "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                                        "prepend-inner-icon": "bx-user",
                                        placeholder: "John",
                                        "persistent-placeholder": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("label", { for: "firstNameHorizontalIcons" }, "First Name")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "9"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      id: "firstNameHorizontalIcons",
                                      modelValue: unref(firstName),
                                      "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                                      "prepend-inner-icon": "bx-user",
                                      placeholder: "John",
                                      "persistent-placeholder": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode("label", { for: "firstNameHorizontalIcons" }, "First Name")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    id: "firstNameHorizontalIcons",
                                    modelValue: unref(firstName),
                                    "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                                    "prepend-inner-icon": "bx-user",
                                    placeholder: "John",
                                    "persistent-placeholder": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<label for="emailHorizontalIcons"${_scopeId5}>Email</label>`);
                                  } else {
                                    return [
                                      createVNode("label", { for: "emailHorizontalIcons" }, "Email")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      id: "emailHorizontalIcons",
                                      modelValue: unref(email),
                                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                      "prepend-inner-icon": "bx-envelope",
                                      placeholder: "johndoe@email.com",
                                      "persistent-placeholder": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        id: "emailHorizontalIcons",
                                        modelValue: unref(email),
                                        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                        "prepend-inner-icon": "bx-envelope",
                                        placeholder: "johndoe@email.com",
                                        "persistent-placeholder": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("label", { for: "emailHorizontalIcons" }, "Email")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "9"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      id: "emailHorizontalIcons",
                                      modelValue: unref(email),
                                      "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                      "prepend-inner-icon": "bx-envelope",
                                      placeholder: "johndoe@email.com",
                                      "persistent-placeholder": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode("label", { for: "emailHorizontalIcons" }, "Email")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    id: "emailHorizontalIcons",
                                    modelValue: unref(email),
                                    "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                    "prepend-inner-icon": "bx-envelope",
                                    placeholder: "johndoe@email.com",
                                    "persistent-placeholder": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<label for="mobileHorizontalIcons"${_scopeId5}>Mobile</label>`);
                                  } else {
                                    return [
                                      createVNode("label", { for: "mobileHorizontalIcons" }, "Mobile")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      id: "mobileHorizontalIcons",
                                      modelValue: unref(mobile),
                                      "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                                      type: "number",
                                      "prepend-inner-icon": "bx-mobile",
                                      placeholder: "+1 123 456 7890",
                                      "persistent-placeholder": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        id: "mobileHorizontalIcons",
                                        modelValue: unref(mobile),
                                        "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                                        type: "number",
                                        "prepend-inner-icon": "bx-mobile",
                                        placeholder: "+1 123 456 7890",
                                        "persistent-placeholder": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("label", { for: "mobileHorizontalIcons" }, "Mobile")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "9"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      id: "mobileHorizontalIcons",
                                      modelValue: unref(mobile),
                                      "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                                      type: "number",
                                      "prepend-inner-icon": "bx-mobile",
                                      placeholder: "+1 123 456 7890",
                                      "persistent-placeholder": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode("label", { for: "mobileHorizontalIcons" }, "Mobile")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    id: "mobileHorizontalIcons",
                                    modelValue: unref(mobile),
                                    "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                                    type: "number",
                                    "prepend-inner-icon": "bx-mobile",
                                    placeholder: "+1 123 456 7890",
                                    "persistent-placeholder": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<label for="passwordHorizontalIcons"${_scopeId5}>Password</label>`);
                                  } else {
                                    return [
                                      createVNode("label", { for: "passwordHorizontalIcons" }, "Password")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      id: "passwordHorizontalIcons",
                                      modelValue: unref(password),
                                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                      "prepend-inner-icon": "bx-lock",
                                      autocomplete: "on",
                                      type: "password",
                                      placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                      "persistent-placeholder": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        id: "passwordHorizontalIcons",
                                        modelValue: unref(password),
                                        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                        "prepend-inner-icon": "bx-lock",
                                        autocomplete: "on",
                                        type: "password",
                                        placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                        "persistent-placeholder": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "3"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("label", { for: "passwordHorizontalIcons" }, "Password")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "9"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      id: "passwordHorizontalIcons",
                                      modelValue: unref(password),
                                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                      "prepend-inner-icon": "bx-lock",
                                      autocomplete: "on",
                                      type: "password",
                                      placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                      "persistent-placeholder": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "3"
                              }, {
                                default: withCtx(() => [
                                  createVNode("label", { for: "passwordHorizontalIcons" }, "Password")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    id: "passwordHorizontalIcons",
                                    modelValue: unref(password),
                                    "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                    "prepend-inner-icon": "bx-lock",
                                    autocomplete: "on",
                                    type: "password",
                                    placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                    "persistent-placeholder": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "3"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCheckbox, {
                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                      modelValue: unref(checkbox),
                                      "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                                      label: "Remember me"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCheckbox, {
                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                        modelValue: unref(checkbox),
                                        "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                                        label: "Remember me"
                                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "3"
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "9"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCheckbox, {
                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                      modelValue: unref(checkbox),
                                      "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                                      label: "Remember me"
                                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
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
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "3"
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCheckbox, {
                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                    modelValue: unref(checkbox),
                                    "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                                    label: "Remember me"
                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
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
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "3"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, {
                                      type: "submit",
                                      class: "me-4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Submit `);
                                        } else {
                                          return [
                                            createTextVNode(" Submit ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      color: "secondary",
                                      variant: "tonal",
                                      type: "reset"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Reset `);
                                        } else {
                                          return [
                                            createTextVNode(" Reset ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VBtn, {
                                        type: "submit",
                                        class: "me-4"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Submit ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VBtn, {
                                        color: "secondary",
                                        variant: "tonal",
                                        type: "reset"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Reset ")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "3"
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "9"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      type: "submit",
                                      class: "me-4"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Submit ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VBtn, {
                                      color: "secondary",
                                      variant: "tonal",
                                      type: "reset"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Reset ")
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "3"
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "9"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    type: "submit",
                                    class: "me-4"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Submit ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, {
                                    color: "secondary",
                                    variant: "tonal",
                                    type: "reset"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Reset ")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode("label", { for: "firstNameHorizontalIcons" }, "First Name")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "9"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  id: "firstNameHorizontalIcons",
                                  modelValue: unref(firstName),
                                  "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                                  "prepend-inner-icon": "bx-user",
                                  placeholder: "John",
                                  "persistent-placeholder": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode("label", { for: "emailHorizontalIcons" }, "Email")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "9"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  id: "emailHorizontalIcons",
                                  modelValue: unref(email),
                                  "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                  "prepend-inner-icon": "bx-envelope",
                                  placeholder: "johndoe@email.com",
                                  "persistent-placeholder": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode("label", { for: "mobileHorizontalIcons" }, "Mobile")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "9"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  id: "mobileHorizontalIcons",
                                  modelValue: unref(mobile),
                                  "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                                  type: "number",
                                  "prepend-inner-icon": "bx-mobile",
                                  placeholder: "+1 123 456 7890",
                                  "persistent-placeholder": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }, {
                              default: withCtx(() => [
                                createVNode("label", { for: "passwordHorizontalIcons" }, "Password")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "9"
                            }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  id: "passwordHorizontalIcons",
                                  modelValue: unref(password),
                                  "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                  "prepend-inner-icon": "bx-lock",
                                  autocomplete: "on",
                                  type: "password",
                                  placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                  "persistent-placeholder": ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "9"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCheckbox, {
                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                  modelValue: unref(checkbox),
                                  "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                                  label: "Remember me"
                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "3"
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "9"
                            }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  type: "submit",
                                  class: "me-4"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Submit ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "secondary",
                                  variant: "tonal",
                                  type: "reset"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Reset ")
                                  ]),
                                  _: 1
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode("label", { for: "firstNameHorizontalIcons" }, "First Name")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "9"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                id: "firstNameHorizontalIcons",
                                modelValue: unref(firstName),
                                "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                                "prepend-inner-icon": "bx-user",
                                placeholder: "John",
                                "persistent-placeholder": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode("label", { for: "emailHorizontalIcons" }, "Email")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "9"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                id: "emailHorizontalIcons",
                                modelValue: unref(email),
                                "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                                "prepend-inner-icon": "bx-envelope",
                                placeholder: "johndoe@email.com",
                                "persistent-placeholder": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode("label", { for: "mobileHorizontalIcons" }, "Mobile")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "9"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                id: "mobileHorizontalIcons",
                                modelValue: unref(mobile),
                                "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                                type: "number",
                                "prepend-inner-icon": "bx-mobile",
                                placeholder: "+1 123 456 7890",
                                "persistent-placeholder": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode("label", { for: "passwordHorizontalIcons" }, "Password")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "9"
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                id: "passwordHorizontalIcons",
                                modelValue: unref(password),
                                "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                                "prepend-inner-icon": "bx-lock",
                                autocomplete: "on",
                                type: "password",
                                placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                "persistent-placeholder": ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "3"
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "9"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCheckbox, {
                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                modelValue: unref(checkbox),
                                "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                                label: "Remember me"
                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "3"
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "9"
                          }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                type: "submit",
                                class: "me-4"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Submit ")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                color: "secondary",
                                variant: "tonal",
                                type: "reset"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Reset ")
                                ]),
                                _: 1
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
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/pages/form-layouts/DemoFormLayoutHorizontalFormWithIcons.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "DemoFormLayoutMultipleColumn",
  __ssrInlineRender: true,
  setup(__props) {
    const firstName = ref("");
    const lastName = ref("");
    const city = ref("");
    const country = ref("");
    const company = ref("");
    const email = ref("");
    const checkbox = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VForm, mergeProps({ onSubmit: () => {
      } }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(firstName),
                          "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                          label: "First Name",
                          placeholder: "John"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(firstName),
                            "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                            label: "First Name",
                            placeholder: "John"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(lastName),
                          "onUpdate:modelValue": ($event) => isRef(lastName) ? lastName.value = $event : null,
                          label: "Last Name",
                          placeholder: "Doe"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(lastName),
                            "onUpdate:modelValue": ($event) => isRef(lastName) ? lastName.value = $event : null,
                            label: "Last Name",
                            placeholder: "Doe"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(email),
                          "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                          label: "Email",
                          placeholder: "johndoe@email.com"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(email),
                            "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                            label: "Email",
                            placeholder: "johndoe@email.com"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(city),
                          "onUpdate:modelValue": ($event) => isRef(city) ? city.value = $event : null,
                          label: "City",
                          placeholder: "New York"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(city),
                            "onUpdate:modelValue": ($event) => isRef(city) ? city.value = $event : null,
                            label: "City",
                            placeholder: "New York"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(country),
                          "onUpdate:modelValue": ($event) => isRef(country) ? country.value = $event : null,
                          label: "Country",
                          placeholder: "United States"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(country),
                            "onUpdate:modelValue": ($event) => isRef(country) ? country.value = $event : null,
                            label: "Country",
                            placeholder: "United States"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(company),
                          "onUpdate:modelValue": ($event) => isRef(company) ? company.value = $event : null,
                          label: "Company",
                          placeholder: "Themeselection"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(company),
                            "onUpdate:modelValue": ($event) => isRef(company) ? company.value = $event : null,
                            label: "Company",
                            placeholder: "Themeselection"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCheckbox, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(checkbox),
                          "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                          label: "Remember me"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCheckbox, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(checkbox),
                            "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                            label: "Remember me"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    class: "d-flex gap-4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, { type: "submit" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Submit `);
                            } else {
                              return [
                                createTextVNode(" Submit ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          type: "reset",
                          color: "secondary",
                          variant: "tonal"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Reset `);
                            } else {
                              return [
                                createTextVNode(" Reset ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, { type: "submit" }, {
                            default: withCtx(() => [
                              createTextVNode(" Submit ")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            type: "reset",
                            color: "secondary",
                            variant: "tonal"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Reset ")
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
                    createVNode(VCol, {
                      cols: "12",
                      md: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(firstName),
                          "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                          label: "First Name",
                          placeholder: "John"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(lastName),
                          "onUpdate:modelValue": ($event) => isRef(lastName) ? lastName.value = $event : null,
                          label: "Last Name",
                          placeholder: "Doe"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(email),
                          "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                          label: "Email",
                          placeholder: "johndoe@email.com"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(city),
                          "onUpdate:modelValue": ($event) => isRef(city) ? city.value = $event : null,
                          label: "City",
                          placeholder: "New York"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(country),
                          "onUpdate:modelValue": ($event) => isRef(country) ? country.value = $event : null,
                          label: "Country",
                          placeholder: "United States"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      md: "6"
                    }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(company),
                          "onUpdate:modelValue": ($event) => isRef(company) ? company.value = $event : null,
                          label: "Company",
                          placeholder: "Themeselection"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VCheckbox, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(checkbox),
                          "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                          label: "Remember me"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      class: "d-flex gap-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VBtn, { type: "submit" }, {
                          default: withCtx(() => [
                            createTextVNode(" Submit ")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          type: "reset",
                          color: "secondary",
                          variant: "tonal"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Reset ")
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
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(firstName),
                        "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                        label: "First Name",
                        placeholder: "John"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(lastName),
                        "onUpdate:modelValue": ($event) => isRef(lastName) ? lastName.value = $event : null,
                        label: "Last Name",
                        placeholder: "Doe"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(email),
                        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                        label: "Email",
                        placeholder: "johndoe@email.com"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(city),
                        "onUpdate:modelValue": ($event) => isRef(city) ? city.value = $event : null,
                        label: "City",
                        placeholder: "New York"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(country),
                        "onUpdate:modelValue": ($event) => isRef(country) ? country.value = $event : null,
                        label: "Country",
                        placeholder: "United States"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    md: "6"
                  }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(company),
                        "onUpdate:modelValue": ($event) => isRef(company) ? company.value = $event : null,
                        label: "Company",
                        placeholder: "Themeselection"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VCheckbox, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(checkbox),
                        "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                        label: "Remember me"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    class: "d-flex gap-4"
                  }, {
                    default: withCtx(() => [
                      createVNode(VBtn, { type: "submit" }, {
                        default: withCtx(() => [
                          createTextVNode(" Submit ")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        type: "reset",
                        color: "secondary",
                        variant: "tonal"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Reset ")
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
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/pages/form-layouts/DemoFormLayoutMultipleColumn.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "DemoFormLayoutVerticalForm",
  __ssrInlineRender: true,
  setup(__props) {
    const firstName = ref("");
    const email = ref("");
    const mobile = ref();
    const password = ref();
    const checkbox = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VForm, mergeProps({ onSubmit: () => {
      } }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(firstName),
                          "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                          label: "First Name",
                          placeholder: "John"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(firstName),
                            "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                            label: "First Name",
                            placeholder: "John"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(email),
                          "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                          label: "Email",
                          type: "email",
                          placeholder: "johndoe@example.com"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(email),
                            "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                            label: "Email",
                            type: "email",
                            placeholder: "johndoe@example.com"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(mobile),
                          "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                          label: "Mobile",
                          placeholder: "+1 123 456 7890",
                          type: "number"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(mobile),
                            "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                            label: "Mobile",
                            placeholder: "+1 123 456 7890",
                            type: "number"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(password),
                          "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                          label: "Password",
                          autocomplete: "on",
                          type: "password",
                          placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(password),
                            "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                            label: "Password",
                            autocomplete: "on",
                            type: "password",
                            placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCheckbox, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(checkbox),
                          "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                          label: "Remember me"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCheckbox, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(checkbox),
                            "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                            label: "Remember me"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, {
                    cols: "12",
                    class: "d-flex gap-4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, { type: "submit" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Submit `);
                            } else {
                              return [
                                createTextVNode(" Submit ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          type: "reset",
                          color: "secondary",
                          variant: "tonal"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Reset `);
                            } else {
                              return [
                                createTextVNode(" Reset ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, { type: "submit" }, {
                            default: withCtx(() => [
                              createTextVNode(" Submit ")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            type: "reset",
                            color: "secondary",
                            variant: "tonal"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Reset ")
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
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(firstName),
                          "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                          label: "First Name",
                          placeholder: "John"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(email),
                          "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                          label: "Email",
                          type: "email",
                          placeholder: "johndoe@example.com"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(mobile),
                          "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                          label: "Mobile",
                          placeholder: "+1 123 456 7890",
                          type: "number"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(password),
                          "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                          label: "Password",
                          autocomplete: "on",
                          type: "password",
                          placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VCheckbox, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(checkbox),
                          "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                          label: "Remember me"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, {
                      cols: "12",
                      class: "d-flex gap-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VBtn, { type: "submit" }, {
                          default: withCtx(() => [
                            createTextVNode(" Submit ")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          type: "reset",
                          color: "secondary",
                          variant: "tonal"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Reset ")
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
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(firstName),
                        "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                        label: "First Name",
                        placeholder: "John"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(email),
                        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                        label: "Email",
                        type: "email",
                        placeholder: "johndoe@example.com"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(mobile),
                        "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                        label: "Mobile",
                        placeholder: "+1 123 456 7890",
                        type: "number"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(password),
                        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                        label: "Password",
                        autocomplete: "on",
                        type: "password",
                        placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VCheckbox, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(checkbox),
                        "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                        label: "Remember me"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, {
                    cols: "12",
                    class: "d-flex gap-4"
                  }, {
                    default: withCtx(() => [
                      createVNode(VBtn, { type: "submit" }, {
                        default: withCtx(() => [
                          createTextVNode(" Submit ")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        type: "reset",
                        color: "secondary",
                        variant: "tonal"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Reset ")
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
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/pages/form-layouts/DemoFormLayoutVerticalForm.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "DemoFormLayoutVerticalFormWithIcons",
  __ssrInlineRender: true,
  setup(__props) {
    const firstName = ref("");
    const email = ref("");
    const mobile = ref();
    const password = ref();
    const checkbox = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VForm, mergeProps({ onSubmit: () => {
      } }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(firstName),
                          "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                          "prepend-inner-icon": "bx-user",
                          label: "First Name",
                          placeholder: "John"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(firstName),
                            "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                            "prepend-inner-icon": "bx-user",
                            label: "First Name",
                            placeholder: "John"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(email),
                          "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                          "prepend-inner-icon": "bx-envelope",
                          label: "Email",
                          type: "email",
                          placeholder: "johndoe@example.com"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(email),
                            "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                            "prepend-inner-icon": "bx-envelope",
                            label: "Email",
                            type: "email",
                            placeholder: "johndoe@example.com"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(mobile),
                          "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                          "prepend-inner-icon": "bx-mobile",
                          label: "Mobile",
                          placeholder: "+1 123 456 7890",
                          type: "number"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(mobile),
                            "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                            "prepend-inner-icon": "bx-mobile",
                            label: "Mobile",
                            placeholder: "+1 123 456 7890",
                            type: "number"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(password),
                          "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                          "prepend-inner-icon": "bx-lock",
                          label: "Password",
                          autocomplete: "on",
                          type: "password",
                          placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(password),
                            "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                            "prepend-inner-icon": "bx-lock",
                            label: "Password",
                            autocomplete: "on",
                            type: "password",
                            placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCheckbox, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(checkbox),
                          "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                          label: "Remember me"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCheckbox, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: unref(checkbox),
                            "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                            label: "Remember me"
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCol, { cols: "12" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          type: "submit",
                          class: "me-2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Submit `);
                            } else {
                              return [
                                createTextVNode(" Submit ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "secondary",
                          type: "reset",
                          variant: "tonal"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Reset `);
                            } else {
                              return [
                                createTextVNode(" Reset ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VBtn, {
                            type: "submit",
                            class: "me-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Submit ")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            color: "secondary",
                            type: "reset",
                            variant: "tonal"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Reset ")
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
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(firstName),
                          "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                          "prepend-inner-icon": "bx-user",
                          label: "First Name",
                          placeholder: "John"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(email),
                          "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                          "prepend-inner-icon": "bx-envelope",
                          label: "Email",
                          type: "email",
                          placeholder: "johndoe@example.com"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(mobile),
                          "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                          "prepend-inner-icon": "bx-mobile",
                          label: "Mobile",
                          placeholder: "+1 123 456 7890",
                          type: "number"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(password),
                          "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                          "prepend-inner-icon": "bx-lock",
                          label: "Password",
                          autocomplete: "on",
                          type: "password",
                          placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VCheckbox, {
                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                          modelValue: unref(checkbox),
                          "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                          label: "Remember me"
                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCol, { cols: "12" }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          type: "submit",
                          class: "me-2"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Submit ")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          color: "secondary",
                          type: "reset",
                          variant: "tonal"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Reset ")
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
              createVNode(VRow, null, {
                default: withCtx(() => [
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(firstName),
                        "onUpdate:modelValue": ($event) => isRef(firstName) ? firstName.value = $event : null,
                        "prepend-inner-icon": "bx-user",
                        label: "First Name",
                        placeholder: "John"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(email),
                        "onUpdate:modelValue": ($event) => isRef(email) ? email.value = $event : null,
                        "prepend-inner-icon": "bx-envelope",
                        label: "Email",
                        type: "email",
                        placeholder: "johndoe@example.com"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(mobile),
                        "onUpdate:modelValue": ($event) => isRef(mobile) ? mobile.value = $event : null,
                        "prepend-inner-icon": "bx-mobile",
                        label: "Mobile",
                        placeholder: "+1 123 456 7890",
                        type: "number"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(password),
                        "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                        "prepend-inner-icon": "bx-lock",
                        label: "Password",
                        autocomplete: "on",
                        type: "password",
                        placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VCheckbox, {
                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                        modelValue: unref(checkbox),
                        "onUpdate:modelValue": ($event) => isRef(checkbox) ? checkbox.value = $event : null,
                        label: "Remember me"
                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCol, { cols: "12" }, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        type: "submit",
                        class: "me-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Submit ")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        color: "secondary",
                        type: "reset",
                        variant: "tonal"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Reset ")
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
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/pages/form-layouts/DemoFormLayoutVerticalFormWithIcons.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "form-layouts",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              md: "6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, { title: "Horizontal Form" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$5, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$5)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$5)
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
                    createVNode(VCard, { title: "Horizontal Form" }, {
                      default: withCtx(() => [
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$5)
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
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              md: "6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, { title: "Horizontal Form with Icons" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$4, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$4)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$4)
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
                    createVNode(VCard, { title: "Horizontal Form with Icons" }, {
                      default: withCtx(() => [
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$4)
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
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              md: "6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, { title: "Vertical Form" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$2, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$2)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$2)
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
                    createVNode(VCard, { title: "Vertical Form" }, {
                      default: withCtx(() => [
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$2)
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
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              md: "6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, { title: "Vertical Form with Icons" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$1, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$1)
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
                    createVNode(VCard, { title: "Vertical Form with Icons" }, {
                      default: withCtx(() => [
                        createVNode(VCardText, null, {
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, { cols: "12" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, { title: "Multiple Column" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_sfc_main$3, null, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_sfc_main$3)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(_sfc_main$3)
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
                    createVNode(VCard, { title: "Multiple Column" }, {
                      default: withCtx(() => [
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode(_sfc_main$3)
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
              createVNode(VCol, {
                cols: "12",
                md: "6"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, { title: "Horizontal Form" }, {
                    default: withCtx(() => [
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$5)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, {
                cols: "12",
                md: "6"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, { title: "Horizontal Form with Icons" }, {
                    default: withCtx(() => [
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$4)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, {
                cols: "12",
                md: "6"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, { title: "Vertical Form" }, {
                    default: withCtx(() => [
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$2)
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, {
                cols: "12",
                md: "6"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, { title: "Vertical Form with Icons" }, {
                    default: withCtx(() => [
                      createVNode(VCardText, null, {
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
              }),
              createVNode(VCol, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(VCard, { title: "Multiple Column" }, {
                    default: withCtx(() => [
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode(_sfc_main$3)
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
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/form-layouts.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
