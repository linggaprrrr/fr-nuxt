import { defineComponent, shallowRef, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, toRef, withDirectives, vShow, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { e as genericComponent, V as VAvatar, an as VImg, aA as VListItem, bh as VListItemTitle, bi as VListItemSubtitle, c as VDivider, b as VIcon, p as propsFactory, t as useBackgroundColor, ac as useRounded, f as useLocale, A as useTextColor, aY as useTheme, aa as useLocation, h as useRender, bg as pickWithRest, T as MaybeTransition, ao as makeTransitionProps, M as makeThemeProps, N as makeTagProps, ag as makeRoundedProps, ai as makeLocationProps, O as makeComponentProps, I as IconValue } from './server.mjs';
import { V as VMenu, a as VList } from './VMenu-CmFsZZaF.mjs';
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
import './index-ewhk7FTz.mjs';
import './ssrBoot-BtvJZs44.mjs';
import './VListSubheader-BbgyaiQc.mjs';
import './forwardRefs-BSTjJZPU.mjs';
import './dialog-transition-D66jL1n_.mjs';

const makeVListItemActionProps = propsFactory({
  start: Boolean,
  end: Boolean,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VListItemAction");
const VListItemAction = genericComponent()({
  name: "VListItemAction",
  props: makeVListItemActionProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    useRender(() => createVNode(props.tag, {
      "class": ["v-list-item-action", {
        "v-list-item-action--start": props.start,
        "v-list-item-action--end": props.end
      }, props.class],
      "style": props.style
    }, slots));
    return {};
  }
});
const makeVBadgeProps = propsFactory({
  bordered: Boolean,
  color: String,
  content: [Number, String],
  dot: Boolean,
  floating: Boolean,
  icon: IconValue,
  inline: Boolean,
  label: {
    type: String,
    default: "$vuetify.badge"
  },
  max: [Number, String],
  modelValue: {
    type: Boolean,
    default: true
  },
  offsetX: [Number, String],
  offsetY: [Number, String],
  textColor: String,
  ...makeComponentProps(),
  ...makeLocationProps({
    location: "top end"
  }),
  ...makeRoundedProps(),
  ...makeTagProps(),
  ...makeThemeProps(),
  ...makeTransitionProps({
    transition: "scale-rotate-transition"
  })
}, "VBadge");
const VBadge = genericComponent()({
  name: "VBadge",
  inheritAttrs: false,
  props: makeVBadgeProps(),
  setup(props, ctx) {
    const {
      backgroundColorClasses,
      backgroundColorStyles
    } = useBackgroundColor(toRef(props, "color"));
    const {
      roundedClasses
    } = useRounded(props);
    const {
      t
    } = useLocale();
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(toRef(props, "textColor"));
    const {
      themeClasses
    } = useTheme();
    const {
      locationStyles
    } = useLocation(props, true, (side) => {
      var _a, _b;
      const base = props.floating ? props.dot ? 2 : 4 : props.dot ? 8 : 12;
      return base + (["top", "bottom"].includes(side) ? +((_a = props.offsetY) != null ? _a : 0) : ["left", "right"].includes(side) ? +((_b = props.offsetX) != null ? _b : 0) : 0);
    });
    useRender(() => {
      const value = Number(props.content);
      const content = !props.max || isNaN(value) ? props.content : value <= +props.max ? value : `${props.max}+`;
      const [badgeAttrs, attrs] = pickWithRest(ctx.attrs, ["aria-atomic", "aria-label", "aria-live", "role", "title"]);
      return createVNode(props.tag, mergeProps({
        "class": ["v-badge", {
          "v-badge--bordered": props.bordered,
          "v-badge--dot": props.dot,
          "v-badge--floating": props.floating,
          "v-badge--inline": props.inline
        }, props.class]
      }, attrs, {
        "style": props.style
      }), {
        default: () => {
          var _a, _b;
          return [createVNode("div", {
            "class": "v-badge__wrapper"
          }, [(_b = (_a = ctx.slots).default) == null ? void 0 : _b.call(_a), createVNode(MaybeTransition, {
            "transition": props.transition
          }, {
            default: () => {
              var _a2, _b2;
              return [withDirectives(createVNode("span", mergeProps({
                "class": ["v-badge__badge", themeClasses.value, backgroundColorClasses.value, roundedClasses.value, textColorClasses.value],
                "style": [backgroundColorStyles.value, textColorStyles.value, props.inline ? {} : locationStyles.value],
                "aria-atomic": "true",
                "aria-label": t(props.label, value),
                "aria-live": "polite",
                "role": "status"
              }, badgeAttrs), [props.dot ? void 0 : ctx.slots.badge ? (_b2 = (_a2 = ctx.slots).badge) == null ? void 0 : _b2.call(_a2) : props.icon ? createVNode(VIcon, {
                "icon": props.icon
              }, null) : content]), [[vShow, props.modelValue]])];
            }
          })])];
        }
      });
    });
    return {};
  }
});
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "UserProfile",
  __ssrInlineRender: true,
  setup(__props) {
    const handleLogout = () => {
    };
    const user = shallowRef(null);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VBadge, mergeProps({
        dot: "",
        location: "bottom right",
        "offset-x": "3",
        "offset-y": "3",
        color: "success",
        bordered: ""
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VAvatar, {
              class: "cursor-pointer",
              color: "primary",
              variant: "tonal"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                var _a, _b;
                if (_push3) {
                  _push3(ssrRenderComponent(VImg, {
                    src: (_a = unref(user)) == null ? void 0 : _a.picture
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VMenu, {
                    activator: "parent",
                    width: "230",
                    location: "bottom end",
                    offset: "14px"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VList, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VListItem, null, {
                                prepend: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VListItemAction, { start: "" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VBadge, {
                                            dot: "",
                                            location: "bottom right",
                                            "offset-x": "3",
                                            "offset-y": "3",
                                            color: "success"
                                          }, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VAvatar, {
                                                  color: "primary",
                                                  variant: "tonal"
                                                }, {
                                                  default: withCtx((_8, _push9, _parent9, _scopeId8) => {
                                                    var _a2, _b2;
                                                    if (_push9) {
                                                      _push9(ssrRenderComponent(VImg, {
                                                        src: (_a2 = unref(user)) == null ? void 0 : _a2.picture
                                                      }, null, _parent9, _scopeId8));
                                                    } else {
                                                      return [
                                                        createVNode(VImg, {
                                                          src: (_b2 = unref(user)) == null ? void 0 : _b2.picture
                                                        }, null, 8, ["src"])
                                                      ];
                                                    }
                                                  }),
                                                  _: 1
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VAvatar, {
                                                    color: "primary",
                                                    variant: "tonal"
                                                  }, {
                                                    default: withCtx(() => {
                                                      var _a2;
                                                      return [
                                                        createVNode(VImg, {
                                                          src: (_a2 = unref(user)) == null ? void 0 : _a2.picture
                                                        }, null, 8, ["src"])
                                                      ];
                                                    }),
                                                    _: 1
                                                  })
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VBadge, {
                                              dot: "",
                                              location: "bottom right",
                                              "offset-x": "3",
                                              "offset-y": "3",
                                              color: "success"
                                            }, {
                                              default: withCtx(() => [
                                                createVNode(VAvatar, {
                                                  color: "primary",
                                                  variant: "tonal"
                                                }, {
                                                  default: withCtx(() => {
                                                    var _a2;
                                                    return [
                                                      createVNode(VImg, {
                                                        src: (_a2 = unref(user)) == null ? void 0 : _a2.picture
                                                      }, null, 8, ["src"])
                                                    ];
                                                  }),
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
                                      createVNode(VListItemAction, { start: "" }, {
                                        default: withCtx(() => [
                                          createVNode(VBadge, {
                                            dot: "",
                                            location: "bottom right",
                                            "offset-x": "3",
                                            "offset-y": "3",
                                            color: "success"
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(VAvatar, {
                                                color: "primary",
                                                variant: "tonal"
                                              }, {
                                                default: withCtx(() => {
                                                  var _a2;
                                                  return [
                                                    createVNode(VImg, {
                                                      src: (_a2 = unref(user)) == null ? void 0 : _a2.picture
                                                    }, null, 8, ["src"])
                                                  ];
                                                }),
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
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VListItemTitle, { class: "font-weight-semibold" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        var _a2, _b2;
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(((_a2 = unref(user)) == null ? void 0 : _a2.name) || "Unknown User")}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(((_b2 = unref(user)) == null ? void 0 : _b2.name) || "Unknown User"), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VListItemSubtitle, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        var _a2, _b2;
                                        if (_push7) {
                                          _push7(`${ssrInterpolate(((_a2 = unref(user)) == null ? void 0 : _a2.role) || "Unknown Role")}`);
                                        } else {
                                          return [
                                            createTextVNode(toDisplayString(((_b2 = unref(user)) == null ? void 0 : _b2.role) || "Unknown Role"), 1)
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VListItemTitle, { class: "font-weight-semibold" }, {
                                        default: withCtx(() => {
                                          var _a2;
                                          return [
                                            createTextVNode(toDisplayString(((_a2 = unref(user)) == null ? void 0 : _a2.name) || "Unknown User"), 1)
                                          ];
                                        }),
                                        _: 1
                                      }),
                                      createVNode(VListItemSubtitle, null, {
                                        default: withCtx(() => {
                                          var _a2;
                                          return [
                                            createTextVNode(toDisplayString(((_a2 = unref(user)) == null ? void 0 : _a2.role) || "Unknown Role"), 1)
                                          ];
                                        }),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VDivider, { class: "my-2" }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VListItem, { link: "" }, {
                                prepend: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VIcon, {
                                      class: "me-2",
                                      icon: "bx-user",
                                      size: "22"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VIcon, {
                                        class: "me-2",
                                        icon: "bx-user",
                                        size: "22"
                                      })
                                    ];
                                  }
                                }),
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VListItemTitle, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Profile`);
                                        } else {
                                          return [
                                            createTextVNode("Profile")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VListItemTitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Profile")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VDivider, { class: "my-2" }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VListItem, { onClick: handleLogout }, {
                                prepend: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VIcon, {
                                      class: "me-2",
                                      icon: "bx-log-out",
                                      size: "22"
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VIcon, {
                                        class: "me-2",
                                        icon: "bx-log-out",
                                        size: "22"
                                      })
                                    ];
                                  }
                                }),
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VListItemTitle, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Logout`);
                                        } else {
                                          return [
                                            createTextVNode("Logout")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VListItemTitle, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Logout")
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
                                createVNode(VListItem, null, {
                                  prepend: withCtx(() => [
                                    createVNode(VListItemAction, { start: "" }, {
                                      default: withCtx(() => [
                                        createVNode(VBadge, {
                                          dot: "",
                                          location: "bottom right",
                                          "offset-x": "3",
                                          "offset-y": "3",
                                          color: "success"
                                        }, {
                                          default: withCtx(() => [
                                            createVNode(VAvatar, {
                                              color: "primary",
                                              variant: "tonal"
                                            }, {
                                              default: withCtx(() => {
                                                var _a2;
                                                return [
                                                  createVNode(VImg, {
                                                    src: (_a2 = unref(user)) == null ? void 0 : _a2.picture
                                                  }, null, 8, ["src"])
                                                ];
                                              }),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  default: withCtx(() => [
                                    createVNode(VListItemTitle, { class: "font-weight-semibold" }, {
                                      default: withCtx(() => {
                                        var _a2;
                                        return [
                                          createTextVNode(toDisplayString(((_a2 = unref(user)) == null ? void 0 : _a2.name) || "Unknown User"), 1)
                                        ];
                                      }),
                                      _: 1
                                    }),
                                    createVNode(VListItemSubtitle, null, {
                                      default: withCtx(() => {
                                        var _a2;
                                        return [
                                          createTextVNode(toDisplayString(((_a2 = unref(user)) == null ? void 0 : _a2.role) || "Unknown Role"), 1)
                                        ];
                                      }),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VDivider, { class: "my-2" }),
                                createVNode(VListItem, { link: "" }, {
                                  prepend: withCtx(() => [
                                    createVNode(VIcon, {
                                      class: "me-2",
                                      icon: "bx-user",
                                      size: "22"
                                    })
                                  ]),
                                  default: withCtx(() => [
                                    createVNode(VListItemTitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Profile")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VDivider, { class: "my-2" }),
                                createVNode(VListItem, { onClick: handleLogout }, {
                                  prepend: withCtx(() => [
                                    createVNode(VIcon, {
                                      class: "me-2",
                                      icon: "bx-log-out",
                                      size: "22"
                                    })
                                  ]),
                                  default: withCtx(() => [
                                    createVNode(VListItemTitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Logout")
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
                          createVNode(VList, null, {
                            default: withCtx(() => [
                              createVNode(VListItem, null, {
                                prepend: withCtx(() => [
                                  createVNode(VListItemAction, { start: "" }, {
                                    default: withCtx(() => [
                                      createVNode(VBadge, {
                                        dot: "",
                                        location: "bottom right",
                                        "offset-x": "3",
                                        "offset-y": "3",
                                        color: "success"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VAvatar, {
                                            color: "primary",
                                            variant: "tonal"
                                          }, {
                                            default: withCtx(() => {
                                              var _a2;
                                              return [
                                                createVNode(VImg, {
                                                  src: (_a2 = unref(user)) == null ? void 0 : _a2.picture
                                                }, null, 8, ["src"])
                                              ];
                                            }),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })
                                ]),
                                default: withCtx(() => [
                                  createVNode(VListItemTitle, { class: "font-weight-semibold" }, {
                                    default: withCtx(() => {
                                      var _a2;
                                      return [
                                        createTextVNode(toDisplayString(((_a2 = unref(user)) == null ? void 0 : _a2.name) || "Unknown User"), 1)
                                      ];
                                    }),
                                    _: 1
                                  }),
                                  createVNode(VListItemSubtitle, null, {
                                    default: withCtx(() => {
                                      var _a2;
                                      return [
                                        createTextVNode(toDisplayString(((_a2 = unref(user)) == null ? void 0 : _a2.role) || "Unknown Role"), 1)
                                      ];
                                    }),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VDivider, { class: "my-2" }),
                              createVNode(VListItem, { link: "" }, {
                                prepend: withCtx(() => [
                                  createVNode(VIcon, {
                                    class: "me-2",
                                    icon: "bx-user",
                                    size: "22"
                                  })
                                ]),
                                default: withCtx(() => [
                                  createVNode(VListItemTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Profile")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VDivider, { class: "my-2" }),
                              createVNode(VListItem, { onClick: handleLogout }, {
                                prepend: withCtx(() => [
                                  createVNode(VIcon, {
                                    class: "me-2",
                                    icon: "bx-log-out",
                                    size: "22"
                                  })
                                ]),
                                default: withCtx(() => [
                                  createVNode(VListItemTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Logout")
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
                    createVNode(VImg, {
                      src: (_b = unref(user)) == null ? void 0 : _b.picture
                    }, null, 8, ["src"]),
                    createVNode(VMenu, {
                      activator: "parent",
                      width: "230",
                      location: "bottom end",
                      offset: "14px"
                    }, {
                      default: withCtx(() => [
                        createVNode(VList, null, {
                          default: withCtx(() => [
                            createVNode(VListItem, null, {
                              prepend: withCtx(() => [
                                createVNode(VListItemAction, { start: "" }, {
                                  default: withCtx(() => [
                                    createVNode(VBadge, {
                                      dot: "",
                                      location: "bottom right",
                                      "offset-x": "3",
                                      "offset-y": "3",
                                      color: "success"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VAvatar, {
                                          color: "primary",
                                          variant: "tonal"
                                        }, {
                                          default: withCtx(() => {
                                            var _a2;
                                            return [
                                              createVNode(VImg, {
                                                src: (_a2 = unref(user)) == null ? void 0 : _a2.picture
                                              }, null, 8, ["src"])
                                            ];
                                          }),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              default: withCtx(() => [
                                createVNode(VListItemTitle, { class: "font-weight-semibold" }, {
                                  default: withCtx(() => {
                                    var _a2;
                                    return [
                                      createTextVNode(toDisplayString(((_a2 = unref(user)) == null ? void 0 : _a2.name) || "Unknown User"), 1)
                                    ];
                                  }),
                                  _: 1
                                }),
                                createVNode(VListItemSubtitle, null, {
                                  default: withCtx(() => {
                                    var _a2;
                                    return [
                                      createTextVNode(toDisplayString(((_a2 = unref(user)) == null ? void 0 : _a2.role) || "Unknown Role"), 1)
                                    ];
                                  }),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VDivider, { class: "my-2" }),
                            createVNode(VListItem, { link: "" }, {
                              prepend: withCtx(() => [
                                createVNode(VIcon, {
                                  class: "me-2",
                                  icon: "bx-user",
                                  size: "22"
                                })
                              ]),
                              default: withCtx(() => [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Profile")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VDivider, { class: "my-2" }),
                            createVNode(VListItem, { onClick: handleLogout }, {
                              prepend: withCtx(() => [
                                createVNode(VIcon, {
                                  class: "me-2",
                                  icon: "bx-log-out",
                                  size: "22"
                                })
                              ]),
                              default: withCtx(() => [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Logout")
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
              createVNode(VAvatar, {
                class: "cursor-pointer",
                color: "primary",
                variant: "tonal"
              }, {
                default: withCtx(() => {
                  var _a;
                  return [
                    createVNode(VImg, {
                      src: (_a = unref(user)) == null ? void 0 : _a.picture
                    }, null, 8, ["src"]),
                    createVNode(VMenu, {
                      activator: "parent",
                      width: "230",
                      location: "bottom end",
                      offset: "14px"
                    }, {
                      default: withCtx(() => [
                        createVNode(VList, null, {
                          default: withCtx(() => [
                            createVNode(VListItem, null, {
                              prepend: withCtx(() => [
                                createVNode(VListItemAction, { start: "" }, {
                                  default: withCtx(() => [
                                    createVNode(VBadge, {
                                      dot: "",
                                      location: "bottom right",
                                      "offset-x": "3",
                                      "offset-y": "3",
                                      color: "success"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VAvatar, {
                                          color: "primary",
                                          variant: "tonal"
                                        }, {
                                          default: withCtx(() => {
                                            var _a2;
                                            return [
                                              createVNode(VImg, {
                                                src: (_a2 = unref(user)) == null ? void 0 : _a2.picture
                                              }, null, 8, ["src"])
                                            ];
                                          }),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })
                              ]),
                              default: withCtx(() => [
                                createVNode(VListItemTitle, { class: "font-weight-semibold" }, {
                                  default: withCtx(() => {
                                    var _a2;
                                    return [
                                      createTextVNode(toDisplayString(((_a2 = unref(user)) == null ? void 0 : _a2.name) || "Unknown User"), 1)
                                    ];
                                  }),
                                  _: 1
                                }),
                                createVNode(VListItemSubtitle, null, {
                                  default: withCtx(() => {
                                    var _a2;
                                    return [
                                      createTextVNode(toDisplayString(((_a2 = unref(user)) == null ? void 0 : _a2.role) || "Unknown Role"), 1)
                                    ];
                                  }),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VDivider, { class: "my-2" }),
                            createVNode(VListItem, { link: "" }, {
                              prepend: withCtx(() => [
                                createVNode(VIcon, {
                                  class: "me-2",
                                  icon: "bx-user",
                                  size: "22"
                                })
                              ]),
                              default: withCtx(() => [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Profile")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VDivider, { class: "my-2" }),
                            createVNode(VListItem, { onClick: handleLogout }, {
                              prepend: withCtx(() => [
                                createVNode(VIcon, {
                                  class: "me-2",
                                  icon: "bx-log-out",
                                  size: "22"
                                })
                              ]),
                              default: withCtx(() => [
                                createVNode(VListItemTitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode("Logout")
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
                }),
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("layouts/components/UserProfile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
