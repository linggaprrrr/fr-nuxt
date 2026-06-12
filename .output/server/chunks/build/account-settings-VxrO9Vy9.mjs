import { defineComponent, ref, unref, isRef, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useId, withModifiers, toRefs, toRef, computed, mergeProps, watchEffect, capitalize, provide, watch, inject, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { V as VTabs, a as VTab, b as VWindow, c as VWindowItem, d as avatar1 } from './VTabs-D7p7BIQL.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VCard, a as VCardText } from './VCard-DLk5PTHl.mjs';
import { z as useRoute$1, b as VIcon, _ as _export_sfc, V as VAvatar, a as VBtn, c as VDivider, e as genericComponent, p as propsFactory, y as provideDefaults, h as useRender, u as useProxiedModel, f as useLocale, g as getCurrentInstance, w as wrapInArray, m as deepEqual, s as useLoader, t as useBackgroundColor, v as useDisplay, L as LoaderSlot, I as IconValue, x as getPropertyFromItem, n as getObjectValueByPath, o as isEmpty, d as clamp, q as makeLoaderProps, r as makeDisplayProps, j as defineFunctionalComponent, k as convertToUnit, i as isOn, E as EventProp, l as consoleError } from './server.mjs';
import { V as VForm } from './VForm-CsHTnp-Y.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
import { V as VSelect } from './VSelect-Bxz-WhQz.mjs';
import { V as VCheckbox } from './VCheckbox-B9n4Yo8o.mjs';
import { V as VTable, m as makeVTableProps } from './VTable-BXA3D1kT.mjs';
import { V as VChip } from './VChip-C44NlS62.mjs';
import { V as VPagination } from './VPagination-z_-yTplN.mjs';
import { V as VCheckboxBtn } from './VCheckboxBtn-DaRBpQ2e.mjs';
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
import './forwardRefs-BSTjJZPU.mjs';
import './ssrBoot-BtvJZs44.mjs';
import './VSlideGroup-J1shNAVo.mjs';
import './index-ewhk7FTz.mjs';
import 'pinia';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import './VMenu-CmFsZZaF.mjs';
import './VListSubheader-BbgyaiQc.mjs';
import './dialog-transition-D66jL1n_.mjs';

function getPrefixedEventHandlers(attrs, suffix, getData) {
  return Object.keys(attrs).filter((key) => isOn(key) && key.endsWith(suffix)).reduce((acc, key) => {
    acc[key.slice(0, -suffix.length)] = (event) => attrs[key](event, getData(event));
    return acc;
  }, {});
}
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "AccountSettingsAccount",
  __ssrInlineRender: true,
  setup(__props) {
    const accountData = {
      avatarImg: avatar1,
      firstName: "john",
      lastName: "Doe",
      email: "johnDoe@example.com",
      org: "ThemeSelection",
      phone: "+1 (917) 543-9876",
      address: "123 Main St, New York, NY 10001",
      state: "New York",
      zip: "10001",
      country: "USA",
      language: "English",
      timezone: "(GMT-11:00) International Date Line West",
      currency: "USD"
    };
    const refInputEl = ref();
    const accountDataLocal = ref(structuredClone(accountData));
    const isAccountDeactivated = ref(false);
    const resetForm = () => {
      accountDataLocal.value = structuredClone(accountData);
    };
    const changeAvatar = (file) => {
      const fileReader = new FileReader();
      const { files } = file.target;
      if (files && files.length) {
        fileReader.readAsDataURL(files[0]);
        fileReader.onload = () => {
          if (typeof fileReader.result === "string")
            accountDataLocal.value.avatarImg = fileReader.result;
        };
      }
    };
    const resetAvatar = () => {
      accountDataLocal.value.avatarImg = accountData.avatarImg;
    };
    const timezones = [
      "(GMT-11:00) International Date Line West",
      "(GMT-11:00) Midway Island",
      "(GMT-10:00) Hawaii",
      "(GMT-09:00) Alaska",
      "(GMT-08:00) Pacific Time (US & Canada)",
      "(GMT-08:00) Tijuana",
      "(GMT-07:00) Arizona",
      "(GMT-07:00) Chihuahua",
      "(GMT-07:00) La Paz",
      "(GMT-07:00) Mazatlan",
      "(GMT-07:00) Mountain Time (US & Canada)",
      "(GMT-06:00) Central America",
      "(GMT-06:00) Central Time (US & Canada)",
      "(GMT-06:00) Guadalajara",
      "(GMT-06:00) Mexico City",
      "(GMT-06:00) Monterrey",
      "(GMT-06:00) Saskatchewan",
      "(GMT-05:00) Bogota",
      "(GMT-05:00) Eastern Time (US & Canada)",
      "(GMT-05:00) Indiana (East)",
      "(GMT-05:00) Lima",
      "(GMT-05:00) Quito",
      "(GMT-04:00) Atlantic Time (Canada)",
      "(GMT-04:00) Caracas",
      "(GMT-04:00) La Paz",
      "(GMT-04:00) Santiago",
      "(GMT-03:30) Newfoundland",
      "(GMT-03:00) Brasilia",
      "(GMT-03:00) Buenos Aires",
      "(GMT-03:00) Georgetown",
      "(GMT-03:00) Greenland",
      "(GMT-02:00) Mid-Atlantic",
      "(GMT-01:00) Azores",
      "(GMT-01:00) Cape Verde Is.",
      "(GMT+00:00) Casablanca",
      "(GMT+00:00) Dublin",
      "(GMT+00:00) Edinburgh",
      "(GMT+00:00) Lisbon",
      "(GMT+00:00) London"
    ];
    const currencies = [
      "USD",
      "EUR",
      "GBP",
      "AUD",
      "BRL",
      "CAD",
      "CNY",
      "CZK",
      "DKK",
      "HKD",
      "HUF",
      "INR"
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VRow, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "12" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, { title: "Account Details" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardText, { class: "d-flex" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VAvatar, {
                                rounded: "lg",
                                size: "100",
                                class: "me-6",
                                image: unref(accountDataLocal).avatarImg
                              }, null, _parent5, _scopeId4));
                              _push5(`<form class="d-flex flex-column justify-center gap-5"${_scopeId4}><div class="d-flex flex-wrap gap-2"${_scopeId4}>`);
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                onClick: ($event) => {
                                  var _a;
                                  return (_a = unref(refInputEl)) == null ? void 0 : _a.click();
                                }
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VIcon, {
                                      icon: "bx-cloud-upload",
                                      class: "d-sm-none"
                                    }, null, _parent6, _scopeId5));
                                    _push6(`<span class="d-none d-sm-block"${_scopeId5}>Upload new photo</span>`);
                                  } else {
                                    return [
                                      createVNode(VIcon, {
                                        icon: "bx-cloud-upload",
                                        class: "d-sm-none"
                                      }),
                                      createVNode("span", { class: "d-none d-sm-block" }, "Upload new photo")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<input type="file" name="file" accept=".jpeg,.png,.jpg,GIF" hidden${_scopeId4}>`);
                              _push5(ssrRenderComponent(VBtn, {
                                type: "reset",
                                color: "error",
                                variant: "tonal",
                                onClick: resetAvatar
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<span class="d-none d-sm-block"${_scopeId5}>Reset</span>`);
                                    _push6(ssrRenderComponent(VIcon, {
                                      icon: "bx-refresh",
                                      class: "d-sm-none"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode("span", { class: "d-none d-sm-block" }, "Reset"),
                                      createVNode(VIcon, {
                                        icon: "bx-refresh",
                                        class: "d-sm-none"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div><p class="text-body-1 mb-0"${_scopeId4}> Allowed JPG, GIF or PNG. Max size of 800K </p></form>`);
                            } else {
                              return [
                                createVNode(VAvatar, {
                                  rounded: "lg",
                                  size: "100",
                                  class: "me-6",
                                  image: unref(accountDataLocal).avatarImg
                                }, null, 8, ["image"]),
                                createVNode("form", { class: "d-flex flex-column justify-center gap-5" }, [
                                  createVNode("div", { class: "d-flex flex-wrap gap-2" }, [
                                    createVNode(VBtn, {
                                      color: "primary",
                                      onClick: ($event) => {
                                        var _a;
                                        return (_a = unref(refInputEl)) == null ? void 0 : _a.click();
                                      }
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VIcon, {
                                          icon: "bx-cloud-upload",
                                          class: "d-sm-none"
                                        }),
                                        createVNode("span", { class: "d-none d-sm-block" }, "Upload new photo")
                                      ]),
                                      _: 1
                                    }, 8, ["onClick"]),
                                    createVNode("input", {
                                      ref_key: "refInputEl",
                                      ref: refInputEl,
                                      type: "file",
                                      name: "file",
                                      accept: ".jpeg,.png,.jpg,GIF",
                                      hidden: "",
                                      onInput: changeAvatar
                                    }, null, 544),
                                    createVNode(VBtn, {
                                      type: "reset",
                                      color: "error",
                                      variant: "tonal",
                                      onClick: resetAvatar
                                    }, {
                                      default: withCtx(() => [
                                        createVNode("span", { class: "d-none d-sm-block" }, "Reset"),
                                        createVNode(VIcon, {
                                          icon: "bx-refresh",
                                          class: "d-sm-none"
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode("p", { class: "text-body-1 mb-0" }, " Allowed JPG, GIF or PNG. Max size of 800K ")
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VDivider, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VForm, { class: "mt-6" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VRow, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VCol, {
                                            md: "6",
                                            cols: "12"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VTextField, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).firstName,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).firstName = $event,
                                                  placeholder: "John",
                                                  label: "First Name"
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VTextField, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    modelValue: unref(accountDataLocal).firstName,
                                                    "onUpdate:modelValue": ($event) => unref(accountDataLocal).firstName = $event,
                                                    placeholder: "John",
                                                    label: "First Name"
                                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, {
                                            md: "6",
                                            cols: "12"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VTextField, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).lastName,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).lastName = $event,
                                                  placeholder: "Doe",
                                                  label: "Last Name"
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VTextField, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    modelValue: unref(accountDataLocal).lastName,
                                                    "onUpdate:modelValue": ($event) => unref(accountDataLocal).lastName = $event,
                                                    placeholder: "Doe",
                                                    label: "Last Name"
                                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VTextField, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).email,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).email = $event,
                                                  label: "E-mail",
                                                  placeholder: "johndoe@gmail.com",
                                                  type: "email"
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VTextField, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    modelValue: unref(accountDataLocal).email,
                                                    "onUpdate:modelValue": ($event) => unref(accountDataLocal).email = $event,
                                                    label: "E-mail",
                                                    placeholder: "johndoe@gmail.com",
                                                    type: "email"
                                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VTextField, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).org,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).org = $event,
                                                  label: "Organization",
                                                  placeholder: "ThemeSelection"
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VTextField, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    modelValue: unref(accountDataLocal).org,
                                                    "onUpdate:modelValue": ($event) => unref(accountDataLocal).org = $event,
                                                    label: "Organization",
                                                    placeholder: "ThemeSelection"
                                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VTextField, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).phone,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).phone = $event,
                                                  label: "Phone Number",
                                                  placeholder: "+1 (917) 543-9876"
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VTextField, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    modelValue: unref(accountDataLocal).phone,
                                                    "onUpdate:modelValue": ($event) => unref(accountDataLocal).phone = $event,
                                                    label: "Phone Number",
                                                    placeholder: "+1 (917) 543-9876"
                                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VTextField, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).address,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).address = $event,
                                                  label: "Address",
                                                  placeholder: "123 Main St, New York, NY 10001"
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VTextField, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    modelValue: unref(accountDataLocal).address,
                                                    "onUpdate:modelValue": ($event) => unref(accountDataLocal).address = $event,
                                                    label: "Address",
                                                    placeholder: "123 Main St, New York, NY 10001"
                                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VTextField, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).state,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).state = $event,
                                                  label: "State",
                                                  placeholder: "New York"
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VTextField, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    modelValue: unref(accountDataLocal).state,
                                                    "onUpdate:modelValue": ($event) => unref(accountDataLocal).state = $event,
                                                    label: "State",
                                                    placeholder: "New York"
                                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VTextField, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).zip,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).zip = $event,
                                                  label: "Zip Code",
                                                  placeholder: "10001"
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VTextField, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    modelValue: unref(accountDataLocal).zip,
                                                    "onUpdate:modelValue": ($event) => unref(accountDataLocal).zip = $event,
                                                    label: "Zip Code",
                                                    placeholder: "10001"
                                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VSelect, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).country,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).country = $event,
                                                  label: "Country",
                                                  items: ["USA", "Canada", "UK", "India", "Australia"],
                                                  placeholder: "Select Country"
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VSelect, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    modelValue: unref(accountDataLocal).country,
                                                    "onUpdate:modelValue": ($event) => unref(accountDataLocal).country = $event,
                                                    label: "Country",
                                                    items: ["USA", "Canada", "UK", "India", "Australia"],
                                                    placeholder: "Select Country"
                                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VSelect, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).language,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).language = $event,
                                                  label: "Language",
                                                  placeholder: "Select Language",
                                                  items: ["English", "Spanish", "Arabic", "Hindi", "Urdu"]
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VSelect, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    modelValue: unref(accountDataLocal).language,
                                                    "onUpdate:modelValue": ($event) => unref(accountDataLocal).language = $event,
                                                    label: "Language",
                                                    placeholder: "Select Language",
                                                    items: ["English", "Spanish", "Arabic", "Hindi", "Urdu"]
                                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VSelect, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).timezone,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).timezone = $event,
                                                  label: "Timezone",
                                                  placeholder: "Select Timezone",
                                                  items: timezones,
                                                  "menu-props": { maxHeight: 200 }
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VSelect, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    modelValue: unref(accountDataLocal).timezone,
                                                    "onUpdate:modelValue": ($event) => unref(accountDataLocal).timezone = $event,
                                                    label: "Timezone",
                                                    placeholder: "Select Timezone",
                                                    items: timezones,
                                                    "menu-props": { maxHeight: 200 }
                                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VSelect, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).currency,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).currency = $event,
                                                  label: "Currency",
                                                  placeholder: "Select Currency",
                                                  items: currencies,
                                                  "menu-props": { maxHeight: 200 }
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VSelect, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    modelValue: unref(accountDataLocal).currency,
                                                    "onUpdate:modelValue": ($event) => unref(accountDataLocal).currency = $event,
                                                    label: "Currency",
                                                    placeholder: "Select Currency",
                                                    items: currencies,
                                                    "menu-props": { maxHeight: 200 }
                                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, {
                                            cols: "12",
                                            class: "d-flex flex-wrap gap-4"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VBtn, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`Save changes`);
                                                    } else {
                                                      return [
                                                        createTextVNode("Save changes")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                                _push8(ssrRenderComponent(VBtn, {
                                                  color: "secondary",
                                                  variant: "tonal",
                                                  type: "reset",
                                                  onClick: resetForm
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(` Reset `);
                                                    } else {
                                                      return [
                                                        createTextVNode(" Reset ")
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VBtn, null, {
                                                    default: withCtx(() => [
                                                      createTextVNode("Save changes")
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(VBtn, {
                                                    color: "secondary",
                                                    variant: "tonal",
                                                    type: "reset",
                                                    onClick: withModifiers(resetForm, ["prevent"])
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
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VCol, {
                                              md: "6",
                                              cols: "12"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VTextField, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).firstName,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).firstName = $event,
                                                  placeholder: "John",
                                                  label: "First Name"
                                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCol, {
                                              md: "6",
                                              cols: "12"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VTextField, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).lastName,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).lastName = $event,
                                                  placeholder: "Doe",
                                                  label: "Last Name"
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
                                                  modelValue: unref(accountDataLocal).email,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).email = $event,
                                                  label: "E-mail",
                                                  placeholder: "johndoe@gmail.com",
                                                  type: "email"
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
                                                  modelValue: unref(accountDataLocal).org,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).org = $event,
                                                  label: "Organization",
                                                  placeholder: "ThemeSelection"
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
                                                  modelValue: unref(accountDataLocal).phone,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).phone = $event,
                                                  label: "Phone Number",
                                                  placeholder: "+1 (917) 543-9876"
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
                                                  modelValue: unref(accountDataLocal).address,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).address = $event,
                                                  label: "Address",
                                                  placeholder: "123 Main St, New York, NY 10001"
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
                                                  modelValue: unref(accountDataLocal).state,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).state = $event,
                                                  label: "State",
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
                                                  modelValue: unref(accountDataLocal).zip,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).zip = $event,
                                                  label: "Zip Code",
                                                  placeholder: "10001"
                                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCol, {
                                              cols: "12",
                                              md: "6"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VSelect, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).country,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).country = $event,
                                                  label: "Country",
                                                  items: ["USA", "Canada", "UK", "India", "Australia"],
                                                  placeholder: "Select Country"
                                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCol, {
                                              cols: "12",
                                              md: "6"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VSelect, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).language,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).language = $event,
                                                  label: "Language",
                                                  placeholder: "Select Language",
                                                  items: ["English", "Spanish", "Arabic", "Hindi", "Urdu"]
                                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCol, {
                                              cols: "12",
                                              md: "6"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VSelect, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).timezone,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).timezone = $event,
                                                  label: "Timezone",
                                                  placeholder: "Select Timezone",
                                                  items: timezones,
                                                  "menu-props": { maxHeight: 200 }
                                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCol, {
                                              cols: "12",
                                              md: "6"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VSelect, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(accountDataLocal).currency,
                                                  "onUpdate:modelValue": ($event) => unref(accountDataLocal).currency = $event,
                                                  label: "Currency",
                                                  placeholder: "Select Currency",
                                                  items: currencies,
                                                  "menu-props": { maxHeight: 200 }
                                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCol, {
                                              cols: "12",
                                              class: "d-flex flex-wrap gap-4"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VBtn, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Save changes")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(VBtn, {
                                                  color: "secondary",
                                                  variant: "tonal",
                                                  type: "reset",
                                                  onClick: withModifiers(resetForm, ["prevent"])
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VRow, null, {
                                        default: withCtx(() => [
                                          createVNode(VCol, {
                                            md: "6",
                                            cols: "12"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VTextField, {
                                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                modelValue: unref(accountDataLocal).firstName,
                                                "onUpdate:modelValue": ($event) => unref(accountDataLocal).firstName = $event,
                                                placeholder: "John",
                                                label: "First Name"
                                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, {
                                            md: "6",
                                            cols: "12"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VTextField, {
                                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                modelValue: unref(accountDataLocal).lastName,
                                                "onUpdate:modelValue": ($event) => unref(accountDataLocal).lastName = $event,
                                                placeholder: "Doe",
                                                label: "Last Name"
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
                                                modelValue: unref(accountDataLocal).email,
                                                "onUpdate:modelValue": ($event) => unref(accountDataLocal).email = $event,
                                                label: "E-mail",
                                                placeholder: "johndoe@gmail.com",
                                                type: "email"
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
                                                modelValue: unref(accountDataLocal).org,
                                                "onUpdate:modelValue": ($event) => unref(accountDataLocal).org = $event,
                                                label: "Organization",
                                                placeholder: "ThemeSelection"
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
                                                modelValue: unref(accountDataLocal).phone,
                                                "onUpdate:modelValue": ($event) => unref(accountDataLocal).phone = $event,
                                                label: "Phone Number",
                                                placeholder: "+1 (917) 543-9876"
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
                                                modelValue: unref(accountDataLocal).address,
                                                "onUpdate:modelValue": ($event) => unref(accountDataLocal).address = $event,
                                                label: "Address",
                                                placeholder: "123 Main St, New York, NY 10001"
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
                                                modelValue: unref(accountDataLocal).state,
                                                "onUpdate:modelValue": ($event) => unref(accountDataLocal).state = $event,
                                                label: "State",
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
                                                modelValue: unref(accountDataLocal).zip,
                                                "onUpdate:modelValue": ($event) => unref(accountDataLocal).zip = $event,
                                                label: "Zip Code",
                                                placeholder: "10001"
                                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VSelect, {
                                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                modelValue: unref(accountDataLocal).country,
                                                "onUpdate:modelValue": ($event) => unref(accountDataLocal).country = $event,
                                                label: "Country",
                                                items: ["USA", "Canada", "UK", "India", "Australia"],
                                                placeholder: "Select Country"
                                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VSelect, {
                                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                modelValue: unref(accountDataLocal).language,
                                                "onUpdate:modelValue": ($event) => unref(accountDataLocal).language = $event,
                                                label: "Language",
                                                placeholder: "Select Language",
                                                items: ["English", "Spanish", "Arabic", "Hindi", "Urdu"]
                                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VSelect, {
                                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                modelValue: unref(accountDataLocal).timezone,
                                                "onUpdate:modelValue": ($event) => unref(accountDataLocal).timezone = $event,
                                                label: "Timezone",
                                                placeholder: "Select Timezone",
                                                items: timezones,
                                                "menu-props": { maxHeight: 200 }
                                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VSelect, {
                                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                modelValue: unref(accountDataLocal).currency,
                                                "onUpdate:modelValue": ($event) => unref(accountDataLocal).currency = $event,
                                                label: "Currency",
                                                placeholder: "Select Currency",
                                                items: currencies,
                                                "menu-props": { maxHeight: 200 }
                                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, {
                                            cols: "12",
                                            class: "d-flex flex-wrap gap-4"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VBtn, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Save changes")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(VBtn, {
                                                color: "secondary",
                                                variant: "tonal",
                                                type: "reset",
                                                onClick: withModifiers(resetForm, ["prevent"])
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VForm, { class: "mt-6" }, {
                                  default: withCtx(() => [
                                    createVNode(VRow, null, {
                                      default: withCtx(() => [
                                        createVNode(VCol, {
                                          md: "6",
                                          cols: "12"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                              modelValue: unref(accountDataLocal).firstName,
                                              "onUpdate:modelValue": ($event) => unref(accountDataLocal).firstName = $event,
                                              placeholder: "John",
                                              label: "First Name"
                                            }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          md: "6",
                                          cols: "12"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                              modelValue: unref(accountDataLocal).lastName,
                                              "onUpdate:modelValue": ($event) => unref(accountDataLocal).lastName = $event,
                                              placeholder: "Doe",
                                              label: "Last Name"
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
                                              modelValue: unref(accountDataLocal).email,
                                              "onUpdate:modelValue": ($event) => unref(accountDataLocal).email = $event,
                                              label: "E-mail",
                                              placeholder: "johndoe@gmail.com",
                                              type: "email"
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
                                              modelValue: unref(accountDataLocal).org,
                                              "onUpdate:modelValue": ($event) => unref(accountDataLocal).org = $event,
                                              label: "Organization",
                                              placeholder: "ThemeSelection"
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
                                              modelValue: unref(accountDataLocal).phone,
                                              "onUpdate:modelValue": ($event) => unref(accountDataLocal).phone = $event,
                                              label: "Phone Number",
                                              placeholder: "+1 (917) 543-9876"
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
                                              modelValue: unref(accountDataLocal).address,
                                              "onUpdate:modelValue": ($event) => unref(accountDataLocal).address = $event,
                                              label: "Address",
                                              placeholder: "123 Main St, New York, NY 10001"
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
                                              modelValue: unref(accountDataLocal).state,
                                              "onUpdate:modelValue": ($event) => unref(accountDataLocal).state = $event,
                                              label: "State",
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
                                              modelValue: unref(accountDataLocal).zip,
                                              "onUpdate:modelValue": ($event) => unref(accountDataLocal).zip = $event,
                                              label: "Zip Code",
                                              placeholder: "10001"
                                            }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VSelect, {
                                              id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                              modelValue: unref(accountDataLocal).country,
                                              "onUpdate:modelValue": ($event) => unref(accountDataLocal).country = $event,
                                              label: "Country",
                                              items: ["USA", "Canada", "UK", "India", "Australia"],
                                              placeholder: "Select Country"
                                            }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VSelect, {
                                              id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                              modelValue: unref(accountDataLocal).language,
                                              "onUpdate:modelValue": ($event) => unref(accountDataLocal).language = $event,
                                              label: "Language",
                                              placeholder: "Select Language",
                                              items: ["English", "Spanish", "Arabic", "Hindi", "Urdu"]
                                            }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VSelect, {
                                              id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                              modelValue: unref(accountDataLocal).timezone,
                                              "onUpdate:modelValue": ($event) => unref(accountDataLocal).timezone = $event,
                                              label: "Timezone",
                                              placeholder: "Select Timezone",
                                              items: timezones,
                                              "menu-props": { maxHeight: 200 }
                                            }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VSelect, {
                                              id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                              modelValue: unref(accountDataLocal).currency,
                                              "onUpdate:modelValue": ($event) => unref(accountDataLocal).currency = $event,
                                              label: "Currency",
                                              placeholder: "Select Currency",
                                              items: currencies,
                                              "menu-props": { maxHeight: 200 }
                                            }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, {
                                          cols: "12",
                                          class: "d-flex flex-wrap gap-4"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VBtn, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Save changes")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VBtn, {
                                              color: "secondary",
                                              variant: "tonal",
                                              type: "reset",
                                              onClick: withModifiers(resetForm, ["prevent"])
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardText, { class: "d-flex" }, {
                            default: withCtx(() => [
                              createVNode(VAvatar, {
                                rounded: "lg",
                                size: "100",
                                class: "me-6",
                                image: unref(accountDataLocal).avatarImg
                              }, null, 8, ["image"]),
                              createVNode("form", { class: "d-flex flex-column justify-center gap-5" }, [
                                createVNode("div", { class: "d-flex flex-wrap gap-2" }, [
                                  createVNode(VBtn, {
                                    color: "primary",
                                    onClick: ($event) => {
                                      var _a;
                                      return (_a = unref(refInputEl)) == null ? void 0 : _a.click();
                                    }
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, {
                                        icon: "bx-cloud-upload",
                                        class: "d-sm-none"
                                      }),
                                      createVNode("span", { class: "d-none d-sm-block" }, "Upload new photo")
                                    ]),
                                    _: 1
                                  }, 8, ["onClick"]),
                                  createVNode("input", {
                                    ref_key: "refInputEl",
                                    ref: refInputEl,
                                    type: "file",
                                    name: "file",
                                    accept: ".jpeg,.png,.jpg,GIF",
                                    hidden: "",
                                    onInput: changeAvatar
                                  }, null, 544),
                                  createVNode(VBtn, {
                                    type: "reset",
                                    color: "error",
                                    variant: "tonal",
                                    onClick: resetAvatar
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "d-none d-sm-block" }, "Reset"),
                                      createVNode(VIcon, {
                                        icon: "bx-refresh",
                                        class: "d-sm-none"
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("p", { class: "text-body-1 mb-0" }, " Allowed JPG, GIF or PNG. Max size of 800K ")
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(VDivider),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(VForm, { class: "mt-6" }, {
                                default: withCtx(() => [
                                  createVNode(VRow, null, {
                                    default: withCtx(() => [
                                      createVNode(VCol, {
                                        md: "6",
                                        cols: "12"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                            modelValue: unref(accountDataLocal).firstName,
                                            "onUpdate:modelValue": ($event) => unref(accountDataLocal).firstName = $event,
                                            placeholder: "John",
                                            label: "First Name"
                                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        md: "6",
                                        cols: "12"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                            modelValue: unref(accountDataLocal).lastName,
                                            "onUpdate:modelValue": ($event) => unref(accountDataLocal).lastName = $event,
                                            placeholder: "Doe",
                                            label: "Last Name"
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
                                            modelValue: unref(accountDataLocal).email,
                                            "onUpdate:modelValue": ($event) => unref(accountDataLocal).email = $event,
                                            label: "E-mail",
                                            placeholder: "johndoe@gmail.com",
                                            type: "email"
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
                                            modelValue: unref(accountDataLocal).org,
                                            "onUpdate:modelValue": ($event) => unref(accountDataLocal).org = $event,
                                            label: "Organization",
                                            placeholder: "ThemeSelection"
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
                                            modelValue: unref(accountDataLocal).phone,
                                            "onUpdate:modelValue": ($event) => unref(accountDataLocal).phone = $event,
                                            label: "Phone Number",
                                            placeholder: "+1 (917) 543-9876"
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
                                            modelValue: unref(accountDataLocal).address,
                                            "onUpdate:modelValue": ($event) => unref(accountDataLocal).address = $event,
                                            label: "Address",
                                            placeholder: "123 Main St, New York, NY 10001"
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
                                            modelValue: unref(accountDataLocal).state,
                                            "onUpdate:modelValue": ($event) => unref(accountDataLocal).state = $event,
                                            label: "State",
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
                                            modelValue: unref(accountDataLocal).zip,
                                            "onUpdate:modelValue": ($event) => unref(accountDataLocal).zip = $event,
                                            label: "Zip Code",
                                            placeholder: "10001"
                                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                            modelValue: unref(accountDataLocal).country,
                                            "onUpdate:modelValue": ($event) => unref(accountDataLocal).country = $event,
                                            label: "Country",
                                            items: ["USA", "Canada", "UK", "India", "Australia"],
                                            placeholder: "Select Country"
                                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                            modelValue: unref(accountDataLocal).language,
                                            "onUpdate:modelValue": ($event) => unref(accountDataLocal).language = $event,
                                            label: "Language",
                                            placeholder: "Select Language",
                                            items: ["English", "Spanish", "Arabic", "Hindi", "Urdu"]
                                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                            modelValue: unref(accountDataLocal).timezone,
                                            "onUpdate:modelValue": ($event) => unref(accountDataLocal).timezone = $event,
                                            label: "Timezone",
                                            placeholder: "Select Timezone",
                                            items: timezones,
                                            "menu-props": { maxHeight: 200 }
                                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                            modelValue: unref(accountDataLocal).currency,
                                            "onUpdate:modelValue": ($event) => unref(accountDataLocal).currency = $event,
                                            label: "Currency",
                                            placeholder: "Select Currency",
                                            items: currencies,
                                            "menu-props": { maxHeight: 200 }
                                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        class: "d-flex flex-wrap gap-4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VBtn, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Save changes")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VBtn, {
                                            color: "secondary",
                                            variant: "tonal",
                                            type: "reset",
                                            onClick: withModifiers(resetForm, ["prevent"])
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, { title: "Account Details" }, {
                      default: withCtx(() => [
                        createVNode(VCardText, { class: "d-flex" }, {
                          default: withCtx(() => [
                            createVNode(VAvatar, {
                              rounded: "lg",
                              size: "100",
                              class: "me-6",
                              image: unref(accountDataLocal).avatarImg
                            }, null, 8, ["image"]),
                            createVNode("form", { class: "d-flex flex-column justify-center gap-5" }, [
                              createVNode("div", { class: "d-flex flex-wrap gap-2" }, [
                                createVNode(VBtn, {
                                  color: "primary",
                                  onClick: ($event) => {
                                    var _a;
                                    return (_a = unref(refInputEl)) == null ? void 0 : _a.click();
                                  }
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, {
                                      icon: "bx-cloud-upload",
                                      class: "d-sm-none"
                                    }),
                                    createVNode("span", { class: "d-none d-sm-block" }, "Upload new photo")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"]),
                                createVNode("input", {
                                  ref_key: "refInputEl",
                                  ref: refInputEl,
                                  type: "file",
                                  name: "file",
                                  accept: ".jpeg,.png,.jpg,GIF",
                                  hidden: "",
                                  onInput: changeAvatar
                                }, null, 544),
                                createVNode(VBtn, {
                                  type: "reset",
                                  color: "error",
                                  variant: "tonal",
                                  onClick: resetAvatar
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "d-none d-sm-block" }, "Reset"),
                                    createVNode(VIcon, {
                                      icon: "bx-refresh",
                                      class: "d-sm-none"
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("p", { class: "text-body-1 mb-0" }, " Allowed JPG, GIF or PNG. Max size of 800K ")
                            ])
                          ]),
                          _: 1
                        }),
                        createVNode(VDivider),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode(VForm, { class: "mt-6" }, {
                              default: withCtx(() => [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      md: "6",
                                      cols: "12"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                          modelValue: unref(accountDataLocal).firstName,
                                          "onUpdate:modelValue": ($event) => unref(accountDataLocal).firstName = $event,
                                          placeholder: "John",
                                          label: "First Name"
                                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      md: "6",
                                      cols: "12"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                          modelValue: unref(accountDataLocal).lastName,
                                          "onUpdate:modelValue": ($event) => unref(accountDataLocal).lastName = $event,
                                          placeholder: "Doe",
                                          label: "Last Name"
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
                                          modelValue: unref(accountDataLocal).email,
                                          "onUpdate:modelValue": ($event) => unref(accountDataLocal).email = $event,
                                          label: "E-mail",
                                          placeholder: "johndoe@gmail.com",
                                          type: "email"
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
                                          modelValue: unref(accountDataLocal).org,
                                          "onUpdate:modelValue": ($event) => unref(accountDataLocal).org = $event,
                                          label: "Organization",
                                          placeholder: "ThemeSelection"
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
                                          modelValue: unref(accountDataLocal).phone,
                                          "onUpdate:modelValue": ($event) => unref(accountDataLocal).phone = $event,
                                          label: "Phone Number",
                                          placeholder: "+1 (917) 543-9876"
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
                                          modelValue: unref(accountDataLocal).address,
                                          "onUpdate:modelValue": ($event) => unref(accountDataLocal).address = $event,
                                          label: "Address",
                                          placeholder: "123 Main St, New York, NY 10001"
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
                                          modelValue: unref(accountDataLocal).state,
                                          "onUpdate:modelValue": ($event) => unref(accountDataLocal).state = $event,
                                          label: "State",
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
                                          modelValue: unref(accountDataLocal).zip,
                                          "onUpdate:modelValue": ($event) => unref(accountDataLocal).zip = $event,
                                          label: "Zip Code",
                                          placeholder: "10001"
                                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                          modelValue: unref(accountDataLocal).country,
                                          "onUpdate:modelValue": ($event) => unref(accountDataLocal).country = $event,
                                          label: "Country",
                                          items: ["USA", "Canada", "UK", "India", "Australia"],
                                          placeholder: "Select Country"
                                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                          modelValue: unref(accountDataLocal).language,
                                          "onUpdate:modelValue": ($event) => unref(accountDataLocal).language = $event,
                                          label: "Language",
                                          placeholder: "Select Language",
                                          items: ["English", "Spanish", "Arabic", "Hindi", "Urdu"]
                                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                          modelValue: unref(accountDataLocal).timezone,
                                          "onUpdate:modelValue": ($event) => unref(accountDataLocal).timezone = $event,
                                          label: "Timezone",
                                          placeholder: "Select Timezone",
                                          items: timezones,
                                          "menu-props": { maxHeight: 200 }
                                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                          modelValue: unref(accountDataLocal).currency,
                                          "onUpdate:modelValue": ($event) => unref(accountDataLocal).currency = $event,
                                          label: "Currency",
                                          placeholder: "Select Currency",
                                          items: currencies,
                                          "menu-props": { maxHeight: 200 }
                                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      class: "d-flex flex-wrap gap-4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VBtn, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Save changes")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VBtn, {
                                          color: "secondary",
                                          variant: "tonal",
                                          type: "reset",
                                          onClick: withModifiers(resetForm, ["prevent"])
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
                  _push3(ssrRenderComponent(VCard, { title: "Deactivate Account" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div${_scopeId4}>`);
                              _push5(ssrRenderComponent(VCheckbox, {
                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                modelValue: unref(isAccountDeactivated),
                                "onUpdate:modelValue": ($event) => isRef(isAccountDeactivated) ? isAccountDeactivated.value = $event : null,
                                label: "I confirm my account deactivation"
                              }, null, _parent5, _scopeId4));
                              _push5(`</div>`);
                              _push5(ssrRenderComponent(VBtn, {
                                disabled: !unref(isAccountDeactivated),
                                color: "error",
                                class: "mt-3"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Deactivate Account `);
                                  } else {
                                    return [
                                      createTextVNode(" Deactivate Account ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", null, [
                                  createVNode(VCheckbox, {
                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                    modelValue: unref(isAccountDeactivated),
                                    "onUpdate:modelValue": ($event) => isRef(isAccountDeactivated) ? isAccountDeactivated.value = $event : null,
                                    label: "I confirm my account deactivation"
                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                ]),
                                createVNode(VBtn, {
                                  disabled: !unref(isAccountDeactivated),
                                  color: "error",
                                  class: "mt-3"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Deactivate Account ")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode("div", null, [
                                createVNode(VCheckbox, {
                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                  modelValue: unref(isAccountDeactivated),
                                  "onUpdate:modelValue": ($event) => isRef(isAccountDeactivated) ? isAccountDeactivated.value = $event : null,
                                  label: "I confirm my account deactivation"
                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                              ]),
                              createVNode(VBtn, {
                                disabled: !unref(isAccountDeactivated),
                                color: "error",
                                class: "mt-3"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Deactivate Account ")
                                ]),
                                _: 1
                              }, 8, ["disabled"])
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
                    createVNode(VCard, { title: "Deactivate Account" }, {
                      default: withCtx(() => [
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode("div", null, [
                              createVNode(VCheckbox, {
                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                modelValue: unref(isAccountDeactivated),
                                "onUpdate:modelValue": ($event) => isRef(isAccountDeactivated) ? isAccountDeactivated.value = $event : null,
                                label: "I confirm my account deactivation"
                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                            ]),
                            createVNode(VBtn, {
                              disabled: !unref(isAccountDeactivated),
                              color: "error",
                              class: "mt-3"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Deactivate Account ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
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
              createVNode(VCol, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(VCard, { title: "Account Details" }, {
                    default: withCtx(() => [
                      createVNode(VCardText, { class: "d-flex" }, {
                        default: withCtx(() => [
                          createVNode(VAvatar, {
                            rounded: "lg",
                            size: "100",
                            class: "me-6",
                            image: unref(accountDataLocal).avatarImg
                          }, null, 8, ["image"]),
                          createVNode("form", { class: "d-flex flex-column justify-center gap-5" }, [
                            createVNode("div", { class: "d-flex flex-wrap gap-2" }, [
                              createVNode(VBtn, {
                                color: "primary",
                                onClick: ($event) => {
                                  var _a;
                                  return (_a = unref(refInputEl)) == null ? void 0 : _a.click();
                                }
                              }, {
                                default: withCtx(() => [
                                  createVNode(VIcon, {
                                    icon: "bx-cloud-upload",
                                    class: "d-sm-none"
                                  }),
                                  createVNode("span", { class: "d-none d-sm-block" }, "Upload new photo")
                                ]),
                                _: 1
                              }, 8, ["onClick"]),
                              createVNode("input", {
                                ref_key: "refInputEl",
                                ref: refInputEl,
                                type: "file",
                                name: "file",
                                accept: ".jpeg,.png,.jpg,GIF",
                                hidden: "",
                                onInput: changeAvatar
                              }, null, 544),
                              createVNode(VBtn, {
                                type: "reset",
                                color: "error",
                                variant: "tonal",
                                onClick: resetAvatar
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "d-none d-sm-block" }, "Reset"),
                                  createVNode(VIcon, {
                                    icon: "bx-refresh",
                                    class: "d-sm-none"
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("p", { class: "text-body-1 mb-0" }, " Allowed JPG, GIF or PNG. Max size of 800K ")
                          ])
                        ]),
                        _: 1
                      }),
                      createVNode(VDivider),
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode(VForm, { class: "mt-6" }, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    md: "6",
                                    cols: "12"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                        modelValue: unref(accountDataLocal).firstName,
                                        "onUpdate:modelValue": ($event) => unref(accountDataLocal).firstName = $event,
                                        placeholder: "John",
                                        label: "First Name"
                                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    md: "6",
                                    cols: "12"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                        modelValue: unref(accountDataLocal).lastName,
                                        "onUpdate:modelValue": ($event) => unref(accountDataLocal).lastName = $event,
                                        placeholder: "Doe",
                                        label: "Last Name"
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
                                        modelValue: unref(accountDataLocal).email,
                                        "onUpdate:modelValue": ($event) => unref(accountDataLocal).email = $event,
                                        label: "E-mail",
                                        placeholder: "johndoe@gmail.com",
                                        type: "email"
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
                                        modelValue: unref(accountDataLocal).org,
                                        "onUpdate:modelValue": ($event) => unref(accountDataLocal).org = $event,
                                        label: "Organization",
                                        placeholder: "ThemeSelection"
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
                                        modelValue: unref(accountDataLocal).phone,
                                        "onUpdate:modelValue": ($event) => unref(accountDataLocal).phone = $event,
                                        label: "Phone Number",
                                        placeholder: "+1 (917) 543-9876"
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
                                        modelValue: unref(accountDataLocal).address,
                                        "onUpdate:modelValue": ($event) => unref(accountDataLocal).address = $event,
                                        label: "Address",
                                        placeholder: "123 Main St, New York, NY 10001"
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
                                        modelValue: unref(accountDataLocal).state,
                                        "onUpdate:modelValue": ($event) => unref(accountDataLocal).state = $event,
                                        label: "State",
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
                                        modelValue: unref(accountDataLocal).zip,
                                        "onUpdate:modelValue": ($event) => unref(accountDataLocal).zip = $event,
                                        label: "Zip Code",
                                        placeholder: "10001"
                                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                        modelValue: unref(accountDataLocal).country,
                                        "onUpdate:modelValue": ($event) => unref(accountDataLocal).country = $event,
                                        label: "Country",
                                        items: ["USA", "Canada", "UK", "India", "Australia"],
                                        placeholder: "Select Country"
                                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                        modelValue: unref(accountDataLocal).language,
                                        "onUpdate:modelValue": ($event) => unref(accountDataLocal).language = $event,
                                        label: "Language",
                                        placeholder: "Select Language",
                                        items: ["English", "Spanish", "Arabic", "Hindi", "Urdu"]
                                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                        modelValue: unref(accountDataLocal).timezone,
                                        "onUpdate:modelValue": ($event) => unref(accountDataLocal).timezone = $event,
                                        label: "Timezone",
                                        placeholder: "Select Timezone",
                                        items: timezones,
                                        "menu-props": { maxHeight: 200 }
                                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                        modelValue: unref(accountDataLocal).currency,
                                        "onUpdate:modelValue": ($event) => unref(accountDataLocal).currency = $event,
                                        label: "Currency",
                                        placeholder: "Select Currency",
                                        items: currencies,
                                        "menu-props": { maxHeight: 200 }
                                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    class: "d-flex flex-wrap gap-4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Save changes")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VBtn, {
                                        color: "secondary",
                                        variant: "tonal",
                                        type: "reset",
                                        onClick: withModifiers(resetForm, ["prevent"])
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
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(VCard, { title: "Deactivate Account" }, {
                    default: withCtx(() => [
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode(VCheckbox, {
                              id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                              modelValue: unref(isAccountDeactivated),
                              "onUpdate:modelValue": ($event) => isRef(isAccountDeactivated) ? isAccountDeactivated.value = $event : null,
                              label: "I confirm my account deactivation"
                            }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(VBtn, {
                            disabled: !unref(isAccountDeactivated),
                            color: "error",
                            class: "mt-3"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Deactivate Account ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/pages/account-settings/AccountSettingsAccount.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AccountSettingsNotification",
  __ssrInlineRender: true,
  setup(__props) {
    const recentDevices = ref(
      [
        {
          type: "New for you",
          email: true,
          browser: true,
          app: true
        },
        {
          type: "Account activity",
          email: true,
          browser: true,
          app: true
        },
        {
          type: "A new browser used to sign in",
          email: true,
          browser: true,
          app: false
        },
        {
          type: "A new device is linked",
          email: true,
          browser: false,
          app: false
        }
      ]
    );
    const selectedNotification = ref("Only when I'm online");
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({ title: "Recent Devices" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` We need permission from your browser to show notifications. <a href="javascript:void(0)" data-v-5bf444da${_scopeId2}>Request Permission</a>`);
                } else {
                  return [
                    createTextVNode(" We need permission from your browser to show notifications. "),
                    createVNode("a", { href: "javascript:void(0)" }, "Request Permission")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VTable, { class: "text-no-wrap" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<thead data-v-5bf444da${_scopeId2}><tr data-v-5bf444da${_scopeId2}><th scope="col" data-v-5bf444da${_scopeId2}> Type </th><th scope="col" data-v-5bf444da${_scopeId2}> EMAIL </th><th scope="col" data-v-5bf444da${_scopeId2}> BROWSER </th><th scope="col" data-v-5bf444da${_scopeId2}> App </th></tr></thead><tbody data-v-5bf444da${_scopeId2}><!--[-->`);
                  ssrRenderList(unref(recentDevices), (device) => {
                    _push3(`<tr data-v-5bf444da${_scopeId2}><td data-v-5bf444da${_scopeId2}>${ssrInterpolate(device.type)}</td><td data-v-5bf444da${_scopeId2}>`);
                    _push3(ssrRenderComponent(VCheckbox, {
                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                      modelValue: device.email,
                      "onUpdate:modelValue": ($event) => device.email = $event
                    }, null, _parent3, _scopeId2));
                    _push3(`</td><td data-v-5bf444da${_scopeId2}>`);
                    _push3(ssrRenderComponent(VCheckbox, {
                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                      modelValue: device.browser,
                      "onUpdate:modelValue": ($event) => device.browser = $event
                    }, null, _parent3, _scopeId2));
                    _push3(`</td><td data-v-5bf444da${_scopeId2}>`);
                    _push3(ssrRenderComponent(VCheckbox, {
                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                      modelValue: device.app,
                      "onUpdate:modelValue": ($event) => device.app = $event
                    }, null, _parent3, _scopeId2));
                    _push3(`</td></tr>`);
                  });
                  _push3(`<!--]--></tbody>`);
                } else {
                  return [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", { scope: "col" }, " Type "),
                        createVNode("th", { scope: "col" }, " EMAIL "),
                        createVNode("th", { scope: "col" }, " BROWSER "),
                        createVNode("th", { scope: "col" }, " App ")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(recentDevices), (device) => {
                        return openBlock(), createBlock("tr", {
                          key: device.type
                        }, [
                          createVNode("td", null, toDisplayString(device.type), 1),
                          createVNode("td", null, [
                            createVNode(VCheckbox, {
                              id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                              modelValue: device.email,
                              "onUpdate:modelValue": ($event) => device.email = $event
                            }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("td", null, [
                            createVNode(VCheckbox, {
                              id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                              modelValue: device.browser,
                              "onUpdate:modelValue": ($event) => device.browser = $event
                            }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("td", null, [
                            createVNode(VCheckbox, {
                              id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                              modelValue: device.app,
                              "onUpdate:modelValue": ($event) => device.app = $event
                            }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                          ])
                        ]);
                      }), 128))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VDivider, null, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VForm, { onSubmit: () => {
                  } }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p class="text-base font-weight-medium" data-v-5bf444da${_scopeId3}> When should we send you notifications? </p>`);
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                sm: "6"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VSelect, {
                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                      modelValue: unref(selectedNotification),
                                      "onUpdate:modelValue": ($event) => isRef(selectedNotification) ? selectedNotification.value = $event : null,
                                      mandatory: "",
                                      items: ["Only when I'm online", "Anytime"]
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VSelect, {
                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                        modelValue: unref(selectedNotification),
                                        "onUpdate:modelValue": ($event) => isRef(selectedNotification) ? selectedNotification.value = $event : null,
                                        mandatory: "",
                                        items: ["Only when I'm online", "Anytime"]
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
                                  sm: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                      modelValue: unref(selectedNotification),
                                      "onUpdate:modelValue": ($event) => isRef(selectedNotification) ? selectedNotification.value = $event : null,
                                      mandatory: "",
                                      items: ["Only when I'm online", "Anytime"]
                                    }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<div class="d-flex flex-wrap gap-4 mt-4" data-v-5bf444da${_scopeId3}>`);
                        _push4(ssrRenderComponent(VBtn, { type: "submit" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Save Changes `);
                            } else {
                              return [
                                createTextVNode(" Save Changes ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "secondary",
                          variant: "tonal",
                          type: "reset"
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
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode("p", { class: "text-base font-weight-medium" }, " When should we send you notifications? "),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                sm: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VSelect, {
                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                    modelValue: unref(selectedNotification),
                                    "onUpdate:modelValue": ($event) => isRef(selectedNotification) ? selectedNotification.value = $event : null,
                                    mandatory: "",
                                    items: ["Only when I'm online", "Anytime"]
                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("div", { class: "d-flex flex-wrap gap-4 mt-4" }, [
                            createVNode(VBtn, { type: "submit" }, {
                              default: withCtx(() => [
                                createTextVNode(" Save Changes ")
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
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VForm, {
                      onSubmit: withModifiers(() => {
                      }, ["prevent"])
                    }, {
                      default: withCtx(() => [
                        createVNode("p", { class: "text-base font-weight-medium" }, " When should we send you notifications? "),
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              sm: "6"
                            }, {
                              default: withCtx(() => [
                                createVNode(VSelect, {
                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                  modelValue: unref(selectedNotification),
                                  "onUpdate:modelValue": ($event) => isRef(selectedNotification) ? selectedNotification.value = $event : null,
                                  mandatory: "",
                                  items: ["Only when I'm online", "Anytime"]
                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode("div", { class: "d-flex flex-wrap gap-4 mt-4" }, [
                          createVNode(VBtn, { type: "submit" }, {
                            default: withCtx(() => [
                              createTextVNode(" Save Changes ")
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
                        ])
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
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createTextVNode(" We need permission from your browser to show notifications. "),
                  createVNode("a", { href: "javascript:void(0)" }, "Request Permission")
                ]),
                _: 1
              }),
              createVNode(VTable, { class: "text-no-wrap" }, {
                default: withCtx(() => [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", { scope: "col" }, " Type "),
                      createVNode("th", { scope: "col" }, " EMAIL "),
                      createVNode("th", { scope: "col" }, " BROWSER "),
                      createVNode("th", { scope: "col" }, " App ")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(recentDevices), (device) => {
                      return openBlock(), createBlock("tr", {
                        key: device.type
                      }, [
                        createVNode("td", null, toDisplayString(device.type), 1),
                        createVNode("td", null, [
                          createVNode(VCheckbox, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: device.email,
                            "onUpdate:modelValue": ($event) => device.email = $event
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("td", null, [
                          createVNode(VCheckbox, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: device.browser,
                            "onUpdate:modelValue": ($event) => device.browser = $event
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("td", null, [
                          createVNode(VCheckbox, {
                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                            modelValue: device.app,
                            "onUpdate:modelValue": ($event) => device.app = $event
                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                        ])
                      ]);
                    }), 128))
                  ])
                ]),
                _: 1
              }),
              createVNode(VDivider),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode(VForm, {
                    onSubmit: withModifiers(() => {
                    }, ["prevent"])
                  }, {
                    default: withCtx(() => [
                      createVNode("p", { class: "text-base font-weight-medium" }, " When should we send you notifications? "),
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            sm: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(VSelect, {
                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                modelValue: unref(selectedNotification),
                                "onUpdate:modelValue": ($event) => isRef(selectedNotification) ? selectedNotification.value = $event : null,
                                mandatory: "",
                                items: ["Only when I'm online", "Anytime"]
                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "d-flex flex-wrap gap-4 mt-4" }, [
                        createVNode(VBtn, { type: "submit" }, {
                          default: withCtx(() => [
                            createTextVNode(" Save Changes ")
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
                      ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/pages/account-settings/AccountSettingsNotification.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const AccountSettingsNotification = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-5bf444da"]]);
const makeDataTablePaginateProps = propsFactory({
  page: {
    type: [Number, String],
    default: 1
  },
  itemsPerPage: {
    type: [Number, String],
    default: 10
  }
}, "DataTable-paginate");
const VDataTablePaginationSymbol = Symbol.for("vuetify:data-table-pagination");
function createPagination(props) {
  const page = useProxiedModel(props, "page", void 0, (value) => +(value != null ? value : 1));
  const itemsPerPage = useProxiedModel(props, "itemsPerPage", void 0, (value) => +(value != null ? value : 10));
  return {
    page,
    itemsPerPage
  };
}
function providePagination(options) {
  const {
    page,
    itemsPerPage,
    itemsLength
  } = options;
  const startIndex = computed(() => {
    if (itemsPerPage.value === -1) return 0;
    return itemsPerPage.value * (page.value - 1);
  });
  const stopIndex = computed(() => {
    if (itemsPerPage.value === -1) return itemsLength.value;
    return Math.min(itemsLength.value, startIndex.value + itemsPerPage.value);
  });
  const pageCount = computed(() => {
    if (itemsPerPage.value === -1 || itemsLength.value === 0) return 1;
    return Math.ceil(itemsLength.value / itemsPerPage.value);
  });
  watch([page, pageCount], () => {
    if (page.value > pageCount.value) {
      page.value = pageCount.value;
    }
  });
  function setItemsPerPage(value) {
    itemsPerPage.value = value;
    page.value = 1;
  }
  function nextPage() {
    page.value = clamp(page.value + 1, 1, pageCount.value);
  }
  function prevPage() {
    page.value = clamp(page.value - 1, 1, pageCount.value);
  }
  function setPage(value) {
    page.value = clamp(value, 1, pageCount.value);
  }
  const data = {
    page,
    itemsPerPage,
    startIndex,
    stopIndex,
    pageCount,
    itemsLength,
    nextPage,
    prevPage,
    setPage,
    setItemsPerPage
  };
  provide(VDataTablePaginationSymbol, data);
  return data;
}
function usePagination() {
  const data = inject(VDataTablePaginationSymbol);
  if (!data) throw new Error("Missing pagination!");
  return data;
}
function usePaginatedItems(options) {
  const vm = getCurrentInstance("usePaginatedItems");
  const {
    items,
    startIndex,
    stopIndex,
    itemsPerPage
  } = options;
  const paginatedItems = computed(() => {
    if (itemsPerPage.value <= 0) return items.value;
    return items.value.slice(startIndex.value, stopIndex.value);
  });
  watch(paginatedItems, (val) => {
    vm.emit("update:currentItems", val);
  });
  return {
    paginatedItems
  };
}
const makeVDataTableFooterProps = propsFactory({
  prevIcon: {
    type: IconValue,
    default: "$prev"
  },
  nextIcon: {
    type: IconValue,
    default: "$next"
  },
  firstIcon: {
    type: IconValue,
    default: "$first"
  },
  lastIcon: {
    type: IconValue,
    default: "$last"
  },
  itemsPerPageText: {
    type: String,
    default: "$vuetify.dataFooter.itemsPerPageText"
  },
  pageText: {
    type: String,
    default: "$vuetify.dataFooter.pageText"
  },
  firstPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.firstPage"
  },
  prevPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.prevPage"
  },
  nextPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.nextPage"
  },
  lastPageLabel: {
    type: String,
    default: "$vuetify.dataFooter.lastPage"
  },
  itemsPerPageOptions: {
    type: Array,
    default: () => [{
      value: 10,
      title: "10"
    }, {
      value: 25,
      title: "25"
    }, {
      value: 50,
      title: "50"
    }, {
      value: 100,
      title: "100"
    }, {
      value: -1,
      title: "$vuetify.dataFooter.itemsPerPageAll"
    }]
  },
  showCurrentPage: Boolean
}, "VDataTableFooter");
const VDataTableFooter = genericComponent()({
  name: "VDataTableFooter",
  props: makeVDataTableFooterProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      page,
      pageCount,
      startIndex,
      stopIndex,
      itemsLength,
      itemsPerPage,
      setItemsPerPage
    } = usePagination();
    const itemsPerPageOptions = computed(() => props.itemsPerPageOptions.map((option) => {
      if (typeof option === "number") {
        return {
          value: option,
          title: option === -1 ? t("$vuetify.dataFooter.itemsPerPageAll") : String(option)
        };
      }
      return {
        ...option,
        title: !isNaN(Number(option.title)) ? option.title : t(option.title)
      };
    }));
    useRender(() => {
      var _a;
      const paginationProps = VPagination.filterProps(props);
      return createVNode("div", {
        "class": "v-data-table-footer"
      }, [(_a = slots.prepend) == null ? void 0 : _a.call(slots), createVNode("div", {
        "class": "v-data-table-footer__items-per-page"
      }, [createVNode("span", null, [t(props.itemsPerPageText)]), createVNode(VSelect, {
        "items": itemsPerPageOptions.value,
        "modelValue": itemsPerPage.value,
        "onUpdate:modelValue": (v) => setItemsPerPage(Number(v)),
        "density": "compact",
        "variant": "outlined",
        "hide-details": true
      }, null)]), createVNode("div", {
        "class": "v-data-table-footer__info"
      }, [createVNode("div", null, [t(props.pageText, !itemsLength.value ? 0 : startIndex.value + 1, stopIndex.value, itemsLength.value)])]), createVNode("div", {
        "class": "v-data-table-footer__pagination"
      }, [createVNode(VPagination, mergeProps({
        "modelValue": page.value,
        "onUpdate:modelValue": ($event) => page.value = $event,
        "density": "comfortable",
        "first-aria-label": props.firstPageLabel,
        "last-aria-label": props.lastPageLabel,
        "length": pageCount.value,
        "next-aria-label": props.nextPageLabel,
        "previous-aria-label": props.prevPageLabel,
        "rounded": true,
        "show-first-last-page": true,
        "total-visible": props.showCurrentPage ? 1 : 0,
        "variant": "plain"
      }, paginationProps), null)])]);
    });
    return {};
  }
});
const VDataTableColumn = defineFunctionalComponent({
  align: {
    type: String,
    default: "start"
  },
  fixed: Boolean,
  fixedOffset: [Number, String],
  height: [Number, String],
  lastFixed: Boolean,
  noPadding: Boolean,
  tag: String,
  width: [Number, String],
  maxWidth: [Number, String],
  nowrap: Boolean
}, (props, _ref) => {
  var _a;
  let {
    slots
  } = _ref;
  const Tag = (_a = props.tag) != null ? _a : "td";
  return createVNode(Tag, {
    "class": ["v-data-table__td", {
      "v-data-table-column--fixed": props.fixed,
      "v-data-table-column--last-fixed": props.lastFixed,
      "v-data-table-column--no-padding": props.noPadding,
      "v-data-table-column--nowrap": props.nowrap
    }, `v-data-table-column--align-${props.align}`],
    "style": {
      height: convertToUnit(props.height),
      width: convertToUnit(props.width),
      maxWidth: convertToUnit(props.maxWidth),
      left: convertToUnit(props.fixedOffset || null)
    }
  }, {
    default: () => {
      var _a2;
      return [(_a2 = slots.default) == null ? void 0 : _a2.call(slots)];
    }
  });
});
const makeDataTableHeaderProps = propsFactory({
  headers: Array
}, "DataTable-header");
const VDataTableHeadersSymbol = Symbol.for("vuetify:data-table-headers");
const defaultHeader = {
  title: "",
  sortable: false
};
const defaultActionHeader = {
  ...defaultHeader,
  width: 48
};
function priorityQueue() {
  let arr = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : [];
  const queue = arr.map((element) => ({
    element,
    priority: 0
  }));
  return {
    enqueue: (element, priority) => {
      let added = false;
      for (let i = 0; i < queue.length; i++) {
        const item = queue[i];
        if (item.priority > priority) {
          queue.splice(i, 0, {
            element,
            priority
          });
          added = true;
          break;
        }
      }
      if (!added) queue.push({
        element,
        priority
      });
    },
    size: () => queue.length,
    count: () => {
      let count = 0;
      if (!queue.length) return 0;
      const whole = Math.floor(queue[0].priority);
      for (let i = 0; i < queue.length; i++) {
        if (Math.floor(queue[i].priority) === whole) count += 1;
      }
      return count;
    },
    dequeue: () => {
      return queue.shift();
    }
  };
}
function extractLeaves(item) {
  let columns = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : [];
  if (!item.children) {
    columns.push(item);
  } else {
    for (const child of item.children) {
      extractLeaves(child, columns);
    }
  }
  return columns;
}
function extractKeys(headers) {
  let keys = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : /* @__PURE__ */ new Set();
  for (const item of headers) {
    if (item.key) keys.add(item.key);
    if (item.children) {
      extractKeys(item.children, keys);
    }
  }
  return keys;
}
function getDefaultItem(item) {
  if (!item.key) return void 0;
  if (item.key === "data-table-group") return defaultHeader;
  if (["data-table-expand", "data-table-select"].includes(item.key)) return defaultActionHeader;
  return void 0;
}
function getDepth(item) {
  let depth = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
  if (!item.children) return depth;
  return Math.max(depth, ...item.children.map((child) => getDepth(child, depth + 1)));
}
function parseFixedColumns(items) {
  let seenFixed = false;
  function setFixed(item) {
    let parentFixed = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : false;
    if (!item) return;
    if (parentFixed) {
      item.fixed = true;
    }
    if (item.fixed) {
      if (item.children) {
        for (let i = item.children.length - 1; i >= 0; i--) {
          setFixed(item.children[i], true);
        }
      } else {
        if (!seenFixed) {
          item.lastFixed = true;
        } else if (isNaN(+item.width)) {
          consoleError(`Multiple fixed columns should have a static width (key: ${item.key})`);
        }
        seenFixed = true;
      }
    } else {
      if (item.children) {
        for (let i = item.children.length - 1; i >= 0; i--) {
          setFixed(item.children[i]);
        }
      } else {
        seenFixed = false;
      }
    }
  }
  for (let i = items.length - 1; i >= 0; i--) {
    setFixed(items[i]);
  }
  function setFixedOffset(item) {
    let fixedOffset2 = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : 0;
    if (!item) return fixedOffset2;
    if (item.children) {
      item.fixedOffset = fixedOffset2;
      for (const child of item.children) {
        fixedOffset2 = setFixedOffset(child, fixedOffset2);
      }
    } else if (item.fixed) {
      item.fixedOffset = fixedOffset2;
      fixedOffset2 += parseFloat(item.width || "0") || 0;
    }
    return fixedOffset2;
  }
  let fixedOffset = 0;
  for (const item of items) {
    fixedOffset = setFixedOffset(item, fixedOffset);
  }
}
function parse(items, maxDepth) {
  const headers = [];
  let currentDepth = 0;
  const queue = priorityQueue(items);
  while (queue.size() > 0) {
    let rowSize = queue.count();
    const row = [];
    let fraction = 1;
    while (rowSize > 0) {
      const {
        element: item,
        priority
      } = queue.dequeue();
      const diff = maxDepth - currentDepth - getDepth(item);
      row.push({
        ...item,
        rowspan: diff != null ? diff : 1,
        colspan: item.children ? extractLeaves(item).length : 1
      });
      if (item.children) {
        for (const child of item.children) {
          const sort = priority % 1 + fraction / Math.pow(10, currentDepth + 2);
          queue.enqueue(child, currentDepth + diff + sort);
        }
      }
      fraction += 1;
      rowSize -= 1;
    }
    currentDepth += 1;
    headers.push(row);
  }
  const columns = items.map((item) => extractLeaves(item)).flat();
  return {
    columns,
    headers
  };
}
function convertToInternalHeaders(items) {
  var _a, _b, _c, _d;
  const internalHeaders = [];
  for (const item of items) {
    const defaultItem = {
      ...getDefaultItem(item),
      ...item
    };
    const key = (_a = defaultItem.key) != null ? _a : typeof defaultItem.value === "string" ? defaultItem.value : null;
    const value = (_c = (_b = defaultItem.value) != null ? _b : key) != null ? _c : null;
    const internalItem = {
      ...defaultItem,
      key,
      value,
      sortable: (_d = defaultItem.sortable) != null ? _d : defaultItem.key != null || !!defaultItem.sort,
      children: defaultItem.children ? convertToInternalHeaders(defaultItem.children) : void 0
    };
    internalHeaders.push(internalItem);
  }
  return internalHeaders;
}
function createHeaders(props, options) {
  const headers = ref([]);
  const columns = ref([]);
  const sortFunctions = ref({});
  const sortRawFunctions = ref({});
  const filterFunctions = ref({});
  watchEffect(() => {
    var _a2;
    var _a, _b, _c;
    const _headers = props.headers || Object.keys((_a2 = props.items[0]) != null ? _a2 : {}).map((key) => ({
      key,
      title: capitalize(key)
    }));
    const items = _headers.slice();
    const keys = extractKeys(items);
    if (((_a = options == null ? void 0 : options.groupBy) == null ? void 0 : _a.value.length) && !keys.has("data-table-group")) {
      items.unshift({
        key: "data-table-group",
        title: "Group"
      });
    }
    if (((_b = options == null ? void 0 : options.showSelect) == null ? void 0 : _b.value) && !keys.has("data-table-select")) {
      items.unshift({
        key: "data-table-select"
      });
    }
    if (((_c = options == null ? void 0 : options.showExpand) == null ? void 0 : _c.value) && !keys.has("data-table-expand")) {
      items.push({
        key: "data-table-expand"
      });
    }
    const internalHeaders = convertToInternalHeaders(items);
    parseFixedColumns(internalHeaders);
    const maxDepth = Math.max(...internalHeaders.map((item) => getDepth(item))) + 1;
    const parsed = parse(internalHeaders, maxDepth);
    headers.value = parsed.headers;
    columns.value = parsed.columns;
    const flatHeaders = parsed.headers.flat(1);
    for (const header of flatHeaders) {
      if (!header.key) continue;
      if (header.sortable) {
        if (header.sort) {
          sortFunctions.value[header.key] = header.sort;
        }
        if (header.sortRaw) {
          sortRawFunctions.value[header.key] = header.sortRaw;
        }
      }
      if (header.filter) {
        filterFunctions.value[header.key] = header.filter;
      }
    }
  });
  const data = {
    headers,
    columns,
    sortFunctions,
    sortRawFunctions,
    filterFunctions
  };
  provide(VDataTableHeadersSymbol, data);
  return data;
}
function useHeaders() {
  const data = inject(VDataTableHeadersSymbol);
  if (!data) throw new Error("Missing headers!");
  return data;
}
const singleSelectStrategy = {
  showSelectAll: false,
  allSelected: () => [],
  select: (_ref) => {
    var _a;
    let {
      items,
      value
    } = _ref;
    return new Set(value ? [(_a = items[0]) == null ? void 0 : _a.value] : []);
  },
  selectAll: (_ref2) => {
    let {
      selected
    } = _ref2;
    return selected;
  }
};
const pageSelectStrategy = {
  showSelectAll: true,
  allSelected: (_ref3) => {
    let {
      currentPage
    } = _ref3;
    return currentPage;
  },
  select: (_ref4) => {
    let {
      items,
      value,
      selected
    } = _ref4;
    for (const item of items) {
      if (value) selected.add(item.value);
      else selected.delete(item.value);
    }
    return selected;
  },
  selectAll: (_ref5) => {
    let {
      value,
      currentPage,
      selected
    } = _ref5;
    return pageSelectStrategy.select({
      items: currentPage,
      value,
      selected
    });
  }
};
const allSelectStrategy = {
  showSelectAll: true,
  allSelected: (_ref6) => {
    let {
      allItems
    } = _ref6;
    return allItems;
  },
  select: (_ref7) => {
    let {
      items,
      value,
      selected
    } = _ref7;
    for (const item of items) {
      if (value) selected.add(item.value);
      else selected.delete(item.value);
    }
    return selected;
  },
  selectAll: (_ref8) => {
    let {
      value,
      allItems,
      selected
    } = _ref8;
    return allSelectStrategy.select({
      items: allItems,
      value,
      selected
    });
  }
};
const makeDataTableSelectProps = propsFactory({
  showSelect: Boolean,
  selectStrategy: {
    type: [String, Object],
    default: "page"
  },
  modelValue: {
    type: Array,
    default: () => []
  },
  valueComparator: {
    type: Function,
    default: deepEqual
  }
}, "DataTable-select");
const VDataTableSelectionSymbol = Symbol.for("vuetify:data-table-selection");
function provideSelection(props, _ref9) {
  let {
    allItems,
    currentPage
  } = _ref9;
  const selected = useProxiedModel(props, "modelValue", props.modelValue, (v) => {
    return new Set(wrapInArray(v).map((v2) => {
      var _a2;
      var _a;
      return (_a2 = (_a = allItems.value.find((item) => props.valueComparator(v2, item.value))) == null ? void 0 : _a.value) != null ? _a2 : v2;
    }));
  }, (v) => {
    return [...v.values()];
  });
  const allSelectable = computed(() => allItems.value.filter((item) => item.selectable));
  const currentPageSelectable = computed(() => currentPage.value.filter((item) => item.selectable));
  const selectStrategy = computed(() => {
    if (typeof props.selectStrategy === "object") return props.selectStrategy;
    switch (props.selectStrategy) {
      case "single":
        return singleSelectStrategy;
      case "all":
        return allSelectStrategy;
      case "page":
      default:
        return pageSelectStrategy;
    }
  });
  function isSelected(items) {
    return wrapInArray(items).every((item) => selected.value.has(item.value));
  }
  function isSomeSelected(items) {
    return wrapInArray(items).some((item) => selected.value.has(item.value));
  }
  function select(items, value) {
    const newSelected = selectStrategy.value.select({
      items,
      value,
      selected: new Set(selected.value)
    });
    selected.value = newSelected;
  }
  function toggleSelect(item) {
    select([item], !isSelected([item]));
  }
  function selectAll(value) {
    const newSelected = selectStrategy.value.selectAll({
      value,
      allItems: allSelectable.value,
      currentPage: currentPageSelectable.value,
      selected: new Set(selected.value)
    });
    selected.value = newSelected;
  }
  const someSelected = computed(() => selected.value.size > 0);
  const allSelected = computed(() => {
    const items = selectStrategy.value.allSelected({
      allItems: allSelectable.value,
      currentPage: currentPageSelectable.value
    });
    return !!items.length && isSelected(items);
  });
  const showSelectAll = computed(() => selectStrategy.value.showSelectAll);
  const data = {
    toggleSelect,
    select,
    selectAll,
    isSelected,
    isSomeSelected,
    someSelected,
    allSelected,
    showSelectAll
  };
  provide(VDataTableSelectionSymbol, data);
  return data;
}
function useSelection() {
  const data = inject(VDataTableSelectionSymbol);
  if (!data) throw new Error("Missing selection!");
  return data;
}
const makeDataTableSortProps = propsFactory({
  sortBy: {
    type: Array,
    default: () => []
  },
  customKeySort: Object,
  multiSort: Boolean,
  mustSort: Boolean
}, "DataTable-sort");
const VDataTableSortSymbol = Symbol.for("vuetify:data-table-sort");
function createSort(props) {
  const sortBy = useProxiedModel(props, "sortBy");
  const mustSort = toRef(props, "mustSort");
  const multiSort = toRef(props, "multiSort");
  return {
    sortBy,
    mustSort,
    multiSort
  };
}
function provideSort(options) {
  const {
    sortBy,
    mustSort,
    multiSort,
    page
  } = options;
  const toggleSort = (column) => {
    var _a;
    if (column.key == null) return;
    let newSortBy = (_a = sortBy.value.map((x) => ({
      ...x
    }))) != null ? _a : [];
    const item = newSortBy.find((x) => x.key === column.key);
    if (!item) {
      if (multiSort.value) newSortBy = [...newSortBy, {
        key: column.key,
        order: "asc"
      }];
      else newSortBy = [{
        key: column.key,
        order: "asc"
      }];
    } else if (item.order === "desc") {
      if (mustSort.value) {
        item.order = "asc";
      } else {
        newSortBy = newSortBy.filter((x) => x.key !== column.key);
      }
    } else {
      item.order = "desc";
    }
    sortBy.value = newSortBy;
    if (page) page.value = 1;
  };
  function isSorted(column) {
    return !!sortBy.value.find((item) => item.key === column.key);
  }
  const data = {
    sortBy,
    toggleSort,
    isSorted
  };
  provide(VDataTableSortSymbol, data);
  return data;
}
function useSort() {
  const data = inject(VDataTableSortSymbol);
  if (!data) throw new Error("Missing sort!");
  return data;
}
function useSortedItems(props, items, sortBy, options) {
  const locale = useLocale();
  const sortedItems = computed(() => {
    var _a, _b;
    if (!sortBy.value.length) return items.value;
    return sortItems(items.value, sortBy.value, locale.current.value, {
      transform: options == null ? void 0 : options.transform,
      sortFunctions: {
        ...props.customKeySort,
        ...(_a = options == null ? void 0 : options.sortFunctions) == null ? void 0 : _a.value
      },
      sortRawFunctions: (_b = options == null ? void 0 : options.sortRawFunctions) == null ? void 0 : _b.value
    });
  });
  return {
    sortedItems
  };
}
function sortItems(items, sortByItems, locale, options) {
  const stringCollator = new Intl.Collator(locale, {
    sensitivity: "accent",
    usage: "sort"
  });
  const transformedItems = items.map((item) => [item, (options == null ? void 0 : options.transform) ? options.transform(item) : item]);
  return transformedItems.sort((a, b) => {
    var _a2;
    var _a, _b;
    for (let i = 0; i < sortByItems.length; i++) {
      let hasCustomResult = false;
      const sortKey = sortByItems[i].key;
      const sortOrder = (_a2 = sortByItems[i].order) != null ? _a2 : "asc";
      if (sortOrder === false) continue;
      let sortA = getObjectValueByPath(a[1], sortKey);
      let sortB = getObjectValueByPath(b[1], sortKey);
      let sortARaw = a[0].raw;
      let sortBRaw = b[0].raw;
      if (sortOrder === "desc") {
        [sortA, sortB] = [sortB, sortA];
        [sortARaw, sortBRaw] = [sortBRaw, sortARaw];
      }
      if ((_a = options == null ? void 0 : options.sortRawFunctions) == null ? void 0 : _a[sortKey]) {
        const customResult = options.sortRawFunctions[sortKey](sortARaw, sortBRaw);
        if (customResult == null) continue;
        hasCustomResult = true;
        if (customResult) return customResult;
      }
      if ((_b = options == null ? void 0 : options.sortFunctions) == null ? void 0 : _b[sortKey]) {
        const customResult = options.sortFunctions[sortKey](sortA, sortB);
        if (customResult == null) continue;
        hasCustomResult = true;
        if (customResult) return customResult;
      }
      if (hasCustomResult) continue;
      if (sortA instanceof Date && sortB instanceof Date) {
        return sortA.getTime() - sortB.getTime();
      }
      [sortA, sortB] = [sortA, sortB].map((s) => s != null ? s.toString().toLocaleLowerCase() : s);
      if (sortA !== sortB) {
        if (isEmpty(sortA) && isEmpty(sortB)) return 0;
        if (isEmpty(sortA)) return -1;
        if (isEmpty(sortB)) return 1;
        if (!isNaN(sortA) && !isNaN(sortB)) return Number(sortA) - Number(sortB);
        return stringCollator.compare(sortA, sortB);
      }
    }
    return 0;
  }).map((_ref) => {
    let [item] = _ref;
    return item;
  });
}
const makeVDataTableHeadersProps = propsFactory({
  color: String,
  sticky: Boolean,
  disableSort: Boolean,
  multiSort: Boolean,
  sortAscIcon: {
    type: IconValue,
    default: "$sortAsc"
  },
  sortDescIcon: {
    type: IconValue,
    default: "$sortDesc"
  },
  headerProps: {
    type: Object
  },
  ...makeDisplayProps(),
  ...makeLoaderProps()
}, "VDataTableHeaders");
const VDataTableHeaders = genericComponent()({
  name: "VDataTableHeaders",
  props: makeVDataTableHeadersProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      toggleSort,
      sortBy,
      isSorted
    } = useSort();
    const {
      someSelected,
      allSelected,
      selectAll,
      showSelectAll
    } = useSelection();
    const {
      columns,
      headers
    } = useHeaders();
    const {
      loaderClasses
    } = useLoader(props);
    function getFixedStyles(column, y) {
      if (!props.sticky && !column.fixed) return void 0;
      return {
        position: "sticky",
        left: column.fixed ? convertToUnit(column.fixedOffset) : void 0,
        top: props.sticky ? `calc(var(--v-table-header-height) * ${y})` : void 0
      };
    }
    function getSortIcon(column) {
      const item = sortBy.value.find((item2) => item2.key === column.key);
      if (!item) return props.sortAscIcon;
      return item.order === "asc" ? props.sortAscIcon : props.sortDescIcon;
    }
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(props, "color");
    const {
      displayClasses,
      mobile
    } = useDisplay(props);
    const slotProps = computed(() => ({
      headers: headers.value,
      columns: columns.value,
      toggleSort,
      isSorted,
      sortBy: sortBy.value,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      selectAll,
      getSortIcon
    }));
    const headerCellClasses = computed(() => ["v-data-table__th", {
      "v-data-table__th--sticky": props.sticky
    }, displayClasses.value, loaderClasses.value]);
    const VDataTableHeaderCell = (_ref2) => {
      var _a, _b;
      let {
        column,
        x,
        y
      } = _ref2;
      const noPadding = column.key === "data-table-select" || column.key === "data-table-expand";
      const headerProps = mergeProps((_a = props.headerProps) != null ? _a : {}, (_b = column.headerProps) != null ? _b : {});
      return createVNode(VDataTableColumn, mergeProps({
        "tag": "th",
        "align": column.align,
        "class": [{
          "v-data-table__th--sortable": column.sortable && !props.disableSort,
          "v-data-table__th--sorted": isSorted(column),
          "v-data-table__th--fixed": column.fixed
        }, ...headerCellClasses.value],
        "style": {
          width: convertToUnit(column.width),
          minWidth: convertToUnit(column.minWidth),
          maxWidth: convertToUnit(column.maxWidth),
          ...getFixedStyles(column, y)
        },
        "colspan": column.colspan,
        "rowspan": column.rowspan,
        "onClick": column.sortable ? () => toggleSort(column) : void 0,
        "fixed": column.fixed,
        "nowrap": column.nowrap,
        "lastFixed": column.lastFixed,
        "noPadding": noPadding
      }, headerProps), {
        default: () => {
          var _a3;
          var _a2;
          const columnSlotName = `header.${column.key}`;
          const columnSlotProps = {
            column,
            selectAll,
            isSorted,
            toggleSort,
            sortBy: sortBy.value,
            someSelected: someSelected.value,
            allSelected: allSelected.value,
            getSortIcon
          };
          if (slots[columnSlotName]) return slots[columnSlotName](columnSlotProps);
          if (column.key === "data-table-select") {
            return (_a3 = (_a2 = slots["header.data-table-select"]) == null ? void 0 : _a2.call(slots, columnSlotProps)) != null ? _a3 : showSelectAll.value && createVNode(VCheckboxBtn, {
              "modelValue": allSelected.value,
              "indeterminate": someSelected.value && !allSelected.value,
              "onUpdate:modelValue": selectAll
            }, null);
          }
          return createVNode("div", {
            "class": "v-data-table-header__content"
          }, [createVNode("span", null, [column.title]), column.sortable && !props.disableSort && createVNode(VIcon, {
            "key": "icon",
            "class": "v-data-table-header__sort-icon",
            "icon": getSortIcon(column)
          }, null), props.multiSort && isSorted(column) && createVNode("div", {
            "key": "badge",
            "class": ["v-data-table-header__sort-badge", ...backgroundColorClasses.value],
            "style": backgroundColorStyles.value
          }, [sortBy.value.findIndex((x2) => x2.key === column.key) + 1])]);
        }
      });
    };
    const VDataTableMobileHeaderCell = () => {
      var _a, _b;
      const headerProps = mergeProps((_b = (_a = props.headerProps) != null ? _a : {}) != null ? _b : {});
      const displayItems = computed(() => {
        return columns.value.filter((column) => (column == null ? void 0 : column.sortable) && !props.disableSort);
      });
      const appendIcon = computed(() => {
        const showSelectColumn = columns.value.find((column) => column.key === "data-table-select");
        if (showSelectColumn == null) return;
        return allSelected.value ? "$checkboxOn" : someSelected.value ? "$checkboxIndeterminate" : "$checkboxOff";
      });
      return createVNode(VDataTableColumn, mergeProps({
        "tag": "th",
        "class": [...headerCellClasses.value],
        "colspan": headers.value.length + 1
      }, headerProps), {
        default: () => [createVNode("div", {
          "class": "v-data-table-header__content"
        }, [createVNode(VSelect, {
          "chips": true,
          "class": "v-data-table__td-sort-select",
          "clearable": true,
          "density": "default",
          "items": displayItems.value,
          "label": t("$vuetify.dataTable.sortBy"),
          "multiple": props.multiSort,
          "variant": "underlined",
          "onClick:clear": () => sortBy.value = [],
          "appendIcon": appendIcon.value,
          "onClick:append": () => selectAll(!allSelected.value)
        }, {
          ...slots,
          chip: (props2) => {
            var _a2;
            return createVNode(VChip, {
              "onClick": ((_a2 = props2.item.raw) == null ? void 0 : _a2.sortable) ? () => toggleSort(props2.item.raw) : void 0,
              "onMousedown": (e) => {
                e.preventDefault();
                e.stopPropagation();
              }
            }, {
              default: () => [props2.item.title, createVNode(VIcon, {
                "class": ["v-data-table__td-sort-icon", isSorted(props2.item.raw) && "v-data-table__td-sort-icon-active"],
                "icon": getSortIcon(props2.item.raw),
                "size": "small"
              }, null)]
            });
          }
        })])]
      });
    };
    useRender(() => {
      return mobile.value ? createVNode("tr", null, [createVNode(VDataTableMobileHeaderCell, null, null)]) : createVNode(Fragment, null, [slots.headers ? slots.headers(slotProps.value) : headers.value.map((row, y) => createVNode("tr", null, [row.map((column, x) => createVNode(VDataTableHeaderCell, {
        "column": column,
        "x": x,
        "y": y
      }, null))])), props.loading && createVNode("tr", {
        "class": "v-data-table-progress"
      }, [createVNode("th", {
        "colspan": columns.value.length
      }, [createVNode(LoaderSlot, {
        "name": "v-data-table-progress",
        "absolute": true,
        "active": true,
        "color": typeof props.loading === "boolean" ? void 0 : props.loading,
        "indeterminate": true
      }, {
        default: slots.loader
      })])])]);
    });
  }
});
const makeDataTableGroupProps = propsFactory({
  groupBy: {
    type: Array,
    default: () => []
  }
}, "DataTable-group");
const VDataTableGroupSymbol = Symbol.for("vuetify:data-table-group");
function createGroupBy(props) {
  const groupBy = useProxiedModel(props, "groupBy");
  return {
    groupBy
  };
}
function provideGroupBy(options) {
  const {
    disableSort,
    groupBy,
    sortBy
  } = options;
  const opened = ref(/* @__PURE__ */ new Set());
  const sortByWithGroups = computed(() => {
    return groupBy.value.map((val) => {
      var _a;
      return {
        ...val,
        order: (_a = val.order) != null ? _a : false
      };
    }).concat((disableSort == null ? void 0 : disableSort.value) ? [] : sortBy.value);
  });
  function isGroupOpen(group) {
    return opened.value.has(group.id);
  }
  function toggleGroup(group) {
    const newOpened = new Set(opened.value);
    if (!isGroupOpen(group)) newOpened.add(group.id);
    else newOpened.delete(group.id);
    opened.value = newOpened;
  }
  function extractRows(items) {
    function dive(group) {
      const arr = [];
      for (const item of group.items) {
        if ("type" in item && item.type === "group") {
          arr.push(...dive(item));
        } else {
          arr.push(item);
        }
      }
      return arr;
    }
    return dive({
      items
    });
  }
  const data = {
    sortByWithGroups,
    toggleGroup,
    opened,
    groupBy,
    extractRows,
    isGroupOpen
  };
  provide(VDataTableGroupSymbol, data);
  return data;
}
function useGroupBy() {
  const data = inject(VDataTableGroupSymbol);
  if (!data) throw new Error("Missing group!");
  return data;
}
function groupItemsByProperty(items, groupBy) {
  if (!items.length) return [];
  const groups = /* @__PURE__ */ new Map();
  for (const item of items) {
    const value = getObjectValueByPath(item.raw, groupBy);
    if (!groups.has(value)) {
      groups.set(value, []);
    }
    groups.get(value).push(item);
  }
  return groups;
}
function groupItems(items, groupBy) {
  let depth = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 0;
  let prefix = arguments.length > 3 && arguments[3] !== void 0 ? arguments[3] : "root";
  if (!groupBy.length) return [];
  const groupedItems = groupItemsByProperty(items, groupBy[0]);
  const groups = [];
  const rest = groupBy.slice(1);
  groupedItems.forEach((items2, value) => {
    const key = groupBy[0];
    const id = `${prefix}_${key}_${value}`;
    groups.push({
      depth,
      id,
      key,
      value,
      items: rest.length ? groupItems(items2, rest, depth + 1, id) : items2,
      type: "group"
    });
  });
  return groups;
}
function flattenItems(items, opened) {
  const flatItems = [];
  for (const item of items) {
    if ("type" in item && item.type === "group") {
      if (item.value != null) {
        flatItems.push(item);
      }
      if (opened.has(item.id) || item.value == null) {
        flatItems.push(...flattenItems(item.items, opened));
      }
    } else {
      flatItems.push(item);
    }
  }
  return flatItems;
}
function useGroupedItems(items, groupBy, opened) {
  const flatItems = computed(() => {
    if (!groupBy.value.length) return items.value;
    const groupedItems = groupItems(items.value, groupBy.value.map((item) => item.key));
    return flattenItems(groupedItems, opened.value);
  });
  return {
    flatItems
  };
}
const makeVDataTableGroupHeaderRowProps = propsFactory({
  item: {
    type: Object,
    required: true
  }
}, "VDataTableGroupHeaderRow");
const VDataTableGroupHeaderRow = genericComponent()({
  name: "VDataTableGroupHeaderRow",
  props: makeVDataTableGroupHeaderRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      isGroupOpen,
      toggleGroup,
      extractRows
    } = useGroupBy();
    const {
      isSelected,
      isSomeSelected,
      select
    } = useSelection();
    const {
      columns
    } = useHeaders();
    const rows = computed(() => {
      return extractRows([props.item]);
    });
    return () => createVNode("tr", {
      "class": "v-data-table-group-header-row",
      "style": {
        "--v-data-table-group-header-row-depth": props.item.depth
      }
    }, [columns.value.map((column) => {
      var _a2, _b2;
      var _a, _b;
      if (column.key === "data-table-group") {
        const icon = isGroupOpen(props.item) ? "$expand" : "$next";
        const onClick = () => toggleGroup(props.item);
        return (_a2 = (_a = slots["data-table-group"]) == null ? void 0 : _a.call(slots, {
          item: props.item,
          count: rows.value.length,
          props: {
            icon,
            onClick
          }
        })) != null ? _a2 : createVNode(VDataTableColumn, {
          "class": "v-data-table-group-header-row__column"
        }, {
          default: () => [createVNode(VBtn, {
            "size": "small",
            "variant": "text",
            "icon": icon,
            "onClick": onClick
          }, null), createVNode("span", null, [props.item.value]), createVNode("span", null, [createTextVNode("("), rows.value.length, createTextVNode(")")])]
        });
      }
      if (column.key === "data-table-select") {
        const modelValue = isSelected(rows.value);
        const indeterminate = isSomeSelected(rows.value) && !modelValue;
        const selectGroup = (v) => select(rows.value, v);
        return (_b2 = (_b = slots["data-table-select"]) == null ? void 0 : _b.call(slots, {
          props: {
            modelValue,
            indeterminate,
            "onUpdate:modelValue": selectGroup
          }
        })) != null ? _b2 : createVNode("td", null, [createVNode(VCheckboxBtn, {
          "modelValue": modelValue,
          "indeterminate": indeterminate,
          "onUpdate:modelValue": selectGroup
        }, null)]);
      }
      return createVNode("td", null, null);
    })]);
  }
});
const makeDataTableExpandProps = propsFactory({
  expandOnClick: Boolean,
  showExpand: Boolean,
  expanded: {
    type: Array,
    default: () => []
  }
}, "DataTable-expand");
const VDataTableExpandedKey = Symbol.for("vuetify:datatable:expanded");
function provideExpanded(props) {
  const expandOnClick = toRef(props, "expandOnClick");
  const expanded = useProxiedModel(props, "expanded", props.expanded, (v) => {
    return new Set(v);
  }, (v) => {
    return [...v.values()];
  });
  function expand(item, value) {
    const newExpanded = new Set(expanded.value);
    if (!value) {
      newExpanded.delete(item.value);
    } else {
      newExpanded.add(item.value);
    }
    expanded.value = newExpanded;
  }
  function isExpanded(item) {
    return expanded.value.has(item.value);
  }
  function toggleExpand(item) {
    expand(item, !isExpanded(item));
  }
  const data = {
    expand,
    expanded,
    expandOnClick,
    isExpanded,
    toggleExpand
  };
  provide(VDataTableExpandedKey, data);
  return data;
}
function useExpanded() {
  const data = inject(VDataTableExpandedKey);
  if (!data) throw new Error("foo");
  return data;
}
const makeVDataTableRowProps = propsFactory({
  index: Number,
  item: Object,
  cellProps: [Object, Function],
  onClick: EventProp(),
  onContextmenu: EventProp(),
  onDblclick: EventProp(),
  ...makeDisplayProps()
}, "VDataTableRow");
const VDataTableRow = genericComponent()({
  name: "VDataTableRow",
  props: makeVDataTableRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      displayClasses,
      mobile
    } = useDisplay(props, "v-data-table__tr");
    const {
      isSelected,
      toggleSelect,
      someSelected,
      allSelected,
      selectAll
    } = useSelection();
    const {
      isExpanded,
      toggleExpand
    } = useExpanded();
    const {
      toggleSort,
      sortBy,
      isSorted
    } = useSort();
    const {
      columns
    } = useHeaders();
    useRender(() => createVNode("tr", {
      "class": ["v-data-table__tr", {
        "v-data-table__tr--clickable": !!(props.onClick || props.onContextmenu || props.onDblclick)
      }, displayClasses.value],
      "onClick": props.onClick,
      "onContextmenu": props.onContextmenu,
      "onDblclick": props.onDblclick
    }, [props.item && columns.value.map((column, i) => {
      const item = props.item;
      const slotName = `item.${column.key}`;
      const headerSlotName = `header.${column.key}`;
      const slotProps = {
        index: props.index,
        item: item.raw,
        internalItem: item,
        value: getObjectValueByPath(item.columns, column.key),
        column,
        isSelected,
        toggleSelect,
        isExpanded,
        toggleExpand
      };
      const columnSlotProps = {
        column,
        selectAll,
        isSorted,
        toggleSort,
        sortBy: sortBy.value,
        someSelected: someSelected.value,
        allSelected: allSelected.value,
        getSortIcon: () => ""
      };
      const cellProps = typeof props.cellProps === "function" ? props.cellProps({
        index: slotProps.index,
        item: slotProps.item,
        internalItem: slotProps.internalItem,
        value: slotProps.value,
        column
      }) : props.cellProps;
      const columnCellProps = typeof column.cellProps === "function" ? column.cellProps({
        index: slotProps.index,
        item: slotProps.item,
        internalItem: slotProps.internalItem,
        value: slotProps.value
      }) : column.cellProps;
      return createVNode(VDataTableColumn, mergeProps({
        "align": column.align,
        "class": {
          "v-data-table__td--expanded-row": column.key === "data-table-expand",
          "v-data-table__td--select-row": column.key === "data-table-select"
        },
        "fixed": column.fixed,
        "fixedOffset": column.fixedOffset,
        "lastFixed": column.lastFixed,
        "maxWidth": !mobile.value ? column.maxWidth : void 0,
        "noPadding": column.key === "data-table-select" || column.key === "data-table-expand",
        "nowrap": column.nowrap,
        "width": !mobile.value ? column.width : void 0
      }, cellProps, columnCellProps), {
        default: () => {
          var _a2, _b2, _c2, _d2;
          var _a, _b, _c, _d, _e;
          if (slots[slotName] && !mobile.value) return (_a = slots[slotName]) == null ? void 0 : _a.call(slots, slotProps);
          if (column.key === "data-table-select") {
            return (_a2 = (_b = slots["item.data-table-select"]) == null ? void 0 : _b.call(slots, slotProps)) != null ? _a2 : createVNode(VCheckboxBtn, {
              "disabled": !item.selectable,
              "modelValue": isSelected([item]),
              "onClick": withModifiers(() => toggleSelect(item), ["stop"])
            }, null);
          }
          if (column.key === "data-table-expand") {
            return (_b2 = (_c = slots["item.data-table-expand"]) == null ? void 0 : _c.call(slots, slotProps)) != null ? _b2 : createVNode(VBtn, {
              "icon": isExpanded(item) ? "$collapse" : "$expand",
              "size": "small",
              "variant": "text",
              "onClick": withModifiers(() => toggleExpand(item), ["stop"])
            }, null);
          }
          const displayValue = toDisplayString(slotProps.value);
          return !mobile.value ? displayValue : createVNode(Fragment, null, [createVNode("div", {
            "class": "v-data-table__td-title"
          }, [(_c2 = (_d = slots[headerSlotName]) == null ? void 0 : _d.call(slots, columnSlotProps)) != null ? _c2 : column.title]), createVNode("div", {
            "class": "v-data-table__td-value"
          }, [(_d2 = (_e = slots[slotName]) == null ? void 0 : _e.call(slots, slotProps)) != null ? _d2 : displayValue])]);
        }
      });
    })]));
  }
});
const makeVDataTableRowsProps = propsFactory({
  loading: [Boolean, String],
  loadingText: {
    type: String,
    default: "$vuetify.dataIterator.loadingText"
  },
  hideNoData: Boolean,
  items: {
    type: Array,
    default: () => []
  },
  noDataText: {
    type: String,
    default: "$vuetify.noDataText"
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  ...makeDisplayProps()
}, "VDataTableRows");
const VDataTableRows = genericComponent()({
  name: "VDataTableRows",
  inheritAttrs: false,
  props: makeVDataTableRowsProps(),
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      columns
    } = useHeaders();
    const {
      expandOnClick,
      toggleExpand,
      isExpanded
    } = useExpanded();
    const {
      isSelected,
      toggleSelect
    } = useSelection();
    const {
      toggleGroup,
      isGroupOpen
    } = useGroupBy();
    const {
      t
    } = useLocale();
    const {
      mobile
    } = useDisplay(props);
    useRender(() => {
      var _a2, _b2;
      var _a, _b;
      if (props.loading && (!props.items.length || slots.loading)) {
        return createVNode("tr", {
          "class": "v-data-table-rows-loading",
          "key": "loading"
        }, [createVNode("td", {
          "colspan": columns.value.length
        }, [(_a2 = (_a = slots.loading) == null ? void 0 : _a.call(slots)) != null ? _a2 : t(props.loadingText)])]);
      }
      if (!props.loading && !props.items.length && !props.hideNoData) {
        return createVNode("tr", {
          "class": "v-data-table-rows-no-data",
          "key": "no-data"
        }, [createVNode("td", {
          "colspan": columns.value.length
        }, [(_b2 = (_b = slots["no-data"]) == null ? void 0 : _b.call(slots)) != null ? _b2 : t(props.noDataText)])]);
      }
      return createVNode(Fragment, null, [props.items.map((item, index) => {
        var _a3;
        var _a22;
        if (item.type === "group") {
          const slotProps2 = {
            index,
            item,
            columns: columns.value,
            isExpanded,
            toggleExpand,
            isSelected,
            toggleSelect,
            toggleGroup,
            isGroupOpen
          };
          return slots["group-header"] ? slots["group-header"](slotProps2) : createVNode(VDataTableGroupHeaderRow, mergeProps({
            "key": `group-header_${item.id}`,
            "item": item
          }, getPrefixedEventHandlers(attrs, ":group-header", () => slotProps2)), slots);
        }
        const slotProps = {
          index,
          item: item.raw,
          internalItem: item,
          columns: columns.value,
          isExpanded,
          toggleExpand,
          isSelected,
          toggleSelect
        };
        const itemSlotProps = {
          ...slotProps,
          props: mergeProps({
            key: `item_${(_a3 = item.key) != null ? _a3 : item.index}`,
            onClick: expandOnClick.value ? () => {
              toggleExpand(item);
            } : void 0,
            index,
            item,
            cellProps: props.cellProps,
            mobile: mobile.value
          }, getPrefixedEventHandlers(attrs, ":row", () => slotProps), typeof props.rowProps === "function" ? props.rowProps({
            item: slotProps.item,
            index: slotProps.index,
            internalItem: slotProps.internalItem
          }) : props.rowProps)
        };
        return createVNode(Fragment, {
          "key": itemSlotProps.props.key
        }, [slots.item ? slots.item(itemSlotProps) : createVNode(VDataTableRow, itemSlotProps.props, slots), isExpanded(item) && ((_a22 = slots["expanded-row"]) == null ? void 0 : _a22.call(slots, slotProps))]);
      })]);
    });
    return {};
  }
});
const makeDataTableItemsProps = propsFactory({
  items: {
    type: Array,
    default: () => []
  },
  itemValue: {
    type: [String, Array, Function],
    default: "id"
  },
  itemSelectable: {
    type: [String, Array, Function],
    default: null
  },
  rowProps: [Object, Function],
  cellProps: [Object, Function],
  returnObject: Boolean
}, "DataTable-items");
function transformItem(props, item, index, columns) {
  const value = props.returnObject ? item : getPropertyFromItem(item, props.itemValue);
  const selectable = getPropertyFromItem(item, props.itemSelectable, true);
  const itemColumns = columns.reduce((obj, column) => {
    if (column.key != null) obj[column.key] = getPropertyFromItem(item, column.value);
    return obj;
  }, {});
  return {
    type: "item",
    key: props.returnObject ? getPropertyFromItem(item, props.itemValue) : value,
    index,
    value,
    selectable,
    columns: itemColumns,
    raw: item
  };
}
function transformItems(props, items, columns) {
  return items.map((item, index) => transformItem(props, item, index, columns));
}
function useDataTableItems(props, columns) {
  const items = computed(() => transformItems(props, props.items, columns.value));
  return {
    items
  };
}
function useOptions(_ref) {
  let {
    page,
    itemsPerPage,
    sortBy,
    groupBy,
    search
  } = _ref;
  const vm = getCurrentInstance("VDataTable");
  const options = computed(() => ({
    page: page.value,
    itemsPerPage: itemsPerPage.value,
    sortBy: sortBy.value,
    groupBy: groupBy.value,
    search: search.value
  }));
  let oldOptions = null;
  watch(options, () => {
    if (deepEqual(oldOptions, options.value)) return;
    if (oldOptions && oldOptions.search !== options.value.search) {
      page.value = 1;
    }
    vm.emit("update:options", options.value);
    oldOptions = options.value;
  }, {
    deep: true,
    immediate: true
  });
}
const defaultFilter = (value, query, item) => {
  if (value == null || query == null) return -1;
  return value.toString().toLocaleLowerCase().indexOf(query.toString().toLocaleLowerCase());
};
const makeFilterProps = propsFactory({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function filterItems(items, query, options) {
  var _a2, _b;
  var _a;
  const array = [];
  const filter = (_a2 = options == null ? void 0 : options.default) != null ? _a2 : defaultFilter;
  const keys = (options == null ? void 0 : options.filterKeys) ? wrapInArray(options.filterKeys) : false;
  const customFiltersLength = Object.keys((_b = options == null ? void 0 : options.customKeyFilter) != null ? _b : {}).length;
  if (!(items == null ? void 0 : items.length)) return array;
  loop: for (let i = 0; i < items.length; i++) {
    const [item, transformed = item] = wrapInArray(items[i]);
    const customMatches = {};
    const defaultMatches = {};
    let match = -1;
    if ((query || customFiltersLength > 0) && !(options == null ? void 0 : options.noFilter)) {
      if (typeof item === "object") {
        const filterKeys = keys || Object.keys(transformed);
        for (const key of filterKeys) {
          const value = getPropertyFromItem(transformed, key);
          const keyFilter = (_a = options == null ? void 0 : options.customKeyFilter) == null ? void 0 : _a[key];
          match = keyFilter ? keyFilter(value, query, item) : filter(value, query, item);
          if (match !== -1 && match !== false) {
            if (keyFilter) customMatches[key] = match;
            else defaultMatches[key] = match;
          } else if ((options == null ? void 0 : options.filterMode) === "every") {
            continue loop;
          }
        }
      } else {
        match = filter(item, query, item);
        if (match !== -1 && match !== false) {
          defaultMatches.title = match;
        }
      }
      const defaultMatchesLength = Object.keys(defaultMatches).length;
      const customMatchesLength = Object.keys(customMatches).length;
      if (!defaultMatchesLength && !customMatchesLength) continue;
      if ((options == null ? void 0 : options.filterMode) === "union" && customMatchesLength !== customFiltersLength && !defaultMatchesLength) continue;
      if ((options == null ? void 0 : options.filterMode) === "intersection" && (customMatchesLength !== customFiltersLength || !defaultMatchesLength)) continue;
    }
    array.push({
      index: i,
      matches: {
        ...defaultMatches,
        ...customMatches
      }
    });
  }
  return array;
}
function useFilter(props, items, query, options) {
  const filteredItems = ref([]);
  const filteredMatches = ref(/* @__PURE__ */ new Map());
  const transformedItems = computed(() => (options == null ? void 0 : options.transform) ? unref(items).map((item) => [item, options.transform(item)]) : unref(items));
  watchEffect(() => {
    const _query = typeof query === "function" ? query() : unref(query);
    const strQuery = typeof _query !== "string" && typeof _query !== "number" ? "" : String(_query);
    const results = filterItems(transformedItems.value, strQuery, {
      customKeyFilter: {
        ...props.customKeyFilter,
        ...unref(options == null ? void 0 : options.customKeyFilter)
      },
      default: props.customFilter,
      filterKeys: props.filterKeys,
      filterMode: props.filterMode,
      noFilter: props.noFilter
    });
    const originalItems = unref(items);
    const _filteredItems = [];
    const _filteredMatches = /* @__PURE__ */ new Map();
    results.forEach((_ref) => {
      let {
        index,
        matches
      } = _ref;
      const item = originalItems[index];
      _filteredItems.push(item);
      _filteredMatches.set(item.value, matches);
    });
    filteredItems.value = _filteredItems;
    filteredMatches.value = _filteredMatches;
  });
  function getMatches(item) {
    return filteredMatches.value.get(item.value);
  }
  return {
    filteredItems,
    filteredMatches,
    getMatches
  };
}
const makeDataTableProps = propsFactory({
  ...makeVDataTableRowsProps(),
  hideDefaultBody: Boolean,
  hideDefaultFooter: Boolean,
  hideDefaultHeader: Boolean,
  width: [String, Number],
  search: String,
  ...makeDataTableExpandProps(),
  ...makeDataTableGroupProps(),
  ...makeDataTableHeaderProps(),
  ...makeDataTableItemsProps(),
  ...makeDataTableSelectProps(),
  ...makeDataTableSortProps(),
  ...makeVDataTableHeadersProps(),
  ...makeVTableProps()
}, "DataTable");
const makeVDataTableProps = propsFactory({
  ...makeDataTablePaginateProps(),
  ...makeDataTableProps(),
  ...makeFilterProps(),
  ...makeVDataTableFooterProps()
}, "VDataTable");
const VDataTable = genericComponent()({
  name: "VDataTable",
  props: makeVDataTableProps(),
  emits: {
    "update:modelValue": (value) => true,
    "update:page": (value) => true,
    "update:itemsPerPage": (value) => true,
    "update:sortBy": (value) => true,
    "update:options": (value) => true,
    "update:groupBy": (value) => true,
    "update:expanded": (value) => true,
    "update:currentItems": (value) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      slots
    } = _ref;
    const {
      groupBy
    } = createGroupBy(props);
    const {
      sortBy,
      multiSort,
      mustSort
    } = createSort(props);
    const {
      page,
      itemsPerPage
    } = createPagination(props);
    const {
      disableSort
    } = toRefs(props);
    const {
      columns,
      headers,
      sortFunctions,
      sortRawFunctions,
      filterFunctions
    } = createHeaders(props, {
      groupBy,
      showSelect: toRef(props, "showSelect"),
      showExpand: toRef(props, "showExpand")
    });
    const {
      items
    } = useDataTableItems(props, columns);
    const search = toRef(props, "search");
    const {
      filteredItems
    } = useFilter(props, items, search, {
      transform: (item) => item.columns,
      customKeyFilter: filterFunctions
    });
    const {
      toggleSort
    } = provideSort({
      sortBy,
      multiSort,
      mustSort,
      page
    });
    const {
      sortByWithGroups,
      opened,
      extractRows,
      isGroupOpen,
      toggleGroup
    } = provideGroupBy({
      groupBy,
      sortBy,
      disableSort
    });
    const {
      sortedItems
    } = useSortedItems(props, filteredItems, sortByWithGroups, {
      transform: (item) => ({
        ...item.raw,
        ...item.columns
      }),
      sortFunctions,
      sortRawFunctions
    });
    const {
      flatItems
    } = useGroupedItems(sortedItems, groupBy, opened);
    const itemsLength = computed(() => flatItems.value.length);
    const {
      startIndex,
      stopIndex,
      pageCount,
      setItemsPerPage
    } = providePagination({
      page,
      itemsPerPage,
      itemsLength
    });
    const {
      paginatedItems
    } = usePaginatedItems({
      items: flatItems,
      startIndex,
      stopIndex,
      itemsPerPage
    });
    const paginatedItemsWithoutGroups = computed(() => extractRows(paginatedItems.value));
    const {
      isSelected,
      select,
      selectAll,
      toggleSelect,
      someSelected,
      allSelected
    } = provideSelection(props, {
      allItems: items,
      currentPage: paginatedItemsWithoutGroups
    });
    const {
      isExpanded,
      toggleExpand
    } = provideExpanded(props);
    useOptions({
      page,
      itemsPerPage,
      sortBy,
      groupBy,
      search
    });
    provideDefaults({
      VDataTableRows: {
        hideNoData: toRef(props, "hideNoData"),
        noDataText: toRef(props, "noDataText"),
        loading: toRef(props, "loading"),
        loadingText: toRef(props, "loadingText")
      }
    });
    const slotProps = computed(() => ({
      page: page.value,
      itemsPerPage: itemsPerPage.value,
      sortBy: sortBy.value,
      pageCount: pageCount.value,
      toggleSort,
      setItemsPerPage,
      someSelected: someSelected.value,
      allSelected: allSelected.value,
      isSelected,
      select,
      selectAll,
      toggleSelect,
      isExpanded,
      toggleExpand,
      isGroupOpen,
      toggleGroup,
      items: paginatedItemsWithoutGroups.value.map((item) => item.raw),
      internalItems: paginatedItemsWithoutGroups.value,
      groupedItems: paginatedItems.value,
      columns: columns.value,
      headers: headers.value
    }));
    useRender(() => {
      const dataTableFooterProps = VDataTableFooter.filterProps(props);
      const dataTableHeadersProps = VDataTableHeaders.filterProps(props);
      const dataTableRowsProps = VDataTableRows.filterProps(props);
      const tableProps = VTable.filterProps(props);
      return createVNode(VTable, mergeProps({
        "class": ["v-data-table", {
          "v-data-table--show-select": props.showSelect,
          "v-data-table--loading": props.loading
        }, props.class],
        "style": props.style
      }, tableProps), {
        top: () => {
          var _a;
          return (_a = slots.top) == null ? void 0 : _a.call(slots, slotProps.value);
        },
        default: () => {
          var _a, _b, _c, _d, _e, _f;
          return slots.default ? slots.default(slotProps.value) : createVNode(Fragment, null, [(_a = slots.colgroup) == null ? void 0 : _a.call(slots, slotProps.value), !props.hideDefaultHeader && createVNode("thead", {
            "key": "thead"
          }, [createVNode(VDataTableHeaders, dataTableHeadersProps, slots)]), (_b = slots.thead) == null ? void 0 : _b.call(slots, slotProps.value), !props.hideDefaultBody && createVNode("tbody", null, [(_c = slots["body.prepend"]) == null ? void 0 : _c.call(slots, slotProps.value), slots.body ? slots.body(slotProps.value) : createVNode(VDataTableRows, mergeProps(attrs, dataTableRowsProps, {
            "items": paginatedItems.value
          }), slots), (_d = slots["body.append"]) == null ? void 0 : _d.call(slots, slotProps.value)]), (_e = slots.tbody) == null ? void 0 : _e.call(slots, slotProps.value), (_f = slots.tfoot) == null ? void 0 : _f.call(slots, slotProps.value)]);
        },
        bottom: () => slots.bottom ? slots.bottom(slotProps.value) : !props.hideDefaultFooter && createVNode(Fragment, null, [createVNode(VDivider, null, null), createVNode(VDataTableFooter, dataTableFooterProps, {
          prepend: slots["footer.prepend"]
        })])
      });
    });
    return {};
  }
});
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AccountSettingsSecurity",
  __ssrInlineRender: true,
  setup(__props) {
    const isCurrentPasswordVisible = ref(false);
    const isNewPasswordVisible = ref(false);
    const isConfirmPasswordVisible = ref(false);
    const currentPassword = ref("12345678");
    const newPassword = ref("87654321");
    const confirmPassword = ref("87654321");
    const passwordRequirements = [
      "Minimum 8 characters long - the more, the better",
      "At least one lowercase character",
      "At least one number, symbol, or whitespace character"
    ];
    const serverKeys = [
      {
        name: "Server Key 1",
        key: "23eaf7f0-f4f7-495e-8b86-fad3261282ac",
        createdOn: "28 Apr 2021, 18:20 GTM+4:10",
        permission: "Full Access"
      },
      {
        name: "Server Key 2",
        key: "bb98e571-a2e2-4de8-90a9-2e231b5e99",
        createdOn: "12 Feb 2021, 10:30 GTM+2:30",
        permission: "Read Only"
      },
      {
        name: "Server Key 3",
        key: "2e915e59-3105-47f2-8838-6e46bf83b711",
        createdOn: "28 Dec 2020, 12:21 GTM+4:10",
        permission: "Full Access"
      }
    ];
    const recentDevicesHeaders = [
      { title: "BROWSER", key: "browser" },
      { title: "DEVICE", key: "device" },
      { title: "LOCATION", key: "location" },
      { title: "RECENT ACTIVITY", key: "recentActivity" }
    ];
    const recentDevices = [
      {
        browser: "Chrome on Windows",
        device: "HP Spectre 360",
        location: "New York, NY",
        recentActivity: "28 Apr 2022, 18:20",
        deviceIcon: { icon: "bxl-windows", color: "primary" }
      },
      {
        browser: "Chrome on iPhone",
        device: "iPhone 12x",
        location: "Los Angeles, CA",
        recentActivity: "20 Apr 2022, 10:20",
        deviceIcon: { icon: "bx-mobile", color: "error" }
      },
      {
        browser: "Chrome on Android",
        device: "Oneplus 9 Pro",
        location: "San Francisco, CA",
        recentActivity: "16 Apr 2022, 04:20",
        deviceIcon: { icon: "bxl-android", color: "success" }
      },
      {
        browser: "Chrome on macOS",
        device: "Apple iMac",
        location: "New York, NY",
        recentActivity: "28 Apr 2022, 18:20",
        deviceIcon: { icon: "bxl-apple", color: "secondary" }
      },
      {
        browser: "Chrome on Windows",
        device: "HP Spectre 360",
        location: "Los Angeles, CA",
        recentActivity: "20 Apr 2022, 10:20",
        deviceIcon: { icon: "bxl-windows", color: "primary" }
      },
      {
        browser: "Chrome on Android",
        device: "Oneplus 9 Pro",
        location: "San Francisco, CA",
        recentActivity: "16 Apr 2022, 04:20",
        deviceIcon: { icon: "bxl-android", color: "success" }
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VRow, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "12" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, { title: "Change Password" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VForm, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCardText, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VRow, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VTextField, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(currentPassword),
                                                  "onUpdate:modelValue": ($event) => isRef(currentPassword) ? currentPassword.value = $event : null,
                                                  type: unref(isCurrentPasswordVisible) ? "text" : "password",
                                                  "append-inner-icon": unref(isCurrentPasswordVisible) ? "bx-hide" : "bx-show",
                                                  label: "Current Password",
                                                  placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                                  "onClick:appendInner": ($event) => isCurrentPasswordVisible.value = !unref(isCurrentPasswordVisible)
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VTextField, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    modelValue: unref(currentPassword),
                                                    "onUpdate:modelValue": ($event) => isRef(currentPassword) ? currentPassword.value = $event : null,
                                                    type: unref(isCurrentPasswordVisible) ? "text" : "password",
                                                    "append-inner-icon": unref(isCurrentPasswordVisible) ? "bx-hide" : "bx-show",
                                                    label: "Current Password",
                                                    placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                                    "onClick:appendInner": ($event) => isCurrentPasswordVisible.value = !unref(isCurrentPasswordVisible)
                                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VCol, {
                                              cols: "12",
                                              md: "6"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VTextField, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(currentPassword),
                                                  "onUpdate:modelValue": ($event) => isRef(currentPassword) ? currentPassword.value = $event : null,
                                                  type: unref(isCurrentPasswordVisible) ? "text" : "password",
                                                  "append-inner-icon": unref(isCurrentPasswordVisible) ? "bx-hide" : "bx-show",
                                                  label: "Current Password",
                                                  placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                                  "onClick:appendInner": ($event) => isCurrentPasswordVisible.value = !unref(isCurrentPasswordVisible)
                                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VRow, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VTextField, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(newPassword),
                                                  "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                                                  type: unref(isNewPasswordVisible) ? "text" : "password",
                                                  "append-inner-icon": unref(isNewPasswordVisible) ? "bx-hide" : "bx-show",
                                                  label: "New Password",
                                                  autocomplete: "on",
                                                  placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                                  "onClick:appendInner": ($event) => isNewPasswordVisible.value = !unref(isNewPasswordVisible)
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VTextField, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    modelValue: unref(newPassword),
                                                    "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                                                    type: unref(isNewPasswordVisible) ? "text" : "password",
                                                    "append-inner-icon": unref(isNewPasswordVisible) ? "bx-hide" : "bx-show",
                                                    label: "New Password",
                                                    autocomplete: "on",
                                                    placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                                    "onClick:appendInner": ($event) => isNewPasswordVisible.value = !unref(isNewPasswordVisible)
                                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                          _push7(ssrRenderComponent(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VTextField, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(confirmPassword),
                                                  "onUpdate:modelValue": ($event) => isRef(confirmPassword) ? confirmPassword.value = $event : null,
                                                  type: unref(isConfirmPasswordVisible) ? "text" : "password",
                                                  "append-inner-icon": unref(isConfirmPasswordVisible) ? "bx-hide" : "bx-show",
                                                  label: "Confirm New Password",
                                                  placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                                  "onClick:appendInner": ($event) => isConfirmPasswordVisible.value = !unref(isConfirmPasswordVisible)
                                                }, null, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VTextField, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    modelValue: unref(confirmPassword),
                                                    "onUpdate:modelValue": ($event) => isRef(confirmPassword) ? confirmPassword.value = $event : null,
                                                    type: unref(isConfirmPasswordVisible) ? "text" : "password",
                                                    "append-inner-icon": unref(isConfirmPasswordVisible) ? "bx-hide" : "bx-show",
                                                    label: "Confirm New Password",
                                                    placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                                    "onClick:appendInner": ($event) => isConfirmPasswordVisible.value = !unref(isConfirmPasswordVisible)
                                                  }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VCol, {
                                              cols: "12",
                                              md: "6"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VTextField, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  modelValue: unref(newPassword),
                                                  "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                                                  type: unref(isNewPasswordVisible) ? "text" : "password",
                                                  "append-inner-icon": unref(isNewPasswordVisible) ? "bx-hide" : "bx-show",
                                                  label: "New Password",
                                                  autocomplete: "on",
                                                  placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                                  "onClick:appendInner": ($event) => isNewPasswordVisible.value = !unref(isNewPasswordVisible)
                                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
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
                                                  modelValue: unref(confirmPassword),
                                                  "onUpdate:modelValue": ($event) => isRef(confirmPassword) ? confirmPassword.value = $event : null,
                                                  type: unref(isConfirmPasswordVisible) ? "text" : "password",
                                                  "append-inner-icon": unref(isConfirmPasswordVisible) ? "bx-hide" : "bx-show",
                                                  label: "Confirm New Password",
                                                  placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                                  "onClick:appendInner": ($event) => isConfirmPasswordVisible.value = !unref(isConfirmPasswordVisible)
                                                }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
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
                                                modelValue: unref(currentPassword),
                                                "onUpdate:modelValue": ($event) => isRef(currentPassword) ? currentPassword.value = $event : null,
                                                type: unref(isCurrentPasswordVisible) ? "text" : "password",
                                                "append-inner-icon": unref(isCurrentPasswordVisible) ? "bx-hide" : "bx-show",
                                                label: "Current Password",
                                                placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                                "onClick:appendInner": ($event) => isCurrentPasswordVisible.value = !unref(isCurrentPasswordVisible)
                                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VRow, null, {
                                        default: withCtx(() => [
                                          createVNode(VCol, {
                                            cols: "12",
                                            md: "6"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VTextField, {
                                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                modelValue: unref(newPassword),
                                                "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                                                type: unref(isNewPasswordVisible) ? "text" : "password",
                                                "append-inner-icon": unref(isNewPasswordVisible) ? "bx-hide" : "bx-show",
                                                label: "New Password",
                                                autocomplete: "on",
                                                placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                                "onClick:appendInner": ($event) => isNewPasswordVisible.value = !unref(isNewPasswordVisible)
                                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
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
                                                modelValue: unref(confirmPassword),
                                                "onUpdate:modelValue": ($event) => isRef(confirmPassword) ? confirmPassword.value = $event : null,
                                                type: unref(isConfirmPasswordVisible) ? "text" : "password",
                                                "append-inner-icon": unref(isConfirmPasswordVisible) ? "bx-hide" : "bx-show",
                                                label: "Confirm New Password",
                                                placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                                "onClick:appendInner": ($event) => isConfirmPasswordVisible.value = !unref(isConfirmPasswordVisible)
                                              }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
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
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCardText, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<p class="text-base font-weight-medium mt-2"${_scopeId5}> Password Requirements: </p><ul class="d-flex flex-column gap-y-3"${_scopeId5}><!--[-->`);
                                    ssrRenderList(passwordRequirements, (item) => {
                                      _push6(`<li class="d-flex"${_scopeId5}><div${_scopeId5}>`);
                                      _push6(ssrRenderComponent(VIcon, {
                                        size: "7",
                                        icon: "bxs-circle",
                                        class: "me-3"
                                      }, null, _parent6, _scopeId5));
                                      _push6(`</div><span class="font-weight-medium"${_scopeId5}>${ssrInterpolate(item)}</span></li>`);
                                    });
                                    _push6(`<!--]--></ul>`);
                                  } else {
                                    return [
                                      createVNode("p", { class: "text-base font-weight-medium mt-2" }, " Password Requirements: "),
                                      createVNode("ul", { class: "d-flex flex-column gap-y-3" }, [
                                        (openBlock(), createBlock(Fragment, null, renderList(passwordRequirements, (item) => {
                                          return createVNode("li", {
                                            key: item,
                                            class: "d-flex"
                                          }, [
                                            createVNode("div", null, [
                                              createVNode(VIcon, {
                                                size: "7",
                                                icon: "bxs-circle",
                                                class: "me-3"
                                              })
                                            ]),
                                            createVNode("span", { class: "font-weight-medium" }, toDisplayString(item), 1)
                                          ]);
                                        }), 64))
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCardText, { class: "d-flex flex-wrap gap-4" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VBtn, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Save changes`);
                                        } else {
                                          return [
                                            createTextVNode("Save changes")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VBtn, {
                                      type: "reset",
                                      color: "secondary",
                                      variant: "tonal"
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
                                      createVNode(VBtn, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Save changes")
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createVNode(VRow, null, {
                                      default: withCtx(() => [
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                              modelValue: unref(currentPassword),
                                              "onUpdate:modelValue": ($event) => isRef(currentPassword) ? currentPassword.value = $event : null,
                                              type: unref(isCurrentPasswordVisible) ? "text" : "password",
                                              "append-inner-icon": unref(isCurrentPasswordVisible) ? "bx-hide" : "bx-show",
                                              label: "Current Password",
                                              placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                              "onClick:appendInner": ($event) => isCurrentPasswordVisible.value = !unref(isCurrentPasswordVisible)
                                            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VRow, null, {
                                      default: withCtx(() => [
                                        createVNode(VCol, {
                                          cols: "12",
                                          md: "6"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VTextField, {
                                              id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                              modelValue: unref(newPassword),
                                              "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                                              type: unref(isNewPasswordVisible) ? "text" : "password",
                                              "append-inner-icon": unref(isNewPasswordVisible) ? "bx-hide" : "bx-show",
                                              label: "New Password",
                                              autocomplete: "on",
                                              placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                              "onClick:appendInner": ($event) => isNewPasswordVisible.value = !unref(isNewPasswordVisible)
                                            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
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
                                              modelValue: unref(confirmPassword),
                                              "onUpdate:modelValue": ($event) => isRef(confirmPassword) ? confirmPassword.value = $event : null,
                                              type: unref(isConfirmPasswordVisible) ? "text" : "password",
                                              "append-inner-icon": unref(isConfirmPasswordVisible) ? "bx-hide" : "bx-show",
                                              label: "Confirm New Password",
                                              placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                              "onClick:appendInner": ($event) => isConfirmPasswordVisible.value = !unref(isConfirmPasswordVisible)
                                            }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-base font-weight-medium mt-2" }, " Password Requirements: "),
                                    createVNode("ul", { class: "d-flex flex-column gap-y-3" }, [
                                      (openBlock(), createBlock(Fragment, null, renderList(passwordRequirements, (item) => {
                                        return createVNode("li", {
                                          key: item,
                                          class: "d-flex"
                                        }, [
                                          createVNode("div", null, [
                                            createVNode(VIcon, {
                                              size: "7",
                                              icon: "bxs-circle",
                                              class: "me-3"
                                            })
                                          ]),
                                          createVNode("span", { class: "font-weight-medium" }, toDisplayString(item), 1)
                                        ]);
                                      }), 64))
                                    ])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, { class: "d-flex flex-wrap gap-4" }, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Save changes")
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VForm, null, {
                            default: withCtx(() => [
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createVNode(VRow, null, {
                                    default: withCtx(() => [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                            modelValue: unref(currentPassword),
                                            "onUpdate:modelValue": ($event) => isRef(currentPassword) ? currentPassword.value = $event : null,
                                            type: unref(isCurrentPasswordVisible) ? "text" : "password",
                                            "append-inner-icon": unref(isCurrentPasswordVisible) ? "bx-hide" : "bx-show",
                                            label: "Current Password",
                                            placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                            "onClick:appendInner": ($event) => isCurrentPasswordVisible.value = !unref(isCurrentPasswordVisible)
                                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VRow, null, {
                                    default: withCtx(() => [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                            modelValue: unref(newPassword),
                                            "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                                            type: unref(isNewPasswordVisible) ? "text" : "password",
                                            "append-inner-icon": unref(isNewPasswordVisible) ? "bx-hide" : "bx-show",
                                            label: "New Password",
                                            autocomplete: "on",
                                            placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                            "onClick:appendInner": ($event) => isNewPasswordVisible.value = !unref(isNewPasswordVisible)
                                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
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
                                            modelValue: unref(confirmPassword),
                                            "onUpdate:modelValue": ($event) => isRef(confirmPassword) ? confirmPassword.value = $event : null,
                                            type: unref(isConfirmPasswordVisible) ? "text" : "password",
                                            "append-inner-icon": unref(isConfirmPasswordVisible) ? "bx-hide" : "bx-show",
                                            label: "Confirm New Password",
                                            placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                            "onClick:appendInner": ($event) => isConfirmPasswordVisible.value = !unref(isConfirmPasswordVisible)
                                          }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "text-base font-weight-medium mt-2" }, " Password Requirements: "),
                                  createVNode("ul", { class: "d-flex flex-column gap-y-3" }, [
                                    (openBlock(), createBlock(Fragment, null, renderList(passwordRequirements, (item) => {
                                      return createVNode("li", {
                                        key: item,
                                        class: "d-flex"
                                      }, [
                                        createVNode("div", null, [
                                          createVNode(VIcon, {
                                            size: "7",
                                            icon: "bxs-circle",
                                            class: "me-3"
                                          })
                                        ]),
                                        createVNode("span", { class: "font-weight-medium" }, toDisplayString(item), 1)
                                      ]);
                                    }), 64))
                                  ])
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, { class: "d-flex flex-wrap gap-4" }, {
                                default: withCtx(() => [
                                  createVNode(VBtn, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Save changes")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, { title: "Change Password" }, {
                      default: withCtx(() => [
                        createVNode(VForm, null, {
                          default: withCtx(() => [
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                          modelValue: unref(currentPassword),
                                          "onUpdate:modelValue": ($event) => isRef(currentPassword) ? currentPassword.value = $event : null,
                                          type: unref(isCurrentPasswordVisible) ? "text" : "password",
                                          "append-inner-icon": unref(isCurrentPasswordVisible) ? "bx-hide" : "bx-show",
                                          label: "Current Password",
                                          placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                          "onClick:appendInner": ($event) => isCurrentPasswordVisible.value = !unref(isCurrentPasswordVisible)
                                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                          modelValue: unref(newPassword),
                                          "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                                          type: unref(isNewPasswordVisible) ? "text" : "password",
                                          "append-inner-icon": unref(isNewPasswordVisible) ? "bx-hide" : "bx-show",
                                          label: "New Password",
                                          autocomplete: "on",
                                          placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                          "onClick:appendInner": ($event) => isNewPasswordVisible.value = !unref(isNewPasswordVisible)
                                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
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
                                          modelValue: unref(confirmPassword),
                                          "onUpdate:modelValue": ($event) => isRef(confirmPassword) ? confirmPassword.value = $event : null,
                                          type: unref(isConfirmPasswordVisible) ? "text" : "password",
                                          "append-inner-icon": unref(isConfirmPasswordVisible) ? "bx-hide" : "bx-show",
                                          label: "Confirm New Password",
                                          placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                          "onClick:appendInner": ($event) => isConfirmPasswordVisible.value = !unref(isConfirmPasswordVisible)
                                        }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createVNode("p", { class: "text-base font-weight-medium mt-2" }, " Password Requirements: "),
                                createVNode("ul", { class: "d-flex flex-column gap-y-3" }, [
                                  (openBlock(), createBlock(Fragment, null, renderList(passwordRequirements, (item) => {
                                    return createVNode("li", {
                                      key: item,
                                      class: "d-flex"
                                    }, [
                                      createVNode("div", null, [
                                        createVNode(VIcon, {
                                          size: "7",
                                          icon: "bxs-circle",
                                          class: "me-3"
                                        })
                                      ]),
                                      createVNode("span", { class: "font-weight-medium" }, toDisplayString(item), 1)
                                    ]);
                                  }), 64))
                                ])
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, { class: "d-flex flex-wrap gap-4" }, {
                              default: withCtx(() => [
                                createVNode(VBtn, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Save changes")
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
                  _push3(ssrRenderComponent(VCard, { title: "Two-steps verification" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<p class="font-weight-semibold"${_scopeId4}> Two factor authentication is not enabled yet. </p><p${_scopeId4}> Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in. <a href="javascript:void(0)" class="text-decoration-none"${_scopeId4}>Learn more.</a></p>`);
                              _push5(ssrRenderComponent(VBtn, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Enable 2FA `);
                                  } else {
                                    return [
                                      createTextVNode(" Enable 2FA ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("p", { class: "font-weight-semibold" }, " Two factor authentication is not enabled yet. "),
                                createVNode("p", null, [
                                  createTextVNode(" Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in. "),
                                  createVNode("a", {
                                    href: "javascript:void(0)",
                                    class: "text-decoration-none"
                                  }, "Learn more.")
                                ]),
                                createVNode(VBtn, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Enable 2FA ")
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
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode("p", { class: "font-weight-semibold" }, " Two factor authentication is not enabled yet. "),
                              createVNode("p", null, [
                                createTextVNode(" Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in. "),
                                createVNode("a", {
                                  href: "javascript:void(0)",
                                  class: "text-decoration-none"
                                }, "Learn more.")
                              ]),
                              createVNode(VBtn, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Enable 2FA ")
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
                    createVNode(VCard, { title: "Two-steps verification" }, {
                      default: withCtx(() => [
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode("p", { class: "font-weight-semibold" }, " Two factor authentication is not enabled yet. "),
                            createVNode("p", null, [
                              createTextVNode(" Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in. "),
                              createVNode("a", {
                                href: "javascript:void(0)",
                                class: "text-decoration-none"
                              }, "Learn more.")
                            ]),
                            createVNode(VBtn, null, {
                              default: withCtx(() => [
                                createTextVNode(" Enable 2FA ")
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
            _push2(ssrRenderComponent(VCol, { cols: "12" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, { title: "Create an API key" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                md: "5",
                                "order-md": "0",
                                order: "1"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCardText, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VForm, { onSubmit: () => {
                                          } }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VRow, null, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(VCol, { cols: "12" }, {
                                                        default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                          if (_push10) {
                                                            _push10(ssrRenderComponent(VSelect, {
                                                              id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                              label: "Choose the API key type you want to create",
                                                              placeholder: "Select API key type",
                                                              items: ["Full Control", "Modify", "Read & Execute", "List Folder Contents", "Read Only", "Read & Write"]
                                                            }, null, _parent10, _scopeId9));
                                                          } else {
                                                            return [
                                                              createVNode(VSelect, {
                                                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                                label: "Choose the API key type you want to create",
                                                                placeholder: "Select API key type",
                                                                items: ["Full Control", "Modify", "Read & Execute", "List Folder Contents", "Read Only", "Read & Write"]
                                                              }, null, 8, ["id"])
                                                            ];
                                                          }
                                                        }),
                                                        _: 1
                                                      }, _parent9, _scopeId8));
                                                      _push9(ssrRenderComponent(VCol, { cols: "12" }, {
                                                        default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                          if (_push10) {
                                                            _push10(ssrRenderComponent(VTextField, {
                                                              id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                              label: "Name the API key",
                                                              placeholder: "Name the API key"
                                                            }, null, _parent10, _scopeId9));
                                                          } else {
                                                            return [
                                                              createVNode(VTextField, {
                                                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                                label: "Name the API key",
                                                                placeholder: "Name the API key"
                                                              }, null, 8, ["id"])
                                                            ];
                                                          }
                                                        }),
                                                        _: 1
                                                      }, _parent9, _scopeId8));
                                                      _push9(ssrRenderComponent(VCol, { cols: "12" }, {
                                                        default: withCtx((_9, _push10, _parent10, _scopeId9) => {
                                                          if (_push10) {
                                                            _push10(ssrRenderComponent(VBtn, {
                                                              type: "submit",
                                                              block: ""
                                                            }, {
                                                              default: withCtx((_10, _push11, _parent11, _scopeId10) => {
                                                                if (_push11) {
                                                                  _push11(` Create Key `);
                                                                } else {
                                                                  return [
                                                                    createTextVNode(" Create Key ")
                                                                  ];
                                                                }
                                                              }),
                                                              _: 1
                                                            }, _parent10, _scopeId9));
                                                          } else {
                                                            return [
                                                              createVNode(VBtn, {
                                                                type: "submit",
                                                                block: ""
                                                              }, {
                                                                default: withCtx(() => [
                                                                  createTextVNode(" Create Key ")
                                                                ]),
                                                                _: 1
                                                              })
                                                            ];
                                                          }
                                                        }),
                                                        _: 1
                                                      }, _parent9, _scopeId8));
                                                    } else {
                                                      return [
                                                        createVNode(VCol, { cols: "12" }, {
                                                          default: withCtx(() => [
                                                            createVNode(VSelect, {
                                                              id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                              label: "Choose the API key type you want to create",
                                                              placeholder: "Select API key type",
                                                              items: ["Full Control", "Modify", "Read & Execute", "List Folder Contents", "Read Only", "Read & Write"]
                                                            }, null, 8, ["id"])
                                                          ]),
                                                          _: 1
                                                        }),
                                                        createVNode(VCol, { cols: "12" }, {
                                                          default: withCtx(() => [
                                                            createVNode(VTextField, {
                                                              id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                              label: "Name the API key",
                                                              placeholder: "Name the API key"
                                                            }, null, 8, ["id"])
                                                          ]),
                                                          _: 1
                                                        }),
                                                        createVNode(VCol, { cols: "12" }, {
                                                          default: withCtx(() => [
                                                            createVNode(VBtn, {
                                                              type: "submit",
                                                              block: ""
                                                            }, {
                                                              default: withCtx(() => [
                                                                createTextVNode(" Create Key ")
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
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VRow, null, {
                                                    default: withCtx(() => [
                                                      createVNode(VCol, { cols: "12" }, {
                                                        default: withCtx(() => [
                                                          createVNode(VSelect, {
                                                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                            label: "Choose the API key type you want to create",
                                                            placeholder: "Select API key type",
                                                            items: ["Full Control", "Modify", "Read & Execute", "List Folder Contents", "Read Only", "Read & Write"]
                                                          }, null, 8, ["id"])
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode(VCol, { cols: "12" }, {
                                                        default: withCtx(() => [
                                                          createVNode(VTextField, {
                                                            id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                            label: "Name the API key",
                                                            placeholder: "Name the API key"
                                                          }, null, 8, ["id"])
                                                        ]),
                                                        _: 1
                                                      }),
                                                      createVNode(VCol, { cols: "12" }, {
                                                        default: withCtx(() => [
                                                          createVNode(VBtn, {
                                                            type: "submit",
                                                            block: ""
                                                          }, {
                                                            default: withCtx(() => [
                                                              createTextVNode(" Create Key ")
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
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VForm, {
                                              onSubmit: withModifiers(() => {
                                              }, ["prevent"])
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VRow, null, {
                                                  default: withCtx(() => [
                                                    createVNode(VCol, { cols: "12" }, {
                                                      default: withCtx(() => [
                                                        createVNode(VSelect, {
                                                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                          label: "Choose the API key type you want to create",
                                                          placeholder: "Select API key type",
                                                          items: ["Full Control", "Modify", "Read & Execute", "List Folder Contents", "Read Only", "Read & Write"]
                                                        }, null, 8, ["id"])
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(VCol, { cols: "12" }, {
                                                      default: withCtx(() => [
                                                        createVNode(VTextField, {
                                                          id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                          label: "Name the API key",
                                                          placeholder: "Name the API key"
                                                        }, null, 8, ["id"])
                                                      ]),
                                                      _: 1
                                                    }),
                                                    createVNode(VCol, { cols: "12" }, {
                                                      default: withCtx(() => [
                                                        createVNode(VBtn, {
                                                          type: "submit",
                                                          block: ""
                                                        }, {
                                                          default: withCtx(() => [
                                                            createTextVNode(" Create Key ")
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
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => [
                                          createVNode(VForm, {
                                            onSubmit: withModifiers(() => {
                                            }, ["prevent"])
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VRow, null, {
                                                default: withCtx(() => [
                                                  createVNode(VCol, { cols: "12" }, {
                                                    default: withCtx(() => [
                                                      createVNode(VSelect, {
                                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                        label: "Choose the API key type you want to create",
                                                        placeholder: "Select API key type",
                                                        items: ["Full Control", "Modify", "Read & Execute", "List Folder Contents", "Read Only", "Read & Write"]
                                                      }, null, 8, ["id"])
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(VCol, { cols: "12" }, {
                                                    default: withCtx(() => [
                                                      createVNode(VTextField, {
                                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                        label: "Name the API key",
                                                        placeholder: "Name the API key"
                                                      }, null, 8, ["id"])
                                                    ]),
                                                    _: 1
                                                  }),
                                                  createVNode(VCol, { cols: "12" }, {
                                                    default: withCtx(() => [
                                                      createVNode(VBtn, {
                                                        type: "submit",
                                                        block: ""
                                                      }, {
                                                        default: withCtx(() => [
                                                          createTextVNode(" Create Key ")
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
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "5",
                                  "order-md": "0",
                                  order: "1"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => [
                                        createVNode(VForm, {
                                          onSubmit: withModifiers(() => {
                                          }, ["prevent"])
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VRow, null, {
                                              default: withCtx(() => [
                                                createVNode(VCol, { cols: "12" }, {
                                                  default: withCtx(() => [
                                                    createVNode(VSelect, {
                                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                      label: "Choose the API key type you want to create",
                                                      placeholder: "Select API key type",
                                                      items: ["Full Control", "Modify", "Read & Execute", "List Folder Contents", "Read Only", "Read & Write"]
                                                    }, null, 8, ["id"])
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(VCol, { cols: "12" }, {
                                                  default: withCtx(() => [
                                                    createVNode(VTextField, {
                                                      id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                      label: "Name the API key",
                                                      placeholder: "Name the API key"
                                                    }, null, 8, ["id"])
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode(VCol, { cols: "12" }, {
                                                  default: withCtx(() => [
                                                    createVNode(VBtn, {
                                                      type: "submit",
                                                      block: ""
                                                    }, {
                                                      default: withCtx(() => [
                                                        createTextVNode(" Create Key ")
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
                              createVNode(VCol, {
                                cols: "12",
                                md: "5",
                                "order-md": "0",
                                order: "1"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createVNode(VForm, {
                                        onSubmit: withModifiers(() => {
                                        }, ["prevent"])
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VRow, null, {
                                            default: withCtx(() => [
                                              createVNode(VCol, { cols: "12" }, {
                                                default: withCtx(() => [
                                                  createVNode(VSelect, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    label: "Choose the API key type you want to create",
                                                    placeholder: "Select API key type",
                                                    items: ["Full Control", "Modify", "Read & Execute", "List Folder Contents", "Read Only", "Read & Write"]
                                                  }, null, 8, ["id"])
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(VCol, { cols: "12" }, {
                                                default: withCtx(() => [
                                                  createVNode(VTextField, {
                                                    id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                    label: "Name the API key",
                                                    placeholder: "Name the API key"
                                                  }, null, 8, ["id"])
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(VCol, { cols: "12" }, {
                                                default: withCtx(() => [
                                                  createVNode(VBtn, {
                                                    type: "submit",
                                                    block: ""
                                                  }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" Create Key ")
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
                    createVNode(VCard, { title: "Create an API key" }, {
                      default: withCtx(() => [
                        createVNode(VRow, null, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "5",
                              "order-md": "0",
                              order: "1"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createVNode(VForm, {
                                      onSubmit: withModifiers(() => {
                                      }, ["prevent"])
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VRow, null, {
                                          default: withCtx(() => [
                                            createVNode(VCol, { cols: "12" }, {
                                              default: withCtx(() => [
                                                createVNode(VSelect, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  label: "Choose the API key type you want to create",
                                                  placeholder: "Select API key type",
                                                  items: ["Full Control", "Modify", "Read & Execute", "List Folder Contents", "Read Only", "Read & Write"]
                                                }, null, 8, ["id"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCol, { cols: "12" }, {
                                              default: withCtx(() => [
                                                createVNode(VTextField, {
                                                  id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                  label: "Name the API key",
                                                  placeholder: "Name the API key"
                                                }, null, 8, ["id"])
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VCol, { cols: "12" }, {
                                              default: withCtx(() => [
                                                createVNode(VBtn, {
                                                  type: "submit",
                                                  block: ""
                                                }, {
                                                  default: withCtx(() => [
                                                    createTextVNode(" Create Key ")
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
            _push2(ssrRenderComponent(VCol, { cols: "12" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, { title: "API Key List & Access" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` An API key is a simple encrypted string that identifies an application without any principal. They are useful for accessing public data anonymously, and are used to associate API requests with your project for quota and billing. `);
                            } else {
                              return [
                                createTextVNode(" An API key is a simple encrypted string that identifies an application without any principal. They are useful for accessing public data anonymously, and are used to associate API requests with your project for quota and billing. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, { class: "d-flex flex-column gap-y-4" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(serverKeys, (serverKey) => {
                                _push5(`<div class="bg-var-theme-background pa-4"${_scopeId4}><div class="d-flex align-center flex-wrap mb-3"${_scopeId4}><h6 class="text-h6 mb-0 me-3"${_scopeId4}>${ssrInterpolate(serverKey.name)}</h6>`);
                                _push5(ssrRenderComponent(VChip, {
                                  label: "",
                                  color: "primary",
                                  size: "small"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(serverKey.permission)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(serverKey.permission), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(`</div><p class="text-base font-weight-medium"${_scopeId4}><span class="me-3"${_scopeId4}>${ssrInterpolate(serverKey.key)}</span>`);
                                _push5(ssrRenderComponent(VIcon, {
                                  size: 18,
                                  icon: "bx-copy",
                                  class: "cursor-pointer"
                                }, null, _parent5, _scopeId4));
                                _push5(`</p><span${_scopeId4}>Created on ${ssrInterpolate(serverKey.createdOn)}</span></div>`);
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(serverKeys, (serverKey) => {
                                  return createVNode("div", {
                                    key: serverKey.key,
                                    class: "bg-var-theme-background pa-4"
                                  }, [
                                    createVNode("div", { class: "d-flex align-center flex-wrap mb-3" }, [
                                      createVNode("h6", { class: "text-h6 mb-0 me-3" }, toDisplayString(serverKey.name), 1),
                                      createVNode(VChip, {
                                        label: "",
                                        color: "primary",
                                        size: "small"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(serverKey.permission), 1)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    createVNode("p", { class: "text-base font-weight-medium" }, [
                                      createVNode("span", { class: "me-3" }, toDisplayString(serverKey.key), 1),
                                      createVNode(VIcon, {
                                        size: 18,
                                        icon: "bx-copy",
                                        class: "cursor-pointer"
                                      })
                                    ]),
                                    createVNode("span", null, "Created on " + toDisplayString(serverKey.createdOn), 1)
                                  ]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createTextVNode(" An API key is a simple encrypted string that identifies an application without any principal. They are useful for accessing public data anonymously, and are used to associate API requests with your project for quota and billing. ")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, { class: "d-flex flex-column gap-y-4" }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(serverKeys, (serverKey) => {
                                return createVNode("div", {
                                  key: serverKey.key,
                                  class: "bg-var-theme-background pa-4"
                                }, [
                                  createVNode("div", { class: "d-flex align-center flex-wrap mb-3" }, [
                                    createVNode("h6", { class: "text-h6 mb-0 me-3" }, toDisplayString(serverKey.name), 1),
                                    createVNode(VChip, {
                                      label: "",
                                      color: "primary",
                                      size: "small"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(serverKey.permission), 1)
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  createVNode("p", { class: "text-base font-weight-medium" }, [
                                    createVNode("span", { class: "me-3" }, toDisplayString(serverKey.key), 1),
                                    createVNode(VIcon, {
                                      size: 18,
                                      icon: "bx-copy",
                                      class: "cursor-pointer"
                                    })
                                  ]),
                                  createVNode("span", null, "Created on " + toDisplayString(serverKey.createdOn), 1)
                                ]);
                              }), 64))
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
                    createVNode(VCard, { title: "API Key List & Access" }, {
                      default: withCtx(() => [
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createTextVNode(" An API key is a simple encrypted string that identifies an application without any principal. They are useful for accessing public data anonymously, and are used to associate API requests with your project for quota and billing. ")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, { class: "d-flex flex-column gap-y-4" }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(serverKeys, (serverKey) => {
                              return createVNode("div", {
                                key: serverKey.key,
                                class: "bg-var-theme-background pa-4"
                              }, [
                                createVNode("div", { class: "d-flex align-center flex-wrap mb-3" }, [
                                  createVNode("h6", { class: "text-h6 mb-0 me-3" }, toDisplayString(serverKey.name), 1),
                                  createVNode(VChip, {
                                    label: "",
                                    color: "primary",
                                    size: "small"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(serverKey.permission), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                createVNode("p", { class: "text-base font-weight-medium" }, [
                                  createVNode("span", { class: "me-3" }, toDisplayString(serverKey.key), 1),
                                  createVNode(VIcon, {
                                    size: 18,
                                    icon: "bx-copy",
                                    class: "cursor-pointer"
                                  })
                                ]),
                                createVNode("span", null, "Created on " + toDisplayString(serverKey.createdOn), 1)
                              ]);
                            }), 64))
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
                  _push3(ssrRenderComponent(VCard, { title: "Recent Devices" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VDataTable, {
                          headers: recentDevicesHeaders,
                          items: recentDevices,
                          class: "text-no-wrap rounded-0 text-sm"
                        }, {
                          "item.browser": withCtx(({ item }, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="d-flex"${_scopeId4}>`);
                              _push5(ssrRenderComponent(VIcon, {
                                start: "",
                                icon: item.deviceIcon.icon,
                                color: item.deviceIcon.color
                              }, null, _parent5, _scopeId4));
                              _push5(`<span class="text-high-emphasis text-base"${_scopeId4}>${ssrInterpolate(item.browser)}</span></div>`);
                            } else {
                              return [
                                createVNode("div", { class: "d-flex" }, [
                                  createVNode(VIcon, {
                                    start: "",
                                    icon: item.deviceIcon.icon,
                                    color: item.deviceIcon.color
                                  }, null, 8, ["icon", "color"]),
                                  createVNode("span", { class: "text-high-emphasis text-base" }, toDisplayString(item.browser), 1)
                                ])
                              ];
                            }
                          }),
                          bottom: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) ;
                            else {
                              return [];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VDataTable, {
                            headers: recentDevicesHeaders,
                            items: recentDevices,
                            class: "text-no-wrap rounded-0 text-sm"
                          }, {
                            "item.browser": withCtx(({ item }) => [
                              createVNode("div", { class: "d-flex" }, [
                                createVNode(VIcon, {
                                  start: "",
                                  icon: item.deviceIcon.icon,
                                  color: item.deviceIcon.color
                                }, null, 8, ["icon", "color"]),
                                createVNode("span", { class: "text-high-emphasis text-base" }, toDisplayString(item.browser), 1)
                              ])
                            ]),
                            bottom: withCtx(() => []),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, { title: "Recent Devices" }, {
                      default: withCtx(() => [
                        createVNode(VDataTable, {
                          headers: recentDevicesHeaders,
                          items: recentDevices,
                          class: "text-no-wrap rounded-0 text-sm"
                        }, {
                          "item.browser": withCtx(({ item }) => [
                            createVNode("div", { class: "d-flex" }, [
                              createVNode(VIcon, {
                                start: "",
                                icon: item.deviceIcon.icon,
                                color: item.deviceIcon.color
                              }, null, 8, ["icon", "color"]),
                              createVNode("span", { class: "text-high-emphasis text-base" }, toDisplayString(item.browser), 1)
                            ])
                          ]),
                          bottom: withCtx(() => []),
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
              createVNode(VCol, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(VCard, { title: "Change Password" }, {
                    default: withCtx(() => [
                      createVNode(VForm, null, {
                        default: withCtx(() => [
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                        modelValue: unref(currentPassword),
                                        "onUpdate:modelValue": ($event) => isRef(currentPassword) ? currentPassword.value = $event : null,
                                        type: unref(isCurrentPasswordVisible) ? "text" : "password",
                                        "append-inner-icon": unref(isCurrentPasswordVisible) ? "bx-hide" : "bx-show",
                                        label: "Current Password",
                                        placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                        "onClick:appendInner": ($event) => isCurrentPasswordVisible.value = !unref(isCurrentPasswordVisible)
                                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                        modelValue: unref(newPassword),
                                        "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
                                        type: unref(isNewPasswordVisible) ? "text" : "password",
                                        "append-inner-icon": unref(isNewPasswordVisible) ? "bx-hide" : "bx-show",
                                        label: "New Password",
                                        autocomplete: "on",
                                        placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                        "onClick:appendInner": ($event) => isNewPasswordVisible.value = !unref(isNewPasswordVisible)
                                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
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
                                        modelValue: unref(confirmPassword),
                                        "onUpdate:modelValue": ($event) => isRef(confirmPassword) ? confirmPassword.value = $event : null,
                                        type: unref(isConfirmPasswordVisible) ? "text" : "password",
                                        "append-inner-icon": unref(isConfirmPasswordVisible) ? "bx-hide" : "bx-show",
                                        label: "Confirm New Password",
                                        placeholder: "\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7\xB7",
                                        "onClick:appendInner": ($event) => isConfirmPasswordVisible.value = !unref(isConfirmPasswordVisible)
                                      }, null, 8, ["id", "modelValue", "onUpdate:modelValue", "type", "append-inner-icon", "onClick:appendInner"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode("p", { class: "text-base font-weight-medium mt-2" }, " Password Requirements: "),
                              createVNode("ul", { class: "d-flex flex-column gap-y-3" }, [
                                (openBlock(), createBlock(Fragment, null, renderList(passwordRequirements, (item) => {
                                  return createVNode("li", {
                                    key: item,
                                    class: "d-flex"
                                  }, [
                                    createVNode("div", null, [
                                      createVNode(VIcon, {
                                        size: "7",
                                        icon: "bxs-circle",
                                        class: "me-3"
                                      })
                                    ]),
                                    createVNode("span", { class: "font-weight-medium" }, toDisplayString(item), 1)
                                  ]);
                                }), 64))
                              ])
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, { class: "d-flex flex-wrap gap-4" }, {
                            default: withCtx(() => [
                              createVNode(VBtn, null, {
                                default: withCtx(() => [
                                  createTextVNode("Save changes")
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
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(VCard, { title: "Two-steps verification" }, {
                    default: withCtx(() => [
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode("p", { class: "font-weight-semibold" }, " Two factor authentication is not enabled yet. "),
                          createVNode("p", null, [
                            createTextVNode(" Two-factor authentication adds an additional layer of security to your account by requiring more than just a password to log in. "),
                            createVNode("a", {
                              href: "javascript:void(0)",
                              class: "text-decoration-none"
                            }, "Learn more.")
                          ]),
                          createVNode(VBtn, null, {
                            default: withCtx(() => [
                              createTextVNode(" Enable 2FA ")
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
              }),
              createVNode(VCol, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(VCard, { title: "Create an API key" }, {
                    default: withCtx(() => [
                      createVNode(VRow, null, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "5",
                            "order-md": "0",
                            order: "1"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createVNode(VForm, {
                                    onSubmit: withModifiers(() => {
                                    }, ["prevent"])
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VRow, null, {
                                        default: withCtx(() => [
                                          createVNode(VCol, { cols: "12" }, {
                                            default: withCtx(() => [
                                              createVNode(VSelect, {
                                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                label: "Choose the API key type you want to create",
                                                placeholder: "Select API key type",
                                                items: ["Full Control", "Modify", "Read & Execute", "List Folder Contents", "Read Only", "Read & Write"]
                                              }, null, 8, ["id"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, { cols: "12" }, {
                                            default: withCtx(() => [
                                              createVNode(VTextField, {
                                                id: ("useId" in _ctx ? _ctx.useId : unref(useId))(),
                                                label: "Name the API key",
                                                placeholder: "Name the API key"
                                              }, null, 8, ["id"])
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VCol, { cols: "12" }, {
                                            default: withCtx(() => [
                                              createVNode(VBtn, {
                                                type: "submit",
                                                block: ""
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(" Create Key ")
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
              }),
              createVNode(VCol, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(VCard, { title: "API Key List & Access" }, {
                    default: withCtx(() => [
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createTextVNode(" An API key is a simple encrypted string that identifies an application without any principal. They are useful for accessing public data anonymously, and are used to associate API requests with your project for quota and billing. ")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, { class: "d-flex flex-column gap-y-4" }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(serverKeys, (serverKey) => {
                            return createVNode("div", {
                              key: serverKey.key,
                              class: "bg-var-theme-background pa-4"
                            }, [
                              createVNode("div", { class: "d-flex align-center flex-wrap mb-3" }, [
                                createVNode("h6", { class: "text-h6 mb-0 me-3" }, toDisplayString(serverKey.name), 1),
                                createVNode(VChip, {
                                  label: "",
                                  color: "primary",
                                  size: "small"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(serverKey.permission), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              createVNode("p", { class: "text-base font-weight-medium" }, [
                                createVNode("span", { class: "me-3" }, toDisplayString(serverKey.key), 1),
                                createVNode(VIcon, {
                                  size: 18,
                                  icon: "bx-copy",
                                  class: "cursor-pointer"
                                })
                              ]),
                              createVNode("span", null, "Created on " + toDisplayString(serverKey.createdOn), 1)
                            ]);
                          }), 64))
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
                  createVNode(VCard, { title: "Recent Devices" }, {
                    default: withCtx(() => [
                      createVNode(VDataTable, {
                        headers: recentDevicesHeaders,
                        items: recentDevices,
                        class: "text-no-wrap rounded-0 text-sm"
                      }, {
                        "item.browser": withCtx(({ item }) => [
                          createVNode("div", { class: "d-flex" }, [
                            createVNode(VIcon, {
                              start: "",
                              icon: item.deviceIcon.icon,
                              color: item.deviceIcon.color
                            }, null, 8, ["icon", "color"]),
                            createVNode("span", { class: "text-high-emphasis text-base" }, toDisplayString(item.browser), 1)
                          ])
                        ]),
                        bottom: withCtx(() => []),
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/pages/account-settings/AccountSettingsSecurity.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "account-settings",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute$1();
    const activeTab = ref(route.params.tab);
    const tabs = [
      { title: "Account", icon: "bx-user", tab: "account" },
      { title: "Security", icon: "bx-lock-open", tab: "security" },
      { title: "Notifications", icon: "bx-bell", tab: "notification" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}>`);
      _push(ssrRenderComponent(VTabs, {
        modelValue: unref(activeTab),
        "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
        "show-arrows": "",
        class: "v-tabs-pill"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(tabs, (item) => {
              _push2(ssrRenderComponent(VTab, {
                key: item.icon,
                value: item.tab
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VIcon, {
                      size: "20",
                      start: "",
                      icon: item.icon
                    }, null, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(item.title)}`);
                  } else {
                    return [
                      createVNode(VIcon, {
                        size: "20",
                        start: "",
                        icon: item.icon
                      }, null, 8, ["icon"]),
                      createTextVNode(" " + toDisplayString(item.title), 1)
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(tabs, (item) => {
                return createVNode(VTab, {
                  key: item.icon,
                  value: item.tab
                }, {
                  default: withCtx(() => [
                    createVNode(VIcon, {
                      size: "20",
                      start: "",
                      icon: item.icon
                    }, null, 8, ["icon"]),
                    createTextVNode(" " + toDisplayString(item.title), 1)
                  ]),
                  _: 2
                }, 1032, ["value"]);
              }), 64))
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VWindow, {
        modelValue: unref(activeTab),
        "onUpdate:modelValue": ($event) => isRef(activeTab) ? activeTab.value = $event : null,
        class: "mt-5 disable-tab-transition"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VWindowItem, { value: "account" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$3, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$3)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VWindowItem, { value: "security" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$1, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VWindowItem, { value: "notification" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(AccountSettingsNotification, null, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(AccountSettingsNotification)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VWindowItem, { value: "account" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$3)
                ]),
                _: 1
              }),
              createVNode(VWindowItem, { value: "security" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1)
                ]),
                _: 1
              }),
              createVNode(VWindowItem, { value: "notification" }, {
                default: withCtx(() => [
                  createVNode(AccountSettingsNotification)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/account-settings.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
