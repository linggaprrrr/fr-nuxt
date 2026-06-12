import { defineComponent, ref, watch, withCtx, createVNode, createTextVNode, toDisplayString, withDirectives, vShow, createBlock, createCommentVNode, openBlock, Fragment, renderList, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrInterpolate } from 'vue/server-renderer';
import { u as usePhotos } from './usePhotos-LR7T6TlV.mjs';
import { V as VExpandTransition } from './index-ewhk7FTz.mjs';
import { V as VContainer } from './VContainer-CZliQBxk.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { _ as _export_sfc, b1 as VProgressCircular, a as VBtn, c as VDivider } from './server.mjs';
import { V as VCard, c as VCardTitle, d as VCardSubtitle, b as VCardActions, a as VCardText } from './VCard-DLk5PTHl.mjs';
import { V as VSpacer } from './VSpacer-CQpJ4yRI.mjs';
import { V as VPagination } from './VPagination-z_-yTplN.mjs';
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
    const { getPhotos, deletePhotoById } = usePhotos();
    const page = ref(1);
    const total = ref(0);
    const isLoading = ref(false);
    const show = ref(true);
    const photos2 = ref([]);
    const imageSizes = ref({});
    const imageRefs = /* @__PURE__ */ new Map();
    async function fetchPhotos() {
      isLoading.value = true;
      try {
        const res = await getPhotos({ page: page.value, limit });
        if ((res == null ? void 0 : res.status_code) === 200) {
          photos2.value = JSON.parse(JSON.stringify(res.data));
          total.value = res.total;
          const stored = localStorage.getItem("boundingBoxes");
          const boxesFromStorage = stored ? JSON.parse(stored) : [];
          photos2.value.forEach((photo) => {
            const matched = boxesFromStorage.find((item) => item.id === photo.id);
            if (matched) {
              photo.bounding_boxes = matched.boundingBoxes;
            }
          });
          nextTick(() => {
            photos2.value.forEach((photo) => updateImageSize(photo.id));
          });
        } else {
          photos2.value = [];
        }
      } catch (e) {
        console.error(e);
        photos2.value = [];
      } finally {
        isLoading.value = false;
      }
    }
    function onImageLoad(e, photoId) {
      const img = e.target;
      if (img) {
        imageRefs.set(photoId, img);
        updateImageSize(photoId);
      }
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
        left: box.x * scaleX + "px",
        top: box.y * scaleY + "px",
        width: box.w * scaleX + "px",
        height: box.h * scaleY + "px"
      };
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
    const formatDate = (dateStr) => {
      const date = new Date(dateStr);
      return date.toLocaleString();
    };
    async function downloadPhoto(url) {
      try {
        const response = await fetch(url);
        const blob = await response.blob();
        const blobUrl = (void 0).URL.createObjectURL(blob);
        const link = (void 0).createElement("a");
        link.href = blobUrl;
        link.download = "";
        link.click();
        (void 0).URL.revokeObjectURL(blobUrl);
      } catch (error) {
        console.error("Download failed:", error);
      }
    }
    async function handleDelete(photoId) {
      if (confirm("Are you sure you want to delete this photo?")) {
        const success = await deletePhotoById(photoId);
        if (success) {
          photos2.value = photos2.value.filter((p) => p.id !== photoId);
        } else {
          alert("Failed to delete the photo.");
        }
      }
    }
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
                      class: "text-center my-4"
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
                    ssrRenderList(photos2.value, (photo) => {
                      _push3(ssrRenderComponent(VCol, {
                        key: photo.id,
                        cols: "12",
                        sm: "6",
                        md: "3"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VCard, { elevation: "16" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`<div class="relative" data-v-a293eaae${_scopeId4}><img${ssrRenderAttr("src", photo.thumbnail_path)} alt="photo" class="w-full h-auto photo-img"${ssrRenderAttr("data-id", photo.id)} data-v-a293eaae${_scopeId4}>`);
                                  if (imageSizes.value[photo.id]) {
                                    _push5(`<!--[-->`);
                                    ssrRenderList(photo.bounding_boxes || [], (box, index) => {
                                      _push5(`<div class="bounding-box" style="${ssrRenderStyle(getBoxStyle(box, imageSizes.value[photo.id]))}" data-v-a293eaae${_scopeId4}></div>`);
                                    });
                                    _push5(`<!--]-->`);
                                  } else {
                                    _push5(`<!---->`);
                                  }
                                  _push5(`</div>`);
                                  _push5(ssrRenderComponent(VCardTitle, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`${ssrInterpolate(photo.filename)}`);
                                      } else {
                                        return [
                                          createTextVNode(toDisplayString(photo.filename), 1)
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(VCardSubtitle, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<small data-v-a293eaae${_scopeId5}><code data-v-a293eaae${_scopeId5}>Uploaded at: ${ssrInterpolate(formatDate(photo.uploaded_at))}</code></small>`);
                                      } else {
                                        return [
                                          createVNode("small", null, [
                                            createVNode("code", null, "Uploaded at: " + toDisplayString(formatDate(photo.uploaded_at)), 1)
                                          ])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`<div data-v-a293eaae${_scopeId4}>`);
                                  _push5(ssrRenderComponent(VCardActions, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VBtn, {
                                          color: "primary",
                                          icon: "bx bxs-download",
                                          onClick: ($event) => downloadPhoto(photo.original_path)
                                        }, null, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VBtn, {
                                          color: "error",
                                          icon: "bx bxs-trash-alt",
                                          onClick: ($event) => handleDelete(photo.id)
                                        }, null, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VSpacer, null, null, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VBtn, {
                                          icon: show.value ? "bx bx-chevron-up" : "bx bx-chevron-down",
                                          onClick: ($event) => show.value = !show.value
                                        }, null, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(VBtn, {
                                            color: "primary",
                                            icon: "bx bxs-download",
                                            onClick: ($event) => downloadPhoto(photo.original_path)
                                          }, null, 8, ["onClick"]),
                                          createVNode(VBtn, {
                                            color: "error",
                                            icon: "bx bxs-trash-alt",
                                            onClick: ($event) => handleDelete(photo.id)
                                          }, null, 8, ["onClick"]),
                                          createVNode(VSpacer),
                                          createVNode(VBtn, {
                                            icon: show.value ? "bx bx-chevron-up" : "bx bx-chevron-down",
                                            onClick: ($event) => show.value = !show.value
                                          }, null, 8, ["icon", "onClick"])
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(`</div>`);
                                  _push5(ssrRenderComponent(VExpandTransition, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`<div style="${ssrRenderStyle(show.value ? null : { display: "none" })}" data-v-a293eaae${_scopeId5}>`);
                                        _push6(ssrRenderComponent(VDivider, null, null, _parent6, _scopeId5));
                                        _push6(ssrRenderComponent(VCardText, null, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(`<p class="d-flex align-center" data-v-a293eaae${_scopeId6}><i class="bx bxs-wallet-alt mr-2" data-v-a293eaae${_scopeId6}></i> Rp ${ssrInterpolate(photo.unit_price.toLocaleString())}</p><div class="d-flex align-center text-medium-emphasis" data-v-a293eaae${_scopeId6}><i class="bx bxs-map mr-2" data-v-a293eaae${_scopeId6}></i> ${ssrInterpolate(photo.unit_name)}</div>`);
                                            } else {
                                              return [
                                                createVNode("p", { class: "d-flex align-center" }, [
                                                  createVNode("i", { class: "bx bxs-wallet-alt mr-2" }),
                                                  createTextVNode(" Rp " + toDisplayString(photo.unit_price.toLocaleString()), 1)
                                                ]),
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
                                                createVNode("p", { class: "d-flex align-center" }, [
                                                  createVNode("i", { class: "bx bxs-wallet-alt mr-2" }),
                                                  createTextVNode(" Rp " + toDisplayString(photo.unit_price.toLocaleString()), 1)
                                                ]),
                                                createVNode("div", { class: "d-flex align-center text-medium-emphasis" }, [
                                                  createVNode("i", { class: "bx bxs-map mr-2" }),
                                                  createTextVNode(" " + toDisplayString(photo.unit_name), 1)
                                                ])
                                              ]),
                                              _: 2
                                            }, 1024)
                                          ], 512), [
                                            [vShow, show.value]
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
                                        src: photo.thumbnail_path,
                                        alt: "photo",
                                        class: "w-full h-auto photo-img",
                                        "data-id": photo.id,
                                        onLoad: (e) => onImageLoad(e, photo.id)
                                      }, null, 40, ["src", "data-id", "onLoad"]),
                                      imageSizes.value[photo.id] ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(photo.bounding_boxes || [], (box, index) => {
                                        return openBlock(), createBlock("div", {
                                          key: index,
                                          class: "bounding-box",
                                          style: getBoxStyle(box, imageSizes.value[photo.id])
                                        }, null, 4);
                                      }), 128)) : createCommentVNode("", true)
                                    ]),
                                    createVNode(VCardTitle, null, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(photo.filename), 1)
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode(VCardSubtitle, null, {
                                      default: withCtx(() => [
                                        createVNode("small", null, [
                                          createVNode("code", null, "Uploaded at: " + toDisplayString(formatDate(photo.uploaded_at)), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024),
                                    createVNode("div", null, [
                                      createVNode(VCardActions, null, {
                                        default: withCtx(() => [
                                          createVNode(VBtn, {
                                            color: "primary",
                                            icon: "bx bxs-download",
                                            onClick: ($event) => downloadPhoto(photo.original_path)
                                          }, null, 8, ["onClick"]),
                                          createVNode(VBtn, {
                                            color: "error",
                                            icon: "bx bxs-trash-alt",
                                            onClick: ($event) => handleDelete(photo.id)
                                          }, null, 8, ["onClick"]),
                                          createVNode(VSpacer),
                                          createVNode(VBtn, {
                                            icon: show.value ? "bx bx-chevron-up" : "bx bx-chevron-down",
                                            onClick: ($event) => show.value = !show.value
                                          }, null, 8, ["icon", "onClick"])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    createVNode(VExpandTransition, null, {
                                      default: withCtx(() => [
                                        withDirectives(createVNode("div", null, [
                                          createVNode(VDivider),
                                          createVNode(VCardText, null, {
                                            default: withCtx(() => [
                                              createVNode("p", { class: "d-flex align-center" }, [
                                                createVNode("i", { class: "bx bxs-wallet-alt mr-2" }),
                                                createTextVNode(" Rp " + toDisplayString(photo.unit_price.toLocaleString()), 1)
                                              ]),
                                              createVNode("div", { class: "d-flex align-center text-medium-emphasis" }, [
                                                createVNode("i", { class: "bx bxs-map mr-2" }),
                                                createTextVNode(" " + toDisplayString(photo.unit_name), 1)
                                              ])
                                            ]),
                                            _: 2
                                          }, 1024)
                                        ], 512), [
                                          [vShow, show.value]
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
                              createVNode(VCard, { elevation: "16" }, {
                                default: withCtx(() => [
                                  createVNode("div", { class: "relative" }, [
                                    createVNode("img", {
                                      src: photo.thumbnail_path,
                                      alt: "photo",
                                      class: "w-full h-auto photo-img",
                                      "data-id": photo.id,
                                      onLoad: (e) => onImageLoad(e, photo.id)
                                    }, null, 40, ["src", "data-id", "onLoad"]),
                                    imageSizes.value[photo.id] ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(photo.bounding_boxes || [], (box, index) => {
                                      return openBlock(), createBlock("div", {
                                        key: index,
                                        class: "bounding-box",
                                        style: getBoxStyle(box, imageSizes.value[photo.id])
                                      }, null, 4);
                                    }), 128)) : createCommentVNode("", true)
                                  ]),
                                  createVNode(VCardTitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(photo.filename), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(VCardSubtitle, null, {
                                    default: withCtx(() => [
                                      createVNode("small", null, [
                                        createVNode("code", null, "Uploaded at: " + toDisplayString(formatDate(photo.uploaded_at)), 1)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode("div", null, [
                                    createVNode(VCardActions, null, {
                                      default: withCtx(() => [
                                        createVNode(VBtn, {
                                          color: "primary",
                                          icon: "bx bxs-download",
                                          onClick: ($event) => downloadPhoto(photo.original_path)
                                        }, null, 8, ["onClick"]),
                                        createVNode(VBtn, {
                                          color: "error",
                                          icon: "bx bxs-trash-alt",
                                          onClick: ($event) => handleDelete(photo.id)
                                        }, null, 8, ["onClick"]),
                                        createVNode(VSpacer),
                                        createVNode(VBtn, {
                                          icon: show.value ? "bx bx-chevron-up" : "bx bx-chevron-down",
                                          onClick: ($event) => show.value = !show.value
                                        }, null, 8, ["icon", "onClick"])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  createVNode(VExpandTransition, null, {
                                    default: withCtx(() => [
                                      withDirectives(createVNode("div", null, [
                                        createVNode(VDivider),
                                        createVNode(VCardText, null, {
                                          default: withCtx(() => [
                                            createVNode("p", { class: "d-flex align-center" }, [
                                              createVNode("i", { class: "bx bxs-wallet-alt mr-2" }),
                                              createTextVNode(" Rp " + toDisplayString(photo.unit_price.toLocaleString()), 1)
                                            ]),
                                            createVNode("div", { class: "d-flex align-center text-medium-emphasis" }, [
                                              createVNode("i", { class: "bx bxs-map mr-2" }),
                                              createTextVNode(" " + toDisplayString(photo.unit_name), 1)
                                            ])
                                          ]),
                                          _: 2
                                        }, 1024)
                                      ], 512), [
                                        [vShow, show.value]
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
                      class: "text-center my-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VProgressCircular, {
                          indeterminate: "",
                          color: "primary"
                        })
                      ]),
                      _: 1
                    })) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(photos2.value, (photo) => {
                      return openBlock(), createBlock(VCol, {
                        key: photo.id,
                        cols: "12",
                        sm: "6",
                        md: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, { elevation: "16" }, {
                            default: withCtx(() => [
                              createVNode("div", { class: "relative" }, [
                                createVNode("img", {
                                  src: photo.thumbnail_path,
                                  alt: "photo",
                                  class: "w-full h-auto photo-img",
                                  "data-id": photo.id,
                                  onLoad: (e) => onImageLoad(e, photo.id)
                                }, null, 40, ["src", "data-id", "onLoad"]),
                                imageSizes.value[photo.id] ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(photo.bounding_boxes || [], (box, index) => {
                                  return openBlock(), createBlock("div", {
                                    key: index,
                                    class: "bounding-box",
                                    style: getBoxStyle(box, imageSizes.value[photo.id])
                                  }, null, 4);
                                }), 128)) : createCommentVNode("", true)
                              ]),
                              createVNode(VCardTitle, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(photo.filename), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(VCardSubtitle, null, {
                                default: withCtx(() => [
                                  createVNode("small", null, [
                                    createVNode("code", null, "Uploaded at: " + toDisplayString(formatDate(photo.uploaded_at)), 1)
                                  ])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode("div", null, [
                                createVNode(VCardActions, null, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      color: "primary",
                                      icon: "bx bxs-download",
                                      onClick: ($event) => downloadPhoto(photo.original_path)
                                    }, null, 8, ["onClick"]),
                                    createVNode(VBtn, {
                                      color: "error",
                                      icon: "bx bxs-trash-alt",
                                      onClick: ($event) => handleDelete(photo.id)
                                    }, null, 8, ["onClick"]),
                                    createVNode(VSpacer),
                                    createVNode(VBtn, {
                                      icon: show.value ? "bx bx-chevron-up" : "bx bx-chevron-down",
                                      onClick: ($event) => show.value = !show.value
                                    }, null, 8, ["icon", "onClick"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              createVNode(VExpandTransition, null, {
                                default: withCtx(() => [
                                  withDirectives(createVNode("div", null, [
                                    createVNode(VDivider),
                                    createVNode(VCardText, null, {
                                      default: withCtx(() => [
                                        createVNode("p", { class: "d-flex align-center" }, [
                                          createVNode("i", { class: "bx bxs-wallet-alt mr-2" }),
                                          createTextVNode(" Rp " + toDisplayString(photo.unit_price.toLocaleString()), 1)
                                        ]),
                                        createVNode("div", { class: "d-flex align-center text-medium-emphasis" }, [
                                          createVNode("i", { class: "bx bxs-map mr-2" }),
                                          createTextVNode(" " + toDisplayString(photo.unit_name), 1)
                                        ])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ], 512), [
                                    [vShow, show.value]
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
                    onClick: prevPage,
                    class: "mr-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Prev `);
                      } else {
                        return [
                          createTextVNode(" Prev ")
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
                    onClick: nextPage,
                    class: "ml-2"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Next `);
                      } else {
                        return [
                          createTextVNode(" Next ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VBtn, {
                      disabled: page.value === 1,
                      onClick: prevPage,
                      class: "mr-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Prev ")
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
                      onClick: nextPage,
                      class: "ml-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(" Next ")
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
                    class: "text-center my-4"
                  }, {
                    default: withCtx(() => [
                      createVNode(VProgressCircular, {
                        indeterminate: "",
                        color: "primary"
                      })
                    ]),
                    _: 1
                  })) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(photos2.value, (photo) => {
                    return openBlock(), createBlock(VCol, {
                      key: photo.id,
                      cols: "12",
                      sm: "6",
                      md: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, { elevation: "16" }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "relative" }, [
                              createVNode("img", {
                                src: photo.thumbnail_path,
                                alt: "photo",
                                class: "w-full h-auto photo-img",
                                "data-id": photo.id,
                                onLoad: (e) => onImageLoad(e, photo.id)
                              }, null, 40, ["src", "data-id", "onLoad"]),
                              imageSizes.value[photo.id] ? (openBlock(true), createBlock(Fragment, { key: 0 }, renderList(photo.bounding_boxes || [], (box, index) => {
                                return openBlock(), createBlock("div", {
                                  key: index,
                                  class: "bounding-box",
                                  style: getBoxStyle(box, imageSizes.value[photo.id])
                                }, null, 4);
                              }), 128)) : createCommentVNode("", true)
                            ]),
                            createVNode(VCardTitle, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(photo.filename), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(VCardSubtitle, null, {
                              default: withCtx(() => [
                                createVNode("small", null, [
                                  createVNode("code", null, "Uploaded at: " + toDisplayString(formatDate(photo.uploaded_at)), 1)
                                ])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode("div", null, [
                              createVNode(VCardActions, null, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    color: "primary",
                                    icon: "bx bxs-download",
                                    onClick: ($event) => downloadPhoto(photo.original_path)
                                  }, null, 8, ["onClick"]),
                                  createVNode(VBtn, {
                                    color: "error",
                                    icon: "bx bxs-trash-alt",
                                    onClick: ($event) => handleDelete(photo.id)
                                  }, null, 8, ["onClick"]),
                                  createVNode(VSpacer),
                                  createVNode(VBtn, {
                                    icon: show.value ? "bx bx-chevron-up" : "bx bx-chevron-down",
                                    onClick: ($event) => show.value = !show.value
                                  }, null, 8, ["icon", "onClick"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            createVNode(VExpandTransition, null, {
                              default: withCtx(() => [
                                withDirectives(createVNode("div", null, [
                                  createVNode(VDivider),
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createVNode("p", { class: "d-flex align-center" }, [
                                        createVNode("i", { class: "bx bxs-wallet-alt mr-2" }),
                                        createTextVNode(" Rp " + toDisplayString(photo.unit_price.toLocaleString()), 1)
                                      ]),
                                      createVNode("div", { class: "d-flex align-center text-medium-emphasis" }, [
                                        createVNode("i", { class: "bx bxs-map mr-2" }),
                                        createTextVNode(" " + toDisplayString(photo.unit_name), 1)
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ], 512), [
                                  [vShow, show.value]
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
                    onClick: prevPage,
                    class: "mr-2"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Prev ")
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
                    onClick: nextPage,
                    class: "ml-2"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Next ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/outlets/photos.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const photos = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-a293eaae"]]);

export { photos as default };
