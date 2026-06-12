import { b as buildAssetsURL } from '../nitro/nitro.mjs';
import { defineComponent, ref, withCtx, unref, isRef, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, createVNode, resolveComponent, withDirectives, vShow, createCommentVNode, provide, createElementBlock, computed, shallowRef, mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { V as VTabs, a as VTab, b as VWindow, c as VWindowItem, d as avatar1 } from './VTabs-D7p7BIQL.mjs';
import { V as VExpandTransition } from './index-ewhk7FTz.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VCard, e as VCardItem, c as VCardTitle, a as VCardText, d as VCardSubtitle, b as VCardActions } from './VCard-DLk5PTHl.mjs';
import { _ as _export_sfc, c as VDivider, a as VBtn, b as VIcon, V as VAvatar, an as VImg, e as genericComponent, p as propsFactory, f as useLocale, H as provideTheme, u as useProxiedModel, d as clamp, aW as createRange, ar as getUid, h as useRender, M as makeThemeProps, N as makeTagProps, aF as makeSizeProps, X as makeDensityProps, O as makeComponentProps, I as IconValue } from './server.mjs';
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
import 'pinia';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const makeVRatingProps = propsFactory({
  name: String,
  itemAriaLabel: {
    type: String,
    default: "$vuetify.rating.ariaLabel.item"
  },
  activeColor: String,
  color: String,
  clearable: Boolean,
  disabled: Boolean,
  emptyIcon: {
    type: IconValue,
    default: "$ratingEmpty"
  },
  fullIcon: {
    type: IconValue,
    default: "$ratingFull"
  },
  halfIncrements: Boolean,
  hover: Boolean,
  length: {
    type: [Number, String],
    default: 5
  },
  readonly: Boolean,
  modelValue: {
    type: [Number, String],
    default: 0
  },
  itemLabels: Array,
  itemLabelPosition: {
    type: String,
    default: "top",
    validator: (v) => ["top", "bottom"].includes(v)
  },
  ripple: Boolean,
  ...makeComponentProps(),
  ...makeDensityProps(),
  ...makeSizeProps(),
  ...makeTagProps(),
  ...makeThemeProps()
}, "VRating");
const VRating = genericComponent()({
  name: "VRating",
  props: makeVRatingProps(),
  emits: {
    "update:modelValue": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const {
      themeClasses
    } = provideTheme(props);
    const rating = useProxiedModel(props, "modelValue");
    const normalizedValue = computed(() => clamp(parseFloat(rating.value), 0, +props.length));
    const range = computed(() => createRange(Number(props.length), 1));
    const increments = computed(() => range.value.flatMap((v) => props.halfIncrements ? [v - 0.5, v] : [v]));
    const hoverIndex = shallowRef(-1);
    const itemState = computed(() => increments.value.map((value) => {
      var _a;
      const isHovering = props.hover && hoverIndex.value > -1;
      const isFilled = normalizedValue.value >= value;
      const isHovered = hoverIndex.value >= value;
      const isFullIcon = isHovering ? isHovered : isFilled;
      const icon = isFullIcon ? props.fullIcon : props.emptyIcon;
      const activeColor = (_a = props.activeColor) != null ? _a : props.color;
      const color = isFilled || isHovered ? activeColor : props.color;
      return {
        isFilled,
        isHovered,
        icon,
        color
      };
    }));
    const eventState = computed(() => [0, ...increments.value].map((value) => {
      function onMouseenter() {
        hoverIndex.value = value;
      }
      function onMouseleave() {
        hoverIndex.value = -1;
      }
      function onClick() {
        if (props.disabled || props.readonly) return;
        rating.value = normalizedValue.value === value && props.clearable ? 0 : value;
      }
      return {
        onMouseenter: props.hover ? onMouseenter : void 0,
        onMouseleave: props.hover ? onMouseleave : void 0,
        onClick
      };
    }));
    const name = computed(() => {
      var _a;
      return (_a = props.name) != null ? _a : `v-rating-${getUid()}`;
    });
    function VRatingItem(_ref2) {
      var _a, _b;
      let {
        value,
        index,
        showStar = true
      } = _ref2;
      const {
        onMouseenter,
        onMouseleave,
        onClick
      } = eventState.value[index + 1];
      const id = `${name.value}-${String(value).replace(".", "-")}`;
      const btnProps = {
        color: (_a = itemState.value[index]) == null ? void 0 : _a.color,
        density: props.density,
        disabled: props.disabled,
        icon: (_b = itemState.value[index]) == null ? void 0 : _b.icon,
        ripple: props.ripple,
        size: props.size,
        variant: "plain"
      };
      return createVNode(Fragment, null, [createVNode("label", {
        "for": id,
        "class": {
          "v-rating__item--half": props.halfIncrements && value % 1 > 0,
          "v-rating__item--full": props.halfIncrements && value % 1 === 0
        },
        "onMouseenter": onMouseenter,
        "onMouseleave": onMouseleave,
        "onClick": onClick
      }, [createVNode("span", {
        "class": "v-rating__hidden"
      }, [t(props.itemAriaLabel, value, props.length)]), !showStar ? void 0 : slots.item ? slots.item({
        ...itemState.value[index],
        props: btnProps,
        value,
        index,
        rating: normalizedValue.value
      }) : createVNode(VBtn, mergeProps({
        "aria-label": t(props.itemAriaLabel, value, props.length)
      }, btnProps), null)]), createVNode("input", {
        "class": "v-rating__hidden",
        "name": name.value,
        "id": id,
        "type": "radio",
        "value": value,
        "checked": normalizedValue.value === value,
        "tabindex": -1,
        "readonly": props.readonly,
        "disabled": props.disabled
      }, null)]);
    }
    function createLabel(labelProps) {
      if (slots["item-label"]) return slots["item-label"](labelProps);
      if (labelProps.label) return createVNode("span", null, [labelProps.label]);
      return createVNode("span", null, [createTextVNode("\xA0")]);
    }
    useRender(() => {
      var _a;
      const hasLabels = !!((_a = props.itemLabels) == null ? void 0 : _a.length) || slots["item-label"];
      return createVNode(props.tag, {
        "class": ["v-rating", {
          "v-rating--hover": props.hover,
          "v-rating--readonly": props.readonly
        }, themeClasses.value, props.class],
        "style": props.style
      }, {
        default: () => [createVNode(VRatingItem, {
          "value": 0,
          "index": -1,
          "showStar": false
        }, null), range.value.map((value, i) => {
          var _a2, _b;
          return createVNode("div", {
            "class": "v-rating__wrapper"
          }, [hasLabels && props.itemLabelPosition === "top" ? createLabel({
            value,
            index: i,
            label: (_a2 = props.itemLabels) == null ? void 0 : _a2[i]
          }) : void 0, createVNode("div", {
            "class": "v-rating__item"
          }, [props.halfIncrements ? createVNode(Fragment, null, [createVNode(VRatingItem, {
            "value": value - 0.5,
            "index": i * 2
          }, null), createVNode(VRatingItem, {
            "value": value,
            "index": i * 2 + 1
          }, null)]) : createVNode(VRatingItem, {
            "value": value,
            "index": i
          }, null)]), hasLabels && props.itemLabelPosition === "bottom" ? createLabel({
            value,
            index: i,
            label: (_b = props.itemLabels) == null ? void 0 : _b[i]
          }) : void 0]);
        })]
      });
    });
    return {};
  }
});
const clientOnlySymbol = Symbol.for("nuxt:client-only");
const __nuxt_component_0 = defineComponent({
  name: "ClientOnly",
  inheritAttrs: false,
  props: ["fallback", "placeholder", "placeholderTag", "fallbackTag"],
  setup(_, { slots, attrs }) {
    const mounted = ref(false);
    provide(clientOnlySymbol, true);
    return (props) => {
      var _a;
      if (mounted.value) {
        return (_a = slots.default) == null ? void 0 : _a.call(slots);
      }
      const slot = slots.fallback || slots.placeholder;
      if (slot) {
        return slot();
      }
      const fallbackStr = props.fallback || props.placeholder || "";
      const fallbackTag = props.fallbackTag || props.placeholderTag || "span";
      return createElementBlock(fallbackTag, attrs, fallbackStr);
    };
  }
});
const avatar2 = "" + buildAssetsURL("avatar-2.D-0hhBDR.png");
const avatar3 = "" + buildAssetsURL("avatar-3.BowASP-2.png");
const avatar4 = "" + buildAssetsURL("avatar-4.DTP-WtUz.png");
const eCommerce2 = "" + buildAssetsURL("2.xjy_pXoW.png");
const pages1 = "" + buildAssetsURL("1.M41J_I81.png");
const pages2 = "" + buildAssetsURL("2.-m0KoIht.png");
const pages3 = "" + buildAssetsURL("3.BZq9BJpS.png");
const pages5 = "" + buildAssetsURL("5.CFPERer_.jpg");
const pages6 = "" + buildAssetsURL("6.C2cDgitj.jpg");
const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CardBasic",
  __ssrInlineRender: true,
  setup(__props) {
    const avatars = [
      avatar1,
      avatar2,
      avatar3,
      avatar4
    ];
    const isCardDetailsVisible = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ClientOnly = __nuxt_component_0;
      _push(ssrRenderComponent(VRow, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              sm: "6",
              md: "4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VImg, {
                          src: unref(pages1),
                          cover: ""
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardItem, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCardTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Influencing The Influencer`);
                                  } else {
                                    return [
                                      createTextVNode("Influencing The Influencer")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Influencing The Influencer")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister predicts Cancun will draw as many visitors in 2006 as it did two years ago. `);
                            } else {
                              return [
                                createTextVNode(" Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister predicts Cancun will draw as many visitors in 2006 as it did two years ago. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VImg, {
                            src: unref(pages1),
                            cover: ""
                          }, null, 8, ["src"]),
                          createVNode(VCardItem, null, {
                            default: withCtx(() => [
                              createVNode(VCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Influencing The Influencer")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createTextVNode(" Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister predicts Cancun will draw as many visitors in 2006 as it did two years ago. ")
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
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode(VImg, {
                          src: unref(pages1),
                          cover: ""
                        }, null, 8, ["src"]),
                        createVNode(VCardItem, null, {
                          default: withCtx(() => [
                            createVNode(VCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Influencing The Influencer")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createTextVNode(" Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister predicts Cancun will draw as many visitors in 2006 as it did two years ago. ")
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
              sm: "6",
              md: "4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VImg, { src: unref(pages2) }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, { class: "position-relative" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VAvatar, {
                                size: "75",
                                class: "avatar-center",
                                image: unref(avatar1)
                              }, null, _parent5, _scopeId4));
                              _push5(`<div class="d-flex justify-space-between flex-wrap pt-8" data-v-dafc34ea${_scopeId4}><div class="me-2 mb-2" data-v-dafc34ea${_scopeId4}>`);
                              _push5(ssrRenderComponent(VCardTitle, { class: "pa-0" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Robert Meyer `);
                                  } else {
                                    return [
                                      createTextVNode(" Robert Meyer ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCardSubtitle, { class: "text-caption pa-0" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` London, UK `);
                                  } else {
                                    return [
                                      createTextVNode(" London, UK ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                              _push5(ssrRenderComponent(VBtn, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`send request`);
                                  } else {
                                    return [
                                      createTextVNode("send request")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div><div class="d-flex justify-space-between align-center mt-4" data-v-dafc34ea${_scopeId4}><span class="font-weight-medium" data-v-dafc34ea${_scopeId4}>18 mutual friends</span><div class="v-avatar-group" data-v-dafc34ea${_scopeId4}><!--[-->`);
                              ssrRenderList(avatars, (avatar) => {
                                _push5(ssrRenderComponent(VAvatar, {
                                  key: avatar,
                                  image: avatar,
                                  size: "40"
                                }, null, _parent5, _scopeId4));
                              });
                              _push5(`<!--]--></div></div>`);
                            } else {
                              return [
                                createVNode(VAvatar, {
                                  size: "75",
                                  class: "avatar-center",
                                  image: unref(avatar1)
                                }, null, 8, ["image"]),
                                createVNode("div", { class: "d-flex justify-space-between flex-wrap pt-8" }, [
                                  createVNode("div", { class: "me-2 mb-2" }, [
                                    createVNode(VCardTitle, { class: "pa-0" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Robert Meyer ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCardSubtitle, { class: "text-caption pa-0" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" London, UK ")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  createVNode(VBtn, null, {
                                    default: withCtx(() => [
                                      createTextVNode("send request")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode("div", { class: "d-flex justify-space-between align-center mt-4" }, [
                                  createVNode("span", { class: "font-weight-medium" }, "18 mutual friends"),
                                  createVNode("div", { class: "v-avatar-group" }, [
                                    (openBlock(), createBlock(Fragment, null, renderList(avatars, (avatar) => {
                                      return createVNode(VAvatar, {
                                        key: avatar,
                                        image: avatar,
                                        size: "40"
                                      }, null, 8, ["image"]);
                                    }), 64))
                                  ])
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VImg, { src: unref(pages2) }, null, 8, ["src"]),
                          createVNode(VCardText, { class: "position-relative" }, {
                            default: withCtx(() => [
                              createVNode(VAvatar, {
                                size: "75",
                                class: "avatar-center",
                                image: unref(avatar1)
                              }, null, 8, ["image"]),
                              createVNode("div", { class: "d-flex justify-space-between flex-wrap pt-8" }, [
                                createVNode("div", { class: "me-2 mb-2" }, [
                                  createVNode(VCardTitle, { class: "pa-0" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Robert Meyer ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardSubtitle, { class: "text-caption pa-0" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" London, UK ")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                createVNode(VBtn, null, {
                                  default: withCtx(() => [
                                    createTextVNode("send request")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode("div", { class: "d-flex justify-space-between align-center mt-4" }, [
                                createVNode("span", { class: "font-weight-medium" }, "18 mutual friends"),
                                createVNode("div", { class: "v-avatar-group" }, [
                                  (openBlock(), createBlock(Fragment, null, renderList(avatars, (avatar) => {
                                    return createVNode(VAvatar, {
                                      key: avatar,
                                      image: avatar,
                                      size: "40"
                                    }, null, 8, ["image"]);
                                  }), 64))
                                ])
                              ])
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
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode(VImg, { src: unref(pages2) }, null, 8, ["src"]),
                        createVNode(VCardText, { class: "position-relative" }, {
                          default: withCtx(() => [
                            createVNode(VAvatar, {
                              size: "75",
                              class: "avatar-center",
                              image: unref(avatar1)
                            }, null, 8, ["image"]),
                            createVNode("div", { class: "d-flex justify-space-between flex-wrap pt-8" }, [
                              createVNode("div", { class: "me-2 mb-2" }, [
                                createVNode(VCardTitle, { class: "pa-0" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Robert Meyer ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardSubtitle, { class: "text-caption pa-0" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" London, UK ")
                                  ]),
                                  _: 1
                                })
                              ]),
                              createVNode(VBtn, null, {
                                default: withCtx(() => [
                                  createTextVNode("send request")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "d-flex justify-space-between align-center mt-4" }, [
                              createVNode("span", { class: "font-weight-medium" }, "18 mutual friends"),
                              createVNode("div", { class: "v-avatar-group" }, [
                                (openBlock(), createBlock(Fragment, null, renderList(avatars, (avatar) => {
                                  return createVNode(VAvatar, {
                                    key: avatar,
                                    image: avatar,
                                    size: "40"
                                  }, null, 8, ["image"]);
                                }), 64))
                              ])
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              md: "4",
              sm: "6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VImg, {
                          src: unref(pages3),
                          cover: "",
                          "max-height": "280"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardItem, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCardTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Popular Uses Of The Internet`);
                                  } else {
                                    return [
                                      createTextVNode("Popular Uses Of The Internet")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Popular Uses Of The Internet")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="mb-4" data-v-dafc34ea${_scopeId4}> Although cards can support multiple actions, UI controls, and an overflow menu. </div>`);
                              _push5(ssrRenderComponent(VBtn, {
                                variant: "text",
                                density: "comfortable",
                                onClick: ($event) => isCardDetailsVisible.value = !unref(isCardDetailsVisible)
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Details `);
                                  } else {
                                    return [
                                      createTextVNode(" Details ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode("div", { class: "mb-4" }, " Although cards can support multiple actions, UI controls, and an overflow menu. "),
                                createVNode(VBtn, {
                                  variant: "text",
                                  density: "comfortable",
                                  onClick: ($event) => isCardDetailsVisible.value = !unref(isCardDetailsVisible)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Details ")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VExpandTransition, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div style="${ssrRenderStyle(unref(isCardDetailsVisible) ? null : { display: "none" })}" data-v-dafc34ea${_scopeId4}>`);
                              _push5(ssrRenderComponent(VDivider, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCardText, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` I&#39;m a thing. But, like most politicians, he promised more than he could deliver. You won&#39;t have time for sleeping, soldier, not with all the bed making you&#39;ll be doing. Then we&#39;ll go with that data file! Hey, you add a one and two zeros to that or we walk! You&#39;re going to do his laundry? I&#39;ve got to find a way to escape. `);
                                  } else {
                                    return [
                                      createTextVNode(" I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape. ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`</div>`);
                            } else {
                              return [
                                withDirectives(createVNode("div", null, [
                                  createVNode(VDivider),
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape. ")
                                    ]),
                                    _: 1
                                  })
                                ], 512), [
                                  [vShow, unref(isCardDetailsVisible)]
                                ])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VImg, {
                            src: unref(pages3),
                            cover: "",
                            "max-height": "280"
                          }, null, 8, ["src"]),
                          createVNode(VCardItem, null, {
                            default: withCtx(() => [
                              createVNode(VCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Popular Uses Of The Internet")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "mb-4" }, " Although cards can support multiple actions, UI controls, and an overflow menu. "),
                              createVNode(VBtn, {
                                variant: "text",
                                density: "comfortable",
                                onClick: ($event) => isCardDetailsVisible.value = !unref(isCardDetailsVisible)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Details ")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
                            ]),
                            _: 1
                          }),
                          createVNode(VExpandTransition, null, {
                            default: withCtx(() => [
                              withDirectives(createVNode("div", null, [
                                createVNode(VDivider),
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape. ")
                                  ]),
                                  _: 1
                                })
                              ], 512), [
                                [vShow, unref(isCardDetailsVisible)]
                              ])
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
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode(VImg, {
                          src: unref(pages3),
                          cover: "",
                          "max-height": "280"
                        }, null, 8, ["src"]),
                        createVNode(VCardItem, null, {
                          default: withCtx(() => [
                            createVNode(VCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Popular Uses Of The Internet")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "mb-4" }, " Although cards can support multiple actions, UI controls, and an overflow menu. "),
                            createVNode(VBtn, {
                              variant: "text",
                              density: "comfortable",
                              onClick: ($event) => isCardDetailsVisible.value = !unref(isCardDetailsVisible)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Details ")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
                          ]),
                          _: 1
                        }),
                        createVNode(VExpandTransition, null, {
                          default: withCtx(() => [
                            withDirectives(createVNode("div", null, [
                              createVNode(VDivider),
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createTextVNode(" I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape. ")
                                ]),
                                _: 1
                              })
                            ], 512), [
                              [vShow, unref(isCardDetailsVisible)]
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
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, {
              sm: "6",
              cols: "12"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row" data-v-dafc34ea${_scopeId3}><div class="ma-auto pa-5" data-v-dafc34ea${_scopeId3}>`);
                        _push4(ssrRenderComponent(VImg, {
                          width: "137",
                          height: "176",
                          src: unref(eCommerce2)
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                        _push4(ssrRenderComponent(VDivider, {
                          vertical: _ctx.$vuetify.display.mdAndUp
                        }, null, _parent4, _scopeId3));
                        _push4(`<div data-v-dafc34ea${_scopeId3}>`);
                        _push4(ssrRenderComponent(VCardItem, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCardTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Apple iPhone 11 Pro`);
                                  } else {
                                    return [
                                      createTextVNode("Apple iPhone 11 Pro")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Apple iPhone 11 Pro")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Apple iPhone 11 Pro smartphone. Announced Sep 2019. Features 5.8\u2033 display Apple A13 Bionic `);
                            } else {
                              return [
                                createTextVNode(" Apple iPhone 11 Pro smartphone. Announced Sep 2019. Features 5.8\u2033 display Apple A13 Bionic ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, { class: "text-subtitle-1" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<span data-v-dafc34ea${_scopeId4}>Price :</span> <span class="font-weight-medium" data-v-dafc34ea${_scopeId4}>$899</span>`);
                            } else {
                              return [
                                createVNode("span", null, "Price :"),
                                createTextVNode(),
                                createVNode("span", { class: "font-weight-medium" }, "$899")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardActions, { class: "justify-space-between" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VIcon, { icon: "bx-cart-add" }, null, _parent6, _scopeId5));
                                    _push6(`<span class="ms-2" data-v-dafc34ea${_scopeId5}>Add to cart</span>`);
                                  } else {
                                    return [
                                      createVNode(VIcon, { icon: "bx-cart-add" }),
                                      createVNode("span", { class: "ms-2" }, "Add to cart")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "secondary",
                                icon: "bx-share-alt"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, null, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, { icon: "bx-cart-add" }),
                                    createVNode("span", { class: "ms-2" }, "Add to cart")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "secondary",
                                  icon: "bx-share-alt"
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row" }, [
                            createVNode("div", { class: "ma-auto pa-5" }, [
                              createVNode(VImg, {
                                width: "137",
                                height: "176",
                                src: unref(eCommerce2)
                              }, null, 8, ["src"])
                            ]),
                            createVNode(VDivider, {
                              vertical: _ctx.$vuetify.display.mdAndUp
                            }, null, 8, ["vertical"]),
                            createVNode("div", null, [
                              createVNode(VCardItem, null, {
                                default: withCtx(() => [
                                  createVNode(VCardTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Apple iPhone 11 Pro")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Apple iPhone 11 Pro smartphone. Announced Sep 2019. Features 5.8\u2033 display Apple A13 Bionic ")
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, { class: "text-subtitle-1" }, {
                                default: withCtx(() => [
                                  createVNode("span", null, "Price :"),
                                  createTextVNode(),
                                  createVNode("span", { class: "font-weight-medium" }, "$899")
                                ]),
                                _: 1
                              }),
                              createVNode(VCardActions, { class: "justify-space-between" }, {
                                default: withCtx(() => [
                                  createVNode(VBtn, null, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, { icon: "bx-cart-add" }),
                                      createVNode("span", { class: "ms-2" }, "Add to cart")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, {
                                    color: "secondary",
                                    icon: "bx-share-alt"
                                  })
                                ]),
                                _: 1
                              })
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row" }, [
                          createVNode("div", { class: "ma-auto pa-5" }, [
                            createVNode(VImg, {
                              width: "137",
                              height: "176",
                              src: unref(eCommerce2)
                            }, null, 8, ["src"])
                          ]),
                          createVNode(VDivider, {
                            vertical: _ctx.$vuetify.display.mdAndUp
                          }, null, 8, ["vertical"]),
                          createVNode("div", null, [
                            createVNode(VCardItem, null, {
                              default: withCtx(() => [
                                createVNode(VCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Apple iPhone 11 Pro")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createTextVNode(" Apple iPhone 11 Pro smartphone. Announced Sep 2019. Features 5.8\u2033 display Apple A13 Bionic ")
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, { class: "text-subtitle-1" }, {
                              default: withCtx(() => [
                                createVNode("span", null, "Price :"),
                                createTextVNode(),
                                createVNode("span", { class: "font-weight-medium" }, "$899")
                              ]),
                              _: 1
                            }),
                            createVNode(VCardActions, { class: "justify-space-between" }, {
                              default: withCtx(() => [
                                createVNode(VBtn, null, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, { icon: "bx-cart-add" }),
                                    createVNode("span", { class: "ms-2" }, "Add to cart")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, {
                                  color: "secondary",
                                  icon: "bx-share-alt"
                                })
                              ]),
                              _: 1
                            })
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, {
              sm: "6",
              cols: "12"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="d-flex flex-column-reverse flex-md-row" data-v-dafc34ea${_scopeId3}><div data-v-dafc34ea${_scopeId3}>`);
                        _push4(ssrRenderComponent(VCardItem, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCardTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Stumptown Roasters`);
                                  } else {
                                    return [
                                      createTextVNode("Stumptown Roasters")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Stumptown Roasters")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, { class: "d-flex align-center flex-wrap text-body-1" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ClientOnly, null, {}, _parent5, _scopeId4));
                              _push5(`<span data-v-dafc34ea${_scopeId4}>5 Star | 98 reviews</span>`);
                            } else {
                              return [
                                createVNode(_component_ClientOnly, null, {
                                  default: withCtx(() => [
                                    createVNode(VRating, {
                                      "model-value": 5,
                                      readonly: "",
                                      class: "me-3",
                                      density: "compact"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", null, "5 Star | 98 reviews")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Before there was a United States of America, there were coffee houses, because how are you supposed to build. `);
                            } else {
                              return [
                                createTextVNode(" Before there was a United States of America, there were coffee houses, because how are you supposed to build. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Location`);
                                  } else {
                                    return [
                                      createTextVNode("Location")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Reviews`);
                                  } else {
                                    return [
                                      createTextVNode("Reviews")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Location")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Reviews")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`</div><div class="ma-auto pa-5" data-v-dafc34ea${_scopeId3}>`);
                        _push4(ssrRenderComponent(VImg, {
                          width: 176,
                          src: unref(pages5),
                          class: "rounded"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "d-flex flex-column-reverse flex-md-row" }, [
                            createVNode("div", null, [
                              createVNode(VCardItem, null, {
                                default: withCtx(() => [
                                  createVNode(VCardTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Stumptown Roasters")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, { class: "d-flex align-center flex-wrap text-body-1" }, {
                                default: withCtx(() => [
                                  createVNode(_component_ClientOnly, null, {
                                    default: withCtx(() => [
                                      createVNode(VRating, {
                                        "model-value": 5,
                                        readonly: "",
                                        class: "me-3",
                                        density: "compact"
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("span", null, "5 Star | 98 reviews")
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Before there was a United States of America, there were coffee houses, because how are you supposed to build. ")
                                ]),
                                _: 1
                              }),
                              createVNode(VCardActions, null, {
                                default: withCtx(() => [
                                  createVNode(VBtn, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Location")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VBtn, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Reviews")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode("div", { class: "ma-auto pa-5" }, [
                              createVNode(VImg, {
                                width: 176,
                                src: unref(pages5),
                                class: "rounded"
                              }, null, 8, ["src"])
                            ])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode("div", { class: "d-flex flex-column-reverse flex-md-row" }, [
                          createVNode("div", null, [
                            createVNode(VCardItem, null, {
                              default: withCtx(() => [
                                createVNode(VCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Stumptown Roasters")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, { class: "d-flex align-center flex-wrap text-body-1" }, {
                              default: withCtx(() => [
                                createVNode(_component_ClientOnly, null, {
                                  default: withCtx(() => [
                                    createVNode(VRating, {
                                      "model-value": 5,
                                      readonly: "",
                                      class: "me-3",
                                      density: "compact"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", null, "5 Star | 98 reviews")
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createTextVNode(" Before there was a United States of America, there were coffee houses, because how are you supposed to build. ")
                              ]),
                              _: 1
                            }),
                            createVNode(VCardActions, null, {
                              default: withCtx(() => [
                                createVNode(VBtn, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Location")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Reviews")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "ma-auto pa-5" }, [
                            createVNode(VImg, {
                              width: 176,
                              src: unref(pages5),
                              class: "rounded"
                            }, null, 8, ["src"])
                          ])
                        ])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, {
              lg: "4",
              sm: "6",
              cols: "12"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VImg, { src: unref(pages6) }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardItem, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCardTitle, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Apple Watch`);
                                  } else {
                                    return [
                                      createTextVNode("Apple Watch")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCardTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Apple Watch")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<p class="font-weight-medium text-base" data-v-dafc34ea${_scopeId4}> $249.40 </p><p class="mb-0" data-v-dafc34ea${_scopeId4}> 3.1GHz 6-core 10th-generation Intel Core i5 processor, Turbo Boost up to 4.5GHz </p>`);
                            } else {
                              return [
                                createVNode("p", { class: "font-weight-medium text-base" }, " $249.40 "),
                                createVNode("p", { class: "mb-0" }, " 3.1GHz 6-core 10th-generation Intel Core i5 processor, Turbo Boost up to 4.5GHz ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          block: "",
                          class: "rounded-t-0"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Add to cart `);
                            } else {
                              return [
                                createTextVNode(" Add to cart ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VImg, { src: unref(pages6) }, null, 8, ["src"]),
                          createVNode(VCardItem, null, {
                            default: withCtx(() => [
                              createVNode(VCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Apple Watch")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode("p", { class: "font-weight-medium text-base" }, " $249.40 "),
                              createVNode("p", { class: "mb-0" }, " 3.1GHz 6-core 10th-generation Intel Core i5 processor, Turbo Boost up to 4.5GHz ")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            block: "",
                            class: "rounded-t-0"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Add to cart ")
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
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode(VImg, { src: unref(pages6) }, null, 8, ["src"]),
                        createVNode(VCardItem, null, {
                          default: withCtx(() => [
                            createVNode(VCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode("Apple Watch")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode("p", { class: "font-weight-medium text-base" }, " $249.40 "),
                            createVNode("p", { class: "mb-0" }, " 3.1GHz 6-core 10th-generation Intel Core i5 processor, Turbo Boost up to 4.5GHz ")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          block: "",
                          class: "rounded-t-0"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(" Add to cart ")
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
              md: "6",
              lg: "8",
              cols: "12"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, {
                                cols: "12",
                                sm: "8",
                                md: "12",
                                lg: "7",
                                order: "2",
                                "order-lg": "1"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCardItem, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VCardTitle, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Lifetime Membership`);
                                              } else {
                                                return [
                                                  createTextVNode("Lifetime Membership")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VCardTitle, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Lifetime Membership")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCardText, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Here, I focus on a range of items and features that we use in life without giving them a second thought such as Coca Cola, body muscles and holding ones own breath. Though, most of these notes are not fundamentally necessary, they are such that you can use them for a good laugh, at a drinks party or for picking up women or men. `);
                                        } else {
                                          return [
                                            createTextVNode(" Here, I focus on a range of items and features that we use in life without giving them a second thought such as Coca Cola, body muscles and holding ones own breath. Though, most of these notes are not fundamentally necessary, they are such that you can use them for a good laugh, at a drinks party or for picking up women or men. ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCardText, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VDivider, null, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VDivider)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCardText, { class: "d-flex justify-center" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`<div class="me-auto pe-4" data-v-dafc34ea${_scopeId6}><p class="d-flex align-center mb-6" data-v-dafc34ea${_scopeId6}>`);
                                          _push7(ssrRenderComponent(VIcon, {
                                            color: "primary",
                                            icon: "bx-lock-open"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<span class="ms-3" data-v-dafc34ea${_scopeId6}>Full Access</span></p><p class="d-flex align-center mb-0" data-v-dafc34ea${_scopeId6}>`);
                                          _push7(ssrRenderComponent(VIcon, {
                                            color: "primary",
                                            icon: "bx-user"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<span class="ms-3" data-v-dafc34ea${_scopeId6}>15 Members</span></p></div>`);
                                          if (_ctx.$vuetify.display.smAndUp) {
                                            _push7(ssrRenderComponent(VDivider, {
                                              vertical: "",
                                              inset: ""
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            _push7(`<!---->`);
                                          }
                                          _push7(`<div class="ms-auto ps-4" data-v-dafc34ea${_scopeId6}><p class="d-flex align-center mb-6" data-v-dafc34ea${_scopeId6}>`);
                                          _push7(ssrRenderComponent(VIcon, {
                                            color: "primary",
                                            icon: "bx-star"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<span class="ms-3" data-v-dafc34ea${_scopeId6}>Access all Features</span></p><p class="d-flex align-center mb-0" data-v-dafc34ea${_scopeId6}>`);
                                          _push7(ssrRenderComponent(VIcon, {
                                            color: "primary",
                                            icon: "bx-trending-up"
                                          }, null, _parent7, _scopeId6));
                                          _push7(`<span class="ms-3" data-v-dafc34ea${_scopeId6}>Lifetime Free Update</span></p></div>`);
                                        } else {
                                          return [
                                            createVNode("div", { class: "me-auto pe-4" }, [
                                              createVNode("p", { class: "d-flex align-center mb-6" }, [
                                                createVNode(VIcon, {
                                                  color: "primary",
                                                  icon: "bx-lock-open"
                                                }),
                                                createVNode("span", { class: "ms-3" }, "Full Access")
                                              ]),
                                              createVNode("p", { class: "d-flex align-center mb-0" }, [
                                                createVNode(VIcon, {
                                                  color: "primary",
                                                  icon: "bx-user"
                                                }),
                                                createVNode("span", { class: "ms-3" }, "15 Members")
                                              ])
                                            ]),
                                            _ctx.$vuetify.display.smAndUp ? (openBlock(), createBlock(VDivider, {
                                              key: 0,
                                              vertical: "",
                                              inset: ""
                                            })) : createCommentVNode("", true),
                                            createVNode("div", { class: "ms-auto ps-4" }, [
                                              createVNode("p", { class: "d-flex align-center mb-6" }, [
                                                createVNode(VIcon, {
                                                  color: "primary",
                                                  icon: "bx-star"
                                                }),
                                                createVNode("span", { class: "ms-3" }, "Access all Features")
                                              ]),
                                              createVNode("p", { class: "d-flex align-center mb-0" }, [
                                                createVNode(VIcon, {
                                                  color: "primary",
                                                  icon: "bx-trending-up"
                                                }),
                                                createVNode("span", { class: "ms-3" }, "Lifetime Free Update")
                                              ])
                                            ])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCardItem, null, {
                                        default: withCtx(() => [
                                          createVNode(VCardTitle, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Lifetime Membership")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => [
                                          createTextVNode(" Here, I focus on a range of items and features that we use in life without giving them a second thought such as Coca Cola, body muscles and holding ones own breath. Though, most of these notes are not fundamentally necessary, they are such that you can use them for a good laugh, at a drinks party or for picking up women or men. ")
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => [
                                          createVNode(VDivider)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCardText, { class: "d-flex justify-center" }, {
                                        default: withCtx(() => [
                                          createVNode("div", { class: "me-auto pe-4" }, [
                                            createVNode("p", { class: "d-flex align-center mb-6" }, [
                                              createVNode(VIcon, {
                                                color: "primary",
                                                icon: "bx-lock-open"
                                              }),
                                              createVNode("span", { class: "ms-3" }, "Full Access")
                                            ]),
                                            createVNode("p", { class: "d-flex align-center mb-0" }, [
                                              createVNode(VIcon, {
                                                color: "primary",
                                                icon: "bx-user"
                                              }),
                                              createVNode("span", { class: "ms-3" }, "15 Members")
                                            ])
                                          ]),
                                          _ctx.$vuetify.display.smAndUp ? (openBlock(), createBlock(VDivider, {
                                            key: 0,
                                            vertical: "",
                                            inset: ""
                                          })) : createCommentVNode("", true),
                                          createVNode("div", { class: "ms-auto ps-4" }, [
                                            createVNode("p", { class: "d-flex align-center mb-6" }, [
                                              createVNode(VIcon, {
                                                color: "primary",
                                                icon: "bx-star"
                                              }),
                                              createVNode("span", { class: "ms-3" }, "Access all Features")
                                            ]),
                                            createVNode("p", { class: "d-flex align-center mb-0" }, [
                                              createVNode(VIcon, {
                                                color: "primary",
                                                icon: "bx-trending-up"
                                              }),
                                              createVNode("span", { class: "ms-3" }, "Lifetime Free Update")
                                            ])
                                          ])
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
                                sm: "4",
                                md: "12",
                                lg: "5",
                                order: "1",
                                "order-lg": "2",
                                class: "member-pricing-bg text-center"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<div class="membership-pricing d-flex flex-column align-center py-14 h-100 justify-center" data-v-dafc34ea${_scopeId5}><p class="mb-5" data-v-dafc34ea${_scopeId5}><sub class="text-h5" data-v-dafc34ea${_scopeId5}>$</sub><sup class="text-h2 font-weight-medium" data-v-dafc34ea${_scopeId5}>899</sup><sub class="text-h5" data-v-dafc34ea${_scopeId5}>USD</sub></p><p class="text-sm" data-v-dafc34ea${_scopeId5}> 5 Tips For Offshore <br data-v-dafc34ea${_scopeId5}> Software Development </p>`);
                                    _push6(ssrRenderComponent(VBtn, { class: "mt-8" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(` Contact Now `);
                                        } else {
                                          return [
                                            createTextVNode(" Contact Now ")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(`</div>`);
                                  } else {
                                    return [
                                      createVNode("div", { class: "membership-pricing d-flex flex-column align-center py-14 h-100 justify-center" }, [
                                        createVNode("p", { class: "mb-5" }, [
                                          createVNode("sub", { class: "text-h5" }, "$"),
                                          createVNode("sup", { class: "text-h2 font-weight-medium" }, "899"),
                                          createVNode("sub", { class: "text-h5" }, "USD")
                                        ]),
                                        createVNode("p", { class: "text-sm" }, [
                                          createTextVNode(" 5 Tips For Offshore "),
                                          createVNode("br"),
                                          createTextVNode(" Software Development ")
                                        ]),
                                        createVNode(VBtn, { class: "mt-8" }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Contact Now ")
                                          ]),
                                          _: 1
                                        })
                                      ])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, {
                                  cols: "12",
                                  sm: "8",
                                  md: "12",
                                  lg: "7",
                                  order: "2",
                                  "order-lg": "1"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCardItem, null, {
                                      default: withCtx(() => [
                                        createVNode(VCardTitle, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Lifetime Membership")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => [
                                        createTextVNode(" Here, I focus on a range of items and features that we use in life without giving them a second thought such as Coca Cola, body muscles and holding ones own breath. Though, most of these notes are not fundamentally necessary, they are such that you can use them for a good laugh, at a drinks party or for picking up women or men. ")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => [
                                        createVNode(VDivider)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCardText, { class: "d-flex justify-center" }, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "me-auto pe-4" }, [
                                          createVNode("p", { class: "d-flex align-center mb-6" }, [
                                            createVNode(VIcon, {
                                              color: "primary",
                                              icon: "bx-lock-open"
                                            }),
                                            createVNode("span", { class: "ms-3" }, "Full Access")
                                          ]),
                                          createVNode("p", { class: "d-flex align-center mb-0" }, [
                                            createVNode(VIcon, {
                                              color: "primary",
                                              icon: "bx-user"
                                            }),
                                            createVNode("span", { class: "ms-3" }, "15 Members")
                                          ])
                                        ]),
                                        _ctx.$vuetify.display.smAndUp ? (openBlock(), createBlock(VDivider, {
                                          key: 0,
                                          vertical: "",
                                          inset: ""
                                        })) : createCommentVNode("", true),
                                        createVNode("div", { class: "ms-auto ps-4" }, [
                                          createVNode("p", { class: "d-flex align-center mb-6" }, [
                                            createVNode(VIcon, {
                                              color: "primary",
                                              icon: "bx-star"
                                            }),
                                            createVNode("span", { class: "ms-3" }, "Access all Features")
                                          ]),
                                          createVNode("p", { class: "d-flex align-center mb-0" }, [
                                            createVNode(VIcon, {
                                              color: "primary",
                                              icon: "bx-trending-up"
                                            }),
                                            createVNode("span", { class: "ms-3" }, "Lifetime Free Update")
                                          ])
                                        ])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  sm: "4",
                                  md: "12",
                                  lg: "5",
                                  order: "1",
                                  "order-lg": "2",
                                  class: "member-pricing-bg text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "membership-pricing d-flex flex-column align-center py-14 h-100 justify-center" }, [
                                      createVNode("p", { class: "mb-5" }, [
                                        createVNode("sub", { class: "text-h5" }, "$"),
                                        createVNode("sup", { class: "text-h2 font-weight-medium" }, "899"),
                                        createVNode("sub", { class: "text-h5" }, "USD")
                                      ]),
                                      createVNode("p", { class: "text-sm" }, [
                                        createTextVNode(" 5 Tips For Offshore "),
                                        createVNode("br"),
                                        createTextVNode(" Software Development ")
                                      ]),
                                      createVNode(VBtn, { class: "mt-8" }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Contact Now ")
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
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                sm: "8",
                                md: "12",
                                lg: "7",
                                order: "2",
                                "order-lg": "1"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCardItem, null, {
                                    default: withCtx(() => [
                                      createVNode(VCardTitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Lifetime Membership")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createTextVNode(" Here, I focus on a range of items and features that we use in life without giving them a second thought such as Coca Cola, body muscles and holding ones own breath. Though, most of these notes are not fundamentally necessary, they are such that you can use them for a good laugh, at a drinks party or for picking up women or men. ")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createVNode(VDivider)
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardText, { class: "d-flex justify-center" }, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "me-auto pe-4" }, [
                                        createVNode("p", { class: "d-flex align-center mb-6" }, [
                                          createVNode(VIcon, {
                                            color: "primary",
                                            icon: "bx-lock-open"
                                          }),
                                          createVNode("span", { class: "ms-3" }, "Full Access")
                                        ]),
                                        createVNode("p", { class: "d-flex align-center mb-0" }, [
                                          createVNode(VIcon, {
                                            color: "primary",
                                            icon: "bx-user"
                                          }),
                                          createVNode("span", { class: "ms-3" }, "15 Members")
                                        ])
                                      ]),
                                      _ctx.$vuetify.display.smAndUp ? (openBlock(), createBlock(VDivider, {
                                        key: 0,
                                        vertical: "",
                                        inset: ""
                                      })) : createCommentVNode("", true),
                                      createVNode("div", { class: "ms-auto ps-4" }, [
                                        createVNode("p", { class: "d-flex align-center mb-6" }, [
                                          createVNode(VIcon, {
                                            color: "primary",
                                            icon: "bx-star"
                                          }),
                                          createVNode("span", { class: "ms-3" }, "Access all Features")
                                        ]),
                                        createVNode("p", { class: "d-flex align-center mb-0" }, [
                                          createVNode(VIcon, {
                                            color: "primary",
                                            icon: "bx-trending-up"
                                          }),
                                          createVNode("span", { class: "ms-3" }, "Lifetime Free Update")
                                        ])
                                      ])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                sm: "4",
                                md: "12",
                                lg: "5",
                                order: "1",
                                "order-lg": "2",
                                class: "member-pricing-bg text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "membership-pricing d-flex flex-column align-center py-14 h-100 justify-center" }, [
                                    createVNode("p", { class: "mb-5" }, [
                                      createVNode("sub", { class: "text-h5" }, "$"),
                                      createVNode("sup", { class: "text-h2 font-weight-medium" }, "899"),
                                      createVNode("sub", { class: "text-h5" }, "USD")
                                    ]),
                                    createVNode("p", { class: "text-sm" }, [
                                      createTextVNode(" 5 Tips For Offshore "),
                                      createVNode("br"),
                                      createTextVNode(" Software Development ")
                                    ]),
                                    createVNode(VBtn, { class: "mt-8" }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Contact Now ")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              sm: "8",
                              md: "12",
                              lg: "7",
                              order: "2",
                              "order-lg": "1"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCardItem, null, {
                                  default: withCtx(() => [
                                    createVNode(VCardTitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Lifetime Membership")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createTextVNode(" Here, I focus on a range of items and features that we use in life without giving them a second thought such as Coca Cola, body muscles and holding ones own breath. Though, most of these notes are not fundamentally necessary, they are such that you can use them for a good laugh, at a drinks party or for picking up women or men. ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createVNode(VDivider)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, { class: "d-flex justify-center" }, {
                                  default: withCtx(() => [
                                    createVNode("div", { class: "me-auto pe-4" }, [
                                      createVNode("p", { class: "d-flex align-center mb-6" }, [
                                        createVNode(VIcon, {
                                          color: "primary",
                                          icon: "bx-lock-open"
                                        }),
                                        createVNode("span", { class: "ms-3" }, "Full Access")
                                      ]),
                                      createVNode("p", { class: "d-flex align-center mb-0" }, [
                                        createVNode(VIcon, {
                                          color: "primary",
                                          icon: "bx-user"
                                        }),
                                        createVNode("span", { class: "ms-3" }, "15 Members")
                                      ])
                                    ]),
                                    _ctx.$vuetify.display.smAndUp ? (openBlock(), createBlock(VDivider, {
                                      key: 0,
                                      vertical: "",
                                      inset: ""
                                    })) : createCommentVNode("", true),
                                    createVNode("div", { class: "ms-auto ps-4" }, [
                                      createVNode("p", { class: "d-flex align-center mb-6" }, [
                                        createVNode(VIcon, {
                                          color: "primary",
                                          icon: "bx-star"
                                        }),
                                        createVNode("span", { class: "ms-3" }, "Access all Features")
                                      ]),
                                      createVNode("p", { class: "d-flex align-center mb-0" }, [
                                        createVNode(VIcon, {
                                          color: "primary",
                                          icon: "bx-trending-up"
                                        }),
                                        createVNode("span", { class: "ms-3" }, "Lifetime Free Update")
                                      ])
                                    ])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              sm: "4",
                              md: "12",
                              lg: "5",
                              order: "1",
                              "order-lg": "2",
                              class: "member-pricing-bg text-center"
                            }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "membership-pricing d-flex flex-column align-center py-14 h-100 justify-center" }, [
                                  createVNode("p", { class: "mb-5" }, [
                                    createVNode("sub", { class: "text-h5" }, "$"),
                                    createVNode("sup", { class: "text-h2 font-weight-medium" }, "899"),
                                    createVNode("sub", { class: "text-h5" }, "USD")
                                  ]),
                                  createVNode("p", { class: "text-sm" }, [
                                    createTextVNode(" 5 Tips For Offshore "),
                                    createVNode("br"),
                                    createTextVNode(" Software Development ")
                                  ]),
                                  createVNode(VBtn, { class: "mt-8" }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Contact Now ")
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
              lg: "4",
              md: "6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, { title: "Influencing The Influencer" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` Computers have become ubiquitous in almost every facet of our lives. At work, desk jockeys spend hours in front of their desktops, while delivery people scan bar codes with handhelds and workers in the field stay in touch. `);
                            } else {
                              return [
                                createTextVNode(" Computers have become ubiquitous in almost every facet of our lives. At work, desk jockeys spend hours in front of their desktops, while delivery people scan bar codes with handhelds and workers in the field stay in touch. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(` If you&#39;re in the market for new desktops, notebooks, or PDAs, there are a myriad of choices. Here&#39;s a rundown of some of the best systems available. `);
                            } else {
                              return [
                                createTextVNode(" If you're in the market for new desktops, notebooks, or PDAs, there are a myriad of choices. Here's a rundown of some of the best systems available. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Read More`);
                                  } else {
                                    return [
                                      createTextVNode("Read More")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Read More")
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
                              createTextVNode(" Computers have become ubiquitous in almost every facet of our lives. At work, desk jockeys spend hours in front of their desktops, while delivery people scan bar codes with handhelds and workers in the field stay in touch. ")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createTextVNode(" If you're in the market for new desktops, notebooks, or PDAs, there are a myriad of choices. Here's a rundown of some of the best systems available. ")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VBtn, null, {
                                default: withCtx(() => [
                                  createTextVNode("Read More")
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
                    createVNode(VCard, { title: "Influencing The Influencer" }, {
                      default: withCtx(() => [
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createTextVNode(" Computers have become ubiquitous in almost every facet of our lives. At work, desk jockeys spend hours in front of their desktops, while delivery people scan bar codes with handhelds and workers in the field stay in touch. ")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createTextVNode(" If you're in the market for new desktops, notebooks, or PDAs, there are a myriad of choices. Here's a rundown of some of the best systems available. ")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardActions, null, {
                          default: withCtx(() => [
                            createVNode(VBtn, null, {
                              default: withCtx(() => [
                                createTextVNode("Read More")
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
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              lg: "4",
              md: "6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, { title: "The Best Answers" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardText, { class: "d-flex align-center flex-wrap" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_ClientOnly, null, {}, _parent5, _scopeId4));
                              _push5(`<span class="text-subtitle-2" data-v-dafc34ea${_scopeId4}>5 Star | 98 reviews</span>`);
                            } else {
                              return [
                                createVNode(_component_ClientOnly, null, {
                                  default: withCtx(() => [
                                    createVNode(VRating, {
                                      "model-value": 5,
                                      readonly: "",
                                      density: "compact",
                                      class: "me-3"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("span", { class: "text-subtitle-2" }, "5 Star | 98 reviews")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<p data-v-dafc34ea${_scopeId4}> If you are looking for a new way to promote your business that won&#39;t cost you more money, maybe printing is one of the options you won&#39;t resist. </p><p class="mb-0" data-v-dafc34ea${_scopeId4}> become fast, easy and simple. If you want your promotional material to be an eye-catching </p>`);
                            } else {
                              return [
                                createVNode("p", null, " If you are looking for a new way to promote your business that won't cost you more money, maybe printing is one of the options you won't resist. "),
                                createVNode("p", { class: "mb-0" }, " become fast, easy and simple. If you want your promotional material to be an eye-catching ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Location`);
                                  } else {
                                    return [
                                      createTextVNode("Location")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Reviews`);
                                  } else {
                                    return [
                                      createTextVNode("Reviews")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Location")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VBtn, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Reviews")
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
                          createVNode(VCardText, { class: "d-flex align-center flex-wrap" }, {
                            default: withCtx(() => [
                              createVNode(_component_ClientOnly, null, {
                                default: withCtx(() => [
                                  createVNode(VRating, {
                                    "model-value": 5,
                                    readonly: "",
                                    density: "compact",
                                    class: "me-3"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("span", { class: "text-subtitle-2" }, "5 Star | 98 reviews")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode("p", null, " If you are looking for a new way to promote your business that won't cost you more money, maybe printing is one of the options you won't resist. "),
                              createVNode("p", { class: "mb-0" }, " become fast, easy and simple. If you want your promotional material to be an eye-catching ")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VBtn, null, {
                                default: withCtx(() => [
                                  createTextVNode("Location")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, null, {
                                default: withCtx(() => [
                                  createTextVNode("Reviews")
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
                    createVNode(VCard, { title: "The Best Answers" }, {
                      default: withCtx(() => [
                        createVNode(VCardText, { class: "d-flex align-center flex-wrap" }, {
                          default: withCtx(() => [
                            createVNode(_component_ClientOnly, null, {
                              default: withCtx(() => [
                                createVNode(VRating, {
                                  "model-value": 5,
                                  readonly: "",
                                  density: "compact",
                                  class: "me-3"
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("span", { class: "text-subtitle-2" }, "5 Star | 98 reviews")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode("p", null, " If you are looking for a new way to promote your business that won't cost you more money, maybe printing is one of the options you won't resist. "),
                            createVNode("p", { class: "mb-0" }, " become fast, easy and simple. If you want your promotional material to be an eye-catching ")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardActions, null, {
                          default: withCtx(() => [
                            createVNode(VBtn, null, {
                              default: withCtx(() => [
                                createTextVNode("Location")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, null, {
                              default: withCtx(() => [
                                createTextVNode("Reviews")
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
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              md: "6",
              lg: "4"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, { class: "text-center" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardText, { class: "d-flex flex-column justify-center align-center" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VAvatar, {
                                color: "primary",
                                variant: "tonal",
                                size: "50",
                                class: "mb-4"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VIcon, {
                                      size: "2rem",
                                      icon: "bx-help-circle"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VIcon, {
                                        size: "2rem",
                                        icon: "bx-help-circle"
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(`<h6 class="text-h6" data-v-dafc34ea${_scopeId4}> Support </h6>`);
                            } else {
                              return [
                                createVNode(VAvatar, {
                                  color: "primary",
                                  variant: "tonal",
                                  size: "50",
                                  class: "mb-4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, {
                                      size: "2rem",
                                      icon: "bx-help-circle"
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode("h6", { class: "text-h6" }, " Support ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<p data-v-dafc34ea${_scopeId4}> According to us blisters are a very common thing and we come across them very often in our daily lives. It is a very common occurrence like cold or fever depending upon your lifestyle. </p>`);
                            } else {
                              return [
                                createVNode("p", null, " According to us blisters are a very common thing and we come across them very often in our daily lives. It is a very common occurrence like cold or fever depending upon your lifestyle. ")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardText, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VBtn, { variant: "elevated" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Contact Now `);
                                  } else {
                                    return [
                                      createTextVNode(" Contact Now ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VBtn, { variant: "elevated" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Contact Now ")
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
                          createVNode(VCardText, { class: "d-flex flex-column justify-center align-center" }, {
                            default: withCtx(() => [
                              createVNode(VAvatar, {
                                color: "primary",
                                variant: "tonal",
                                size: "50",
                                class: "mb-4"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VIcon, {
                                    size: "2rem",
                                    icon: "bx-help-circle"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("h6", { class: "text-h6" }, " Support ")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode("p", null, " According to us blisters are a very common thing and we come across them very often in our daily lives. It is a very common occurrence like cold or fever depending upon your lifestyle. ")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode(VBtn, { variant: "elevated" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Contact Now ")
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
                    createVNode(VCard, { class: "text-center" }, {
                      default: withCtx(() => [
                        createVNode(VCardText, { class: "d-flex flex-column justify-center align-center" }, {
                          default: withCtx(() => [
                            createVNode(VAvatar, {
                              color: "primary",
                              variant: "tonal",
                              size: "50",
                              class: "mb-4"
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, {
                                  size: "2rem",
                                  icon: "bx-help-circle"
                                })
                              ]),
                              _: 1
                            }),
                            createVNode("h6", { class: "text-h6" }, " Support ")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode("p", null, " According to us blisters are a very common thing and we come across them very often in our daily lives. It is a very common occurrence like cold or fever depending upon your lifestyle. ")
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode(VBtn, { variant: "elevated" }, {
                              default: withCtx(() => [
                                createTextVNode(" Contact Now ")
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
              createVNode(VCol, {
                cols: "12",
                sm: "6",
                md: "4"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VImg, {
                        src: unref(pages1),
                        cover: ""
                      }, null, 8, ["src"]),
                      createVNode(VCardItem, null, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Influencing The Influencer")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createTextVNode(" Cancun is back, better than ever! Over a hundred Mexico resorts have reopened and the state tourism minister predicts Cancun will draw as many visitors in 2006 as it did two years ago. ")
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
                sm: "6",
                md: "4"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VImg, { src: unref(pages2) }, null, 8, ["src"]),
                      createVNode(VCardText, { class: "position-relative" }, {
                        default: withCtx(() => [
                          createVNode(VAvatar, {
                            size: "75",
                            class: "avatar-center",
                            image: unref(avatar1)
                          }, null, 8, ["image"]),
                          createVNode("div", { class: "d-flex justify-space-between flex-wrap pt-8" }, [
                            createVNode("div", { class: "me-2 mb-2" }, [
                              createVNode(VCardTitle, { class: "pa-0" }, {
                                default: withCtx(() => [
                                  createTextVNode(" Robert Meyer ")
                                ]),
                                _: 1
                              }),
                              createVNode(VCardSubtitle, { class: "text-caption pa-0" }, {
                                default: withCtx(() => [
                                  createTextVNode(" London, UK ")
                                ]),
                                _: 1
                              })
                            ]),
                            createVNode(VBtn, null, {
                              default: withCtx(() => [
                                createTextVNode("send request")
                              ]),
                              _: 1
                            })
                          ]),
                          createVNode("div", { class: "d-flex justify-space-between align-center mt-4" }, [
                            createVNode("span", { class: "font-weight-medium" }, "18 mutual friends"),
                            createVNode("div", { class: "v-avatar-group" }, [
                              (openBlock(), createBlock(Fragment, null, renderList(avatars, (avatar) => {
                                return createVNode(VAvatar, {
                                  key: avatar,
                                  image: avatar,
                                  size: "40"
                                }, null, 8, ["image"]);
                              }), 64))
                            ])
                          ])
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
                md: "4",
                sm: "6"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VImg, {
                        src: unref(pages3),
                        cover: "",
                        "max-height": "280"
                      }, null, 8, ["src"]),
                      createVNode(VCardItem, null, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Popular Uses Of The Internet")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "mb-4" }, " Although cards can support multiple actions, UI controls, and an overflow menu. "),
                          createVNode(VBtn, {
                            variant: "text",
                            density: "comfortable",
                            onClick: ($event) => isCardDetailsVisible.value = !unref(isCardDetailsVisible)
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Details ")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      }),
                      createVNode(VExpandTransition, null, {
                        default: withCtx(() => [
                          withDirectives(createVNode("div", null, [
                            createVNode(VDivider),
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createTextVNode(" I'm a thing. But, like most politicians, he promised more than he could deliver. You won't have time for sleeping, soldier, not with all the bed making you'll be doing. Then we'll go with that data file! Hey, you add a one and two zeros to that or we walk! You're going to do his laundry? I've got to find a way to escape. ")
                              ]),
                              _: 1
                            })
                          ], 512), [
                            [vShow, unref(isCardDetailsVisible)]
                          ])
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
                sm: "6",
                cols: "12"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "d-flex justify-space-between flex-wrap flex-md-nowrap flex-column flex-md-row" }, [
                        createVNode("div", { class: "ma-auto pa-5" }, [
                          createVNode(VImg, {
                            width: "137",
                            height: "176",
                            src: unref(eCommerce2)
                          }, null, 8, ["src"])
                        ]),
                        createVNode(VDivider, {
                          vertical: _ctx.$vuetify.display.mdAndUp
                        }, null, 8, ["vertical"]),
                        createVNode("div", null, [
                          createVNode(VCardItem, null, {
                            default: withCtx(() => [
                              createVNode(VCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Apple iPhone 11 Pro")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createTextVNode(" Apple iPhone 11 Pro smartphone. Announced Sep 2019. Features 5.8\u2033 display Apple A13 Bionic ")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, { class: "text-subtitle-1" }, {
                            default: withCtx(() => [
                              createVNode("span", null, "Price :"),
                              createTextVNode(),
                              createVNode("span", { class: "font-weight-medium" }, "$899")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardActions, { class: "justify-space-between" }, {
                            default: withCtx(() => [
                              createVNode(VBtn, null, {
                                default: withCtx(() => [
                                  createVNode(VIcon, { icon: "bx-cart-add" }),
                                  createVNode("span", { class: "ms-2" }, "Add to cart")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, {
                                color: "secondary",
                                icon: "bx-share-alt"
                              })
                            ]),
                            _: 1
                          })
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, {
                sm: "6",
                cols: "12"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode("div", { class: "d-flex flex-column-reverse flex-md-row" }, [
                        createVNode("div", null, [
                          createVNode(VCardItem, null, {
                            default: withCtx(() => [
                              createVNode(VCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode("Stumptown Roasters")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, { class: "d-flex align-center flex-wrap text-body-1" }, {
                            default: withCtx(() => [
                              createVNode(_component_ClientOnly, null, {
                                default: withCtx(() => [
                                  createVNode(VRating, {
                                    "model-value": 5,
                                    readonly: "",
                                    class: "me-3",
                                    density: "compact"
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode("span", null, "5 Star | 98 reviews")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createTextVNode(" Before there was a United States of America, there were coffee houses, because how are you supposed to build. ")
                            ]),
                            _: 1
                          }),
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VBtn, null, {
                                default: withCtx(() => [
                                  createTextVNode("Location")
                                ]),
                                _: 1
                              }),
                              createVNode(VBtn, null, {
                                default: withCtx(() => [
                                  createTextVNode("Reviews")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        createVNode("div", { class: "ma-auto pa-5" }, [
                          createVNode(VImg, {
                            width: 176,
                            src: unref(pages5),
                            class: "rounded"
                          }, null, 8, ["src"])
                        ])
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, {
                lg: "4",
                sm: "6",
                cols: "12"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VImg, { src: unref(pages6) }, null, 8, ["src"]),
                      createVNode(VCardItem, null, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Apple Watch")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode("p", { class: "font-weight-medium text-base" }, " $249.40 "),
                          createVNode("p", { class: "mb-0" }, " 3.1GHz 6-core 10th-generation Intel Core i5 processor, Turbo Boost up to 4.5GHz ")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        block: "",
                        class: "rounded-t-0"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(" Add to cart ")
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
                md: "6",
                lg: "8",
                cols: "12"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            sm: "8",
                            md: "12",
                            lg: "7",
                            order: "2",
                            "order-lg": "1"
                          }, {
                            default: withCtx(() => [
                              createVNode(VCardItem, null, {
                                default: withCtx(() => [
                                  createVNode(VCardTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Lifetime Membership")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createTextVNode(" Here, I focus on a range of items and features that we use in life without giving them a second thought such as Coca Cola, body muscles and holding ones own breath. Though, most of these notes are not fundamentally necessary, they are such that you can use them for a good laugh, at a drinks party or for picking up women or men. ")
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createVNode(VDivider)
                                ]),
                                _: 1
                              }),
                              createVNode(VCardText, { class: "d-flex justify-center" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "me-auto pe-4" }, [
                                    createVNode("p", { class: "d-flex align-center mb-6" }, [
                                      createVNode(VIcon, {
                                        color: "primary",
                                        icon: "bx-lock-open"
                                      }),
                                      createVNode("span", { class: "ms-3" }, "Full Access")
                                    ]),
                                    createVNode("p", { class: "d-flex align-center mb-0" }, [
                                      createVNode(VIcon, {
                                        color: "primary",
                                        icon: "bx-user"
                                      }),
                                      createVNode("span", { class: "ms-3" }, "15 Members")
                                    ])
                                  ]),
                                  _ctx.$vuetify.display.smAndUp ? (openBlock(), createBlock(VDivider, {
                                    key: 0,
                                    vertical: "",
                                    inset: ""
                                  })) : createCommentVNode("", true),
                                  createVNode("div", { class: "ms-auto ps-4" }, [
                                    createVNode("p", { class: "d-flex align-center mb-6" }, [
                                      createVNode(VIcon, {
                                        color: "primary",
                                        icon: "bx-star"
                                      }),
                                      createVNode("span", { class: "ms-3" }, "Access all Features")
                                    ]),
                                    createVNode("p", { class: "d-flex align-center mb-0" }, [
                                      createVNode(VIcon, {
                                        color: "primary",
                                        icon: "bx-trending-up"
                                      }),
                                      createVNode("span", { class: "ms-3" }, "Lifetime Free Update")
                                    ])
                                  ])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            sm: "4",
                            md: "12",
                            lg: "5",
                            order: "1",
                            "order-lg": "2",
                            class: "member-pricing-bg text-center"
                          }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "membership-pricing d-flex flex-column align-center py-14 h-100 justify-center" }, [
                                createVNode("p", { class: "mb-5" }, [
                                  createVNode("sub", { class: "text-h5" }, "$"),
                                  createVNode("sup", { class: "text-h2 font-weight-medium" }, "899"),
                                  createVNode("sub", { class: "text-h5" }, "USD")
                                ]),
                                createVNode("p", { class: "text-sm" }, [
                                  createTextVNode(" 5 Tips For Offshore "),
                                  createVNode("br"),
                                  createTextVNode(" Software Development ")
                                ]),
                                createVNode(VBtn, { class: "mt-8" }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Contact Now ")
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
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, {
                cols: "12",
                lg: "4",
                md: "6"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, { title: "Influencing The Influencer" }, {
                    default: withCtx(() => [
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createTextVNode(" Computers have become ubiquitous in almost every facet of our lives. At work, desk jockeys spend hours in front of their desktops, while delivery people scan bar codes with handhelds and workers in the field stay in touch. ")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createTextVNode(" If you're in the market for new desktops, notebooks, or PDAs, there are a myriad of choices. Here's a rundown of some of the best systems available. ")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardActions, null, {
                        default: withCtx(() => [
                          createVNode(VBtn, null, {
                            default: withCtx(() => [
                              createTextVNode("Read More")
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
              createVNode(VCol, {
                cols: "12",
                lg: "4",
                md: "6"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, { title: "The Best Answers" }, {
                    default: withCtx(() => [
                      createVNode(VCardText, { class: "d-flex align-center flex-wrap" }, {
                        default: withCtx(() => [
                          createVNode(_component_ClientOnly, null, {
                            default: withCtx(() => [
                              createVNode(VRating, {
                                "model-value": 5,
                                readonly: "",
                                density: "compact",
                                class: "me-3"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("span", { class: "text-subtitle-2" }, "5 Star | 98 reviews")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode("p", null, " If you are looking for a new way to promote your business that won't cost you more money, maybe printing is one of the options you won't resist. "),
                          createVNode("p", { class: "mb-0" }, " become fast, easy and simple. If you want your promotional material to be an eye-catching ")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardActions, null, {
                        default: withCtx(() => [
                          createVNode(VBtn, null, {
                            default: withCtx(() => [
                              createTextVNode("Location")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, null, {
                            default: withCtx(() => [
                              createTextVNode("Reviews")
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
              createVNode(VCol, {
                cols: "12",
                md: "6",
                lg: "4"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, { class: "text-center" }, {
                    default: withCtx(() => [
                      createVNode(VCardText, { class: "d-flex flex-column justify-center align-center" }, {
                        default: withCtx(() => [
                          createVNode(VAvatar, {
                            color: "primary",
                            variant: "tonal",
                            size: "50",
                            class: "mb-4"
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, {
                                size: "2rem",
                                icon: "bx-help-circle"
                              })
                            ]),
                            _: 1
                          }),
                          createVNode("h6", { class: "text-h6" }, " Support ")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode("p", null, " According to us blisters are a very common thing and we come across them very often in our daily lives. It is a very common occurrence like cold or fever depending upon your lifestyle. ")
                        ]),
                        _: 1
                      }),
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode(VBtn, { variant: "elevated" }, {
                            default: withCtx(() => [
                              createTextVNode(" Contact Now ")
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
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/pages/cards/card-basic/CardBasic.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const CardBasic = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-dafc34ea"]]);
const tabContent = "Although cards can support multiple actions, UI controls, and an overflow menu, use restraint and remember that cards...";
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "CardNavigation",
  __ssrInlineRender: true,
  setup(__props) {
    const navigationTab = ref("ITEM ONE");
    const navigationTab2 = ref("ITEM ONE");
    const tabItems = ["ITEM ONE", "ITEM TWO", "ITEM THREE"];
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VRow, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, {
              md: "6",
              cols: "12"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTabs, {
                          modelValue: unref(navigationTab),
                          "onUpdate:modelValue": ($event) => isRef(navigationTab) ? navigationTab.value = $event : null
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(tabItems, (item) => {
                                _push5(ssrRenderComponent(VTab, {
                                  key: item,
                                  value: item
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(item)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(item), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(tabItems, (item) => {
                                  return createVNode(VTab, {
                                    key: item,
                                    value: item
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VDivider, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VWindow, {
                          modelValue: unref(navigationTab),
                          "onUpdate:modelValue": ($event) => isRef(navigationTab) ? navigationTab.value = $event : null
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(tabItems, (item) => {
                                _push5(ssrRenderComponent(VWindowItem, {
                                  key: item,
                                  value: item
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VCardItem, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VCardTitle, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Navigation Card`);
                                                } else {
                                                  return [
                                                    createTextVNode("Navigation Card")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VCardTitle, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Navigation Card")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCardText, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(tabContent)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(tabContent))
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCardText, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VBtn, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Learn More`);
                                                } else {
                                                  return [
                                                    createTextVNode("Learn More")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VBtn, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Learn More")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VCardItem, null, {
                                          default: withCtx(() => [
                                            createVNode(VCardTitle, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Navigation Card")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCardText, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(tabContent))
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCardText, null, {
                                          default: withCtx(() => [
                                            createVNode(VBtn, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Learn More")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(tabItems, (item) => {
                                  return createVNode(VWindowItem, {
                                    key: item,
                                    value: item
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VCardItem, null, {
                                        default: withCtx(() => [
                                          createVNode(VCardTitle, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Navigation Card")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(tabContent))
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => [
                                          createVNode(VBtn, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Learn More")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTabs, {
                            modelValue: unref(navigationTab),
                            "onUpdate:modelValue": ($event) => isRef(navigationTab) ? navigationTab.value = $event : null
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(tabItems, (item) => {
                                return createVNode(VTab, {
                                  key: item,
                                  value: item
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VDivider),
                          createVNode(VWindow, {
                            modelValue: unref(navigationTab),
                            "onUpdate:modelValue": ($event) => isRef(navigationTab) ? navigationTab.value = $event : null
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(tabItems, (item) => {
                                return createVNode(VWindowItem, {
                                  key: item,
                                  value: item
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCardItem, null, {
                                      default: withCtx(() => [
                                        createVNode(VCardTitle, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Navigation Card")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(tabContent))
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => [
                                        createVNode(VBtn, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Learn More")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode(VTabs, {
                          modelValue: unref(navigationTab),
                          "onUpdate:modelValue": ($event) => isRef(navigationTab) ? navigationTab.value = $event : null
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(tabItems, (item) => {
                              return createVNode(VTab, {
                                key: item,
                                value: item
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 64))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VDivider),
                        createVNode(VWindow, {
                          modelValue: unref(navigationTab),
                          "onUpdate:modelValue": ($event) => isRef(navigationTab) ? navigationTab.value = $event : null
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(tabItems, (item) => {
                              return createVNode(VWindowItem, {
                                key: item,
                                value: item
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCardItem, null, {
                                    default: withCtx(() => [
                                      createVNode(VCardTitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Navigation Card")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(tabContent))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Learn More")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 64))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, {
              md: "6",
              cols: "12"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTabs, {
                          modelValue: unref(navigationTab2),
                          "onUpdate:modelValue": ($event) => isRef(navigationTab2) ? navigationTab2.value = $event : null,
                          "align-tabs": "center"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(tabItems, (item) => {
                                _push5(ssrRenderComponent(VTab, {
                                  key: item,
                                  value: item
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(item)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(item), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(tabItems, (item) => {
                                  return createVNode(VTab, {
                                    key: item,
                                    value: item
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(item), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VDivider, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VWindow, {
                          modelValue: unref(navigationTab2),
                          "onUpdate:modelValue": ($event) => isRef(navigationTab2) ? navigationTab2.value = $event : null
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<!--[-->`);
                              ssrRenderList(tabItems, (item) => {
                                _push5(ssrRenderComponent(VWindowItem, {
                                  key: item,
                                  value: item,
                                  class: "text-center"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VCardItem, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VCardTitle, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Navigation Card`);
                                                } else {
                                                  return [
                                                    createTextVNode("Navigation Card")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VCardTitle, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Navigation Card")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCardText, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(tabContent)}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(tabContent))
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCardText, null, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VBtn, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Learn More`);
                                                } else {
                                                  return [
                                                    createTextVNode("Learn More")
                                                  ];
                                                }
                                              }),
                                              _: 2
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VBtn, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Learn More")
                                                ]),
                                                _: 1
                                              })
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VCardItem, null, {
                                          default: withCtx(() => [
                                            createVNode(VCardTitle, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Navigation Card")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCardText, null, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(tabContent))
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCardText, null, {
                                          default: withCtx(() => [
                                            createVNode(VBtn, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Learn More")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              });
                              _push5(`<!--]-->`);
                            } else {
                              return [
                                (openBlock(), createBlock(Fragment, null, renderList(tabItems, (item) => {
                                  return createVNode(VWindowItem, {
                                    key: item,
                                    value: item,
                                    class: "text-center"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VCardItem, null, {
                                        default: withCtx(() => [
                                          createVNode(VCardTitle, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Navigation Card")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(tabContent))
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCardText, null, {
                                        default: withCtx(() => [
                                          createVNode(VBtn, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Learn More")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 2
                                  }, 1032, ["value"]);
                                }), 64))
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTabs, {
                            modelValue: unref(navigationTab2),
                            "onUpdate:modelValue": ($event) => isRef(navigationTab2) ? navigationTab2.value = $event : null,
                            "align-tabs": "center"
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(tabItems, (item) => {
                                return createVNode(VTab, {
                                  key: item,
                                  value: item
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(item), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VDivider),
                          createVNode(VWindow, {
                            modelValue: unref(navigationTab2),
                            "onUpdate:modelValue": ($event) => isRef(navigationTab2) ? navigationTab2.value = $event : null
                          }, {
                            default: withCtx(() => [
                              (openBlock(), createBlock(Fragment, null, renderList(tabItems, (item) => {
                                return createVNode(VWindowItem, {
                                  key: item,
                                  value: item,
                                  class: "text-center"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VCardItem, null, {
                                      default: withCtx(() => [
                                        createVNode(VCardTitle, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Navigation Card")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(tabContent))
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => [
                                        createVNode(VBtn, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Learn More")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 2
                                }, 1032, ["value"]);
                              }), 64))
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode(VTabs, {
                          modelValue: unref(navigationTab2),
                          "onUpdate:modelValue": ($event) => isRef(navigationTab2) ? navigationTab2.value = $event : null,
                          "align-tabs": "center"
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(tabItems, (item) => {
                              return createVNode(VTab, {
                                key: item,
                                value: item
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item), 1)
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 64))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VDivider),
                        createVNode(VWindow, {
                          modelValue: unref(navigationTab2),
                          "onUpdate:modelValue": ($event) => isRef(navigationTab2) ? navigationTab2.value = $event : null
                        }, {
                          default: withCtx(() => [
                            (openBlock(), createBlock(Fragment, null, renderList(tabItems, (item) => {
                              return createVNode(VWindowItem, {
                                key: item,
                                value: item,
                                class: "text-center"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VCardItem, null, {
                                    default: withCtx(() => [
                                      createVNode(VCardTitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Navigation Card")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(tabContent))
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Learn More")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 2
                              }, 1032, ["value"]);
                            }), 64))
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
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
                md: "6",
                cols: "12"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VTabs, {
                        modelValue: unref(navigationTab),
                        "onUpdate:modelValue": ($event) => isRef(navigationTab) ? navigationTab.value = $event : null
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(tabItems, (item) => {
                            return createVNode(VTab, {
                              key: item,
                              value: item
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 64))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VDivider),
                      createVNode(VWindow, {
                        modelValue: unref(navigationTab),
                        "onUpdate:modelValue": ($event) => isRef(navigationTab) ? navigationTab.value = $event : null
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(tabItems, (item) => {
                            return createVNode(VWindowItem, {
                              key: item,
                              value: item
                            }, {
                              default: withCtx(() => [
                                createVNode(VCardItem, null, {
                                  default: withCtx(() => [
                                    createVNode(VCardTitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Navigation Card")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(tabContent))
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Learn More")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 64))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VCol, {
                md: "6",
                cols: "12"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VTabs, {
                        modelValue: unref(navigationTab2),
                        "onUpdate:modelValue": ($event) => isRef(navigationTab2) ? navigationTab2.value = $event : null,
                        "align-tabs": "center"
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(tabItems, (item) => {
                            return createVNode(VTab, {
                              key: item,
                              value: item
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(item), 1)
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 64))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VDivider),
                      createVNode(VWindow, {
                        modelValue: unref(navigationTab2),
                        "onUpdate:modelValue": ($event) => isRef(navigationTab2) ? navigationTab2.value = $event : null
                      }, {
                        default: withCtx(() => [
                          (openBlock(), createBlock(Fragment, null, renderList(tabItems, (item) => {
                            return createVNode(VWindowItem, {
                              key: item,
                              value: item,
                              class: "text-center"
                            }, {
                              default: withCtx(() => [
                                createVNode(VCardItem, null, {
                                  default: withCtx(() => [
                                    createVNode(VCardTitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Navigation Card")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(tabContent))
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Learn More")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["value"]);
                          }), 64))
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/pages/cards/card-basic/CardNavigation.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const avatar8 = "" + buildAssetsURL("avatar-8.DRlSCgqr.png");
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "CardSolid",
  __ssrInlineRender: true,
  setup(__props) {
    const solidCardData = [
      {
        cardBg: "#16B1FF",
        title: "Twitter Card",
        icon: "bxl-twitter",
        text: '"Turns out semicolon-less style is easier and safer in TS because most gotcha edge cases are type invalid as well."',
        avatarImg: avatar4,
        avatarName: "Mary Vaughn",
        likes: "1.2k",
        share: "80"
      },
      {
        cardBg: "#3B5998",
        title: "Facebook Card",
        icon: "bxl-facebook",
        text: "You've read about the importance of being courageous, rebellious and imaginative. These are all vital ingredients.",
        avatarImg: avatar1,
        avatarName: "Eugene Clarke",
        likes: "3.2k",
        share: "49"
      },
      {
        cardBg: "#007BB6",
        title: "LinkedIn Card",
        icon: "bxl-linkedin",
        text: "With the Internet spreading like wildfire and reaching every part of our daily life, more and more traffic is directed.",
        avatarImg: avatar8,
        avatarName: "Anne Burke1",
        likes: "1.2k",
        share: "80"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_IconBtn = resolveComponent("IconBtn");
      _push(ssrRenderComponent(VRow, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<!--[-->`);
            ssrRenderList(solidCardData, (data) => {
              _push2(ssrRenderComponent(VCol, {
                key: data.icon,
                cols: "12",
                md: "6",
                lg: "4"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VCard, {
                      color: data.cardBg
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCardItem, null, {
                            prepend: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VIcon, {
                                  size: "1.9rem",
                                  color: "white",
                                  icon: data.icon
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VIcon, {
                                    size: "1.9rem",
                                    color: "white",
                                    icon: data.icon
                                  }, null, 8, ["icon"])
                                ];
                              }
                            }),
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCardTitle, { class: "text-white" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(data.title)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(data.title), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCardTitle, { class: "text-white" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(data.title), 1)
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VCardText, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<p class="clamp-text text-white mb-0"${_scopeId4}>${ssrInterpolate(data.text)}</p>`);
                              } else {
                                return [
                                  createVNode("p", { class: "clamp-text text-white mb-0" }, toDisplayString(data.text), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VCardText, { class: "d-flex justify-space-between align-center flex-wrap" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="text-no-wrap"${_scopeId4}>`);
                                _push5(ssrRenderComponent(VAvatar, {
                                  size: "34",
                                  image: data.avatarImg
                                }, null, _parent5, _scopeId4));
                                _push5(`<span class="text-white ms-2"${_scopeId4}>${ssrInterpolate(data.avatarName)}</span></div><div class="d-flex align-center"${_scopeId4}>`);
                                _push5(ssrRenderComponent(_component_IconBtn, {
                                  icon: "bx-heart",
                                  color: "white",
                                  class: "me-1"
                                }, null, _parent5, _scopeId4));
                                _push5(`<span class="text-subtitle-2 text-white me-4"${_scopeId4}>${ssrInterpolate(data.likes)}</span>`);
                                _push5(ssrRenderComponent(_component_IconBtn, {
                                  icon: "bx-share-alt",
                                  color: "white",
                                  class: "me-1"
                                }, null, _parent5, _scopeId4));
                                _push5(`<span class="text-subtitle-2 text-white"${_scopeId4}>${ssrInterpolate(data.share)}</span></div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "text-no-wrap" }, [
                                    createVNode(VAvatar, {
                                      size: "34",
                                      image: data.avatarImg
                                    }, null, 8, ["image"]),
                                    createVNode("span", { class: "text-white ms-2" }, toDisplayString(data.avatarName), 1)
                                  ]),
                                  createVNode("div", { class: "d-flex align-center" }, [
                                    createVNode(_component_IconBtn, {
                                      icon: "bx-heart",
                                      color: "white",
                                      class: "me-1"
                                    }),
                                    createVNode("span", { class: "text-subtitle-2 text-white me-4" }, toDisplayString(data.likes), 1),
                                    createVNode(_component_IconBtn, {
                                      icon: "bx-share-alt",
                                      color: "white",
                                      class: "me-1"
                                    }),
                                    createVNode("span", { class: "text-subtitle-2 text-white" }, toDisplayString(data.share), 1)
                                  ])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCardItem, null, {
                              prepend: withCtx(() => [
                                createVNode(VIcon, {
                                  size: "1.9rem",
                                  color: "white",
                                  icon: data.icon
                                }, null, 8, ["icon"])
                              ]),
                              default: withCtx(() => [
                                createVNode(VCardTitle, { class: "text-white" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(data.title), 1)
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createVNode("p", { class: "clamp-text text-white mb-0" }, toDisplayString(data.text), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(VCardText, { class: "d-flex justify-space-between align-center flex-wrap" }, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-no-wrap" }, [
                                  createVNode(VAvatar, {
                                    size: "34",
                                    image: data.avatarImg
                                  }, null, 8, ["image"]),
                                  createVNode("span", { class: "text-white ms-2" }, toDisplayString(data.avatarName), 1)
                                ]),
                                createVNode("div", { class: "d-flex align-center" }, [
                                  createVNode(_component_IconBtn, {
                                    icon: "bx-heart",
                                    color: "white",
                                    class: "me-1"
                                  }),
                                  createVNode("span", { class: "text-subtitle-2 text-white me-4" }, toDisplayString(data.likes), 1),
                                  createVNode(_component_IconBtn, {
                                    icon: "bx-share-alt",
                                    color: "white",
                                    class: "me-1"
                                  }),
                                  createVNode("span", { class: "text-subtitle-2 text-white" }, toDisplayString(data.share), 1)
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  } else {
                    return [
                      createVNode(VCard, {
                        color: data.cardBg
                      }, {
                        default: withCtx(() => [
                          createVNode(VCardItem, null, {
                            prepend: withCtx(() => [
                              createVNode(VIcon, {
                                size: "1.9rem",
                                color: "white",
                                icon: data.icon
                              }, null, 8, ["icon"])
                            ]),
                            default: withCtx(() => [
                              createVNode(VCardTitle, { class: "text-white" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(data.title), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createVNode("p", { class: "clamp-text text-white mb-0" }, toDisplayString(data.text), 1)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(VCardText, { class: "d-flex justify-space-between align-center flex-wrap" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-no-wrap" }, [
                                createVNode(VAvatar, {
                                  size: "34",
                                  image: data.avatarImg
                                }, null, 8, ["image"]),
                                createVNode("span", { class: "text-white ms-2" }, toDisplayString(data.avatarName), 1)
                              ]),
                              createVNode("div", { class: "d-flex align-center" }, [
                                createVNode(_component_IconBtn, {
                                  icon: "bx-heart",
                                  color: "white",
                                  class: "me-1"
                                }),
                                createVNode("span", { class: "text-subtitle-2 text-white me-4" }, toDisplayString(data.likes), 1),
                                createVNode(_component_IconBtn, {
                                  icon: "bx-share-alt",
                                  color: "white",
                                  class: "me-1"
                                }),
                                createVNode("span", { class: "text-subtitle-2 text-white" }, toDisplayString(data.share), 1)
                              ])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["color"])
                    ];
                  }
                }),
                _: 2
              }, _parent2, _scopeId));
            });
            _push2(`<!--]-->`);
          } else {
            return [
              (openBlock(), createBlock(Fragment, null, renderList(solidCardData, (data) => {
                return createVNode(VCol, {
                  key: data.icon,
                  cols: "12",
                  md: "6",
                  lg: "4"
                }, {
                  default: withCtx(() => [
                    createVNode(VCard, {
                      color: data.cardBg
                    }, {
                      default: withCtx(() => [
                        createVNode(VCardItem, null, {
                          prepend: withCtx(() => [
                            createVNode(VIcon, {
                              size: "1.9rem",
                              color: "white",
                              icon: data.icon
                            }, null, 8, ["icon"])
                          ]),
                          default: withCtx(() => [
                            createVNode(VCardTitle, { class: "text-white" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(data.title), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode("p", { class: "clamp-text text-white mb-0" }, toDisplayString(data.text), 1)
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(VCardText, { class: "d-flex justify-space-between align-center flex-wrap" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-no-wrap" }, [
                              createVNode(VAvatar, {
                                size: "34",
                                image: data.avatarImg
                              }, null, 8, ["image"]),
                              createVNode("span", { class: "text-white ms-2" }, toDisplayString(data.avatarName), 1)
                            ]),
                            createVNode("div", { class: "d-flex align-center" }, [
                              createVNode(_component_IconBtn, {
                                icon: "bx-heart",
                                color: "white",
                                class: "me-1"
                              }),
                              createVNode("span", { class: "text-subtitle-2 text-white me-4" }, toDisplayString(data.likes), 1),
                              createVNode(_component_IconBtn, {
                                icon: "bx-share-alt",
                                color: "white",
                                class: "me-1"
                              }),
                              createVNode("span", { class: "text-subtitle-2 text-white" }, toDisplayString(data.share), 1)
                            ])
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1032, ["color"])
                  ]),
                  _: 2
                }, 1024);
              }), 64))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/pages/cards/card-basic/CardSolid.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "cards",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)}><p class="text-2xl mb-6"> Basic Cards </p>`);
      _push(ssrRenderComponent(CardBasic, null, null, _parent));
      _push(`<p class="text-2xl mb-6 mt-14"> Navigation Cards </p>`);
      _push(ssrRenderComponent(_sfc_main$2, null, null, _parent));
      _push(`<p class="text-2xl mt-14 mb-6"> Solid Cards </p>`);
      _push(ssrRenderComponent(_sfc_main$1, null, null, _parent));
      _push(`</div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cards.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
