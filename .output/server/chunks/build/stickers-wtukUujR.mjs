import { defineComponent, ref, computed, withCtx, createTextVNode, unref, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderClass, ssrRenderAttr, ssrRenderStyle } from 'vue/server-renderer';
import { a as authFetch } from './authFetch-5wQjlWwJ.mjs';
import { _ as _export_sfc, a as VBtn, b0 as VProgressLinear, b as VIcon, c as VDivider } from './server.mjs';
import { V as VCard, a as VCardText, c as VCardTitle, b as VCardActions } from './VCard-DLk5PTHl.mjs';
import { V as VSelect } from './VSelect-Bxz-WhQz.mjs';
import { V as VChip } from './VChip-C44NlS62.mjs';
import { V as VDialog } from './VDialog-yRDXDq_T.mjs';
import { V as VSpacer } from './VSpacer-CQpJ4yRI.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
import { V as VSwitch } from './VSwitch-BPbv21Ir.mjs';
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
import './VMenu-CmFsZZaF.mjs';
import './index-ewhk7FTz.mjs';
import './ssrBoot-BtvJZs44.mjs';
import './VListSubheader-BbgyaiQc.mjs';
import './dialog-transition-D66jL1n_.mjs';
import './VCheckboxBtn-DaRBpQ2e.mjs';
import './VSlideGroup-J1shNAVo.mjs';

function useStickers() {
  const stickers2 = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const getStickers = async (params) => {
    var _a2;
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const res = await authFetch("/stickers/", { params });
      stickers2.value = (_a2 = res.data) != null ? _a2 : [];
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Gagal mengambil sticker.";
    } finally {
      loading.value = false;
    }
  };
  const createSticker = async (form) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const res = await authFetch("/stickers/", { method: "POST", body: form });
      stickers2.value.push(res.data);
      return res.data;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.detail) || err.message || "Gagal membuat sticker.";
    } finally {
      loading.value = false;
    }
  };
  const updateSticker = async (id, form) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const res = await authFetch(`/stickers/${id}`, { method: "PATCH", body: form });
      const idx = stickers2.value.findIndex((s) => s.id === id);
      if (idx !== -1) stickers2.value[idx] = res.data;
      return res.data;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.detail) || err.message || "Gagal mengubah sticker.";
    } finally {
      loading.value = false;
    }
  };
  const deleteSticker = async (id) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      await authFetch(`/stickers/${id}`, { method: "DELETE" });
      stickers2.value = stickers2.value.filter((s) => s.id !== id);
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.detail) || err.message || "Gagal menghapus sticker.";
    } finally {
      loading.value = false;
    }
  };
  return { stickers: stickers2, loading, error, getStickers, createSticker, updateSticker, deleteSticker };
}
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "stickers",
  __ssrInlineRender: true,
  setup(__props) {
    const { stickers: stickers2, loading, error, getStickers, createSticker, updateSticker, deleteSticker } = useStickers();
    const outlets = ref([]);
    const outletFilter = ref("");
    const isSubmitting = ref(false);
    const showCreate = ref(false);
    const createType = ref("image");
    const createLabel = ref("");
    const createEmoji = ref("");
    const createOutlet = ref("");
    const bulkFiles = ref([]);
    const bulkFileInput = ref(null);
    const createPreviewUrls = computed(
      () => bulkFiles.value.map((f) => URL.createObjectURL(f))
    );
    const showEdit = ref(false);
    const editForm = ref({ id: "", label: "", is_active: true, outlet_id: "" });
    async function fetchAll() {
      const params = {};
      if (outletFilter.value) params.outlet_id = outletFilter.value;
      await getStickers(params);
    }
    function onBulkFileChange(e) {
      var _a;
      const files = Array.from((_a = e.target.files) != null ? _a : []);
      bulkFiles.value = files;
      if (files.length === 1 && !createLabel.value) {
        createLabel.value = files[0].name.replace(/\.[^.]+$/, "");
      }
    }
    function removeBulkFile(i) {
      bulkFiles.value = bulkFiles.value.filter((_, idx) => idx !== i);
    }
    async function handleCreate() {
      isSubmitting.value = true;
      error.value = null;
      if (createType.value === "emoji") {
        const form = new FormData();
        form.append("label", createLabel.value || createEmoji.value);
        form.append("type", "emoji");
        form.append("value", createEmoji.value);
        if (createOutlet.value) form.append("outlet_id", createOutlet.value);
        await createSticker(form);
      } else {
        for (const file of bulkFiles.value) {
          const form = new FormData();
          form.append("label", createLabel.value || file.name.replace(/\.[^.]+$/, ""));
          form.append("type", "image");
          form.append("file", file);
          if (createOutlet.value) form.append("outlet_id", createOutlet.value);
          await createSticker(form);
          if (error.value) break;
        }
      }
      isSubmitting.value = false;
      if (error.value) {
        alert(error.value);
        return;
      }
      resetCreateForm();
      showCreate.value = false;
      await fetchAll();
    }
    function resetCreateForm() {
      createType.value = "image";
      createLabel.value = "";
      createEmoji.value = "";
      createOutlet.value = "";
      bulkFiles.value = [];
      if (bulkFileInput.value) bulkFileInput.value.value = "";
    }
    function openEdit(s) {
      editForm.value = { id: s.id, label: s.label, is_active: s.is_active, outlet_id: s.outlet_id || "" };
      showEdit.value = true;
    }
    async function handleUpdate() {
      isSubmitting.value = true;
      const form = new FormData();
      form.append("label", editForm.value.label);
      form.append("is_active", String(editForm.value.is_active));
      form.append("outlet_id", editForm.value.outlet_id);
      await updateSticker(editForm.value.id, form);
      isSubmitting.value = false;
      if (error.value) {
        alert(error.value);
        return;
      }
      showEdit.value = false;
    }
    async function handleDelete(id) {
      if (!confirm("Hapus sticker ini?")) return;
      await deleteSticker(id);
      if (error.value) alert(error.value);
    }
    const outletItems = computed(() => [
      { title: "Global (semua outlet)", value: "" },
      ...outlets.value.map((o) => ({ title: o.name, value: o.id }))
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(_attrs)} data-v-ed1a95ce><div class="d-flex align-center justify-space-between mb-4 flex-wrap gap-2" data-v-ed1a95ce><div data-v-ed1a95ce><h5 class="text-h5 font-weight-bold" data-v-ed1a95ce>Stickers</h5><p class="text-caption text-medium-emphasis mt-1" data-v-ed1a95ce> Kelola sticker emoji &amp; image yang muncul di kiosk editor foto. </p></div>`);
      _push(ssrRenderComponent(VBtn, {
        color: "primary",
        "prepend-icon": "bx bx-plus",
        onClick: ($event) => showCreate.value = true
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Tambah Sticker `);
          } else {
            return [
              createTextVNode(" Tambah Sticker ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(VCard, {
        class: "mb-4",
        flat: "",
        border: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardText, { class: "py-3" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="d-flex align-center gap-3 flex-wrap" data-v-ed1a95ce${_scopeId2}>`);
                  _push3(ssrRenderComponent(VSelect, {
                    modelValue: outletFilter.value,
                    "onUpdate:modelValue": [($event) => outletFilter.value = $event, fetchAll],
                    items: outletItems.value,
                    label: "Filter Outlet",
                    density: "compact",
                    variant: "outlined",
                    "hide-details": "",
                    style: { "max-width": "260px" }
                  }, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VChip, {
                    color: "primary",
                    size: "small",
                    variant: "tonal"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`${ssrInterpolate(unref(stickers2).length)} sticker `);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(stickers2).length) + " sticker ", 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`</div>`);
                } else {
                  return [
                    createVNode("div", { class: "d-flex align-center gap-3 flex-wrap" }, [
                      createVNode(VSelect, {
                        modelValue: outletFilter.value,
                        "onUpdate:modelValue": [($event) => outletFilter.value = $event, fetchAll],
                        items: outletItems.value,
                        label: "Filter Outlet",
                        density: "compact",
                        variant: "outlined",
                        "hide-details": "",
                        style: { "max-width": "260px" }
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                      createVNode(VChip, {
                        color: "primary",
                        size: "small",
                        variant: "tonal"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(stickers2).length) + " sticker ", 1)
                        ]),
                        _: 1
                      })
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardText, { class: "py-3" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "d-flex align-center gap-3 flex-wrap" }, [
                    createVNode(VSelect, {
                      modelValue: outletFilter.value,
                      "onUpdate:modelValue": [($event) => outletFilter.value = $event, fetchAll],
                      items: outletItems.value,
                      label: "Filter Outlet",
                      density: "compact",
                      variant: "outlined",
                      "hide-details": "",
                      style: { "max-width": "260px" }
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                    createVNode(VChip, {
                      color: "primary",
                      size: "small",
                      variant: "tonal"
                    }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(stickers2).length) + " sticker ", 1)
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
      }, _parent));
      _push(ssrRenderComponent(VCard, {
        flat: "",
        border: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unref(loading)) {
                    _push3(ssrRenderComponent(VProgressLinear, {
                      indeterminate: "",
                      color: "primary",
                      class: "mb-4"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  if (!unref(loading) && unref(stickers2).length === 0) {
                    _push3(`<div class="text-center pa-12 text-medium-emphasis" data-v-ed1a95ce${_scopeId2}>`);
                    _push3(ssrRenderComponent(VIcon, {
                      size: "56",
                      class: "mb-3",
                      color: "grey-lighten-1"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`bx bxs-smile`);
                        } else {
                          return [
                            createTextVNode("bx bxs-smile")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<p class="text-subtitle-1 font-weight-medium" data-v-ed1a95ce${_scopeId2}>Belum ada sticker</p><p class="text-caption" data-v-ed1a95ce${_scopeId2}>Klik &quot;Tambah Sticker&quot; untuk upload sticker pertama.</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="sticker-grid" data-v-ed1a95ce${_scopeId2}><!--[-->`);
                  ssrRenderList(unref(stickers2), (s, idx) => {
                    _push3(`<div class="${ssrRenderClass([{ "sticker-card-inactive": !s.is_active }, "sticker-card"])}" data-v-ed1a95ce${_scopeId2}><div class="sticker-thumb" data-v-ed1a95ce${_scopeId2}>`);
                    if (s.type === "image" && s.url) {
                      _push3(`<img${ssrRenderAttr("src", s.url)}${ssrRenderAttr("alt", s.label)} class="sticker-img" data-v-ed1a95ce${_scopeId2}>`);
                    } else {
                      _push3(`<span class="sticker-emoji" data-v-ed1a95ce${_scopeId2}>${ssrInterpolate(s.value)}</span>`);
                    }
                    _push3(ssrRenderComponent(VChip, {
                      size: "x-small",
                      color: s.is_active ? "success" : "default",
                      class: "sticker-status-chip"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(s.is_active ? "Aktif" : "Off")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(s.is_active ? "Aktif" : "Off"), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div><div class="sticker-info" data-v-ed1a95ce${_scopeId2}><span class="sticker-label"${ssrRenderAttr("title", s.label)} data-v-ed1a95ce${_scopeId2}>${ssrInterpolate(s.label)}</span><span class="sticker-type" data-v-ed1a95ce${_scopeId2}>${ssrInterpolate(s.type)}</span></div><div class="sticker-actions" data-v-ed1a95ce${_scopeId2}>`);
                    _push3(ssrRenderComponent(VBtn, {
                      icon: "",
                      variant: "text",
                      size: "x-small",
                      onClick: ($event) => openEdit(s)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VIcon, {
                            size: "15",
                            color: "warning"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`bx bx-edit-alt`);
                              } else {
                                return [
                                  createTextVNode("bx bx-edit-alt")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VIcon, {
                              size: "15",
                              color: "warning"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("bx bx-edit-alt")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VBtn, {
                      icon: "",
                      variant: "text",
                      size: "x-small",
                      onClick: ($event) => handleDelete(s.id)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VIcon, {
                            size: "15",
                            color: "error"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`bx bx-trash-alt`);
                              } else {
                                return [
                                  createTextVNode("bx bx-trash-alt")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VIcon, {
                              size: "15",
                              color: "error"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("bx bx-trash-alt")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</div></div>`);
                  });
                  _push3(`<!--]--></div>`);
                } else {
                  return [
                    unref(loading) ? (openBlock(), createBlock(VProgressLinear, {
                      key: 0,
                      indeterminate: "",
                      color: "primary",
                      class: "mb-4"
                    })) : createCommentVNode("", true),
                    !unref(loading) && unref(stickers2).length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center pa-12 text-medium-emphasis"
                    }, [
                      createVNode(VIcon, {
                        size: "56",
                        class: "mb-3",
                        color: "grey-lighten-1"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("bx bxs-smile")
                        ]),
                        _: 1
                      }),
                      createVNode("p", { class: "text-subtitle-1 font-weight-medium" }, "Belum ada sticker"),
                      createVNode("p", { class: "text-caption" }, 'Klik "Tambah Sticker" untuk upload sticker pertama.')
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "sticker-grid" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(stickers2), (s, idx) => {
                        return openBlock(), createBlock("div", {
                          key: s.id,
                          class: ["sticker-card", { "sticker-card-inactive": !s.is_active }]
                        }, [
                          createVNode("div", { class: "sticker-thumb" }, [
                            s.type === "image" && s.url ? (openBlock(), createBlock("img", {
                              key: 0,
                              src: s.url,
                              alt: s.label,
                              class: "sticker-img"
                            }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", {
                              key: 1,
                              class: "sticker-emoji"
                            }, toDisplayString(s.value), 1)),
                            createVNode(VChip, {
                              size: "x-small",
                              color: s.is_active ? "success" : "default",
                              class: "sticker-status-chip"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(s.is_active ? "Aktif" : "Off"), 1)
                              ]),
                              _: 2
                            }, 1032, ["color"])
                          ]),
                          createVNode("div", { class: "sticker-info" }, [
                            createVNode("span", {
                              class: "sticker-label",
                              title: s.label
                            }, toDisplayString(s.label), 9, ["title"]),
                            createVNode("span", { class: "sticker-type" }, toDisplayString(s.type), 1)
                          ]),
                          createVNode("div", { class: "sticker-actions" }, [
                            createVNode(VBtn, {
                              icon: "",
                              variant: "text",
                              size: "x-small",
                              onClick: ($event) => openEdit(s)
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, {
                                  size: "15",
                                  color: "warning"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("bx bx-edit-alt")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["onClick"]),
                            createVNode(VBtn, {
                              icon: "",
                              variant: "text",
                              size: "x-small",
                              onClick: ($event) => handleDelete(s.id)
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, {
                                  size: "15",
                                  color: "error"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("bx bx-trash-alt")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ])
                        ], 2);
                      }), 128))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  unref(loading) ? (openBlock(), createBlock(VProgressLinear, {
                    key: 0,
                    indeterminate: "",
                    color: "primary",
                    class: "mb-4"
                  })) : createCommentVNode("", true),
                  !unref(loading) && unref(stickers2).length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center pa-12 text-medium-emphasis"
                  }, [
                    createVNode(VIcon, {
                      size: "56",
                      class: "mb-3",
                      color: "grey-lighten-1"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("bx bxs-smile")
                      ]),
                      _: 1
                    }),
                    createVNode("p", { class: "text-subtitle-1 font-weight-medium" }, "Belum ada sticker"),
                    createVNode("p", { class: "text-caption" }, 'Klik "Tambah Sticker" untuk upload sticker pertama.')
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "sticker-grid" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(stickers2), (s, idx) => {
                      return openBlock(), createBlock("div", {
                        key: s.id,
                        class: ["sticker-card", { "sticker-card-inactive": !s.is_active }]
                      }, [
                        createVNode("div", { class: "sticker-thumb" }, [
                          s.type === "image" && s.url ? (openBlock(), createBlock("img", {
                            key: 0,
                            src: s.url,
                            alt: s.label,
                            class: "sticker-img"
                          }, null, 8, ["src", "alt"])) : (openBlock(), createBlock("span", {
                            key: 1,
                            class: "sticker-emoji"
                          }, toDisplayString(s.value), 1)),
                          createVNode(VChip, {
                            size: "x-small",
                            color: s.is_active ? "success" : "default",
                            class: "sticker-status-chip"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(s.is_active ? "Aktif" : "Off"), 1)
                            ]),
                            _: 2
                          }, 1032, ["color"])
                        ]),
                        createVNode("div", { class: "sticker-info" }, [
                          createVNode("span", {
                            class: "sticker-label",
                            title: s.label
                          }, toDisplayString(s.label), 9, ["title"]),
                          createVNode("span", { class: "sticker-type" }, toDisplayString(s.type), 1)
                        ]),
                        createVNode("div", { class: "sticker-actions" }, [
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            size: "x-small",
                            onClick: ($event) => openEdit(s)
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, {
                                size: "15",
                                color: "warning"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("bx bx-edit-alt")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            size: "x-small",
                            onClick: ($event) => handleDelete(s.id)
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, {
                                size: "15",
                                color: "error"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("bx bx-trash-alt")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ])
                      ], 2);
                    }), 128))
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VDialog, {
        modelValue: showCreate.value,
        "onUpdate:modelValue": ($event) => showCreate.value = $event,
        "max-width": "560",
        persistent: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "d-flex align-center gap-2 pa-4 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, { color: "primary" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`bx bxs-smile`);
                            } else {
                              return [
                                createTextVNode("bx bxs-smile")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(` Tambah Sticker `);
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "",
                          variant: "text",
                          size: "small",
                          onClick: ($event) => {
                            showCreate.value = false;
                            resetCreateForm();
                          }
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`bx bx-x`);
                                  } else {
                                    return [
                                      createTextVNode("bx bx-x")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, null, {
                                  default: withCtx(() => [
                                    createTextVNode("bx bx-x")
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
                          createVNode(VIcon, { color: "primary" }, {
                            default: withCtx(() => [
                              createTextVNode("bx bxs-smile")
                            ]),
                            _: 1
                          }),
                          createTextVNode(" Tambah Sticker "),
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            size: "small",
                            onClick: ($event) => {
                              showCreate.value = false;
                              resetCreateForm();
                            }
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, null, {
                                default: withCtx(() => [
                                  createTextVNode("bx bx-x")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, { class: "pa-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<p class="text-caption font-weight-bold text-uppercase mb-2" style="${ssrRenderStyle({ "color": "#888" })}" data-v-ed1a95ce${_scopeId3}>Tipe Sticker</p><div class="d-flex gap-3 mb-4" data-v-ed1a95ce${_scopeId3}><div class="${ssrRenderClass([{ "type-card-active": createType.value === "image" }, "type-card"])}" data-v-ed1a95ce${_scopeId3}>`);
                        _push4(ssrRenderComponent(VIcon, {
                          size: "28",
                          color: createType.value === "image" ? "primary" : "grey"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`bx bx-image`);
                            } else {
                              return [
                                createTextVNode("bx bx-image")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<span class="text-caption font-weight-bold mt-1" data-v-ed1a95ce${_scopeId3}>Image / PNG</span><span class="text-caption text-medium-emphasis" data-v-ed1a95ce${_scopeId3}>Upload file gambar</span></div><div class="${ssrRenderClass([{ "type-card-active": createType.value === "emoji" }, "type-card"])}" data-v-ed1a95ce${_scopeId3}><span style="${ssrRenderStyle({ "font-size": "28px" })}" data-v-ed1a95ce${_scopeId3}>\u{1F60A}</span><span class="text-caption font-weight-bold mt-1" data-v-ed1a95ce${_scopeId3}>Emoji</span><span class="text-caption text-medium-emphasis" data-v-ed1a95ce${_scopeId3}>Karakter emoji</span></div></div>`);
                        if (createType.value === "image") {
                          _push4(`<!--[--><div class="drop-zone" data-v-ed1a95ce${_scopeId3}>`);
                          _push4(ssrRenderComponent(VIcon, {
                            size: "36",
                            color: "primary",
                            class: "mb-2"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`bx bx-cloud-upload`);
                              } else {
                                return [
                                  createTextVNode("bx bx-cloud-upload")
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(`<p class="font-weight-medium mb-1" data-v-ed1a95ce${_scopeId3}>Klik atau drag &amp; drop</p><p class="text-caption text-medium-emphasis" data-v-ed1a95ce${_scopeId3}>PNG, JPG, WebP \xB7 Bisa pilih banyak file sekaligus</p><input type="file" accept="image/*" multiple style="${ssrRenderStyle({ "display": "none" })}" data-v-ed1a95ce${_scopeId3}></div>`);
                          if (bulkFiles.value.length > 0) {
                            _push4(`<div class="mt-3" data-v-ed1a95ce${_scopeId3}><p class="text-caption font-weight-bold mb-2" data-v-ed1a95ce${_scopeId3}>${ssrInterpolate(bulkFiles.value.length)} file dipilih:</p><div class="bulk-preview-grid" data-v-ed1a95ce${_scopeId3}><!--[-->`);
                            ssrRenderList(createPreviewUrls.value, (url, i) => {
                              _push4(`<div class="bulk-preview-item" data-v-ed1a95ce${_scopeId3}><img${ssrRenderAttr("src", url)}${ssrRenderAttr("alt", bulkFiles.value[i].name)} class="bulk-preview-img" data-v-ed1a95ce${_scopeId3}><span class="bulk-preview-name text-caption" data-v-ed1a95ce${_scopeId3}>${ssrInterpolate(bulkFiles.value[i].name)}</span>`);
                              _push4(ssrRenderComponent(VBtn, {
                                icon: "",
                                variant: "text",
                                size: "x-small",
                                class: "bulk-preview-del",
                                onClick: ($event) => removeBulkFile(i)
                              }, {
                                default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                  if (_push5) {
                                    _push5(ssrRenderComponent(VIcon, {
                                      size: "12",
                                      color: "error"
                                    }, {
                                      default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                        if (_push6) {
                                          _push6(`bx bx-x`);
                                        } else {
                                          return [
                                            createTextVNode("bx bx-x")
                                          ];
                                        }
                                      }),
                                      _: 2
                                    }, _parent5, _scopeId4));
                                  } else {
                                    return [
                                      createVNode(VIcon, {
                                        size: "12",
                                        color: "error"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("bx bx-x")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 2
                              }, _parent4, _scopeId3));
                              _push4(`</div>`);
                            });
                            _push4(`<!--]--></div></div>`);
                          } else {
                            _push4(`<!---->`);
                          }
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: createLabel.value,
                            "onUpdate:modelValue": ($event) => createLabel.value = $event,
                            label: "Label (opsional)",
                            density: "compact",
                            variant: "outlined",
                            class: "mt-3",
                            hint: "Kosongkan untuk menggunakan nama file sebagai label",
                            "persistent-hint": ""
                          }, null, _parent4, _scopeId3));
                          _push4(`<!--]-->`);
                        } else {
                          _push4(`<!--[-->`);
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: createEmoji.value,
                            "onUpdate:modelValue": ($event) => createEmoji.value = $event,
                            label: "Karakter Emoji",
                            density: "compact",
                            variant: "outlined",
                            class: "mb-3",
                            placeholder: "\u{1F602}",
                            style: { fontSize: "24px" }
                          }, null, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VTextField, {
                            modelValue: createLabel.value,
                            "onUpdate:modelValue": ($event) => createLabel.value = $event,
                            label: "Label",
                            density: "compact",
                            variant: "outlined",
                            placeholder: "cth: LOL"
                          }, null, _parent4, _scopeId3));
                          _push4(`<!--]-->`);
                        }
                        _push4(ssrRenderComponent(VSelect, {
                          modelValue: createOutlet.value,
                          "onUpdate:modelValue": ($event) => createOutlet.value = $event,
                          items: outletItems.value,
                          label: "Outlet",
                          density: "compact",
                          variant: "outlined",
                          class: "mt-3",
                          hint: "Kosongkan agar muncul di semua outlet",
                          "persistent-hint": ""
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode("p", {
                            class: "text-caption font-weight-bold text-uppercase mb-2",
                            style: { "color": "#888" }
                          }, "Tipe Sticker"),
                          createVNode("div", { class: "d-flex gap-3 mb-4" }, [
                            createVNode("div", {
                              class: ["type-card", { "type-card-active": createType.value === "image" }],
                              onClick: ($event) => createType.value = "image"
                            }, [
                              createVNode(VIcon, {
                                size: "28",
                                color: createType.value === "image" ? "primary" : "grey"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("bx bx-image")
                                ]),
                                _: 1
                              }, 8, ["color"]),
                              createVNode("span", { class: "text-caption font-weight-bold mt-1" }, "Image / PNG"),
                              createVNode("span", { class: "text-caption text-medium-emphasis" }, "Upload file gambar")
                            ], 10, ["onClick"]),
                            createVNode("div", {
                              class: ["type-card", { "type-card-active": createType.value === "emoji" }],
                              onClick: ($event) => createType.value = "emoji"
                            }, [
                              createVNode("span", { style: { "font-size": "28px" } }, "\u{1F60A}"),
                              createVNode("span", { class: "text-caption font-weight-bold mt-1" }, "Emoji"),
                              createVNode("span", { class: "text-caption text-medium-emphasis" }, "Karakter emoji")
                            ], 10, ["onClick"])
                          ]),
                          createType.value === "image" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                            createVNode("div", {
                              class: "drop-zone",
                              onClick: ($event) => {
                                var _a;
                                return (_a = bulkFileInput.value) == null ? void 0 : _a.click();
                              },
                              onDragover: withModifiers(() => {
                              }, ["prevent"]),
                              onDrop: withModifiers((e) => {
                                var _a2;
                                var _a;
                                bulkFiles.value = Array.from((_a2 = (_a = e.dataTransfer) == null ? void 0 : _a.files) != null ? _a2 : []);
                              }, ["prevent"])
                            }, [
                              createVNode(VIcon, {
                                size: "36",
                                color: "primary",
                                class: "mb-2"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("bx bx-cloud-upload")
                                ]),
                                _: 1
                              }),
                              createVNode("p", { class: "font-weight-medium mb-1" }, "Klik atau drag & drop"),
                              createVNode("p", { class: "text-caption text-medium-emphasis" }, "PNG, JPG, WebP \xB7 Bisa pilih banyak file sekaligus"),
                              createVNode("input", {
                                ref_key: "bulkFileInput",
                                ref: bulkFileInput,
                                type: "file",
                                accept: "image/*",
                                multiple: "",
                                style: { "display": "none" },
                                onChange: onBulkFileChange
                              }, null, 544)
                            ], 40, ["onClick", "onDragover", "onDrop"]),
                            bulkFiles.value.length > 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "mt-3"
                            }, [
                              createVNode("p", { class: "text-caption font-weight-bold mb-2" }, toDisplayString(bulkFiles.value.length) + " file dipilih:", 1),
                              createVNode("div", { class: "bulk-preview-grid" }, [
                                (openBlock(true), createBlock(Fragment, null, renderList(createPreviewUrls.value, (url, i) => {
                                  return openBlock(), createBlock("div", {
                                    key: i,
                                    class: "bulk-preview-item"
                                  }, [
                                    createVNode("img", {
                                      src: url,
                                      alt: bulkFiles.value[i].name,
                                      class: "bulk-preview-img"
                                    }, null, 8, ["src", "alt"]),
                                    createVNode("span", { class: "bulk-preview-name text-caption" }, toDisplayString(bulkFiles.value[i].name), 1),
                                    createVNode(VBtn, {
                                      icon: "",
                                      variant: "text",
                                      size: "x-small",
                                      class: "bulk-preview-del",
                                      onClick: ($event) => removeBulkFile(i)
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VIcon, {
                                          size: "12",
                                          color: "error"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode("bx bx-x")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 2
                                    }, 1032, ["onClick"])
                                  ]);
                                }), 128))
                              ])
                            ])) : createCommentVNode("", true),
                            createVNode(VTextField, {
                              modelValue: createLabel.value,
                              "onUpdate:modelValue": ($event) => createLabel.value = $event,
                              label: "Label (opsional)",
                              density: "compact",
                              variant: "outlined",
                              class: "mt-3",
                              hint: "Kosongkan untuk menggunakan nama file sebagai label",
                              "persistent-hint": ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                            createVNode(VTextField, {
                              modelValue: createEmoji.value,
                              "onUpdate:modelValue": ($event) => createEmoji.value = $event,
                              label: "Karakter Emoji",
                              density: "compact",
                              variant: "outlined",
                              class: "mb-3",
                              placeholder: "\u{1F602}",
                              style: { fontSize: "24px" }
                            }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                            createVNode(VTextField, {
                              modelValue: createLabel.value,
                              "onUpdate:modelValue": ($event) => createLabel.value = $event,
                              label: "Label",
                              density: "compact",
                              variant: "outlined",
                              placeholder: "cth: LOL"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ], 64)),
                          createVNode(VSelect, {
                            modelValue: createOutlet.value,
                            "onUpdate:modelValue": ($event) => createOutlet.value = $event,
                            items: outletItems.value,
                            label: "Outlet",
                            density: "compact",
                            variant: "outlined",
                            class: "mt-3",
                            hint: "Kosongkan agar muncul di semua outlet",
                            "persistent-hint": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, { class: "pa-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          variant: "text",
                          onClick: ($event) => {
                            showCreate.value = false;
                            resetCreateForm();
                          },
                          disabled: isSubmitting.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Batal`);
                            } else {
                              return [
                                createTextVNode("Batal")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "primary",
                          variant: "elevated",
                          loading: isSubmitting.value,
                          disabled: createType.value === "image" && bulkFiles.value.length === 0 || createType.value === "emoji" && !createEmoji.value,
                          onClick: handleCreate
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(createType.value === "image" && bulkFiles.value.length > 1 ? `Upload ${bulkFiles.value.length} Sticker` : "Simpan")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(createType.value === "image" && bulkFiles.value.length > 1 ? `Upload ${bulkFiles.value.length} Sticker` : "Simpan"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            variant: "text",
                            onClick: ($event) => {
                              showCreate.value = false;
                              resetCreateForm();
                            },
                            disabled: isSubmitting.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"]),
                          createVNode(VBtn, {
                            color: "primary",
                            variant: "elevated",
                            loading: isSubmitting.value,
                            disabled: createType.value === "image" && bulkFiles.value.length === 0 || createType.value === "emoji" && !createEmoji.value,
                            onClick: handleCreate
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(createType.value === "image" && bulkFiles.value.length > 1 ? `Upload ${bulkFiles.value.length} Sticker` : "Simpan"), 1)
                            ]),
                            _: 1
                          }, 8, ["loading", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, { class: "d-flex align-center gap-2 pa-4 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { color: "primary" }, {
                          default: withCtx(() => [
                            createTextVNode("bx bxs-smile")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" Tambah Sticker "),
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          icon: "",
                          variant: "text",
                          size: "small",
                          onClick: ($event) => {
                            showCreate.value = false;
                            resetCreateForm();
                          }
                        }, {
                          default: withCtx(() => [
                            createVNode(VIcon, null, {
                              default: withCtx(() => [
                                createTextVNode("bx bx-x")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    }),
                    createVNode(VDivider),
                    createVNode(VCardText, { class: "pa-4" }, {
                      default: withCtx(() => [
                        createVNode("p", {
                          class: "text-caption font-weight-bold text-uppercase mb-2",
                          style: { "color": "#888" }
                        }, "Tipe Sticker"),
                        createVNode("div", { class: "d-flex gap-3 mb-4" }, [
                          createVNode("div", {
                            class: ["type-card", { "type-card-active": createType.value === "image" }],
                            onClick: ($event) => createType.value = "image"
                          }, [
                            createVNode(VIcon, {
                              size: "28",
                              color: createType.value === "image" ? "primary" : "grey"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("bx bx-image")
                              ]),
                              _: 1
                            }, 8, ["color"]),
                            createVNode("span", { class: "text-caption font-weight-bold mt-1" }, "Image / PNG"),
                            createVNode("span", { class: "text-caption text-medium-emphasis" }, "Upload file gambar")
                          ], 10, ["onClick"]),
                          createVNode("div", {
                            class: ["type-card", { "type-card-active": createType.value === "emoji" }],
                            onClick: ($event) => createType.value = "emoji"
                          }, [
                            createVNode("span", { style: { "font-size": "28px" } }, "\u{1F60A}"),
                            createVNode("span", { class: "text-caption font-weight-bold mt-1" }, "Emoji"),
                            createVNode("span", { class: "text-caption text-medium-emphasis" }, "Karakter emoji")
                          ], 10, ["onClick"])
                        ]),
                        createType.value === "image" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                          createVNode("div", {
                            class: "drop-zone",
                            onClick: ($event) => {
                              var _a;
                              return (_a = bulkFileInput.value) == null ? void 0 : _a.click();
                            },
                            onDragover: withModifiers(() => {
                            }, ["prevent"]),
                            onDrop: withModifiers((e) => {
                              var _a2;
                              var _a;
                              bulkFiles.value = Array.from((_a2 = (_a = e.dataTransfer) == null ? void 0 : _a.files) != null ? _a2 : []);
                            }, ["prevent"])
                          }, [
                            createVNode(VIcon, {
                              size: "36",
                              color: "primary",
                              class: "mb-2"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("bx bx-cloud-upload")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "font-weight-medium mb-1" }, "Klik atau drag & drop"),
                            createVNode("p", { class: "text-caption text-medium-emphasis" }, "PNG, JPG, WebP \xB7 Bisa pilih banyak file sekaligus"),
                            createVNode("input", {
                              ref_key: "bulkFileInput",
                              ref: bulkFileInput,
                              type: "file",
                              accept: "image/*",
                              multiple: "",
                              style: { "display": "none" },
                              onChange: onBulkFileChange
                            }, null, 544)
                          ], 40, ["onClick", "onDragover", "onDrop"]),
                          bulkFiles.value.length > 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mt-3"
                          }, [
                            createVNode("p", { class: "text-caption font-weight-bold mb-2" }, toDisplayString(bulkFiles.value.length) + " file dipilih:", 1),
                            createVNode("div", { class: "bulk-preview-grid" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(createPreviewUrls.value, (url, i) => {
                                return openBlock(), createBlock("div", {
                                  key: i,
                                  class: "bulk-preview-item"
                                }, [
                                  createVNode("img", {
                                    src: url,
                                    alt: bulkFiles.value[i].name,
                                    class: "bulk-preview-img"
                                  }, null, 8, ["src", "alt"]),
                                  createVNode("span", { class: "bulk-preview-name text-caption" }, toDisplayString(bulkFiles.value[i].name), 1),
                                  createVNode(VBtn, {
                                    icon: "",
                                    variant: "text",
                                    size: "x-small",
                                    class: "bulk-preview-del",
                                    onClick: ($event) => removeBulkFile(i)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, {
                                        size: "12",
                                        color: "error"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("bx bx-x")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])
                                ]);
                              }), 128))
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode(VTextField, {
                            modelValue: createLabel.value,
                            "onUpdate:modelValue": ($event) => createLabel.value = $event,
                            label: "Label (opsional)",
                            density: "compact",
                            variant: "outlined",
                            class: "mt-3",
                            hint: "Kosongkan untuk menggunakan nama file sebagai label",
                            "persistent-hint": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createVNode(VTextField, {
                            modelValue: createEmoji.value,
                            "onUpdate:modelValue": ($event) => createEmoji.value = $event,
                            label: "Karakter Emoji",
                            density: "compact",
                            variant: "outlined",
                            class: "mb-3",
                            placeholder: "\u{1F602}",
                            style: { fontSize: "24px" }
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VTextField, {
                            modelValue: createLabel.value,
                            "onUpdate:modelValue": ($event) => createLabel.value = $event,
                            label: "Label",
                            density: "compact",
                            variant: "outlined",
                            placeholder: "cth: LOL"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ], 64)),
                        createVNode(VSelect, {
                          modelValue: createOutlet.value,
                          "onUpdate:modelValue": ($event) => createOutlet.value = $event,
                          items: outletItems.value,
                          label: "Outlet",
                          density: "compact",
                          variant: "outlined",
                          class: "mt-3",
                          hint: "Kosongkan agar muncul di semua outlet",
                          "persistent-hint": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                      ]),
                      _: 1
                    }),
                    createVNode(VDivider),
                    createVNode(VCardActions, { class: "pa-4" }, {
                      default: withCtx(() => [
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          variant: "text",
                          onClick: ($event) => {
                            showCreate.value = false;
                            resetCreateForm();
                          },
                          disabled: isSubmitting.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"]),
                        createVNode(VBtn, {
                          color: "primary",
                          variant: "elevated",
                          loading: isSubmitting.value,
                          disabled: createType.value === "image" && bulkFiles.value.length === 0 || createType.value === "emoji" && !createEmoji.value,
                          onClick: handleCreate
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(createType.value === "image" && bulkFiles.value.length > 1 ? `Upload ${bulkFiles.value.length} Sticker` : "Simpan"), 1)
                          ]),
                          _: 1
                        }, 8, ["loading", "disabled"])
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
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, { class: "d-flex align-center gap-2 pa-4 pb-2" }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { color: "primary" }, {
                        default: withCtx(() => [
                          createTextVNode("bx bxs-smile")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" Tambah Sticker "),
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        icon: "",
                        variant: "text",
                        size: "small",
                        onClick: ($event) => {
                          showCreate.value = false;
                          resetCreateForm();
                        }
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, null, {
                            default: withCtx(() => [
                              createTextVNode("bx bx-x")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  }),
                  createVNode(VDivider),
                  createVNode(VCardText, { class: "pa-4" }, {
                    default: withCtx(() => [
                      createVNode("p", {
                        class: "text-caption font-weight-bold text-uppercase mb-2",
                        style: { "color": "#888" }
                      }, "Tipe Sticker"),
                      createVNode("div", { class: "d-flex gap-3 mb-4" }, [
                        createVNode("div", {
                          class: ["type-card", { "type-card-active": createType.value === "image" }],
                          onClick: ($event) => createType.value = "image"
                        }, [
                          createVNode(VIcon, {
                            size: "28",
                            color: createType.value === "image" ? "primary" : "grey"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("bx bx-image")
                            ]),
                            _: 1
                          }, 8, ["color"]),
                          createVNode("span", { class: "text-caption font-weight-bold mt-1" }, "Image / PNG"),
                          createVNode("span", { class: "text-caption text-medium-emphasis" }, "Upload file gambar")
                        ], 10, ["onClick"]),
                        createVNode("div", {
                          class: ["type-card", { "type-card-active": createType.value === "emoji" }],
                          onClick: ($event) => createType.value = "emoji"
                        }, [
                          createVNode("span", { style: { "font-size": "28px" } }, "\u{1F60A}"),
                          createVNode("span", { class: "text-caption font-weight-bold mt-1" }, "Emoji"),
                          createVNode("span", { class: "text-caption text-medium-emphasis" }, "Karakter emoji")
                        ], 10, ["onClick"])
                      ]),
                      createType.value === "image" ? (openBlock(), createBlock(Fragment, { key: 0 }, [
                        createVNode("div", {
                          class: "drop-zone",
                          onClick: ($event) => {
                            var _a;
                            return (_a = bulkFileInput.value) == null ? void 0 : _a.click();
                          },
                          onDragover: withModifiers(() => {
                          }, ["prevent"]),
                          onDrop: withModifiers((e) => {
                            var _a2;
                            var _a;
                            bulkFiles.value = Array.from((_a2 = (_a = e.dataTransfer) == null ? void 0 : _a.files) != null ? _a2 : []);
                          }, ["prevent"])
                        }, [
                          createVNode(VIcon, {
                            size: "36",
                            color: "primary",
                            class: "mb-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("bx bx-cloud-upload")
                            ]),
                            _: 1
                          }),
                          createVNode("p", { class: "font-weight-medium mb-1" }, "Klik atau drag & drop"),
                          createVNode("p", { class: "text-caption text-medium-emphasis" }, "PNG, JPG, WebP \xB7 Bisa pilih banyak file sekaligus"),
                          createVNode("input", {
                            ref_key: "bulkFileInput",
                            ref: bulkFileInput,
                            type: "file",
                            accept: "image/*",
                            multiple: "",
                            style: { "display": "none" },
                            onChange: onBulkFileChange
                          }, null, 544)
                        ], 40, ["onClick", "onDragover", "onDrop"]),
                        bulkFiles.value.length > 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mt-3"
                        }, [
                          createVNode("p", { class: "text-caption font-weight-bold mb-2" }, toDisplayString(bulkFiles.value.length) + " file dipilih:", 1),
                          createVNode("div", { class: "bulk-preview-grid" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(createPreviewUrls.value, (url, i) => {
                              return openBlock(), createBlock("div", {
                                key: i,
                                class: "bulk-preview-item"
                              }, [
                                createVNode("img", {
                                  src: url,
                                  alt: bulkFiles.value[i].name,
                                  class: "bulk-preview-img"
                                }, null, 8, ["src", "alt"]),
                                createVNode("span", { class: "bulk-preview-name text-caption" }, toDisplayString(bulkFiles.value[i].name), 1),
                                createVNode(VBtn, {
                                  icon: "",
                                  variant: "text",
                                  size: "x-small",
                                  class: "bulk-preview-del",
                                  onClick: ($event) => removeBulkFile(i)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, {
                                      size: "12",
                                      color: "error"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("bx bx-x")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ]);
                            }), 128))
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode(VTextField, {
                          modelValue: createLabel.value,
                          "onUpdate:modelValue": ($event) => createLabel.value = $event,
                          label: "Label (opsional)",
                          density: "compact",
                          variant: "outlined",
                          class: "mt-3",
                          hint: "Kosongkan untuk menggunakan nama file sebagai label",
                          "persistent-hint": ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ], 64)) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                        createVNode(VTextField, {
                          modelValue: createEmoji.value,
                          "onUpdate:modelValue": ($event) => createEmoji.value = $event,
                          label: "Karakter Emoji",
                          density: "compact",
                          variant: "outlined",
                          class: "mb-3",
                          placeholder: "\u{1F602}",
                          style: { fontSize: "24px" }
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VTextField, {
                          modelValue: createLabel.value,
                          "onUpdate:modelValue": ($event) => createLabel.value = $event,
                          label: "Label",
                          density: "compact",
                          variant: "outlined",
                          placeholder: "cth: LOL"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ], 64)),
                      createVNode(VSelect, {
                        modelValue: createOutlet.value,
                        "onUpdate:modelValue": ($event) => createOutlet.value = $event,
                        items: outletItems.value,
                        label: "Outlet",
                        density: "compact",
                        variant: "outlined",
                        class: "mt-3",
                        hint: "Kosongkan agar muncul di semua outlet",
                        "persistent-hint": ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                    ]),
                    _: 1
                  }),
                  createVNode(VDivider),
                  createVNode(VCardActions, { class: "pa-4" }, {
                    default: withCtx(() => [
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        variant: "text",
                        onClick: ($event) => {
                          showCreate.value = false;
                          resetCreateForm();
                        },
                        disabled: isSubmitting.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Batal")
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"]),
                      createVNode(VBtn, {
                        color: "primary",
                        variant: "elevated",
                        loading: isSubmitting.value,
                        disabled: createType.value === "image" && bulkFiles.value.length === 0 || createType.value === "emoji" && !createEmoji.value,
                        onClick: handleCreate
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(createType.value === "image" && bulkFiles.value.length > 1 ? `Upload ${bulkFiles.value.length} Sticker` : "Simpan"), 1)
                        ]),
                        _: 1
                      }, 8, ["loading", "disabled"])
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
      _push(ssrRenderComponent(VDialog, {
        modelValue: showEdit.value,
        "onUpdate:modelValue": ($event) => showEdit.value = $event,
        "max-width": "420"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "d-flex align-center gap-2 pa-4 pb-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, { color: "warning" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`bx bx-edit-alt`);
                            } else {
                              return [
                                createTextVNode("bx bx-edit-alt")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(` Edit Sticker `);
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "",
                          variant: "text",
                          size: "small",
                          onClick: ($event) => showEdit.value = false
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VIcon, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`bx bx-x`);
                                  } else {
                                    return [
                                      createTextVNode("bx bx-x")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VIcon, null, {
                                  default: withCtx(() => [
                                    createTextVNode("bx bx-x")
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
                          createVNode(VIcon, { color: "warning" }, {
                            default: withCtx(() => [
                              createTextVNode("bx bx-edit-alt")
                            ]),
                            _: 1
                          }),
                          createTextVNode(" Edit Sticker "),
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            size: "small",
                            onClick: ($event) => showEdit.value = false
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, null, {
                                default: withCtx(() => [
                                  createTextVNode("bx bx-x")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, { class: "pa-4 d-flex flex-column gap-3" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          modelValue: editForm.value.label,
                          "onUpdate:modelValue": ($event) => editForm.value.label = $event,
                          label: "Label",
                          density: "compact",
                          variant: "outlined"
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VSelect, {
                          modelValue: editForm.value.outlet_id,
                          "onUpdate:modelValue": ($event) => editForm.value.outlet_id = $event,
                          items: outletItems.value,
                          label: "Outlet",
                          density: "compact",
                          variant: "outlined"
                        }, null, _parent4, _scopeId3));
                        _push4(`<div class="d-flex align-center justify-space-between pa-3 rounded-lg" style="${ssrRenderStyle({ "background": "#f9f9f9", "border": "1px solid #eee" })}" data-v-ed1a95ce${_scopeId3}><div data-v-ed1a95ce${_scopeId3}><p class="text-body-2 font-weight-medium" data-v-ed1a95ce${_scopeId3}>Status Aktif</p><p class="text-caption text-medium-emphasis" data-v-ed1a95ce${_scopeId3}>Nonaktif = tidak muncul di kiosk</p></div>`);
                        _push4(ssrRenderComponent(VSwitch, {
                          modelValue: editForm.value.is_active,
                          "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                          color: "success",
                          "hide-details": "",
                          density: "compact"
                        }, null, _parent4, _scopeId3));
                        _push4(`</div>`);
                      } else {
                        return [
                          createVNode(VTextField, {
                            modelValue: editForm.value.label,
                            "onUpdate:modelValue": ($event) => editForm.value.label = $event,
                            label: "Label",
                            density: "compact",
                            variant: "outlined"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VSelect, {
                            modelValue: editForm.value.outlet_id,
                            "onUpdate:modelValue": ($event) => editForm.value.outlet_id = $event,
                            items: outletItems.value,
                            label: "Outlet",
                            density: "compact",
                            variant: "outlined"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                          createVNode("div", {
                            class: "d-flex align-center justify-space-between pa-3 rounded-lg",
                            style: { "background": "#f9f9f9", "border": "1px solid #eee" }
                          }, [
                            createVNode("div", null, [
                              createVNode("p", { class: "text-body-2 font-weight-medium" }, "Status Aktif"),
                              createVNode("p", { class: "text-caption text-medium-emphasis" }, "Nonaktif = tidak muncul di kiosk")
                            ]),
                            createVNode(VSwitch, {
                              modelValue: editForm.value.is_active,
                              "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                              color: "success",
                              "hide-details": "",
                              density: "compact"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, { class: "pa-4" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          variant: "text",
                          onClick: ($event) => showEdit.value = false,
                          disabled: isSubmitting.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Batal`);
                            } else {
                              return [
                                createTextVNode("Batal")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "primary",
                          variant: "elevated",
                          loading: isSubmitting.value,
                          onClick: handleUpdate
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Update`);
                            } else {
                              return [
                                createTextVNode("Update")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            variant: "text",
                            onClick: ($event) => showEdit.value = false,
                            disabled: isSubmitting.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }, 8, ["onClick", "disabled"]),
                          createVNode(VBtn, {
                            color: "primary",
                            variant: "elevated",
                            loading: isSubmitting.value,
                            onClick: handleUpdate
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Update")
                            ]),
                            _: 1
                          }, 8, ["loading"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, { class: "d-flex align-center gap-2 pa-4 pb-2" }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { color: "warning" }, {
                          default: withCtx(() => [
                            createTextVNode("bx bx-edit-alt")
                          ]),
                          _: 1
                        }),
                        createTextVNode(" Edit Sticker "),
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          icon: "",
                          variant: "text",
                          size: "small",
                          onClick: ($event) => showEdit.value = false
                        }, {
                          default: withCtx(() => [
                            createVNode(VIcon, null, {
                              default: withCtx(() => [
                                createTextVNode("bx bx-x")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["onClick"])
                      ]),
                      _: 1
                    }),
                    createVNode(VDivider),
                    createVNode(VCardText, { class: "pa-4 d-flex flex-column gap-3" }, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          modelValue: editForm.value.label,
                          "onUpdate:modelValue": ($event) => editForm.value.label = $event,
                          label: "Label",
                          density: "compact",
                          variant: "outlined"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VSelect, {
                          modelValue: editForm.value.outlet_id,
                          "onUpdate:modelValue": ($event) => editForm.value.outlet_id = $event,
                          items: outletItems.value,
                          label: "Outlet",
                          density: "compact",
                          variant: "outlined"
                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                        createVNode("div", {
                          class: "d-flex align-center justify-space-between pa-3 rounded-lg",
                          style: { "background": "#f9f9f9", "border": "1px solid #eee" }
                        }, [
                          createVNode("div", null, [
                            createVNode("p", { class: "text-body-2 font-weight-medium" }, "Status Aktif"),
                            createVNode("p", { class: "text-caption text-medium-emphasis" }, "Nonaktif = tidak muncul di kiosk")
                          ]),
                          createVNode(VSwitch, {
                            modelValue: editForm.value.is_active,
                            "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                            color: "success",
                            "hide-details": "",
                            density: "compact"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ])
                      ]),
                      _: 1
                    }),
                    createVNode(VDivider),
                    createVNode(VCardActions, { class: "pa-4" }, {
                      default: withCtx(() => [
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          variant: "text",
                          onClick: ($event) => showEdit.value = false,
                          disabled: isSubmitting.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }, 8, ["onClick", "disabled"]),
                        createVNode(VBtn, {
                          color: "primary",
                          variant: "elevated",
                          loading: isSubmitting.value,
                          onClick: handleUpdate
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Update")
                          ]),
                          _: 1
                        }, 8, ["loading"])
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
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, { class: "d-flex align-center gap-2 pa-4 pb-2" }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { color: "warning" }, {
                        default: withCtx(() => [
                          createTextVNode("bx bx-edit-alt")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" Edit Sticker "),
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        icon: "",
                        variant: "text",
                        size: "small",
                        onClick: ($event) => showEdit.value = false
                      }, {
                        default: withCtx(() => [
                          createVNode(VIcon, null, {
                            default: withCtx(() => [
                              createTextVNode("bx bx-x")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["onClick"])
                    ]),
                    _: 1
                  }),
                  createVNode(VDivider),
                  createVNode(VCardText, { class: "pa-4 d-flex flex-column gap-3" }, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        modelValue: editForm.value.label,
                        "onUpdate:modelValue": ($event) => editForm.value.label = $event,
                        label: "Label",
                        density: "compact",
                        variant: "outlined"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VSelect, {
                        modelValue: editForm.value.outlet_id,
                        "onUpdate:modelValue": ($event) => editForm.value.outlet_id = $event,
                        items: outletItems.value,
                        label: "Outlet",
                        density: "compact",
                        variant: "outlined"
                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"]),
                      createVNode("div", {
                        class: "d-flex align-center justify-space-between pa-3 rounded-lg",
                        style: { "background": "#f9f9f9", "border": "1px solid #eee" }
                      }, [
                        createVNode("div", null, [
                          createVNode("p", { class: "text-body-2 font-weight-medium" }, "Status Aktif"),
                          createVNode("p", { class: "text-caption text-medium-emphasis" }, "Nonaktif = tidak muncul di kiosk")
                        ]),
                        createVNode(VSwitch, {
                          modelValue: editForm.value.is_active,
                          "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                          color: "success",
                          "hide-details": "",
                          density: "compact"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ])
                    ]),
                    _: 1
                  }),
                  createVNode(VDivider),
                  createVNode(VCardActions, { class: "pa-4" }, {
                    default: withCtx(() => [
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        variant: "text",
                        onClick: ($event) => showEdit.value = false,
                        disabled: isSubmitting.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Batal")
                        ]),
                        _: 1
                      }, 8, ["onClick", "disabled"]),
                      createVNode(VBtn, {
                        color: "primary",
                        variant: "elevated",
                        loading: isSubmitting.value,
                        onClick: handleUpdate
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Update")
                        ]),
                        _: 1
                      }, 8, ["loading"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/stickers.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const stickers = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ed1a95ce"]]);

export { stickers as default };
