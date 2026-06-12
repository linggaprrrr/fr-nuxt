import { withCtx, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VCard, a as VCardText } from './VCard-DLk5PTHl.mjs';
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

const _sfc_main = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(ssrRenderComponent(VRow, _attrs, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(ssrRenderComponent(VCol, { cols: "12" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCard, { title: "Headlines" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VCardText, { class: "d-flex flex-column gap-y-8" }, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(`<div${_scopeId4}><h1 class="text-h1"${_scopeId4}> Heading 1 </h1><span${_scopeId4}>font-size: 6rem / line-height: 6rem / font-weight: 300</span></div><div${_scopeId4}><h2 class="text-h2"${_scopeId4}> Heading 2 </h2><span${_scopeId4}>font-size: 3.75rem / line-height: 3.75rem / font-weight: 300</span></div><div${_scopeId4}><h3 class="text-h3"${_scopeId4}> Heading 3 </h3><span${_scopeId4}>font-size: 3rem / line-height: 3.125rem / font-weight: 400</span></div><div${_scopeId4}><h4 class="text-h4"${_scopeId4}> Heading 4 </h4><span${_scopeId4}>font-size: 2.125rem / line-height: 2.5rem / font-weight: 400</span></div><div${_scopeId4}><h5 class="text-h5"${_scopeId4}> Heading 5 </h5><span${_scopeId4}>font-size: 1.5rem / line-height: 2rem / font-weight: 400</span></div><div${_scopeId4}><h6 class="text-h6"${_scopeId4}> Heading 6 </h6><span${_scopeId4}>font-size: 1.25rem / line-height: 2rem / font-weight: 500</span></div>`);
                        } else {
                          return [
                            createVNode("div", null, [
                              createVNode("h1", { class: "text-h1" }, " Heading 1 "),
                              createVNode("span", null, "font-size: 6rem / line-height: 6rem / font-weight: 300")
                            ]),
                            createVNode("div", null, [
                              createVNode("h2", { class: "text-h2" }, " Heading 2 "),
                              createVNode("span", null, "font-size: 3.75rem / line-height: 3.75rem / font-weight: 300")
                            ]),
                            createVNode("div", null, [
                              createVNode("h3", { class: "text-h3" }, " Heading 3 "),
                              createVNode("span", null, "font-size: 3rem / line-height: 3.125rem / font-weight: 400")
                            ]),
                            createVNode("div", null, [
                              createVNode("h4", { class: "text-h4" }, " Heading 4 "),
                              createVNode("span", null, "font-size: 2.125rem / line-height: 2.5rem / font-weight: 400")
                            ]),
                            createVNode("div", null, [
                              createVNode("h5", { class: "text-h5" }, " Heading 5 "),
                              createVNode("span", null, "font-size: 1.5rem / line-height: 2rem / font-weight: 400")
                            ]),
                            createVNode("div", null, [
                              createVNode("h6", { class: "text-h6" }, " Heading 6 "),
                              createVNode("span", null, "font-size: 1.25rem / line-height: 2rem / font-weight: 500")
                            ])
                          ];
                        }
                      }),
                      _: 1
                    }, _parent4, _scopeId3));
                  } else {
                    return [
                      createVNode(VCardText, { class: "d-flex flex-column gap-y-8" }, {
                        default: withCtx(() => [
                          createVNode("div", null, [
                            createVNode("h1", { class: "text-h1" }, " Heading 1 "),
                            createVNode("span", null, "font-size: 6rem / line-height: 6rem / font-weight: 300")
                          ]),
                          createVNode("div", null, [
                            createVNode("h2", { class: "text-h2" }, " Heading 2 "),
                            createVNode("span", null, "font-size: 3.75rem / line-height: 3.75rem / font-weight: 300")
                          ]),
                          createVNode("div", null, [
                            createVNode("h3", { class: "text-h3" }, " Heading 3 "),
                            createVNode("span", null, "font-size: 3rem / line-height: 3.125rem / font-weight: 400")
                          ]),
                          createVNode("div", null, [
                            createVNode("h4", { class: "text-h4" }, " Heading 4 "),
                            createVNode("span", null, "font-size: 2.125rem / line-height: 2.5rem / font-weight: 400")
                          ]),
                          createVNode("div", null, [
                            createVNode("h5", { class: "text-h5" }, " Heading 5 "),
                            createVNode("span", null, "font-size: 1.5rem / line-height: 2rem / font-weight: 400")
                          ]),
                          createVNode("div", null, [
                            createVNode("h6", { class: "text-h6" }, " Heading 6 "),
                            createVNode("span", null, "font-size: 1.25rem / line-height: 2rem / font-weight: 500")
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
                createVNode(VCard, { title: "Headlines" }, {
                  default: withCtx(() => [
                    createVNode(VCardText, { class: "d-flex flex-column gap-y-8" }, {
                      default: withCtx(() => [
                        createVNode("div", null, [
                          createVNode("h1", { class: "text-h1" }, " Heading 1 "),
                          createVNode("span", null, "font-size: 6rem / line-height: 6rem / font-weight: 300")
                        ]),
                        createVNode("div", null, [
                          createVNode("h2", { class: "text-h2" }, " Heading 2 "),
                          createVNode("span", null, "font-size: 3.75rem / line-height: 3.75rem / font-weight: 300")
                        ]),
                        createVNode("div", null, [
                          createVNode("h3", { class: "text-h3" }, " Heading 3 "),
                          createVNode("span", null, "font-size: 3rem / line-height: 3.125rem / font-weight: 400")
                        ]),
                        createVNode("div", null, [
                          createVNode("h4", { class: "text-h4" }, " Heading 4 "),
                          createVNode("span", null, "font-size: 2.125rem / line-height: 2.5rem / font-weight: 400")
                        ]),
                        createVNode("div", null, [
                          createVNode("h5", { class: "text-h5" }, " Heading 5 "),
                          createVNode("span", null, "font-size: 1.5rem / line-height: 2rem / font-weight: 400")
                        ]),
                        createVNode("div", null, [
                          createVNode("h6", { class: "text-h6" }, " Heading 6 "),
                          createVNode("span", null, "font-size: 1.25rem / line-height: 2rem / font-weight: 500")
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
        _push2(ssrRenderComponent(VCol, { cols: "12" }, {
          default: withCtx((_2, _push3, _parent3, _scopeId2) => {
            if (_push3) {
              _push3(ssrRenderComponent(VCard, { title: "Texts" }, {
                default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                  if (_push4) {
                    _push4(ssrRenderComponent(VCardText, null, {
                      default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                        if (_push5) {
                          _push5(ssrRenderComponent(VRow, { "no-gutters": "" }, {
                            default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                              if (_push6) {
                                _push6(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "2"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<span class="text-subtitle-1 text-no-wrap"${_scopeId6}>text-subtitle-1</span>`);
                                    } else {
                                      return [
                                        createVNode("span", { class: "text-subtitle-1 text-no-wrap" }, "text-subtitle-1")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "10",
                                  class: "mb-6"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<p class="text-subtitle-1 text-truncate mb-1"${_scopeId6}> Cupcake ipsum dolor sit amet fruitcake donut chocolate. </p><span${_scopeId6}>font-size: 1rem / line-height: 1.75rem / font-weight: 400</span>`);
                                    } else {
                                      return [
                                        createVNode("p", { class: "text-subtitle-1 text-truncate mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                        createVNode("span", null, "font-size: 1rem / line-height: 1.75rem / font-weight: 400")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "2"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<span class="text-subtitle-2 text-no-wrap"${_scopeId6}>text-subtitle-2</span>`);
                                    } else {
                                      return [
                                        createVNode("span", { class: "text-subtitle-2 text-no-wrap" }, "text-subtitle-2")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "10",
                                  class: "mb-6"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<p class="text-subtitle-2 mb-1"${_scopeId6}> Cupcake ipsum dolor sit amet fruitcake donut chocolate. </p><span${_scopeId6}>font-size: 0.875rem / line-height: 1.375rem / font-weight: 500</span>`);
                                    } else {
                                      return [
                                        createVNode("p", { class: "text-subtitle-2 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                        createVNode("span", null, "font-size: 0.875rem / line-height: 1.375rem / font-weight: 500")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "2"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<span class="text-body-1 text-no-wrap"${_scopeId6}>text-body-1</span>`);
                                    } else {
                                      return [
                                        createVNode("span", { class: "text-body-1 text-no-wrap" }, "text-body-1")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "10",
                                  class: "mb-6"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<p class="text-body-1 mb-1"${_scopeId6}> Cupcake ipsum dolor sit amet fruitcake donut chocolate. </p><span${_scopeId6}>font-size: 1rem / line-height: 1.5rem / font-weight: 400</span>`);
                                    } else {
                                      return [
                                        createVNode("p", { class: "text-body-1 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                        createVNode("span", null, "font-size: 1rem / line-height: 1.5rem / font-weight: 400")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "2"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<span class="text-body-2 text-no-wrap"${_scopeId6}>text-body-2</span>`);
                                    } else {
                                      return [
                                        createVNode("span", { class: "text-body-2 text-no-wrap" }, "text-body-2")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "10",
                                  class: "mb-6"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<p class="text-body-2 mb-1"${_scopeId6}> Cupcake ipsum dolor sit amet fruitcake donut chocolate. </p><span${_scopeId6}>font-size: 0.875rem / line-height: 1.25rem / font-weight: 400</span>`);
                                    } else {
                                      return [
                                        createVNode("p", { class: "text-body-2 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                        createVNode("span", null, "font-size: 0.875rem / line-height: 1.25rem / font-weight: 400")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "2"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<span class="text-caption"${_scopeId6}>text-caption</span>`);
                                    } else {
                                      return [
                                        createVNode("span", { class: "text-caption" }, "text-caption")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "10",
                                  class: "mb-6"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<p class="text-caption mb-1"${_scopeId6}> Cupcake ipsum dolor sit amet fruitcake donut chocolate. </p><span${_scopeId6}>font-size: 0.75rem / line-height: 1.25rem / font-weight: 400</span>`);
                                    } else {
                                      return [
                                        createVNode("p", { class: "text-caption mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                        createVNode("span", null, "font-size: 0.75rem / line-height: 1.25rem / font-weight: 400")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "2"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<span class="text-overline text-no-wrap"${_scopeId6}>text-overline</span>`);
                                    } else {
                                      return [
                                        createVNode("span", { class: "text-overline text-no-wrap" }, "text-overline")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "10",
                                  class: "mb-6"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<p class="text-overline mb-1"${_scopeId6}> Cupcake ipsum dolor sit amet fruitcake donut chocolate. </p><span${_scopeId6}>font-size: 0.75rem / line-height: 2rem / font-weight: 500</span>`);
                                    } else {
                                      return [
                                        createVNode("p", { class: "text-overline mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                        createVNode("span", null, "font-size: 0.75rem / line-height: 2rem / font-weight: 500")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "2"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<span class="text-button"${_scopeId6}>text-button</span>`);
                                    } else {
                                      return [
                                        createVNode("span", { class: "text-button" }, "text-button")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                                _push6(ssrRenderComponent(VCol, {
                                  cols: "12",
                                  md: "10",
                                  class: "mb-6"
                                }, {
                                  default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                    if (_push7) {
                                      _push7(`<p class="text-button mb-1"${_scopeId6}> Cupcake ipsum dolor sit amet fruitcake donut chocolate. </p><span${_scopeId6}>font-size: 0.875rem / line-height: 2.25rem / font-weight: 500</span>`);
                                    } else {
                                      return [
                                        createVNode("p", { class: "text-button mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                        createVNode("span", null, "font-size: 0.875rem / line-height: 2.25rem / font-weight: 500")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent6, _scopeId5));
                              } else {
                                return [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "text-subtitle-1 text-no-wrap" }, "text-subtitle-1")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "10",
                                    class: "mb-6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-subtitle-1 text-truncate mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                      createVNode("span", null, "font-size: 1rem / line-height: 1.75rem / font-weight: 400")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "text-subtitle-2 text-no-wrap" }, "text-subtitle-2")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "10",
                                    class: "mb-6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-subtitle-2 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                      createVNode("span", null, "font-size: 0.875rem / line-height: 1.375rem / font-weight: 500")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "text-body-1 text-no-wrap" }, "text-body-1")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "10",
                                    class: "mb-6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-body-1 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                      createVNode("span", null, "font-size: 1rem / line-height: 1.5rem / font-weight: 400")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "text-body-2 text-no-wrap" }, "text-body-2")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "10",
                                    class: "mb-6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-body-2 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                      createVNode("span", null, "font-size: 0.875rem / line-height: 1.25rem / font-weight: 400")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "text-caption" }, "text-caption")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "10",
                                    class: "mb-6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-caption mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                      createVNode("span", null, "font-size: 0.75rem / line-height: 1.25rem / font-weight: 400")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "text-overline text-no-wrap" }, "text-overline")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "10",
                                    class: "mb-6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-overline mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                      createVNode("span", null, "font-size: 0.75rem / line-height: 2rem / font-weight: 500")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "2"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "text-button" }, "text-button")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "10",
                                    class: "mb-6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "text-button mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                      createVNode("span", null, "font-size: 0.875rem / line-height: 2.25rem / font-weight: 500")
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
                            createVNode(VRow, { "no-gutters": "" }, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-subtitle-1 text-no-wrap" }, "text-subtitle-1")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "10",
                                  class: "mb-6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-subtitle-1 text-truncate mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                    createVNode("span", null, "font-size: 1rem / line-height: 1.75rem / font-weight: 400")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-subtitle-2 text-no-wrap" }, "text-subtitle-2")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "10",
                                  class: "mb-6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-subtitle-2 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                    createVNode("span", null, "font-size: 0.875rem / line-height: 1.375rem / font-weight: 500")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-body-1 text-no-wrap" }, "text-body-1")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "10",
                                  class: "mb-6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-body-1 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                    createVNode("span", null, "font-size: 1rem / line-height: 1.5rem / font-weight: 400")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-body-2 text-no-wrap" }, "text-body-2")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "10",
                                  class: "mb-6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-body-2 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                    createVNode("span", null, "font-size: 0.875rem / line-height: 1.25rem / font-weight: 400")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-caption" }, "text-caption")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "10",
                                  class: "mb-6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-caption mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                    createVNode("span", null, "font-size: 0.75rem / line-height: 1.25rem / font-weight: 400")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-overline text-no-wrap" }, "text-overline")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "10",
                                  class: "mb-6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-overline mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                    createVNode("span", null, "font-size: 0.75rem / line-height: 2rem / font-weight: 500")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "2"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "text-button" }, "text-button")
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "10",
                                  class: "mb-6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode("p", { class: "text-button mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                    createVNode("span", null, "font-size: 0.875rem / line-height: 2.25rem / font-weight: 500")
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
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode(VRow, { "no-gutters": "" }, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "2"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-subtitle-1 text-no-wrap" }, "text-subtitle-1")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "10",
                                class: "mb-6"
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "text-subtitle-1 text-truncate mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                  createVNode("span", null, "font-size: 1rem / line-height: 1.75rem / font-weight: 400")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "2"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-subtitle-2 text-no-wrap" }, "text-subtitle-2")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "10",
                                class: "mb-6"
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "text-subtitle-2 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                  createVNode("span", null, "font-size: 0.875rem / line-height: 1.375rem / font-weight: 500")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "2"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-body-1 text-no-wrap" }, "text-body-1")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "10",
                                class: "mb-6"
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "text-body-1 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                  createVNode("span", null, "font-size: 1rem / line-height: 1.5rem / font-weight: 400")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "2"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-body-2 text-no-wrap" }, "text-body-2")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "10",
                                class: "mb-6"
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "text-body-2 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                  createVNode("span", null, "font-size: 0.875rem / line-height: 1.25rem / font-weight: 400")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "2"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-caption" }, "text-caption")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "10",
                                class: "mb-6"
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "text-caption mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                  createVNode("span", null, "font-size: 0.75rem / line-height: 1.25rem / font-weight: 400")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "2"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-overline text-no-wrap" }, "text-overline")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "10",
                                class: "mb-6"
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "text-overline mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                  createVNode("span", null, "font-size: 0.75rem / line-height: 2rem / font-weight: 500")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "2"
                              }, {
                                default: withCtx(() => [
                                  createVNode("span", { class: "text-button" }, "text-button")
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "10",
                                class: "mb-6"
                              }, {
                                default: withCtx(() => [
                                  createVNode("p", { class: "text-button mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                  createVNode("span", null, "font-size: 0.875rem / line-height: 2.25rem / font-weight: 500")
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
                createVNode(VCard, { title: "Texts" }, {
                  default: withCtx(() => [
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VRow, { "no-gutters": "" }, {
                          default: withCtx(() => [
                            createVNode(VCol, {
                              cols: "12",
                              md: "2"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-subtitle-1 text-no-wrap" }, "text-subtitle-1")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "10",
                              class: "mb-6"
                            }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "text-subtitle-1 text-truncate mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                createVNode("span", null, "font-size: 1rem / line-height: 1.75rem / font-weight: 400")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "2"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-subtitle-2 text-no-wrap" }, "text-subtitle-2")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "10",
                              class: "mb-6"
                            }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "text-subtitle-2 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                createVNode("span", null, "font-size: 0.875rem / line-height: 1.375rem / font-weight: 500")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "2"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-body-1 text-no-wrap" }, "text-body-1")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "10",
                              class: "mb-6"
                            }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "text-body-1 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                createVNode("span", null, "font-size: 1rem / line-height: 1.5rem / font-weight: 400")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "2"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-body-2 text-no-wrap" }, "text-body-2")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "10",
                              class: "mb-6"
                            }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "text-body-2 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                createVNode("span", null, "font-size: 0.875rem / line-height: 1.25rem / font-weight: 400")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "2"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-caption" }, "text-caption")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "10",
                              class: "mb-6"
                            }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "text-caption mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                createVNode("span", null, "font-size: 0.75rem / line-height: 1.25rem / font-weight: 400")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "2"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-overline text-no-wrap" }, "text-overline")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "10",
                              class: "mb-6"
                            }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "text-overline mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                createVNode("span", null, "font-size: 0.75rem / line-height: 2rem / font-weight: 500")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "2"
                            }, {
                              default: withCtx(() => [
                                createVNode("span", { class: "text-button" }, "text-button")
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, {
                              cols: "12",
                              md: "10",
                              class: "mb-6"
                            }, {
                              default: withCtx(() => [
                                createVNode("p", { class: "text-button mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                                createVNode("span", null, "font-size: 0.875rem / line-height: 2.25rem / font-weight: 500")
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
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VCard, { title: "Headlines" }, {
                default: withCtx(() => [
                  createVNode(VCardText, { class: "d-flex flex-column gap-y-8" }, {
                    default: withCtx(() => [
                      createVNode("div", null, [
                        createVNode("h1", { class: "text-h1" }, " Heading 1 "),
                        createVNode("span", null, "font-size: 6rem / line-height: 6rem / font-weight: 300")
                      ]),
                      createVNode("div", null, [
                        createVNode("h2", { class: "text-h2" }, " Heading 2 "),
                        createVNode("span", null, "font-size: 3.75rem / line-height: 3.75rem / font-weight: 300")
                      ]),
                      createVNode("div", null, [
                        createVNode("h3", { class: "text-h3" }, " Heading 3 "),
                        createVNode("span", null, "font-size: 3rem / line-height: 3.125rem / font-weight: 400")
                      ]),
                      createVNode("div", null, [
                        createVNode("h4", { class: "text-h4" }, " Heading 4 "),
                        createVNode("span", null, "font-size: 2.125rem / line-height: 2.5rem / font-weight: 400")
                      ]),
                      createVNode("div", null, [
                        createVNode("h5", { class: "text-h5" }, " Heading 5 "),
                        createVNode("span", null, "font-size: 1.5rem / line-height: 2rem / font-weight: 400")
                      ]),
                      createVNode("div", null, [
                        createVNode("h6", { class: "text-h6" }, " Heading 6 "),
                        createVNode("span", null, "font-size: 1.25rem / line-height: 2rem / font-weight: 500")
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
          createVNode(VCol, { cols: "12" }, {
            default: withCtx(() => [
              createVNode(VCard, { title: "Texts" }, {
                default: withCtx(() => [
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VRow, { "no-gutters": "" }, {
                        default: withCtx(() => [
                          createVNode(VCol, {
                            cols: "12",
                            md: "2"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-subtitle-1 text-no-wrap" }, "text-subtitle-1")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "10",
                            class: "mb-6"
                          }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "text-subtitle-1 text-truncate mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                              createVNode("span", null, "font-size: 1rem / line-height: 1.75rem / font-weight: 400")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "2"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-subtitle-2 text-no-wrap" }, "text-subtitle-2")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "10",
                            class: "mb-6"
                          }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "text-subtitle-2 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                              createVNode("span", null, "font-size: 0.875rem / line-height: 1.375rem / font-weight: 500")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "2"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-body-1 text-no-wrap" }, "text-body-1")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "10",
                            class: "mb-6"
                          }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "text-body-1 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                              createVNode("span", null, "font-size: 1rem / line-height: 1.5rem / font-weight: 400")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "2"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-body-2 text-no-wrap" }, "text-body-2")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "10",
                            class: "mb-6"
                          }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "text-body-2 mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                              createVNode("span", null, "font-size: 0.875rem / line-height: 1.25rem / font-weight: 400")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "2"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-caption" }, "text-caption")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "10",
                            class: "mb-6"
                          }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "text-caption mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                              createVNode("span", null, "font-size: 0.75rem / line-height: 1.25rem / font-weight: 400")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "2"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-overline text-no-wrap" }, "text-overline")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "10",
                            class: "mb-6"
                          }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "text-overline mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                              createVNode("span", null, "font-size: 0.75rem / line-height: 2rem / font-weight: 500")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "2"
                          }, {
                            default: withCtx(() => [
                              createVNode("span", { class: "text-button" }, "text-button")
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "10",
                            class: "mb-6"
                          }, {
                            default: withCtx(() => [
                              createVNode("p", { class: "text-button mb-1" }, " Cupcake ipsum dolor sit amet fruitcake donut chocolate. "),
                              createVNode("span", null, "font-size: 0.875rem / line-height: 2.25rem / font-weight: 500")
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
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/typography.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const typography = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { typography as default };
