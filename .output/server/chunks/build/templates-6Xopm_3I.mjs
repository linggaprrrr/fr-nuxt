import { defineComponent, ref, withCtx, createVNode, unref, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, computed, watch, nextTick, withModifiers, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrRenderStyle, ssrInterpolate, ssrRenderClass } from 'vue/server-renderer';
import { a as authFetch } from './authFetch-5wQjlWwJ.mjs';
import { V as VDialog } from './VDialog-yRDXDq_T.mjs';
import { V as VCard, a as VCardText, b as VCardActions, c as VCardTitle } from './VCard-DLk5PTHl.mjs';
import { _ as _export_sfc, b0 as VProgressLinear, b as VIcon, a as VBtn, c as VDivider } from './server.mjs';
import { V as VSpacer } from './VSpacer-CQpJ4yRI.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
import { V as VSwitch } from './VSwitch-BPbv21Ir.mjs';
import { V as VAlert } from './VAlert-DeVcT1vO.mjs';
import { V as VSelect } from './VSelect-Bxz-WhQz.mjs';
import { V as VChip } from './VChip-C44NlS62.mjs';
import './forwardRefs-BSTjJZPU.mjs';
import './dialog-transition-D66jL1n_.mjs';
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
import './VCheckboxBtn-DaRBpQ2e.mjs';
import './VMenu-CmFsZZaF.mjs';
import './ssrBoot-BtvJZs44.mjs';
import './VListSubheader-BbgyaiQc.mjs';
import './VSlideGroup-J1shNAVo.mjs';

function useTemplates() {
  const templates2 = ref([]);
  const loading = ref(false);
  const error = ref(null);
  const getTemplates = async (params) => {
    var _a2;
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const res = await authFetch("/templates/", { params });
      templates2.value = (_a2 = res.data) != null ? _a2 : [];
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.message) || err.message || "Gagal mengambil template.";
    } finally {
      loading.value = false;
    }
  };
  const createTemplate = async (form) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const res = await authFetch("/templates/", { method: "POST", body: form });
      templates2.value.push(res.data);
      return res.data;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.detail) || err.message || "Gagal membuat template.";
    } finally {
      loading.value = false;
    }
  };
  const updateTemplate = async (id, form) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      const res = await authFetch(`/templates/${id}`, { method: "PATCH", body: form });
      const idx = templates2.value.findIndex((t) => t.id === id);
      if (idx !== -1) templates2.value[idx] = res.data;
      return res.data;
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.detail) || err.message || "Gagal mengubah template.";
    } finally {
      loading.value = false;
    }
  };
  const deleteTemplate = async (id) => {
    var _a;
    loading.value = true;
    error.value = null;
    try {
      await authFetch(`/templates/${id}`, { method: "DELETE" });
      templates2.value = templates2.value.filter((t) => t.id !== id);
    } catch (err) {
      error.value = ((_a = err.data) == null ? void 0 : _a.detail) || err.message || "Gagal menghapus template.";
    } finally {
      loading.value = false;
    }
  };
  return { templates: templates2, loading, error, getTemplates, createTemplate, updateTemplate, deleteTemplate };
}
const SNAP_PX = 2;
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "TemplateFrameEditor",
  __ssrInlineRender: true,
  props: {
    modelValue: { type: Boolean },
    editingTemplate: {}
  },
  emits: ["update:modelValue", "save"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const label = ref("");
    const isActive = ref(true);
    const outletId = ref("");
    const imageFile = ref(null);
    const imageUrl = ref("");
    const imageNatW = ref(0);
    const imageNatH = ref(0);
    const slots = ref([]);
    const selectedId = ref(null);
    const snapEnabled = ref(true);
    const nextSlotId = ref(0);
    const baseW = ref(0);
    const baseH = ref(0);
    const fileInput = ref(null);
    let drag = null;
    const isEditMode = computed(() => !!props.editingTemplate);
    const aspectRatio = computed(
      () => imageNatH.value > 0 ? +(imageNatW.value / imageNatH.value).toFixed(4) : 0
    );
    watch(() => props.modelValue, (open) => {
      if (!open) return;
      if (props.editingTemplate) {
        loadFromTemplate(props.editingTemplate);
      } else {
        resetEditor();
      }
    });
    function resetEditor() {
      label.value = "";
      isActive.value = true;
      outletId.value = "";
      imageFile.value = null;
      imageUrl.value = "";
      imageNatW.value = 0;
      imageNatH.value = 0;
      baseW.value = 0;
      baseH.value = 0;
      slots.value = [];
      selectedId.value = null;
      nextSlotId.value = 0;
    }
    function loadFromTemplate(t) {
      var _a, _b, _c, _d, _e;
      label.value = (_a = t.label) != null ? _a : "";
      isActive.value = (_b = t.is_active) != null ? _b : true;
      outletId.value = (_c = t.outlet_id) != null ? _c : "";
      imageFile.value = null;
      imageUrl.value = (_d = t.src) != null ? _d : "";
      imageNatW.value = 0;
      imageNatH.value = 0;
      selectedId.value = null;
      nextSlotId.value = 0;
      pendingSlots.value = (_e = t.slots) != null ? _e : [];
    }
    const pendingSlots = ref([]);
    function triggerFileInput() {
      var _a;
      (_a = fileInput.value) == null ? void 0 : _a.click();
    }
    function onFileChange(e) {
      var _a;
      const file = (_a = e.target.files) == null ? void 0 : _a[0];
      if (!file) return;
      imageFile.value = file;
      const url = URL.createObjectURL(file);
      imageUrl.value = url;
      slots.value = [];
      selectedId.value = null;
      baseW.value = 0;
      baseH.value = 0;
    }
    function onImageLoad(e) {
      const img = e.target;
      imageNatW.value = img.naturalWidth;
      imageNatH.value = img.naturalHeight;
      baseW.value = img.offsetWidth;
      baseH.value = img.offsetHeight;
      if (pendingSlots.value.length > 0) {
        nextTick(() => restoreSlots());
      }
    }
    async function restoreSlots() {
      await nextTick();
      if (baseW.value === 0) return;
      slots.value = pendingSlots.value.map((s, i) => ({
        id: i,
        x: s.x * baseW.value,
        y: s.y * baseH.value,
        w: s.w * baseW.value,
        h: s.h * baseH.value
      }));
      nextSlotId.value = slots.value.length;
      pendingSlots.value = [];
    }
    function addSlot() {
      if (!baseW.value) return;
      const w = baseW.value * 0.35;
      const h = baseH.value * 0.25;
      const x = (baseW.value - w) / 2;
      const y = (baseH.value - h) / 2;
      const id = nextSlotId.value++;
      slots.value.push({ id, x: snapVal(x), y: snapVal(y), w, h });
      selectedId.value = id;
    }
    function deleteSlot(id) {
      slots.value = slots.value.filter((s) => s.id !== id);
      if (selectedId.value === id) selectedId.value = null;
    }
    function selectSlot(id) {
      selectedId.value = id;
    }
    function deselectAll() {
      selectedId.value = null;
    }
    function snapVal(v) {
      return snapEnabled.value ? Math.round(v / SNAP_PX) * SNAP_PX : v;
    }
    function onSlotPointerDown(e, slotId) {
      e.stopPropagation();
      e.preventDefault();
      selectedId.value = slotId;
      const slot = slots.value.find((s) => s.id === slotId);
      drag = {
        type: "move",
        slotId,
        handle: null,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        startSlot: { ...slot }
      };
      e.target.setPointerCapture(e.pointerId);
    }
    function onHandlePointerDown(e, slotId, handle) {
      e.stopPropagation();
      e.preventDefault();
      selectedId.value = slotId;
      const slot = slots.value.find((s) => s.id === slotId);
      drag = {
        type: "resize",
        slotId,
        handle,
        startMouseX: e.clientX,
        startMouseY: e.clientY,
        startSlot: { ...slot }
      };
      e.target.setPointerCapture(e.pointerId);
    }
    function onPointerMove(e) {
      if (!drag) return;
      const dx = e.clientX - drag.startMouseX;
      const dy = e.clientY - drag.startMouseY;
      const slot = slots.value.find((s) => s.id === drag.slotId);
      if (!slot) return;
      const MIN_SIZE = 20;
      const bw = baseW.value;
      const bh = baseH.value;
      if (drag.type === "move") {
        slot.x = snapVal(clamp(drag.startSlot.x + dx, 0, bw - drag.startSlot.w));
        slot.y = snapVal(clamp(drag.startSlot.y + dy, 0, bh - drag.startSlot.h));
      } else {
        const h = drag.handle;
        let { x, y, w, h: ht } = drag.startSlot;
        if (h.includes("e")) {
          w = Math.max(MIN_SIZE, snapVal(w + dx));
        }
        if (h.includes("s")) {
          ht = Math.max(MIN_SIZE, snapVal(ht + dy));
        }
        if (h.includes("w")) {
          const newW = Math.max(MIN_SIZE, snapVal(w - dx));
          x = clamp(x + (w - newW), 0, bw);
          w = newW;
        }
        if (h.includes("n")) {
          const newH = Math.max(MIN_SIZE, snapVal(ht - dy));
          y = clamp(y + (ht - newH), 0, bh);
          ht = newH;
        }
        w = Math.min(w, bw - x);
        ht = Math.min(ht, bh - y);
        slot.x = x;
        slot.y = y;
        slot.w = w;
        slot.h = ht;
      }
    }
    function onPointerUp() {
      drag = null;
    }
    function clamp(v, min, max) {
      return Math.min(max, Math.max(min, v));
    }
    function onKeyDown(e) {
      if (!selectedId.value && selectedId.value !== 0) return;
      if (e.key === "Delete" || e.key === "Backspace") {
        if (e.target.tagName !== "INPUT") {
          deleteSlot(selectedId.value);
        }
      }
      if (["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown"].includes(e.key)) {
        e.preventDefault();
        const slot = slots.value.find((s) => s.id === selectedId.value);
        if (!slot) return;
        const step = e.shiftKey ? SNAP_PX * 8 : SNAP_PX;
        if (e.key === "ArrowLeft") slot.x = clamp(slot.x - step, 0, baseW.value - slot.w);
        if (e.key === "ArrowRight") slot.x = clamp(slot.x + step, 0, baseW.value - slot.w);
        if (e.key === "ArrowUp") slot.y = clamp(slot.y - step, 0, baseH.value - slot.h);
        if (e.key === "ArrowDown") slot.y = clamp(slot.y + step, 0, baseH.value - slot.h);
      }
    }
    const saveError = ref("");
    function buildPayload() {
      const cw = baseW.value;
      const ch = baseH.value;
      if (!cw || !ch) return null;
      const ar = imageNatW.value > 0 ? +(imageNatW.value / imageNatH.value).toFixed(4) : +(cw / ch).toFixed(4);
      return {
        label: label.value.trim(),
        aspect_ratio: ar,
        slot_count: slots.value.length,
        // Slots stored in base-px → normalize to 0-1 using base canvas size
        slots: slots.value.map((s, i) => ({
          id: i,
          x: +(s.x / cw).toFixed(4),
          y: +(s.y / ch).toFixed(4),
          w: +(s.w / cw).toFixed(4),
          h: +(s.h / ch).toFixed(4),
          rx: 8e-3
        })),
        file: imageFile.value,
        is_active: isActive.value
      };
    }
    function handleSave() {
      saveError.value = "";
      if (!label.value.trim()) {
        saveError.value = "Label wajib diisi.";
        return;
      }
      if (!imageUrl.value) {
        saveError.value = "Upload frame PNG terlebih dahulu.";
        return;
      }
      if (slots.value.length === 0) {
        saveError.value = "Tambahkan minimal 1 slot.";
        return;
      }
      const payload = buildPayload();
      if (!payload) return;
      emit("save", payload);
    }
    function close() {
      emit("update:modelValue", false);
    }
    const sidebarTab = ref("config");
    const fullscreenPreview = ref(false);
    const previewImgW = ref(0);
    const previewImgH = ref(0);
    const previewScaleX = computed(
      () => baseW.value && previewImgW.value ? previewImgW.value / baseW.value : 1
    );
    const previewScaleY = computed(
      () => baseH.value && previewImgH.value ? previewImgH.value / baseH.value : 1
    );
    function onPreviewImageLoad(e) {
      const img = e.target;
      previewImgW.value = img.offsetWidth;
      previewImgH.value = img.offsetHeight;
    }
    watch(sidebarTab, async (tab) => {
      if (tab !== "preview") return;
      await nextTick();
      const img = (void 0).querySelector(".preview-frame-img");
      if (img && img.complete) {
        previewImgW.value = img.offsetWidth;
        previewImgH.value = img.offsetHeight;
      }
    });
    const fullscreenImgW = ref(0);
    const fullscreenImgH = ref(0);
    const fullscreenScaleX = computed(
      () => baseW.value && fullscreenImgW.value ? fullscreenImgW.value / baseW.value : 1
    );
    const fullscreenScaleY = computed(
      () => baseH.value && fullscreenImgH.value ? fullscreenImgH.value / baseH.value : 1
    );
    function onFullscreenImageLoad(e) {
      const img = e.target;
      fullscreenImgW.value = img.offsetWidth;
      fullscreenImgH.value = img.offsetHeight;
    }
    watch(fullscreenPreview, async (open) => {
      if (!open) return;
      await nextTick();
      const img = (void 0).querySelector(".fullscreen-frame-img");
      if (img && img.complete) {
        fullscreenImgW.value = img.offsetWidth;
        fullscreenImgH.value = img.offsetHeight;
      }
    });
    const _kd = (e) => onKeyDown(e);
    watch(() => props.modelValue, (open) => {
      if (open) (void 0).addEventListener("keydown", _kd);
      else (void 0).removeEventListener("keydown", _kd);
    });
    const HANDLES = [
      { handle: "nw", style: { top: "-5px", left: "-5px" }, cursor: "nw-resize" },
      { handle: "n", style: { top: "-5px", left: "50%", transform: "translateX(-50%)" }, cursor: "n-resize" },
      { handle: "ne", style: { top: "-5px", right: "-5px" }, cursor: "ne-resize" },
      { handle: "e", style: { top: "50%", right: "-5px", transform: "translateY(-50%)" }, cursor: "e-resize" },
      { handle: "se", style: { bottom: "-5px", right: "-5px" }, cursor: "se-resize" },
      { handle: "s", style: { bottom: "-5px", left: "50%", transform: "translateX(-50%)" }, cursor: "s-resize" },
      { handle: "sw", style: { bottom: "-5px", left: "-5px" }, cursor: "sw-resize" },
      { handle: "w", style: { top: "50%", left: "-5px", transform: "translateY(-50%)" }, cursor: "w-resize" }
    ];
    const SLOT_COLORS = [
      "#4f46e5",
      "#0891b2",
      "#059669",
      "#d97706",
      "#dc2626",
      "#7c3aed",
      "#db2777",
      "#ea580c"
    ];
    function slotColor(i) {
      return SLOT_COLORS[i % SLOT_COLORS.length];
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VDialog, {
        "model-value": _ctx.modelValue,
        "onUpdate:modelValue": close,
        "max-width": "1500",
        persistent: true,
        scrollable: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, { style: { "display": "flex", "flex-direction": "column", "max-height": "96vh" } }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, {
                    class: "d-flex align-center gap-3 pa-4 pb-2",
                    style: { "flex-shrink": "0" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, { color: "primary" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`bx bx-layout`);
                            } else {
                              return [
                                createTextVNode("bx bx-layout")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(`<span data-v-6b80e308${_scopeId3}>${ssrInterpolate(isEditMode.value ? "Edit Template Frame" : "Tambah Template Frame Baru")}</span>`);
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "",
                          variant: "text",
                          onClick: close
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
                              createTextVNode("bx bx-layout")
                            ]),
                            _: 1
                          }),
                          createVNode("span", null, toDisplayString(isEditMode.value ? "Edit Template Frame" : "Tambah Template Frame Baru"), 1),
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            onClick: close
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
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
                  _push3(`<div class="d-flex" style="${ssrRenderStyle({ "flex": "1", "overflow": "hidden", "min-height": "0" })}" data-v-6b80e308${_scopeId2}><div class="d-flex flex-column pa-4" style="${ssrRenderStyle({ "flex": "1", "overflow": "hidden", "min-width": "0", "min-height": "0" })}" data-v-6b80e308${_scopeId2}>`);
                  if (!imageUrl.value) {
                    _push3(`<div class="upload-zone d-flex flex-column align-center justify-center rounded-xl mb-4" data-v-6b80e308${_scopeId2}>`);
                    _push3(ssrRenderComponent(VIcon, {
                      size: "48",
                      color: "primary",
                      class: "mb-3"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`bx bx-image-add`);
                        } else {
                          return [
                            createTextVNode("bx bx-image-add")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<p class="font-weight-bold mb-1" data-v-6b80e308${_scopeId2}>Upload Frame PNG</p><p class="text-caption text-medium-emphasis" data-v-6b80e308${_scopeId2}>Klik untuk pilih file (PNG, JPG, WebP)</p><input type="file" accept="image/png,image/jpeg,image/webp" style="${ssrRenderStyle({ "display": "none" })}" data-v-6b80e308${_scopeId2}></div>`);
                  } else {
                    _push3(`<!--[--><div class="d-flex align-center gap-2 mb-3 flex-wrap" data-v-6b80e308${_scopeId2}>`);
                    _push3(ssrRenderComponent(VBtn, {
                      color: "primary",
                      variant: "tonal",
                      size: "small",
                      "prepend-icon": "bx bx-plus",
                      onClick: addSlot
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Tambah Slot `);
                        } else {
                          return [
                            createTextVNode(" Tambah Slot ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VBtn, {
                      color: snapEnabled.value ? "success" : "default",
                      variant: "tonal",
                      size: "small",
                      "prepend-icon": snapEnabled.value ? "bx bx-grid-small" : "bx bx-move-horizontal",
                      onClick: ($event) => snapEnabled.value = !snapEnabled.value
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Snap ${ssrInterpolate(snapEnabled.value ? "ON" : "OFF")}`);
                        } else {
                          return [
                            createTextVNode(" Snap " + toDisplayString(snapEnabled.value ? "ON" : "OFF"), 1)
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(ssrRenderComponent(VBtn, {
                      variant: "tonal",
                      size: "small",
                      color: "warning",
                      "prepend-icon": "bx bx-image",
                      onClick: triggerFileInput
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(` Ganti Gambar `);
                        } else {
                          return [
                            createTextVNode(" Ganti Gambar ")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<input type="file" accept="image/png,image/jpeg,image/webp" style="${ssrRenderStyle({ "display": "none" })}" data-v-6b80e308${_scopeId2}>`);
                    _push3(ssrRenderComponent(VSpacer, null, null, _parent3, _scopeId2));
                    if (imageNatW.value) {
                      _push3(`<span class="text-caption text-medium-emphasis" data-v-6b80e308${_scopeId2}>${ssrInterpolate(imageNatW.value)}\xD7${ssrInterpolate(imageNatH.value)}px \xB7 AR ${ssrInterpolate(aspectRatio.value)}</span>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div><p class="text-caption text-medium-emphasis mb-2" data-v-6b80e308${_scopeId2}> Klik &quot;Tambah Slot&quot; \u2192 drag untuk pindah \xB7 drag sudut/tepi untuk resize \xB7 Delete untuk hapus \xB7 \u2191\u2193\u2190\u2192 untuk nudge </p><div class="canvas-scroll-wrapper" data-v-6b80e308${_scopeId2}><div class="canvas-container" data-v-6b80e308${_scopeId2}>`);
                    if (snapEnabled.value) {
                      _push3(`<div class="snap-grid" data-v-6b80e308${_scopeId2}></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<img${ssrRenderAttr("src", imageUrl.value)} class="frame-image" draggable="false" data-v-6b80e308${_scopeId2}><!--[-->`);
                    ssrRenderList(slots.value, (slot, idx) => {
                      _push3(`<div class="${ssrRenderClass([{ "slot-selected": selectedId.value === slot.id }, "slot-overlay"])}" style="${ssrRenderStyle({
                        left: slot.x + "px",
                        top: slot.y + "px",
                        width: slot.w + "px",
                        height: slot.h + "px",
                        "--slot-color": slotColor(idx)
                      })}" data-v-6b80e308${_scopeId2}><div class="slot-badge" data-v-6b80e308${_scopeId2}>${ssrInterpolate(idx + 1)}</div>`);
                      if (selectedId.value === slot.id) {
                        _push3(`<div class="slot-size-tip" data-v-6b80e308${_scopeId2}>${ssrInterpolate(Math.round(slot.w))}\xD7${ssrInterpolate(Math.round(slot.h))}</div>`);
                      } else {
                        _push3(`<!---->`);
                      }
                      if (selectedId.value === slot.id) {
                        _push3(`<!--[-->`);
                        ssrRenderList(HANDLES, (hd) => {
                          _push3(`<div class="resize-handle" style="${ssrRenderStyle({ ...hd.style, cursor: hd.cursor })}" data-v-6b80e308${_scopeId2}></div>`);
                        });
                        _push3(`<!--]-->`);
                      } else {
                        _push3(`<!---->`);
                      }
                      _push3(`</div>`);
                    });
                    _push3(`<!--]--></div></div><!--]-->`);
                  }
                  _push3(`</div>`);
                  _push3(ssrRenderComponent(VDivider, { vertical: "" }, null, _parent3, _scopeId2));
                  _push3(`<div class="d-flex flex-column" style="${ssrRenderStyle({ "width": "300px", "flex-shrink": "0", "overflow": "hidden" })}" data-v-6b80e308${_scopeId2}><div class="d-flex" style="${ssrRenderStyle({ "flex-shrink": "0", "border-bottom": "1px solid #e5e7eb" })}" data-v-6b80e308${_scopeId2}><button class="${ssrRenderClass([{ "sidebar-tab-active": sidebarTab.value === "config" }, "sidebar-tab"])}" data-v-6b80e308${_scopeId2}>Konfigurasi</button><button class="${ssrRenderClass([{ "sidebar-tab-active": sidebarTab.value === "preview" }, "sidebar-tab"])}" data-v-6b80e308${_scopeId2}>Preview</button></div>`);
                  if (sidebarTab.value === "config") {
                    _push3(`<div class="pa-4 d-flex flex-column gap-4" style="${ssrRenderStyle({ "overflow-y": "auto", "flex": "1" })}" data-v-6b80e308${_scopeId2}><div data-v-6b80e308${_scopeId2}><p class="text-caption font-weight-bold text-uppercase mb-1" style="${ssrRenderStyle({ "color": "#888" })}" data-v-6b80e308${_scopeId2}>Nama Template</p>`);
                    _push3(ssrRenderComponent(VTextField, {
                      modelValue: label.value,
                      "onUpdate:modelValue": ($event) => label.value = $event,
                      density: "compact",
                      variant: "outlined",
                      placeholder: "cth: Lotso 6 Foto",
                      "hide-details": ""
                    }, null, _parent3, _scopeId2));
                    _push3(`</div><div class="d-flex align-center justify-space-between" data-v-6b80e308${_scopeId2}><span class="text-caption font-weight-bold text-uppercase" style="${ssrRenderStyle({ "color": "#888" })}" data-v-6b80e308${_scopeId2}>Status Aktif</span>`);
                    _push3(ssrRenderComponent(VSwitch, {
                      modelValue: isActive.value,
                      "onUpdate:modelValue": ($event) => isActive.value = $event,
                      color: "success",
                      "hide-details": "",
                      density: "compact"
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                    _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
                    _push3(`<div data-v-6b80e308${_scopeId2}><p class="text-caption font-weight-bold text-uppercase mb-2" style="${ssrRenderStyle({ "color": "#888" })}" data-v-6b80e308${_scopeId2}> Daftar Slot (${ssrInterpolate(slots.value.length)}) </p>`);
                    if (slots.value.length === 0) {
                      _push3(`<div class="text-center pa-4 rounded-lg" style="${ssrRenderStyle({ "background": "#f9f9f9", "border": "1px dashed #ddd" })}" data-v-6b80e308${_scopeId2}>`);
                      _push3(ssrRenderComponent(VIcon, {
                        color: "grey-lighten-1",
                        size: "28"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`bx bx-layer`);
                          } else {
                            return [
                              createTextVNode("bx bx-layer")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`<p class="text-caption text-medium-emphasis mt-1" data-v-6b80e308${_scopeId2}>Belum ada slot.<br data-v-6b80e308${_scopeId2}>Klik &quot;Tambah Slot&quot; di atas.</p></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="d-flex flex-column gap-1" data-v-6b80e308${_scopeId2}><!--[-->`);
                    ssrRenderList(slots.value, (slot, idx) => {
                      _push3(`<div class="${ssrRenderClass([{ "slot-list-selected": selectedId.value === slot.id }, "slot-list-item d-flex align-center gap-2 px-2 py-2 rounded-lg"])}" style="${ssrRenderStyle({ "--slot-color": slotColor(idx) })}" data-v-6b80e308${_scopeId2}><div class="slot-list-dot" data-v-6b80e308${_scopeId2}></div><span class="text-caption font-weight-medium flex-1" data-v-6b80e308${_scopeId2}>Slot ${ssrInterpolate(idx + 1)}</span><span class="text-caption text-medium-emphasis" data-v-6b80e308${_scopeId2}>${ssrInterpolate(Math.round(slot.w))}\xD7${ssrInterpolate(Math.round(slot.h))}</span>`);
                      _push3(ssrRenderComponent(VBtn, {
                        icon: "",
                        variant: "text",
                        size: "x-small",
                        onClick: ($event) => deleteSlot(slot.id)
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VIcon, {
                              size: "14",
                              color: "error"
                            }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`bx bx-trash`);
                                } else {
                                  return [
                                    createTextVNode("bx bx-trash")
                                  ];
                                }
                              }),
                              _: 2
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(VIcon, {
                                size: "14",
                                color: "error"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("bx bx-trash")
                                ]),
                                _: 1
                              })
                            ];
                          }
                        }),
                        _: 2
                      }, _parent3, _scopeId2));
                      _push3(`</div>`);
                    });
                    _push3(`<!--]--></div></div>`);
                    _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
                    if (imageUrl.value) {
                      _push3(`<div class="d-flex flex-column gap-1" data-v-6b80e308${_scopeId2}><div class="d-flex justify-space-between text-caption" data-v-6b80e308${_scopeId2}><span class="text-medium-emphasis" data-v-6b80e308${_scopeId2}>Aspect Ratio</span><span class="font-weight-bold" data-v-6b80e308${_scopeId2}>${ssrInterpolate(aspectRatio.value || "\u2014")}</span></div><div class="d-flex justify-space-between text-caption" data-v-6b80e308${_scopeId2}><span class="text-medium-emphasis" data-v-6b80e308${_scopeId2}>Jumlah Slot</span><span class="font-weight-bold" data-v-6b80e308${_scopeId2}>${ssrInterpolate(slots.value.length)}</span></div><div class="d-flex justify-space-between text-caption" data-v-6b80e308${_scopeId2}><span class="text-medium-emphasis" data-v-6b80e308${_scopeId2}>Resolusi</span><span class="font-weight-bold" data-v-6b80e308${_scopeId2}>${ssrInterpolate(imageNatW.value)}\xD7${ssrInterpolate(imageNatH.value)}</span></div></div>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`<div class="pa-3 rounded-lg" style="${ssrRenderStyle({ "background": "#f0f4ff", "border": "1px solid #c7d7ff" })}" data-v-6b80e308${_scopeId2}><p class="text-caption font-weight-bold mb-1" style="${ssrRenderStyle({ "color": "#4f46e5" })}" data-v-6b80e308${_scopeId2}>Tips</p><ul class="text-caption" style="${ssrRenderStyle({ "color": "#555", "padding-left": "16px", "line-height": "1.7" })}" data-v-6b80e308${_scopeId2}><li data-v-6b80e308${_scopeId2}>Drag slot untuk pindah posisi</li><li data-v-6b80e308${_scopeId2}>Drag sudut/tepi untuk resize</li><li data-v-6b80e308${_scopeId2}>Tombol Delete untuk hapus slot</li><li data-v-6b80e308${_scopeId2}>Arrow key untuk nudge 2px</li><li data-v-6b80e308${_scopeId2}>Shift+Arrow untuk nudge 16px</li><li data-v-6b80e308${_scopeId2}>Snap Grid menjaga slot rapi</li></ul></div></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (sidebarTab.value === "preview") {
                    _push3(`<div class="pa-3 d-flex flex-column gap-3" style="${ssrRenderStyle({ "overflow-y": "auto", "flex": "1" })}" data-v-6b80e308${_scopeId2}><div class="d-flex align-center justify-space-between" data-v-6b80e308${_scopeId2}><p class="text-caption font-weight-bold text-uppercase" style="${ssrRenderStyle({ "color": "#888", "margin": "0" })}" data-v-6b80e308${_scopeId2}> Preview dengan foto sample </p>`);
                    if (imageUrl.value && slots.value.length > 0) {
                      _push3(ssrRenderComponent(VBtn, {
                        icon: "",
                        variant: "tonal",
                        size: "x-small",
                        color: "primary",
                        title: "Lihat fullscreen",
                        onClick: ($event) => fullscreenPreview.value = true
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(ssrRenderComponent(VIcon, { size: "16" }, {
                              default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                                if (_push5) {
                                  _push5(`bx bx-expand-alt`);
                                } else {
                                  return [
                                    createTextVNode("bx bx-expand-alt")
                                  ];
                                }
                              }),
                              _: 1
                            }, _parent4, _scopeId3));
                          } else {
                            return [
                              createVNode(VIcon, { size: "16" }, {
                                default: withCtx(() => [
                                  createTextVNode("bx bx-expand-alt")
                                ]),
                                _: 1
                              })
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                    if (!imageUrl.value || slots.value.length === 0) {
                      _push3(`<div class="text-center pa-6 text-medium-emphasis" data-v-6b80e308${_scopeId2}>`);
                      _push3(ssrRenderComponent(VIcon, {
                        size: "36",
                        class: "mb-2"
                      }, {
                        default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                          if (_push4) {
                            _push4(`bx bx-image`);
                          } else {
                            return [
                              createTextVNode("bx bx-image")
                            ];
                          }
                        }),
                        _: 1
                      }, _parent3, _scopeId2));
                      _push3(`<p class="text-caption" data-v-6b80e308${_scopeId2}>Upload frame dan tambahkan slot untuk melihat preview.</p></div>`);
                    } else {
                      _push3(`<div class="preview-canvas-wrapper" data-v-6b80e308${_scopeId2}><div class="preview-canvas" data-v-6b80e308${_scopeId2}><!--[-->`);
                      ssrRenderList(slots.value, (slot, idx) => {
                        _push3(`<div class="preview-slot" style="${ssrRenderStyle({
                          left: slot.x * previewScaleX.value + "px",
                          top: slot.y * previewScaleY.value + "px",
                          width: slot.w * previewScaleX.value + "px",
                          height: slot.h * previewScaleY.value + "px"
                        })}" data-v-6b80e308${_scopeId2}><img${ssrRenderAttr("src", `https://picsum.photos/seed/${idx + 1}/400/600`)}${ssrRenderAttr("alt", `Sample ${idx + 1}`)} class="preview-slot-img" data-v-6b80e308${_scopeId2}><div class="preview-slot-label" data-v-6b80e308${_scopeId2}>${ssrInterpolate(idx + 1)}</div></div>`);
                      });
                      _push3(`<!--]--><img${ssrRenderAttr("src", imageUrl.value)} class="preview-frame-img" draggable="false" data-v-6b80e308${_scopeId2}></div></div>`);
                    }
                    if (imageUrl.value && slots.value.length > 0) {
                      _push3(`<p class="text-caption text-medium-emphasis text-center" data-v-6b80e308${_scopeId2}> Foto sample dari picsum.photos </p>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</div></div>`);
                  _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, {
                    class: "pa-4",
                    style: { "flex-shrink": "0" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (saveError.value) {
                          _push4(ssrRenderComponent(VAlert, {
                            type: "error",
                            density: "compact",
                            variant: "tonal",
                            class: "text-caption flex-1",
                            style: { "padding": "6px 12px" }
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(saveError.value)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(saveError.value), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        }
                        _push4(ssrRenderComponent(VBtn, {
                          variant: "text",
                          onClick: close
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
                          "prepend-icon": "bx bx-save",
                          onClick: handleSave
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`${ssrInterpolate(isEditMode.value ? "Update Template" : "Simpan Template")}`);
                            } else {
                              return [
                                createTextVNode(toDisplayString(isEditMode.value ? "Update Template" : "Simpan Template"), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          saveError.value ? (openBlock(), createBlock(VAlert, {
                            key: 0,
                            type: "error",
                            density: "compact",
                            variant: "tonal",
                            class: "text-caption flex-1",
                            style: { "padding": "6px 12px" }
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(saveError.value), 1)
                            ]),
                            _: 1
                          })) : (openBlock(), createBlock(VSpacer, { key: 1 })),
                          createVNode(VBtn, {
                            variant: "text",
                            onClick: close
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            color: "primary",
                            variant: "elevated",
                            "prepend-icon": "bx bx-save",
                            onClick: handleSave
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(isEditMode.value ? "Update Template" : "Simpan Template"), 1)
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
                    createVNode(VCardTitle, {
                      class: "d-flex align-center gap-3 pa-4 pb-2",
                      style: { "flex-shrink": "0" }
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { color: "primary" }, {
                          default: withCtx(() => [
                            createTextVNode("bx bx-layout")
                          ]),
                          _: 1
                        }),
                        createVNode("span", null, toDisplayString(isEditMode.value ? "Edit Template Frame" : "Tambah Template Frame Baru"), 1),
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          icon: "",
                          variant: "text",
                          onClick: close
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
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VDivider),
                    createVNode("div", {
                      class: "d-flex",
                      style: { "flex": "1", "overflow": "hidden", "min-height": "0" }
                    }, [
                      createVNode("div", {
                        class: "d-flex flex-column pa-4",
                        style: { "flex": "1", "overflow": "hidden", "min-width": "0", "min-height": "0" }
                      }, [
                        !imageUrl.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "upload-zone d-flex flex-column align-center justify-center rounded-xl mb-4",
                          onClick: triggerFileInput
                        }, [
                          createVNode(VIcon, {
                            size: "48",
                            color: "primary",
                            class: "mb-3"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("bx bx-image-add")
                            ]),
                            _: 1
                          }),
                          createVNode("p", { class: "font-weight-bold mb-1" }, "Upload Frame PNG"),
                          createVNode("p", { class: "text-caption text-medium-emphasis" }, "Klik untuk pilih file (PNG, JPG, WebP)"),
                          createVNode("input", {
                            ref_key: "fileInput",
                            ref: fileInput,
                            type: "file",
                            accept: "image/png,image/jpeg,image/webp",
                            style: { "display": "none" },
                            onChange: onFileChange
                          }, null, 544)
                        ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                          createVNode("div", { class: "d-flex align-center gap-2 mb-3 flex-wrap" }, [
                            createVNode(VBtn, {
                              color: "primary",
                              variant: "tonal",
                              size: "small",
                              "prepend-icon": "bx bx-plus",
                              onClick: addSlot
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Tambah Slot ")
                              ]),
                              _: 1
                            }),
                            createVNode(VBtn, {
                              color: snapEnabled.value ? "success" : "default",
                              variant: "tonal",
                              size: "small",
                              "prepend-icon": snapEnabled.value ? "bx bx-grid-small" : "bx bx-move-horizontal",
                              onClick: ($event) => snapEnabled.value = !snapEnabled.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Snap " + toDisplayString(snapEnabled.value ? "ON" : "OFF"), 1)
                              ]),
                              _: 1
                            }, 8, ["color", "prepend-icon", "onClick"]),
                            createVNode(VBtn, {
                              variant: "tonal",
                              size: "small",
                              color: "warning",
                              "prepend-icon": "bx bx-image",
                              onClick: triggerFileInput
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Ganti Gambar ")
                              ]),
                              _: 1
                            }),
                            createVNode("input", {
                              ref_key: "fileInput",
                              ref: fileInput,
                              type: "file",
                              accept: "image/png,image/jpeg,image/webp",
                              style: { "display": "none" },
                              onChange: onFileChange
                            }, null, 544),
                            createVNode(VSpacer),
                            imageNatW.value ? (openBlock(), createBlock("span", {
                              key: 0,
                              class: "text-caption text-medium-emphasis"
                            }, toDisplayString(imageNatW.value) + "\xD7" + toDisplayString(imageNatH.value) + "px \xB7 AR " + toDisplayString(aspectRatio.value), 1)) : createCommentVNode("", true)
                          ]),
                          createVNode("p", { class: "text-caption text-medium-emphasis mb-2" }, ' Klik "Tambah Slot" \u2192 drag untuk pindah \xB7 drag sudut/tepi untuk resize \xB7 Delete untuk hapus \xB7 \u2191\u2193\u2190\u2192 untuk nudge '),
                          createVNode("div", { class: "canvas-scroll-wrapper" }, [
                            createVNode("div", {
                              class: "canvas-container",
                              onPointerup: onPointerUp,
                              onPointermove: onPointerMove,
                              onClick: withModifiers(deselectAll, ["self"])
                            }, [
                              snapEnabled.value ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "snap-grid"
                              })) : createCommentVNode("", true),
                              createVNode("img", {
                                src: imageUrl.value,
                                class: "frame-image",
                                draggable: "false",
                                onLoad: onImageLoad
                              }, null, 40, ["src"]),
                              (openBlock(true), createBlock(Fragment, null, renderList(slots.value, (slot, idx) => {
                                return openBlock(), createBlock("div", {
                                  key: slot.id,
                                  class: ["slot-overlay", { "slot-selected": selectedId.value === slot.id }],
                                  style: {
                                    left: slot.x + "px",
                                    top: slot.y + "px",
                                    width: slot.w + "px",
                                    height: slot.h + "px",
                                    "--slot-color": slotColor(idx)
                                  },
                                  onPointerdown: ($event) => onSlotPointerDown($event, slot.id),
                                  onClick: withModifiers(($event) => selectSlot(slot.id), ["stop"])
                                }, [
                                  createVNode("div", { class: "slot-badge" }, toDisplayString(idx + 1), 1),
                                  selectedId.value === slot.id ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "slot-size-tip"
                                  }, toDisplayString(Math.round(slot.w)) + "\xD7" + toDisplayString(Math.round(slot.h)), 1)) : createCommentVNode("", true),
                                  selectedId.value === slot.id ? (openBlock(), createBlock(Fragment, { key: 1 }, renderList(HANDLES, (hd) => {
                                    return createVNode("div", {
                                      key: hd.handle,
                                      class: "resize-handle",
                                      style: { ...hd.style, cursor: hd.cursor },
                                      onPointerdown: withModifiers(($event) => onHandlePointerDown($event, slot.id, hd.handle), ["stop"])
                                    }, null, 44, ["onPointerdown"]);
                                  }), 64)) : createCommentVNode("", true)
                                ], 46, ["onPointerdown", "onClick"]);
                              }), 128))
                            ], 32)
                          ])
                        ], 64))
                      ]),
                      createVNode(VDivider, { vertical: "" }),
                      createVNode("div", {
                        class: "d-flex flex-column",
                        style: { "width": "300px", "flex-shrink": "0", "overflow": "hidden" }
                      }, [
                        createVNode("div", {
                          class: "d-flex",
                          style: { "flex-shrink": "0", "border-bottom": "1px solid #e5e7eb" }
                        }, [
                          createVNode("button", {
                            class: ["sidebar-tab", { "sidebar-tab-active": sidebarTab.value === "config" }],
                            onClick: ($event) => sidebarTab.value = "config"
                          }, "Konfigurasi", 10, ["onClick"]),
                          createVNode("button", {
                            class: ["sidebar-tab", { "sidebar-tab-active": sidebarTab.value === "preview" }],
                            onClick: ($event) => sidebarTab.value = "preview"
                          }, "Preview", 10, ["onClick"])
                        ]),
                        sidebarTab.value === "config" ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "pa-4 d-flex flex-column gap-4",
                          style: { "overflow-y": "auto", "flex": "1" }
                        }, [
                          createVNode("div", null, [
                            createVNode("p", {
                              class: "text-caption font-weight-bold text-uppercase mb-1",
                              style: { "color": "#888" }
                            }, "Nama Template"),
                            createVNode(VTextField, {
                              modelValue: label.value,
                              "onUpdate:modelValue": ($event) => label.value = $event,
                              density: "compact",
                              variant: "outlined",
                              placeholder: "cth: Lotso 6 Foto",
                              "hide-details": ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                            createVNode("span", {
                              class: "text-caption font-weight-bold text-uppercase",
                              style: { "color": "#888" }
                            }, "Status Aktif"),
                            createVNode(VSwitch, {
                              modelValue: isActive.value,
                              "onUpdate:modelValue": ($event) => isActive.value = $event,
                              color: "success",
                              "hide-details": "",
                              density: "compact"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          createVNode(VDivider),
                          createVNode("div", null, [
                            createVNode("p", {
                              class: "text-caption font-weight-bold text-uppercase mb-2",
                              style: { "color": "#888" }
                            }, " Daftar Slot (" + toDisplayString(slots.value.length) + ") ", 1),
                            slots.value.length === 0 ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "text-center pa-4 rounded-lg",
                              style: { "background": "#f9f9f9", "border": "1px dashed #ddd" }
                            }, [
                              createVNode(VIcon, {
                                color: "grey-lighten-1",
                                size: "28"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("bx bx-layer")
                                ]),
                                _: 1
                              }),
                              createVNode("p", { class: "text-caption text-medium-emphasis mt-1" }, [
                                createTextVNode("Belum ada slot."),
                                createVNode("br"),
                                createTextVNode('Klik "Tambah Slot" di atas.')
                              ])
                            ])) : createCommentVNode("", true),
                            createVNode("div", { class: "d-flex flex-column gap-1" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(slots.value, (slot, idx) => {
                                return openBlock(), createBlock("div", {
                                  key: slot.id,
                                  class: ["slot-list-item d-flex align-center gap-2 px-2 py-2 rounded-lg", { "slot-list-selected": selectedId.value === slot.id }],
                                  style: { "--slot-color": slotColor(idx) },
                                  onClick: ($event) => selectSlot(slot.id)
                                }, [
                                  createVNode("div", { class: "slot-list-dot" }),
                                  createVNode("span", { class: "text-caption font-weight-medium flex-1" }, "Slot " + toDisplayString(idx + 1), 1),
                                  createVNode("span", { class: "text-caption text-medium-emphasis" }, toDisplayString(Math.round(slot.w)) + "\xD7" + toDisplayString(Math.round(slot.h)), 1),
                                  createVNode(VBtn, {
                                    icon: "",
                                    variant: "text",
                                    size: "x-small",
                                    onClick: withModifiers(($event) => deleteSlot(slot.id), ["stop"])
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, {
                                        size: "14",
                                        color: "error"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode("bx bx-trash")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])
                                ], 14, ["onClick"]);
                              }), 128))
                            ])
                          ]),
                          createVNode(VDivider),
                          imageUrl.value ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "d-flex flex-column gap-1"
                          }, [
                            createVNode("div", { class: "d-flex justify-space-between text-caption" }, [
                              createVNode("span", { class: "text-medium-emphasis" }, "Aspect Ratio"),
                              createVNode("span", { class: "font-weight-bold" }, toDisplayString(aspectRatio.value || "\u2014"), 1)
                            ]),
                            createVNode("div", { class: "d-flex justify-space-between text-caption" }, [
                              createVNode("span", { class: "text-medium-emphasis" }, "Jumlah Slot"),
                              createVNode("span", { class: "font-weight-bold" }, toDisplayString(slots.value.length), 1)
                            ]),
                            createVNode("div", { class: "d-flex justify-space-between text-caption" }, [
                              createVNode("span", { class: "text-medium-emphasis" }, "Resolusi"),
                              createVNode("span", { class: "font-weight-bold" }, toDisplayString(imageNatW.value) + "\xD7" + toDisplayString(imageNatH.value), 1)
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode("div", {
                            class: "pa-3 rounded-lg",
                            style: { "background": "#f0f4ff", "border": "1px solid #c7d7ff" }
                          }, [
                            createVNode("p", {
                              class: "text-caption font-weight-bold mb-1",
                              style: { "color": "#4f46e5" }
                            }, "Tips"),
                            createVNode("ul", {
                              class: "text-caption",
                              style: { "color": "#555", "padding-left": "16px", "line-height": "1.7" }
                            }, [
                              createVNode("li", null, "Drag slot untuk pindah posisi"),
                              createVNode("li", null, "Drag sudut/tepi untuk resize"),
                              createVNode("li", null, "Tombol Delete untuk hapus slot"),
                              createVNode("li", null, "Arrow key untuk nudge 2px"),
                              createVNode("li", null, "Shift+Arrow untuk nudge 16px"),
                              createVNode("li", null, "Snap Grid menjaga slot rapi")
                            ])
                          ])
                        ])) : createCommentVNode("", true),
                        sidebarTab.value === "preview" ? (openBlock(), createBlock("div", {
                          key: 1,
                          class: "pa-3 d-flex flex-column gap-3",
                          style: { "overflow-y": "auto", "flex": "1" }
                        }, [
                          createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                            createVNode("p", {
                              class: "text-caption font-weight-bold text-uppercase",
                              style: { "color": "#888", "margin": "0" }
                            }, " Preview dengan foto sample "),
                            imageUrl.value && slots.value.length > 0 ? (openBlock(), createBlock(VBtn, {
                              key: 0,
                              icon: "",
                              variant: "tonal",
                              size: "x-small",
                              color: "primary",
                              title: "Lihat fullscreen",
                              onClick: ($event) => fullscreenPreview.value = true
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, { size: "16" }, {
                                  default: withCtx(() => [
                                    createTextVNode("bx bx-expand-alt")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }, 8, ["onClick"])) : createCommentVNode("", true)
                          ]),
                          !imageUrl.value || slots.value.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center pa-6 text-medium-emphasis"
                          }, [
                            createVNode(VIcon, {
                              size: "36",
                              class: "mb-2"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("bx bx-image")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "text-caption" }, "Upload frame dan tambahkan slot untuk melihat preview.")
                          ])) : (openBlock(), createBlock("div", {
                            key: 1,
                            class: "preview-canvas-wrapper"
                          }, [
                            createVNode("div", { class: "preview-canvas" }, [
                              (openBlock(true), createBlock(Fragment, null, renderList(slots.value, (slot, idx) => {
                                return openBlock(), createBlock("div", {
                                  key: slot.id,
                                  class: "preview-slot",
                                  style: {
                                    left: slot.x * previewScaleX.value + "px",
                                    top: slot.y * previewScaleY.value + "px",
                                    width: slot.w * previewScaleX.value + "px",
                                    height: slot.h * previewScaleY.value + "px"
                                  }
                                }, [
                                  createVNode("img", {
                                    src: `https://picsum.photos/seed/${idx + 1}/400/600`,
                                    alt: `Sample ${idx + 1}`,
                                    class: "preview-slot-img"
                                  }, null, 8, ["src", "alt"]),
                                  createVNode("div", { class: "preview-slot-label" }, toDisplayString(idx + 1), 1)
                                ], 4);
                              }), 128)),
                              createVNode("img", {
                                src: imageUrl.value,
                                class: "preview-frame-img",
                                draggable: "false",
                                onLoad: onPreviewImageLoad
                              }, null, 40, ["src"])
                            ])
                          ])),
                          imageUrl.value && slots.value.length > 0 ? (openBlock(), createBlock("p", {
                            key: 2,
                            class: "text-caption text-medium-emphasis text-center"
                          }, " Foto sample dari picsum.photos ")) : createCommentVNode("", true)
                        ])) : createCommentVNode("", true)
                      ])
                    ]),
                    createVNode(VDivider),
                    createVNode(VCardActions, {
                      class: "pa-4",
                      style: { "flex-shrink": "0" }
                    }, {
                      default: withCtx(() => [
                        saveError.value ? (openBlock(), createBlock(VAlert, {
                          key: 0,
                          type: "error",
                          density: "compact",
                          variant: "tonal",
                          class: "text-caption flex-1",
                          style: { "padding": "6px 12px" }
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(saveError.value), 1)
                          ]),
                          _: 1
                        })) : (openBlock(), createBlock(VSpacer, { key: 1 })),
                        createVNode(VBtn, {
                          variant: "text",
                          onClick: close
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }),
                        createVNode(VBtn, {
                          color: "primary",
                          variant: "elevated",
                          "prepend-icon": "bx bx-save",
                          onClick: handleSave
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(isEditMode.value ? "Update Template" : "Simpan Template"), 1)
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
              createVNode(VCard, { style: { "display": "flex", "flex-direction": "column", "max-height": "96vh" } }, {
                default: withCtx(() => [
                  createVNode(VCardTitle, {
                    class: "d-flex align-center gap-3 pa-4 pb-2",
                    style: { "flex-shrink": "0" }
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { color: "primary" }, {
                        default: withCtx(() => [
                          createTextVNode("bx bx-layout")
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, toDisplayString(isEditMode.value ? "Edit Template Frame" : "Tambah Template Frame Baru"), 1),
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        icon: "",
                        variant: "text",
                        onClick: close
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
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VDivider),
                  createVNode("div", {
                    class: "d-flex",
                    style: { "flex": "1", "overflow": "hidden", "min-height": "0" }
                  }, [
                    createVNode("div", {
                      class: "d-flex flex-column pa-4",
                      style: { "flex": "1", "overflow": "hidden", "min-width": "0", "min-height": "0" }
                    }, [
                      !imageUrl.value ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "upload-zone d-flex flex-column align-center justify-center rounded-xl mb-4",
                        onClick: triggerFileInput
                      }, [
                        createVNode(VIcon, {
                          size: "48",
                          color: "primary",
                          class: "mb-3"
                        }, {
                          default: withCtx(() => [
                            createTextVNode("bx bx-image-add")
                          ]),
                          _: 1
                        }),
                        createVNode("p", { class: "font-weight-bold mb-1" }, "Upload Frame PNG"),
                        createVNode("p", { class: "text-caption text-medium-emphasis" }, "Klik untuk pilih file (PNG, JPG, WebP)"),
                        createVNode("input", {
                          ref_key: "fileInput",
                          ref: fileInput,
                          type: "file",
                          accept: "image/png,image/jpeg,image/webp",
                          style: { "display": "none" },
                          onChange: onFileChange
                        }, null, 544)
                      ])) : (openBlock(), createBlock(Fragment, { key: 1 }, [
                        createVNode("div", { class: "d-flex align-center gap-2 mb-3 flex-wrap" }, [
                          createVNode(VBtn, {
                            color: "primary",
                            variant: "tonal",
                            size: "small",
                            "prepend-icon": "bx bx-plus",
                            onClick: addSlot
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Tambah Slot ")
                            ]),
                            _: 1
                          }),
                          createVNode(VBtn, {
                            color: snapEnabled.value ? "success" : "default",
                            variant: "tonal",
                            size: "small",
                            "prepend-icon": snapEnabled.value ? "bx bx-grid-small" : "bx bx-move-horizontal",
                            onClick: ($event) => snapEnabled.value = !snapEnabled.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Snap " + toDisplayString(snapEnabled.value ? "ON" : "OFF"), 1)
                            ]),
                            _: 1
                          }, 8, ["color", "prepend-icon", "onClick"]),
                          createVNode(VBtn, {
                            variant: "tonal",
                            size: "small",
                            color: "warning",
                            "prepend-icon": "bx bx-image",
                            onClick: triggerFileInput
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Ganti Gambar ")
                            ]),
                            _: 1
                          }),
                          createVNode("input", {
                            ref_key: "fileInput",
                            ref: fileInput,
                            type: "file",
                            accept: "image/png,image/jpeg,image/webp",
                            style: { "display": "none" },
                            onChange: onFileChange
                          }, null, 544),
                          createVNode(VSpacer),
                          imageNatW.value ? (openBlock(), createBlock("span", {
                            key: 0,
                            class: "text-caption text-medium-emphasis"
                          }, toDisplayString(imageNatW.value) + "\xD7" + toDisplayString(imageNatH.value) + "px \xB7 AR " + toDisplayString(aspectRatio.value), 1)) : createCommentVNode("", true)
                        ]),
                        createVNode("p", { class: "text-caption text-medium-emphasis mb-2" }, ' Klik "Tambah Slot" \u2192 drag untuk pindah \xB7 drag sudut/tepi untuk resize \xB7 Delete untuk hapus \xB7 \u2191\u2193\u2190\u2192 untuk nudge '),
                        createVNode("div", { class: "canvas-scroll-wrapper" }, [
                          createVNode("div", {
                            class: "canvas-container",
                            onPointerup: onPointerUp,
                            onPointermove: onPointerMove,
                            onClick: withModifiers(deselectAll, ["self"])
                          }, [
                            snapEnabled.value ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "snap-grid"
                            })) : createCommentVNode("", true),
                            createVNode("img", {
                              src: imageUrl.value,
                              class: "frame-image",
                              draggable: "false",
                              onLoad: onImageLoad
                            }, null, 40, ["src"]),
                            (openBlock(true), createBlock(Fragment, null, renderList(slots.value, (slot, idx) => {
                              return openBlock(), createBlock("div", {
                                key: slot.id,
                                class: ["slot-overlay", { "slot-selected": selectedId.value === slot.id }],
                                style: {
                                  left: slot.x + "px",
                                  top: slot.y + "px",
                                  width: slot.w + "px",
                                  height: slot.h + "px",
                                  "--slot-color": slotColor(idx)
                                },
                                onPointerdown: ($event) => onSlotPointerDown($event, slot.id),
                                onClick: withModifiers(($event) => selectSlot(slot.id), ["stop"])
                              }, [
                                createVNode("div", { class: "slot-badge" }, toDisplayString(idx + 1), 1),
                                selectedId.value === slot.id ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "slot-size-tip"
                                }, toDisplayString(Math.round(slot.w)) + "\xD7" + toDisplayString(Math.round(slot.h)), 1)) : createCommentVNode("", true),
                                selectedId.value === slot.id ? (openBlock(), createBlock(Fragment, { key: 1 }, renderList(HANDLES, (hd) => {
                                  return createVNode("div", {
                                    key: hd.handle,
                                    class: "resize-handle",
                                    style: { ...hd.style, cursor: hd.cursor },
                                    onPointerdown: withModifiers(($event) => onHandlePointerDown($event, slot.id, hd.handle), ["stop"])
                                  }, null, 44, ["onPointerdown"]);
                                }), 64)) : createCommentVNode("", true)
                              ], 46, ["onPointerdown", "onClick"]);
                            }), 128))
                          ], 32)
                        ])
                      ], 64))
                    ]),
                    createVNode(VDivider, { vertical: "" }),
                    createVNode("div", {
                      class: "d-flex flex-column",
                      style: { "width": "300px", "flex-shrink": "0", "overflow": "hidden" }
                    }, [
                      createVNode("div", {
                        class: "d-flex",
                        style: { "flex-shrink": "0", "border-bottom": "1px solid #e5e7eb" }
                      }, [
                        createVNode("button", {
                          class: ["sidebar-tab", { "sidebar-tab-active": sidebarTab.value === "config" }],
                          onClick: ($event) => sidebarTab.value = "config"
                        }, "Konfigurasi", 10, ["onClick"]),
                        createVNode("button", {
                          class: ["sidebar-tab", { "sidebar-tab-active": sidebarTab.value === "preview" }],
                          onClick: ($event) => sidebarTab.value = "preview"
                        }, "Preview", 10, ["onClick"])
                      ]),
                      sidebarTab.value === "config" ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "pa-4 d-flex flex-column gap-4",
                        style: { "overflow-y": "auto", "flex": "1" }
                      }, [
                        createVNode("div", null, [
                          createVNode("p", {
                            class: "text-caption font-weight-bold text-uppercase mb-1",
                            style: { "color": "#888" }
                          }, "Nama Template"),
                          createVNode(VTextField, {
                            modelValue: label.value,
                            "onUpdate:modelValue": ($event) => label.value = $event,
                            density: "compact",
                            variant: "outlined",
                            placeholder: "cth: Lotso 6 Foto",
                            "hide-details": ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                          createVNode("span", {
                            class: "text-caption font-weight-bold text-uppercase",
                            style: { "color": "#888" }
                          }, "Status Aktif"),
                          createVNode(VSwitch, {
                            modelValue: isActive.value,
                            "onUpdate:modelValue": ($event) => isActive.value = $event,
                            color: "success",
                            "hide-details": "",
                            density: "compact"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        createVNode(VDivider),
                        createVNode("div", null, [
                          createVNode("p", {
                            class: "text-caption font-weight-bold text-uppercase mb-2",
                            style: { "color": "#888" }
                          }, " Daftar Slot (" + toDisplayString(slots.value.length) + ") ", 1),
                          slots.value.length === 0 ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "text-center pa-4 rounded-lg",
                            style: { "background": "#f9f9f9", "border": "1px dashed #ddd" }
                          }, [
                            createVNode(VIcon, {
                              color: "grey-lighten-1",
                              size: "28"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("bx bx-layer")
                              ]),
                              _: 1
                            }),
                            createVNode("p", { class: "text-caption text-medium-emphasis mt-1" }, [
                              createTextVNode("Belum ada slot."),
                              createVNode("br"),
                              createTextVNode('Klik "Tambah Slot" di atas.')
                            ])
                          ])) : createCommentVNode("", true),
                          createVNode("div", { class: "d-flex flex-column gap-1" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(slots.value, (slot, idx) => {
                              return openBlock(), createBlock("div", {
                                key: slot.id,
                                class: ["slot-list-item d-flex align-center gap-2 px-2 py-2 rounded-lg", { "slot-list-selected": selectedId.value === slot.id }],
                                style: { "--slot-color": slotColor(idx) },
                                onClick: ($event) => selectSlot(slot.id)
                              }, [
                                createVNode("div", { class: "slot-list-dot" }),
                                createVNode("span", { class: "text-caption font-weight-medium flex-1" }, "Slot " + toDisplayString(idx + 1), 1),
                                createVNode("span", { class: "text-caption text-medium-emphasis" }, toDisplayString(Math.round(slot.w)) + "\xD7" + toDisplayString(Math.round(slot.h)), 1),
                                createVNode(VBtn, {
                                  icon: "",
                                  variant: "text",
                                  size: "x-small",
                                  onClick: withModifiers(($event) => deleteSlot(slot.id), ["stop"])
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, {
                                      size: "14",
                                      color: "error"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode("bx bx-trash")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ], 14, ["onClick"]);
                            }), 128))
                          ])
                        ]),
                        createVNode(VDivider),
                        imageUrl.value ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "d-flex flex-column gap-1"
                        }, [
                          createVNode("div", { class: "d-flex justify-space-between text-caption" }, [
                            createVNode("span", { class: "text-medium-emphasis" }, "Aspect Ratio"),
                            createVNode("span", { class: "font-weight-bold" }, toDisplayString(aspectRatio.value || "\u2014"), 1)
                          ]),
                          createVNode("div", { class: "d-flex justify-space-between text-caption" }, [
                            createVNode("span", { class: "text-medium-emphasis" }, "Jumlah Slot"),
                            createVNode("span", { class: "font-weight-bold" }, toDisplayString(slots.value.length), 1)
                          ]),
                          createVNode("div", { class: "d-flex justify-space-between text-caption" }, [
                            createVNode("span", { class: "text-medium-emphasis" }, "Resolusi"),
                            createVNode("span", { class: "font-weight-bold" }, toDisplayString(imageNatW.value) + "\xD7" + toDisplayString(imageNatH.value), 1)
                          ])
                        ])) : createCommentVNode("", true),
                        createVNode("div", {
                          class: "pa-3 rounded-lg",
                          style: { "background": "#f0f4ff", "border": "1px solid #c7d7ff" }
                        }, [
                          createVNode("p", {
                            class: "text-caption font-weight-bold mb-1",
                            style: { "color": "#4f46e5" }
                          }, "Tips"),
                          createVNode("ul", {
                            class: "text-caption",
                            style: { "color": "#555", "padding-left": "16px", "line-height": "1.7" }
                          }, [
                            createVNode("li", null, "Drag slot untuk pindah posisi"),
                            createVNode("li", null, "Drag sudut/tepi untuk resize"),
                            createVNode("li", null, "Tombol Delete untuk hapus slot"),
                            createVNode("li", null, "Arrow key untuk nudge 2px"),
                            createVNode("li", null, "Shift+Arrow untuk nudge 16px"),
                            createVNode("li", null, "Snap Grid menjaga slot rapi")
                          ])
                        ])
                      ])) : createCommentVNode("", true),
                      sidebarTab.value === "preview" ? (openBlock(), createBlock("div", {
                        key: 1,
                        class: "pa-3 d-flex flex-column gap-3",
                        style: { "overflow-y": "auto", "flex": "1" }
                      }, [
                        createVNode("div", { class: "d-flex align-center justify-space-between" }, [
                          createVNode("p", {
                            class: "text-caption font-weight-bold text-uppercase",
                            style: { "color": "#888", "margin": "0" }
                          }, " Preview dengan foto sample "),
                          imageUrl.value && slots.value.length > 0 ? (openBlock(), createBlock(VBtn, {
                            key: 0,
                            icon: "",
                            variant: "tonal",
                            size: "x-small",
                            color: "primary",
                            title: "Lihat fullscreen",
                            onClick: ($event) => fullscreenPreview.value = true
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, { size: "16" }, {
                                default: withCtx(() => [
                                  createTextVNode("bx bx-expand-alt")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["onClick"])) : createCommentVNode("", true)
                        ]),
                        !imageUrl.value || slots.value.length === 0 ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "text-center pa-6 text-medium-emphasis"
                        }, [
                          createVNode(VIcon, {
                            size: "36",
                            class: "mb-2"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("bx bx-image")
                            ]),
                            _: 1
                          }),
                          createVNode("p", { class: "text-caption" }, "Upload frame dan tambahkan slot untuk melihat preview.")
                        ])) : (openBlock(), createBlock("div", {
                          key: 1,
                          class: "preview-canvas-wrapper"
                        }, [
                          createVNode("div", { class: "preview-canvas" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(slots.value, (slot, idx) => {
                              return openBlock(), createBlock("div", {
                                key: slot.id,
                                class: "preview-slot",
                                style: {
                                  left: slot.x * previewScaleX.value + "px",
                                  top: slot.y * previewScaleY.value + "px",
                                  width: slot.w * previewScaleX.value + "px",
                                  height: slot.h * previewScaleY.value + "px"
                                }
                              }, [
                                createVNode("img", {
                                  src: `https://picsum.photos/seed/${idx + 1}/400/600`,
                                  alt: `Sample ${idx + 1}`,
                                  class: "preview-slot-img"
                                }, null, 8, ["src", "alt"]),
                                createVNode("div", { class: "preview-slot-label" }, toDisplayString(idx + 1), 1)
                              ], 4);
                            }), 128)),
                            createVNode("img", {
                              src: imageUrl.value,
                              class: "preview-frame-img",
                              draggable: "false",
                              onLoad: onPreviewImageLoad
                            }, null, 40, ["src"])
                          ])
                        ])),
                        imageUrl.value && slots.value.length > 0 ? (openBlock(), createBlock("p", {
                          key: 2,
                          class: "text-caption text-medium-emphasis text-center"
                        }, " Foto sample dari picsum.photos ")) : createCommentVNode("", true)
                      ])) : createCommentVNode("", true)
                    ])
                  ]),
                  createVNode(VDivider),
                  createVNode(VCardActions, {
                    class: "pa-4",
                    style: { "flex-shrink": "0" }
                  }, {
                    default: withCtx(() => [
                      saveError.value ? (openBlock(), createBlock(VAlert, {
                        key: 0,
                        type: "error",
                        density: "compact",
                        variant: "tonal",
                        class: "text-caption flex-1",
                        style: { "padding": "6px 12px" }
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(saveError.value), 1)
                        ]),
                        _: 1
                      })) : (openBlock(), createBlock(VSpacer, { key: 1 })),
                      createVNode(VBtn, {
                        variant: "text",
                        onClick: close
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Batal")
                        ]),
                        _: 1
                      }),
                      createVNode(VBtn, {
                        color: "primary",
                        variant: "elevated",
                        "prepend-icon": "bx bx-save",
                        onClick: handleSave
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(isEditMode.value ? "Update Template" : "Simpan Template"), 1)
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
      _push(ssrRenderComponent(VDialog, {
        modelValue: fullscreenPreview.value,
        "onUpdate:modelValue": ($event) => fullscreenPreview.value = $event,
        "max-width": "1200",
        scrollable: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, {
                    class: "d-flex align-center gap-2 pa-4 pb-2",
                    style: { "flex-shrink": "0" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, { color: "primary" }, {
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
                        _push4(`<span data-v-6b80e308${_scopeId3}>Preview Fullscreen</span>`);
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          icon: "",
                          variant: "text",
                          onClick: ($event) => fullscreenPreview.value = false
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
                              createTextVNode("bx bx-image")
                            ]),
                            _: 1
                          }),
                          createVNode("span", null, "Preview Fullscreen"),
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            onClick: ($event) => fullscreenPreview.value = false
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
                  _push3(ssrRenderComponent(VCardText, {
                    class: "d-flex justify-center align-center pa-6",
                    style: { "overflow": "auto" }
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`<div class="fullscreen-preview-canvas" data-v-6b80e308${_scopeId3}><!--[-->`);
                        ssrRenderList(slots.value, (slot, idx) => {
                          _push4(`<div class="preview-slot" style="${ssrRenderStyle({
                            left: slot.x * fullscreenScaleX.value + "px",
                            top: slot.y * fullscreenScaleY.value + "px",
                            width: slot.w * fullscreenScaleX.value + "px",
                            height: slot.h * fullscreenScaleY.value + "px"
                          })}" data-v-6b80e308${_scopeId3}><img${ssrRenderAttr("src", `https://picsum.photos/seed/${idx + 1}/400/600`)}${ssrRenderAttr("alt", `Sample ${idx + 1}`)} class="preview-slot-img" data-v-6b80e308${_scopeId3}><div class="preview-slot-label" data-v-6b80e308${_scopeId3}>${ssrInterpolate(idx + 1)}</div></div>`);
                        });
                        _push4(`<!--]--><img${ssrRenderAttr("src", imageUrl.value)} class="fullscreen-frame-img" draggable="false" data-v-6b80e308${_scopeId3}></div>`);
                      } else {
                        return [
                          createVNode("div", { class: "fullscreen-preview-canvas" }, [
                            (openBlock(true), createBlock(Fragment, null, renderList(slots.value, (slot, idx) => {
                              return openBlock(), createBlock("div", {
                                key: slot.id,
                                class: "preview-slot",
                                style: {
                                  left: slot.x * fullscreenScaleX.value + "px",
                                  top: slot.y * fullscreenScaleY.value + "px",
                                  width: slot.w * fullscreenScaleX.value + "px",
                                  height: slot.h * fullscreenScaleY.value + "px"
                                }
                              }, [
                                createVNode("img", {
                                  src: `https://picsum.photos/seed/${idx + 1}/400/600`,
                                  alt: `Sample ${idx + 1}`,
                                  class: "preview-slot-img"
                                }, null, 8, ["src", "alt"]),
                                createVNode("div", { class: "preview-slot-label" }, toDisplayString(idx + 1), 1)
                              ], 4);
                            }), 128)),
                            createVNode("img", {
                              src: imageUrl.value,
                              class: "fullscreen-frame-img",
                              draggable: "false",
                              onLoad: onFullscreenImageLoad
                            }, null, 40, ["src"])
                          ])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, {
                      class: "d-flex align-center gap-2 pa-4 pb-2",
                      style: { "flex-shrink": "0" }
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, { color: "primary" }, {
                          default: withCtx(() => [
                            createTextVNode("bx bx-image")
                          ]),
                          _: 1
                        }),
                        createVNode("span", null, "Preview Fullscreen"),
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          icon: "",
                          variant: "text",
                          onClick: ($event) => fullscreenPreview.value = false
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
                    createVNode(VCardText, {
                      class: "d-flex justify-center align-center pa-6",
                      style: { "overflow": "auto" }
                    }, {
                      default: withCtx(() => [
                        createVNode("div", { class: "fullscreen-preview-canvas" }, [
                          (openBlock(true), createBlock(Fragment, null, renderList(slots.value, (slot, idx) => {
                            return openBlock(), createBlock("div", {
                              key: slot.id,
                              class: "preview-slot",
                              style: {
                                left: slot.x * fullscreenScaleX.value + "px",
                                top: slot.y * fullscreenScaleY.value + "px",
                                width: slot.w * fullscreenScaleX.value + "px",
                                height: slot.h * fullscreenScaleY.value + "px"
                              }
                            }, [
                              createVNode("img", {
                                src: `https://picsum.photos/seed/${idx + 1}/400/600`,
                                alt: `Sample ${idx + 1}`,
                                class: "preview-slot-img"
                              }, null, 8, ["src", "alt"]),
                              createVNode("div", { class: "preview-slot-label" }, toDisplayString(idx + 1), 1)
                            ], 4);
                          }), 128)),
                          createVNode("img", {
                            src: imageUrl.value,
                            class: "fullscreen-frame-img",
                            draggable: "false",
                            onLoad: onFullscreenImageLoad
                          }, null, 40, ["src"])
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
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, {
                    class: "d-flex align-center gap-2 pa-4 pb-2",
                    style: { "flex-shrink": "0" }
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, { color: "primary" }, {
                        default: withCtx(() => [
                          createTextVNode("bx bx-image")
                        ]),
                        _: 1
                      }),
                      createVNode("span", null, "Preview Fullscreen"),
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        icon: "",
                        variant: "text",
                        onClick: ($event) => fullscreenPreview.value = false
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
                  createVNode(VCardText, {
                    class: "d-flex justify-center align-center pa-6",
                    style: { "overflow": "auto" }
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "fullscreen-preview-canvas" }, [
                        (openBlock(true), createBlock(Fragment, null, renderList(slots.value, (slot, idx) => {
                          return openBlock(), createBlock("div", {
                            key: slot.id,
                            class: "preview-slot",
                            style: {
                              left: slot.x * fullscreenScaleX.value + "px",
                              top: slot.y * fullscreenScaleY.value + "px",
                              width: slot.w * fullscreenScaleX.value + "px",
                              height: slot.h * fullscreenScaleY.value + "px"
                            }
                          }, [
                            createVNode("img", {
                              src: `https://picsum.photos/seed/${idx + 1}/400/600`,
                              alt: `Sample ${idx + 1}`,
                              class: "preview-slot-img"
                            }, null, 8, ["src", "alt"]),
                            createVNode("div", { class: "preview-slot-label" }, toDisplayString(idx + 1), 1)
                          ], 4);
                        }), 128)),
                        createVNode("img", {
                          src: imageUrl.value,
                          class: "fullscreen-frame-img",
                          draggable: "false",
                          onLoad: onFullscreenImageLoad
                        }, null, 40, ["src"])
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/admin/TemplateFrameEditor.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const TemplateFrameEditor = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-6b80e308"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "templates",
  __ssrInlineRender: true,
  setup(__props) {
    const { templates: templates2, loading, error, getTemplates, createTemplate, updateTemplate, deleteTemplate } = useTemplates();
    const outlets = ref([]);
    const outletFilter = ref("");
    const isSubmitting = ref(false);
    const editorOpen = ref(false);
    const editingTemplate = ref(null);
    async function fetchAll() {
      const params = {};
      if (outletFilter.value) params.outlet_id = outletFilter.value;
      await getTemplates(params);
    }
    function openCreate() {
      editingTemplate.value = null;
      editorOpen.value = true;
    }
    function openEdit(t) {
      editingTemplate.value = t;
      editorOpen.value = true;
    }
    async function handleEditorSave(payload) {
      isSubmitting.value = true;
      error.value = null;
      const form = new FormData();
      form.append("label", payload.label);
      form.append("aspect_ratio", String(payload.aspect_ratio));
      form.append("slot_count", String(payload.slot_count));
      form.append("slots", JSON.stringify(payload.slots));
      form.append("is_active", String(payload.is_active));
      if (payload.file) form.append("file", payload.file);
      if (editingTemplate.value) {
        await updateTemplate(editingTemplate.value.id, form);
      } else {
        if (!payload.file) {
          error.value = "File PNG wajib diupload untuk template baru.";
          isSubmitting.value = false;
          return;
        }
        await createTemplate(form);
      }
      isSubmitting.value = false;
      if (error.value) {
        alert(error.value);
        return;
      }
      editorOpen.value = false;
      await fetchAll();
    }
    async function handleDelete(id) {
      if (!confirm("Hapus template ini? Tindakan ini tidak bisa dibatalkan.")) return;
      await deleteTemplate(id);
      if (error.value) alert(error.value);
    }
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VCard, {
        title: "Layout Frame Templates",
        class: "mb-4"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              color: "primary",
              variant: "tonal",
              class: "text-none",
              slim: "",
              "prepend-icon": "bx bx-plus",
              onClick: openCreate
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Tambah Template `);
                } else {
                  return [
                    createTextVNode(" Tambah Template ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, {
                color: "primary",
                variant: "tonal",
                class: "text-none",
                slim: "",
                "prepend-icon": "bx bx-plus",
                onClick: openCreate
              }, {
                default: withCtx(() => [
                  createTextVNode(" Tambah Template ")
                ]),
                _: 1
              })
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VSelect, {
                    modelValue: outletFilter.value,
                    "onUpdate:modelValue": [($event) => outletFilter.value = $event, fetchAll],
                    items: [
                      { title: "Semua Outlet", value: "" },
                      ...outlets.value.map((o) => ({ title: o.name, value: o.id }))
                    ],
                    label: "Filter Outlet",
                    density: "compact",
                    variant: "outlined",
                    style: { "max-width": "300px" },
                    class: "mb-4"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VSelect, {
                      modelValue: outletFilter.value,
                      "onUpdate:modelValue": [($event) => outletFilter.value = $event, fetchAll],
                      items: [
                        { title: "Semua Outlet", value: "" },
                        ...outlets.value.map((o) => ({ title: o.name, value: o.id }))
                      ],
                      label: "Filter Outlet",
                      density: "compact",
                      variant: "outlined",
                      style: { "max-width": "300px" },
                      class: "mb-4"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
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
                  if (!unref(loading) && unref(templates2).length === 0) {
                    _push3(`<div class="text-center pa-8 text-medium-emphasis" data-v-36b0852d${_scopeId2}>`);
                    _push3(ssrRenderComponent(VIcon, {
                      size: "48",
                      class: "mb-2"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`bx bx-layout`);
                        } else {
                          return [
                            createTextVNode("bx bx-layout")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<p data-v-36b0852d${_scopeId2}>Belum ada template. Klik &quot;Tambah Template&quot; untuk mulai.</p></div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<div class="templates-grid" data-v-36b0852d${_scopeId2}><!--[-->`);
                  ssrRenderList(unref(templates2), (t, idx) => {
                    _push3(ssrRenderComponent(VCard, {
                      key: t.id,
                      class: [{ "opacity-50": !t.is_active }, "template-card"],
                      border: "",
                      flat: ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`<div class="template-thumb" data-v-36b0852d${_scopeId3}><img${ssrRenderAttr("src", t.src)}${ssrRenderAttr("alt", t.label)} style="${ssrRenderStyle({ "width": "100%", "height": "100%", "object-fit": "contain" })}" data-v-36b0852d${_scopeId3}>`);
                          _push4(ssrRenderComponent(VChip, {
                            size: "x-small",
                            color: "primary",
                            style: { "position": "absolute", "top": "6px", "left": "6px" }
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(t.slot_count)} slot `);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(t.slot_count) + " slot ", 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VChip, {
                            size: "x-small",
                            color: t.is_active ? "success" : "default",
                            style: { "position": "absolute", "top": "6px", "right": "6px" }
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(t.is_active ? "Aktif" : "Nonaktif")}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(t.is_active ? "Aktif" : "Nonaktif"), 1)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(`</div>`);
                          _push4(ssrRenderComponent(VCardText, { class: "pa-2" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              var _a2, _b2;
                              var _a, _b;
                              if (_push5) {
                                _push5(`<div class="text-body-2 font-weight-bold text-truncate" data-v-36b0852d${_scopeId4}>${ssrInterpolate(t.label)}</div>`);
                                if (t.outlet_id) {
                                  _push5(`<div class="text-caption text-medium-emphasis" data-v-36b0852d${_scopeId4}>`);
                                  _push5(ssrRenderComponent(VIcon, { size: "10" }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(`bx bx-store`);
                                      } else {
                                        return [
                                          createTextVNode("bx bx-store")
                                        ];
                                      }
                                    }),
                                    _: 2
                                  }, _parent5, _scopeId4));
                                  _push5(` ${ssrInterpolate((_a2 = (_a = outlets.value.find((o) => o.id === t.outlet_id)) == null ? void 0 : _a.name) != null ? _a2 : "Outlet tertentu")}</div>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  createVNode("div", { class: "text-body-2 font-weight-bold text-truncate" }, toDisplayString(t.label), 1),
                                  t.outlet_id ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-caption text-medium-emphasis"
                                  }, [
                                    createVNode(VIcon, { size: "10" }, {
                                      default: withCtx(() => [
                                        createTextVNode("bx bx-store")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" " + toDisplayString((_b2 = (_b = outlets.value.find((o) => o.id === t.outlet_id)) == null ? void 0 : _b.name) != null ? _b2 : "Outlet tertentu"), 1)
                                  ])) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VCardActions, { class: "pa-2 pt-0" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VBtn, {
                                  size: "small",
                                  variant: "tonal",
                                  color: "warning",
                                  "prepend-icon": "bx bx-edit-alt",
                                  class: "text-none",
                                  onClick: ($event) => openEdit(t)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(` Edit `);
                                    } else {
                                      return [
                                        createTextVNode(" Edit ")
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VSpacer, null, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VBtn, {
                                  icon: "",
                                  variant: "text",
                                  size: "small",
                                  onClick: ($event) => handleDelete(t.id)
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VIcon, { color: "error" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`bx bx-trash-alt`);
                                          } else {
                                            return [
                                              createTextVNode("bx bx-trash-alt")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VIcon, { color: "error" }, {
                                          default: withCtx(() => [
                                            createTextVNode("bx bx-trash-alt")
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VBtn, {
                                    size: "small",
                                    variant: "tonal",
                                    color: "warning",
                                    "prepend-icon": "bx bx-edit-alt",
                                    class: "text-none",
                                    onClick: ($event) => openEdit(t)
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Edit ")
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"]),
                                  createVNode(VSpacer),
                                  createVNode(VBtn, {
                                    icon: "",
                                    variant: "text",
                                    size: "small",
                                    onClick: ($event) => handleDelete(t.id)
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VIcon, { color: "error" }, {
                                        default: withCtx(() => [
                                          createTextVNode("bx bx-trash-alt")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode("div", { class: "template-thumb" }, [
                              createVNode("img", {
                                src: t.src,
                                alt: t.label,
                                style: { "width": "100%", "height": "100%", "object-fit": "contain" }
                              }, null, 8, ["src", "alt"]),
                              createVNode(VChip, {
                                size: "x-small",
                                color: "primary",
                                style: { "position": "absolute", "top": "6px", "left": "6px" }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(t.slot_count) + " slot ", 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(VChip, {
                                size: "x-small",
                                color: t.is_active ? "success" : "default",
                                style: { "position": "absolute", "top": "6px", "right": "6px" }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(t.is_active ? "Aktif" : "Nonaktif"), 1)
                                ]),
                                _: 2
                              }, 1032, ["color"])
                            ]),
                            createVNode(VCardText, { class: "pa-2" }, {
                              default: withCtx(() => {
                                var _a2;
                                var _a;
                                return [
                                  createVNode("div", { class: "text-body-2 font-weight-bold text-truncate" }, toDisplayString(t.label), 1),
                                  t.outlet_id ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-caption text-medium-emphasis"
                                  }, [
                                    createVNode(VIcon, { size: "10" }, {
                                      default: withCtx(() => [
                                        createTextVNode("bx bx-store")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" " + toDisplayString((_a2 = (_a = outlets.value.find((o) => o.id === t.outlet_id)) == null ? void 0 : _a.name) != null ? _a2 : "Outlet tertentu"), 1)
                                  ])) : createCommentVNode("", true)
                                ];
                              }),
                              _: 2
                            }, 1024),
                            createVNode(VCardActions, { class: "pa-2 pt-0" }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  size: "small",
                                  variant: "tonal",
                                  color: "warning",
                                  "prepend-icon": "bx bx-edit-alt",
                                  class: "text-none",
                                  onClick: ($event) => openEdit(t)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Edit ")
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"]),
                                createVNode(VSpacer),
                                createVNode(VBtn, {
                                  icon: "",
                                  variant: "text",
                                  size: "small",
                                  onClick: ($event) => handleDelete(t.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, { color: "error" }, {
                                      default: withCtx(() => [
                                        createTextVNode("bx bx-trash-alt")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
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
                    !unref(loading) && unref(templates2).length === 0 ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "text-center pa-8 text-medium-emphasis"
                    }, [
                      createVNode(VIcon, {
                        size: "48",
                        class: "mb-2"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("bx bx-layout")
                        ]),
                        _: 1
                      }),
                      createVNode("p", null, 'Belum ada template. Klik "Tambah Template" untuk mulai.')
                    ])) : createCommentVNode("", true),
                    createVNode("div", { class: "templates-grid" }, [
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(templates2), (t, idx) => {
                        return openBlock(), createBlock(VCard, {
                          key: t.id,
                          class: [{ "opacity-50": !t.is_active }, "template-card"],
                          border: "",
                          flat: ""
                        }, {
                          default: withCtx(() => [
                            createVNode("div", { class: "template-thumb" }, [
                              createVNode("img", {
                                src: t.src,
                                alt: t.label,
                                style: { "width": "100%", "height": "100%", "object-fit": "contain" }
                              }, null, 8, ["src", "alt"]),
                              createVNode(VChip, {
                                size: "x-small",
                                color: "primary",
                                style: { "position": "absolute", "top": "6px", "left": "6px" }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(t.slot_count) + " slot ", 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(VChip, {
                                size: "x-small",
                                color: t.is_active ? "success" : "default",
                                style: { "position": "absolute", "top": "6px", "right": "6px" }
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(t.is_active ? "Aktif" : "Nonaktif"), 1)
                                ]),
                                _: 2
                              }, 1032, ["color"])
                            ]),
                            createVNode(VCardText, { class: "pa-2" }, {
                              default: withCtx(() => {
                                var _a2;
                                var _a;
                                return [
                                  createVNode("div", { class: "text-body-2 font-weight-bold text-truncate" }, toDisplayString(t.label), 1),
                                  t.outlet_id ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "text-caption text-medium-emphasis"
                                  }, [
                                    createVNode(VIcon, { size: "10" }, {
                                      default: withCtx(() => [
                                        createTextVNode("bx bx-store")
                                      ]),
                                      _: 1
                                    }),
                                    createTextVNode(" " + toDisplayString((_a2 = (_a = outlets.value.find((o) => o.id === t.outlet_id)) == null ? void 0 : _a.name) != null ? _a2 : "Outlet tertentu"), 1)
                                  ])) : createCommentVNode("", true)
                                ];
                              }),
                              _: 2
                            }, 1024),
                            createVNode(VCardActions, { class: "pa-2 pt-0" }, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  size: "small",
                                  variant: "tonal",
                                  color: "warning",
                                  "prepend-icon": "bx bx-edit-alt",
                                  class: "text-none",
                                  onClick: ($event) => openEdit(t)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Edit ")
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"]),
                                createVNode(VSpacer),
                                createVNode(VBtn, {
                                  icon: "",
                                  variant: "text",
                                  size: "small",
                                  onClick: ($event) => handleDelete(t.id)
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VIcon, { color: "error" }, {
                                      default: withCtx(() => [
                                        createTextVNode("bx bx-trash-alt")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1032, ["class"]);
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
                  createVNode(VSelect, {
                    modelValue: outletFilter.value,
                    "onUpdate:modelValue": [($event) => outletFilter.value = $event, fetchAll],
                    items: [
                      { title: "Semua Outlet", value: "" },
                      ...outlets.value.map((o) => ({ title: o.name, value: o.id }))
                    ],
                    label: "Filter Outlet",
                    density: "compact",
                    variant: "outlined",
                    style: { "max-width": "300px" },
                    class: "mb-4"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  unref(loading) ? (openBlock(), createBlock(VProgressLinear, {
                    key: 0,
                    indeterminate: "",
                    color: "primary",
                    class: "mb-4"
                  })) : createCommentVNode("", true),
                  !unref(loading) && unref(templates2).length === 0 ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "text-center pa-8 text-medium-emphasis"
                  }, [
                    createVNode(VIcon, {
                      size: "48",
                      class: "mb-2"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("bx bx-layout")
                      ]),
                      _: 1
                    }),
                    createVNode("p", null, 'Belum ada template. Klik "Tambah Template" untuk mulai.')
                  ])) : createCommentVNode("", true),
                  createVNode("div", { class: "templates-grid" }, [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(templates2), (t, idx) => {
                      return openBlock(), createBlock(VCard, {
                        key: t.id,
                        class: [{ "opacity-50": !t.is_active }, "template-card"],
                        border: "",
                        flat: ""
                      }, {
                        default: withCtx(() => [
                          createVNode("div", { class: "template-thumb" }, [
                            createVNode("img", {
                              src: t.src,
                              alt: t.label,
                              style: { "width": "100%", "height": "100%", "object-fit": "contain" }
                            }, null, 8, ["src", "alt"]),
                            createVNode(VChip, {
                              size: "x-small",
                              color: "primary",
                              style: { "position": "absolute", "top": "6px", "left": "6px" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(t.slot_count) + " slot ", 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(VChip, {
                              size: "x-small",
                              color: t.is_active ? "success" : "default",
                              style: { "position": "absolute", "top": "6px", "right": "6px" }
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(t.is_active ? "Aktif" : "Nonaktif"), 1)
                              ]),
                              _: 2
                            }, 1032, ["color"])
                          ]),
                          createVNode(VCardText, { class: "pa-2" }, {
                            default: withCtx(() => {
                              var _a2;
                              var _a;
                              return [
                                createVNode("div", { class: "text-body-2 font-weight-bold text-truncate" }, toDisplayString(t.label), 1),
                                t.outlet_id ? (openBlock(), createBlock("div", {
                                  key: 0,
                                  class: "text-caption text-medium-emphasis"
                                }, [
                                  createVNode(VIcon, { size: "10" }, {
                                    default: withCtx(() => [
                                      createTextVNode("bx bx-store")
                                    ]),
                                    _: 1
                                  }),
                                  createTextVNode(" " + toDisplayString((_a2 = (_a = outlets.value.find((o) => o.id === t.outlet_id)) == null ? void 0 : _a.name) != null ? _a2 : "Outlet tertentu"), 1)
                                ])) : createCommentVNode("", true)
                              ];
                            }),
                            _: 2
                          }, 1024),
                          createVNode(VCardActions, { class: "pa-2 pt-0" }, {
                            default: withCtx(() => [
                              createVNode(VBtn, {
                                size: "small",
                                variant: "tonal",
                                color: "warning",
                                "prepend-icon": "bx bx-edit-alt",
                                class: "text-none",
                                onClick: ($event) => openEdit(t)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Edit ")
                                ]),
                                _: 2
                              }, 1032, ["onClick"]),
                              createVNode(VSpacer),
                              createVNode(VBtn, {
                                icon: "",
                                variant: "text",
                                size: "small",
                                onClick: ($event) => handleDelete(t.id)
                              }, {
                                default: withCtx(() => [
                                  createVNode(VIcon, { color: "error" }, {
                                    default: withCtx(() => [
                                      createTextVNode("bx bx-trash-alt")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 2
                              }, 1032, ["onClick"])
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1032, ["class"]);
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
      _push(ssrRenderComponent(TemplateFrameEditor, {
        modelValue: editorOpen.value,
        "onUpdate:modelValue": ($event) => editorOpen.value = $event,
        "editing-template": editingTemplate.value,
        onSave: handleEditorSave
      }, null, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/templates.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const templates = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-36b0852d"]]);

export { templates as default };
