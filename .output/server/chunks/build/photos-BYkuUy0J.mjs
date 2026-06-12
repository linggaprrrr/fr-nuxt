import { defineComponent, ref, watch, withCtx, createVNode, createTextVNode, toDisplayString, withDirectives, vShow, createBlock, createCommentVNode, openBlock, Fragment, renderList, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { u as useFaces } from './useFaces-BVaqO9sD.mjs';
import { V as VExpandTransition } from './index-ewhk7FTz.mjs';
import { V as VContainer } from './VContainer-CZliQBxk.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { _ as _export_sfc, b1 as VProgressCircular, a as VBtn, c as VDivider } from './server.mjs';
import { V as VCard, c as VCardTitle, d as VCardSubtitle, b as VCardActions, a as VCardText } from './VCard-DLk5PTHl.mjs';
import { V as VSpacer } from './VSpacer-CQpJ4yRI.mjs';
import { V as VPagination } from './VPagination-z_-yTplN.mjs';
import 'axios';
import './useAuth-azgWfqZX.mjs';
import './authFetch-5wQjlWwJ.mjs';
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

const limit = 24;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "photos",
  __ssrInlineRender: true,
  setup(__props) {
    const { fetchFaceSearch } = useFaces();
    const page = ref(1);
    const total = ref(0);
    const isLoading = ref(false);
    const showDetail = ref({});
    ref(true);
    const userPhoto = ref([]);
    const imageSizes = ref({});
    const imageRefs = /* @__PURE__ */ new Map();
    async function fetchPhotos() {
      isLoading.value = true;
      try {
        const res = await fetchFaceSearch({ page: page.value, limit });
        if ((res == null ? void 0 : res.status_code) === 200) {
          userPhoto.value = JSON.parse(JSON.stringify(res.results));
          total.value = res.total_items;
          console.log(userPhoto.value);
          const stored = localStorage.getItem("boundingBoxes");
          const boxesFromStorage = stored ? JSON.parse(stored) : [];
          userPhoto.value.forEach((photo) => {
            const matched = boxesFromStorage.find((item) => item.id === photo.photo_id);
            if (matched) {
              photo.bounding_boxes_db = matched.boundingBoxes;
            }
          });
          await nextTick();
          userPhoto.value.forEach((photo) => updateImageSize(photo.photo_id));
        } else {
          userPhoto.value = [];
        }
      } catch (err) {
        console.error(err);
        userPhoto.value = [];
      } finally {
        isLoading.value = false;
      }
    }
    function onImageLoad(e, photoId) {
      const img = e.target;
      imageRefs.set(photoId, img);
      updateImageSize(photoId);
    }
    function updateImageSize(photoId) {
      const img = imageRefs.get(photoId);
      if (img) {
        imageSizes.value[photoId] = {
          displayWidth: img.clientWidth,
          displayHeight: img.clientHeight,
          naturalWidth: img.naturalWidth,
          naturalHeight: img.naturalHeight
        };
      }
    }
    function getBoxStyle(box, size) {
      const scaleX = size.displayWidth / size.naturalWidth;
      const scaleY = size.displayHeight / size.naturalHeight;
      return {
        left: `${box.x * scaleX}px`,
        top: `${box.y * scaleY}px`,
        width: `${box.w * scaleX}px`,
        height: `${box.h * scaleY}px`
      };
    }
    function formatDate(dateStr) {
      const date = new Date(dateStr);
      return date.toLocaleString();
    }
    async function downloadPhoto(url) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = URL.createObjectURL(blob);
        const link = (void 0).createElement("a");
        link.href = blobUrl;
        link.download = "";
        link.click();
        URL.revokeObjectURL(blobUrl);
      } catch (err) {
        console.error("Download failed:", err);
      }
    }
    function toggleDetail(id) {
      showDetail.value[id] = !showDetail.value[id];
    }
    function nextPage() {
      if (page.value < Math.ceil(total.value / limit)) {
        page.value++;
      }
    }
    function prevPage() {
      if (page.value > 1) {
        page.value--;
      }
    }
    watch(page, fetchPhotos);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (isLoading.value) {
                    _push3(ssrRenderComponent(VCol, {
                      cols: "12",
                      class: "text-center"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VProgressCircular, {
                            indeterminate: "",
                            color: "primary"
                          }, null, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VProgressCircular, {
                              indeterminate: "",
                              color: "primary"
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                  } else {
                    _push3(`<!--[-->`);
                    ssrRenderList(userPhoto.value, (photo) => {
                      _push3(ssrRenderComponent(VCol, {
                        key: photo.photo_id,
                        cols: "12",
                        sm: "6",
                        md: "3"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VCard, { elevation: "6" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="relative" data-v-c3ddb146${_scopeId4}><img${ssrRenderAttr("src", photo.compressed_path)} alt="Photo" class="photo-img" data-v-c3ddb146${_scopeId4}>`);
                                  if (photo.bounding_box_db && imageSizes.value[photo.photo_id]) {
                                    _push5(`<div class="bounding-box" style="${ssrRenderStyle(getBoxStyle(photo.bounding_box_db, imageSizes.value[photo.photo_id]))}" data-v-c3ddb146${_scopeId4}></div>`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div>`);
                                  _push5(ssrRenderComponent(VCardTitle, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(photo.original_filename)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(photo.original_filename), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(VCardSubtitle, { class: "d-flex justify-space-between align-center" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<small data-v-c3ddb146${_scopeId5}>${ssrInterpolate(formatDate(photo.uploaded_at))}</small><div class="d-flex align-center font-weight-bold text-primary" data-v-c3ddb146${_scopeId5}><i class="bx bxs-wallet-alt mr-2" data-v-c3ddb146${_scopeId5}></i><small data-v-c3ddb146${_scopeId5}>Rp. ${ssrInterpolate(photo.photo_price.toLocaleString())}</small></div>`);
                                      } else {
                                        return [
                                          createVNode("small", null, toDisplayString(formatDate(photo.uploaded_at)), 1),
                                          createVNode("div", { class: "d-flex align-center font-weight-bold text-primary" }, [
                                            createVNode("i", { class: "bx bxs-wallet-alt mr-2" }),
                                            createVNode("small", null, "Rp. " + toDisplayString(photo.photo_price.toLocaleString()), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(VCardActions, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VBtn, {
                                          "prepend-icon": "bx bxs-download",
                                          color: "#4f545c",
                                          variant: "flat",
                                          size: "x-small",
                                          onClick: () => downloadPhoto(photo.original_path)
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<span class="subheading me-2" data-v-c3ddb146${_scopeId6}>Beli Sekarang</span>`);
                                            } else {
                                              return [
                                                createVNode("span", { class: "subheading me-2" }, "Beli Sekarang")
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VSpacer, null, null, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VBtn, {
                                          icon: "",
                                          onClick: () => toggleDetail(photo.photo_id)
                                        }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<i class="${ssrRenderClass(showDetail.value[photo.photo_id] ? "bx bx-chevron-up" : "bx bx-chevron-down")}" data-v-c3ddb146${_scopeId6}></i>`);
                                            } else {
                                              return [
                                                createVNode("i", {
                                                  class: showDetail.value[photo.photo_id] ? "bx bx-chevron-up" : "bx bx-chevron-down"
                                                }, null, 2)
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(VBtn, {
                                            "prepend-icon": "bx bxs-download",
                                            color: "#4f545c",
                                            variant: "flat",
                                            size: "x-small",
                                            onClick: () => downloadPhoto(photo.original_path)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("span", { class: "subheading me-2" }, "Beli Sekarang")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"]),
                                          createVNode(VSpacer),
                                          createVNode(VBtn, {
                                            icon: "",
                                            onClick: () => toggleDetail(photo.photo_id)
                                          }, {
                                            default: withCtx(() => [
                                              createVNode("i", {
                                                class: showDetail.value[photo.photo_id] ? "bx bx-chevron-up" : "bx bx-chevron-down"
                                              }, null, 2)
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(VExpandTransition, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div style="${ssrRenderStyle(showDetail.value[photo.photo_id] ? null : { display: "none" })}" data-v-c3ddb146${_scopeId5}>`);
                                        _push6(ssrRenderComponent(VDivider, null, null, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VCardText, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<div class="d-flex align-center text-medium-emphasis" data-v-c3ddb146${_scopeId6}><i class="bx bxs-map mr-2" data-v-c3ddb146${_scopeId6}></i> ${ssrInterpolate(photo.unit_name)}</div>`);
                                            } else {
                                              return [
                                                createVNode("div", { class: "d-flex align-center text-medium-emphasis" }, [
                                                  createVNode("i", { class: "bx bxs-map mr-2" }),
                                                  createTextVNode(" " + toDisplayString(photo.unit_name), 1)
                                                ])
                                              ];
                                            }
                                          }),
                                          _: 2
                                        }, _parent6, _scopeId5));
                                        _push6(`</div>`);
                                      } else {
                                        return [
                                          withDirectives(createVNode("div", null, [
                                            createVNode(VDivider),
                                            createVNode(VCardText, null, {
                                              default: withCtx(() => [
                                                createVNode("div", { class: "d-flex align-center text-medium-emphasis" }, [
                                                  createVNode("i", { class: "bx bxs-map mr-2" }),
                                                  createTextVNode(" " + toDisplayString(photo.unit_name), 1)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ], 512), [
                                            [vShow, showDetail.value[photo.photo_id]]
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                } else {
                                  return [
                                    createVNode("div", { class: "relative" }, [
                                      createVNode("img", {
                                        src: photo.compressed_path,
                                        alt: "Photo",
                                        class: "photo-img",
                                        onLoad: (e) => onImageLoad(e, photo.photo_id)
                                      }, null, 40, ["src", "onLoad"]),
                                      photo.bounding_box_db && imageSizes.value[photo.photo_id] ? (openBlock(), createBlock("div", {
                                        key: 0,
                                        class: "bounding-box",
                                        style: getBoxStyle(photo.bounding_box_db, imageSizes.value[photo.photo_id])
                                      }, null, 4)) : createCommentVNode("", true)
                                    ]),
                                    createVNode(VCardTitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(photo.original_filename), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(VCardSubtitle, { class: "d-flex justify-space-between align-center" }, {
                                      default: withCtx(() => [
                                        createVNode("small", null, toDisplayString(formatDate(photo.uploaded_at)), 1),
                                        createVNode("div", { class: "d-flex align-center font-weight-bold text-primary" }, [
                                          createVNode("i", { class: "bx bxs-wallet-alt mr-2" }),
                                          createVNode("small", null, "Rp. " + toDisplayString(photo.photo_price.toLocaleString()), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(VCardActions, null, {
                                      default: withCtx(() => [
                                        createVNode(VBtn, {
                                          "prepend-icon": "bx bxs-download",
                                          color: "#4f545c",
                                          variant: "flat",
                                          size: "x-small",
                                          onClick: () => downloadPhoto(photo.original_path)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("span", { class: "subheading me-2" }, "Beli Sekarang")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"]),
                                        createVNode(VSpacer),
                                        createVNode(VBtn, {
                                          icon: "",
                                          onClick: () => toggleDetail(photo.photo_id)
                                        }, {
                                          default: withCtx(() => [
                                            createVNode("i", {
                                              class: showDetail.value[photo.photo_id] ? "bx bx-chevron-up" : "bx bx-chevron-down"
                                            }, null, 2)
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(VExpandTransition, null, {
                                      default: withCtx(() => [
                                        withDirectives(createVNode("div", null, [
                                          createVNode(VDivider),
                                          createVNode(VCardText, null, {
                                            default: withCtx(() => [
                                              createVNode("div", { class: "d-flex align-center text-medium-emphasis" }, [
                                                createVNode("i", { class: "bx bxs-map mr-2" }),
                                                createTextVNode(" " + toDisplayString(photo.unit_name), 1)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ], 512), [
                                          [vShow, showDetail.value[photo.photo_id]]
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(VCard, { elevation: "6" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "relative" }, [
                                    createVNode("img", {
                                      src: photo.compressed_path,
                                      alt: "Photo",
                                      class: "photo-img",
                                      onLoad: (e) => onImageLoad(e, photo.photo_id)
                                    }, null, 40, ["src", "onLoad"]),
                                    photo.bounding_box_db && imageSizes.value[photo.photo_id] ? (openBlock(), createBlock("div", {
                                      key: 0,
                                      class: "bounding-box",
                                      style: getBoxStyle(photo.bounding_box_db, imageSizes.value[photo.photo_id])
                                    }, null, 4)) : createCommentVNode("", true)
                                  ]),
                                  createVNode(VCardTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(photo.original_filename), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(VCardSubtitle, { class: "d-flex justify-space-between align-center" }, {
                                    default: withCtx(() => [
                                      createVNode("small", null, toDisplayString(formatDate(photo.uploaded_at)), 1),
                                      createVNode("div", { class: "d-flex align-center font-weight-bold text-primary" }, [
                                        createVNode("i", { class: "bx bxs-wallet-alt mr-2" }),
                                        createVNode("small", null, "Rp. " + toDisplayString(photo.photo_price.toLocaleString()), 1)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(VCardActions, null, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, {
                                        "prepend-icon": "bx bxs-download",
                                        color: "#4f545c",
                                        variant: "flat",
                                        size: "x-small",
                                        onClick: () => downloadPhoto(photo.original_path)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("span", { class: "subheading me-2" }, "Beli Sekarang")
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"]),
                                      createVNode(VSpacer),
                                      createVNode(VBtn, {
                                        icon: "",
                                        onClick: () => toggleDetail(photo.photo_id)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode("i", {
                                            class: showDetail.value[photo.photo_id] ? "bx bx-chevron-up" : "bx bx-chevron-down"
                                          }, null, 2)
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(VExpandTransition, null, {
                                    default: withCtx(() => [
                                      withDirectives(createVNode("div", null, [
                                        createVNode(VDivider),
                                        createVNode(VCardText, null, {
                                          default: withCtx(() => [
                                            createVNode("div", { class: "d-flex align-center text-medium-emphasis" }, [
                                              createVNode("i", { class: "bx bxs-map mr-2" }),
                                              createTextVNode(" " + toDisplayString(photo.unit_name), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ], 512), [
                                        [vShow, showDetail.value[photo.photo_id]]
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                    });
                    _push3(`<!--]-->`);
                  }
                } else {
                  return [
                    isLoading.value ? (openBlock(), createBlock(VCol, {
                      key: 0,
                      cols: "12",
                      class: "text-center"
                    }, {
                      default: withCtx(() => [
                        createVNode(VProgressCircular, {
                          indeterminate: "",
                          color: "primary"
                        })
                      ]),
                      _: 1
                    })) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(userPhoto.value, (photo) => {
                      return openBlock(), createBlock(VCol, {
                        key: photo.photo_id,
                        cols: "12",
                        sm: "6",
                        md: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, { elevation: "6" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "relative" }, [
                                createVNode("img", {
                                  src: photo.compressed_path,
                                  alt: "Photo",
                                  class: "photo-img",
                                  onLoad: (e) => onImageLoad(e, photo.photo_id)
                                }, null, 40, ["src", "onLoad"]),
                                photo.bounding_box_db && imageSizes.value[photo.photo_id] ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "bounding-box",
                                  style: getBoxStyle(photo.bounding_box_db, imageSizes.value[photo.photo_id])
                                }, null, 4)) : createCommentVNode("", true)
                              ]),
                              createVNode(VCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(photo.original_filename), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(VCardSubtitle, { class: "d-flex justify-space-between align-center" }, {
                                default: withCtx(() => [
                                  createVNode("small", null, toDisplayString(formatDate(photo.uploaded_at)), 1),
                                  createVNode("div", { class: "d-flex align-center font-weight-bold text-primary" }, [
                                    createVNode("i", { class: "bx bxs-wallet-alt mr-2" }),
                                    createVNode("small", null, "Rp. " + toDisplayString(photo.photo_price.toLocaleString()), 1)
                                  ])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(VCardActions, null, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    "prepend-icon": "bx bxs-download",
                                    color: "#4f545c",
                                    variant: "flat",
                                    size: "x-small",
                                    onClick: () => downloadPhoto(photo.original_path)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("span", { class: "subheading me-2" }, "Beli Sekarang")
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"]),
                                  createVNode(VSpacer),
                                  createVNode(VBtn, {
                                    icon: "",
                                    onClick: () => toggleDetail(photo.photo_id)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode("i", {
                                        class: showDetail.value[photo.photo_id] ? "bx bx-chevron-up" : "bx bx-chevron-down"
                                      }, null, 2)
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(VExpandTransition, null, {
                                default: withCtx(() => [
                                  withDirectives(createVNode("div", null, [
                                    createVNode(VDivider),
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => [
                                        createVNode("div", { class: "d-flex align-center text-medium-emphasis" }, [
                                          createVNode("i", { class: "bx bxs-map mr-2" }),
                                          createTextVNode(" " + toDisplayString(photo.unit_name), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ], 512), [
                                    [vShow, showDetail.value[photo.photo_id]]
                                  ])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VRow, {
              justify: "center",
              class: "mt-6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VBtn, {
                    disabled: page.value === 1,
                    onClick: prevPage
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Prev`);
                      } else {
                        return [
                          createTextVNode("Prev")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VPagination, {
                    modelValue: page.value,
                    "onUpdate:modelValue": ($event) => page.value = $event,
                    length: Math.ceil(total.value / limit),
                    "total-visible": 5
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VBtn, {
                    disabled: page.value >= Math.ceil(total.value / limit),
                    onClick: nextPage
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Next`);
                      } else {
                        return [
                          createTextVNode("Next")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      disabled: page.value === 1,
                      onClick: prevPage
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Prev")
                      ]),
                      _: 1
                    }, 8, ["disabled"]),
                    createVNode(VPagination, {
                      modelValue: page.value,
                      "onUpdate:modelValue": ($event) => page.value = $event,
                      length: Math.ceil(total.value / limit),
                      "total-visible": 5
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "length"]),
                    createVNode(VBtn, {
                      disabled: page.value >= Math.ceil(total.value / limit),
                      onClick: nextPage
                    }, {
                      default: withCtx(() => [
                        createTextVNode("Next")
                      ]),
                      _: 1
                    }, 8, ["disabled"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VRow, null, {
                default: withCtx(() => [
                  isLoading.value ? (openBlock(), createBlock(VCol, {
                    key: 0,
                    cols: "12",
                    class: "text-center"
                  }, {
                    default: withCtx(() => [
                      createVNode(VProgressCircular, {
                        indeterminate: "",
                        color: "primary"
                      })
                    ]),
                    _: 1
                  })) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(userPhoto.value, (photo) => {
                    return openBlock(), createBlock(VCol, {
                      key: photo.photo_id,
                      cols: "12",
                      sm: "6",
                      md: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, { elevation: "6" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "relative" }, [
                              createVNode("img", {
                                src: photo.compressed_path,
                                alt: "Photo",
                                class: "photo-img",
                                onLoad: (e) => onImageLoad(e, photo.photo_id)
                              }, null, 40, ["src", "onLoad"]),
                              photo.bounding_box_db && imageSizes.value[photo.photo_id] ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "bounding-box",
                                style: getBoxStyle(photo.bounding_box_db, imageSizes.value[photo.photo_id])
                              }, null, 4)) : createCommentVNode("", true)
                            ]),
                            createVNode(VCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(photo.original_filename), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(VCardSubtitle, { class: "d-flex justify-space-between align-center" }, {
                              default: withCtx(() => [
                                createVNode("small", null, toDisplayString(formatDate(photo.uploaded_at)), 1),
                                createVNode("div", { class: "d-flex align-center font-weight-bold text-primary" }, [
                                  createVNode("i", { class: "bx bxs-wallet-alt mr-2" }),
                                  createVNode("small", null, "Rp. " + toDisplayString(photo.photo_price.toLocaleString()), 1)
                                ])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(VCardActions, null, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  "prepend-icon": "bx bxs-download",
                                  color: "#4f545c",
                                  variant: "flat",
                                  size: "x-small",
                                  onClick: () => downloadPhoto(photo.original_path)
                                }, {
                                  default: withCtx(() => [
                                    createVNode("span", { class: "subheading me-2" }, "Beli Sekarang")
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"]),
                                createVNode(VSpacer),
                                createVNode(VBtn, {
                                  icon: "",
                                  onClick: () => toggleDetail(photo.photo_id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode("i", {
                                      class: showDetail.value[photo.photo_id] ? "bx bx-chevron-up" : "bx bx-chevron-down"
                                    }, null, 2)
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(VExpandTransition, null, {
                              default: withCtx(() => [
                                withDirectives(createVNode("div", null, [
                                  createVNode(VDivider),
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createVNode("div", { class: "d-flex align-center text-medium-emphasis" }, [
                                        createVNode("i", { class: "bx bxs-map mr-2" }),
                                        createTextVNode(" " + toDisplayString(photo.unit_name), 1)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ], 512), [
                                  [vShow, showDetail.value[photo.photo_id]]
                                ])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 2
              }, 1024),
              createVNode(VRow, {
                justify: "center",
                class: "mt-6"
              }, {
                default: withCtx(() => [
                  createVNode(VBtn, {
                    disabled: page.value === 1,
                    onClick: prevPage
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Prev")
                    ]),
                    _: 1
                  }, 8, ["disabled"]),
                  createVNode(VPagination, {
                    modelValue: page.value,
                    "onUpdate:modelValue": ($event) => page.value = $event,
                    length: Math.ceil(total.value / limit),
                    "total-visible": 5
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "length"]),
                  createVNode(VBtn, {
                    disabled: page.value >= Math.ceil(total.value / limit),
                    onClick: nextPage
                  }, {
                    default: withCtx(() => [
                      createTextVNode("Next")
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
      }, _parent));
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/photos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const photos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-c3ddb146"]]);

export { photos as default };
