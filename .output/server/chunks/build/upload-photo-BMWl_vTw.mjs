import { defineComponent, ref, reactive, computed, watch, resolveComponent, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, unref, createBlock, createCommentVNode, openBlock, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useFaces } from './useFaces-BVaqO9sD.mjs';
import { u as usePricings } from './usePricings-Bc6NT0-w.mjs';
import { u as useOutlets } from './useOutlets-B5FqPd-h.mjs';
import { V as VContainer } from './VContainer-CZliQBxk.mjs';
import { V as VAlert } from './VAlert-DeVcT1vO.mjs';
import { b as VIcon, c as VDivider, b0 as VProgressLinear } from './server.mjs';
import { V as VCard, c as VCardTitle, a as VCardText } from './VCard-DLk5PTHl.mjs';
import { V as VForm } from './VForm-CsHTnp-Y.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VSelect } from './VSelect-Bxz-WhQz.mjs';
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
import './VTextField-1oTGfZvz.mjs';
import './index-ewhk7FTz.mjs';
import './forwardRefs-BSTjJZPU.mjs';
import './VMenu-CmFsZZaF.mjs';
import './ssrBoot-BtvJZs44.mjs';
import './VListSubheader-BbgyaiQc.mjs';
import './dialog-transition-D66jL1n_.mjs';
import './VCheckboxBtn-DaRBpQ2e.mjs';
import './VChip-C44NlS62.mjs';
import './VSlideGroup-J1shNAVo.mjs';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "upload-photo",
  __ssrInlineRender: true,
  setup(__props) {
    const { uploadImages } = useFaces();
    const { getPhotoPricesByOutlet } = usePricings();
    const { getOutletsByUnit } = useOutlets();
    const files = ref([]);
    const loading = ref(false);
    const progress = ref(0);
    const showAlert = ref(false);
    const uploadStatus = ref(null);
    const photoParams = reactive({
      unit_id: "",
      outlet_id: "",
      photo_type_id: null
    });
    const units = ref([]);
    const handleUpload = async () => {
      if (!photoParams.unit_id || !photoParams.photo_type_id) {
        uploadStatus.value = {
          type: "error",
          message: "Pilih Unit dan Tipe Foto terlebih dahulu."
        };
        showAlert.value = true;
        setTimeout(() => {
          showAlert.value = false;
        }, 5e3);
        files.value = [];
        return;
      }
      if (files.value.length === 0 || loading.value) return;
      loading.value = true;
      try {
        const response = await uploadImages(
          photoParams.unit_id,
          photoParams.outlet_id,
          photoParams.photo_type_id,
          files.value,
          (uploadedPercentage) => {
            progress.value = uploadedPercentage;
          }
        );
        uploadStatus.value = {
          type: "success",
          message: "Files uploaded successfully!"
        };
        showAlert.value = true;
        files.value = [];
        setTimeout(() => {
          showAlert.value = false;
        }, 5e3);
      } catch (error) {
        console.error("Upload failed:", error);
        uploadStatus.value = {
          type: "error",
          message: "Upload failed. Please try again."
        };
        showAlert.value = true;
        setTimeout(() => {
          showAlert.value = false;
        }, 5e3);
      } finally {
        loading.value = false;
      }
    };
    const selectedUnit = computed(() => {
      return units.value.find((u) => u.id === photoParams.unit_id) || null;
    });
    const photoPricesByOutlet = ref([]);
    async function fetchPhotoPricesByOutlet(id) {
      try {
        const res = await getPhotoPricesByOutlet(id);
        photoPricesByOutlet.value = (res == null ? void 0 : res.photo_prices) || [];
        if (photoPricesByOutlet.value.length > 0 && !photoParams.photo_type_id) {
          photoParams.photo_type_id = photoPricesByOutlet.value[0].photo_type_id;
        }
      } catch (error) {
        console.error("Failed to fetch photo prices by unit:", error);
        photoPricesByOutlet.value = [];
      }
    }
    const outletList = ref([]);
    watch(
      () => photoParams.unit_id,
      async (newUnitId) => {
        var _a;
        if (newUnitId) {
          const outletRes = await getOutletsByUnit(newUnitId);
          if ((outletRes == null ? void 0 : outletRes.status_code) === 200 && Array.isArray(outletRes.outlets)) {
            outletList.value = outletRes.outlets;
            photoParams.outlet_id = ((_a = outletRes.outlets[0]) == null ? void 0 : _a.id) || "";
            await fetchPhotoPricesByOutlet(photoParams.outlet_id);
          } else {
            outletList.value = [];
            photoParams.outlet_id = "";
          }
        }
      },
      { immediate: true }
    );
    watch(
      () => photoParams.outlet_id,
      async (outletId) => {
        if (outletId) {
          try {
            const res = await getPhotoPricesByOutlet(outletId);
            if ((res == null ? void 0 : res.status_code) === 200) {
              photoPricesByOutlet.value = res.photo_prices || [];
              if (photoPricesByOutlet.value.length > 0) {
                photoParams.photo_type_id = photoPricesByOutlet.value[0].photo_type_id;
              } else {
                photoParams.photo_type_id = null;
              }
            } else {
              photoPricesByOutlet.value = [];
              photoParams.photo_type_id = null;
            }
          } catch (error) {
            console.error("Failed to fetch prices by outlet:", error);
            photoPricesByOutlet.value = [];
            photoParams.photo_type_id = null;
          }
        }
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_v_file_upload = resolveComponent("v-file-upload");
      _push(ssrRenderComponent(VContainer, mergeProps({ fluid: "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (uploadStatus.value) {
              _push2(ssrRenderComponent(VAlert, {
                type: uploadStatus.value.type,
                dismissible: "",
                transition: "fade-transition",
                class: "mb-4",
                color: "#2A3B4D",
                density: "compact",
                prominent: "",
                modelValue: showAlert.value,
                "onUpdate:modelValue": ($event) => showAlert.value = $event
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(VIcon, { class: "me-2" }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`mdi-information`);
                        } else {
                          return [
                            createTextVNode("mdi-information")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(` ${ssrInterpolate(uploadStatus.value.message)}`);
                  } else {
                    return [
                      createVNode(VIcon, { class: "me-2" }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-information")
                        ]),
                        _: 1
                      }),
                      createTextVNode(" " + toDisplayString(uploadStatus.value.message), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(VCard, {
              elevation: "8",
              class: "rounded-xl"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "text-h6 font-weight-bold mt-2" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(` Upload Foto `);
                      } else {
                        return [
                          createTextVNode(" Upload Foto ")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VDivider, null, null, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VForm, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        var _a, _b;
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSelect, {
                                            modelValue: unref(photoParams).unit_id,
                                            "onUpdate:modelValue": ($event) => unref(photoParams).unit_id = $event,
                                            density: "comfortable",
                                            label: "1. Pilih unit",
                                            items: units.value,
                                            "item-value": "id",
                                            "item-title": "name",
                                            hint: (_a = unref(selectedUnit)) == null ? void 0 : _a.location,
                                            "persistent-hint": "",
                                            class: "mb-4",
                                            variant: "outlined"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSelect, {
                                              modelValue: unref(photoParams).unit_id,
                                              "onUpdate:modelValue": ($event) => unref(photoParams).unit_id = $event,
                                              density: "comfortable",
                                              label: "1. Pilih unit",
                                              items: units.value,
                                              "item-value": "id",
                                              "item-title": "name",
                                              hint: (_b = unref(selectedUnit)) == null ? void 0 : _b.location,
                                              "persistent-hint": "",
                                              class: "mb-4",
                                              variant: "outlined"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "hint"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSelect, {
                                            modelValue: unref(photoParams).outlet_id,
                                            "onUpdate:modelValue": ($event) => unref(photoParams).outlet_id = $event,
                                            label: "2. Pilih outlet",
                                            items: outletList.value,
                                            "item-value": "id",
                                            "item-title": "name",
                                            class: "mb-4"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSelect, {
                                              modelValue: unref(photoParams).outlet_id,
                                              "onUpdate:modelValue": ($event) => unref(photoParams).outlet_id = $event,
                                              label: "2. Pilih outlet",
                                              items: outletList.value,
                                              "item-value": "id",
                                              "item-title": "name",
                                              class: "mb-4"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSelect, {
                                            modelValue: unref(photoParams).photo_type_id,
                                            "onUpdate:modelValue": ($event) => unref(photoParams).photo_type_id = $event,
                                            label: "3. Pilih harga foto",
                                            items: photoPricesByOutlet.value,
                                            "item-value": "photo_type_id",
                                            "item-title": (item) => {
                                              var _a2, _b;
                                              var _a;
                                              return `${(_a2 = item.photo_type_name) != null ? _a2 : "Select first"} - ${(_b = (_a = item.price) == null ? void 0 : _a.toLocaleString()) != null ? _b : "0"} IDR`;
                                            },
                                            class: "mb-4"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSelect, {
                                              modelValue: unref(photoParams).photo_type_id,
                                              "onUpdate:modelValue": ($event) => unref(photoParams).photo_type_id = $event,
                                              label: "3. Pilih harga foto",
                                              items: photoPricesByOutlet.value,
                                              "item-value": "photo_type_id",
                                              "item-title": (item) => {
                                                var _a2, _b;
                                                var _a;
                                                return `${(_a2 = item.photo_type_name) != null ? _a2 : "Select first"} - ${(_b = (_a = item.price) == null ? void 0 : _a.toLocaleString()) != null ? _b : "0"} IDR`;
                                              },
                                              class: "mb-4"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "item-title"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "4"
                                      }, {
                                        default: withCtx(() => {
                                          var _a;
                                          return [
                                            createVNode(VSelect, {
                                              modelValue: unref(photoParams).unit_id,
                                              "onUpdate:modelValue": ($event) => unref(photoParams).unit_id = $event,
                                              density: "comfortable",
                                              label: "1. Pilih unit",
                                              items: units.value,
                                              "item-value": "id",
                                              "item-title": "name",
                                              hint: (_a = unref(selectedUnit)) == null ? void 0 : _a.location,
                                              "persistent-hint": "",
                                              class: "mb-4",
                                              variant: "outlined"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "hint"])
                                          ];
                                        }),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            modelValue: unref(photoParams).outlet_id,
                                            "onUpdate:modelValue": ($event) => unref(photoParams).outlet_id = $event,
                                            label: "2. Pilih outlet",
                                            items: outletList.value,
                                            "item-value": "id",
                                            "item-title": "name",
                                            class: "mb-4"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "4"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            modelValue: unref(photoParams).photo_type_id,
                                            "onUpdate:modelValue": ($event) => unref(photoParams).photo_type_id = $event,
                                            label: "3. Pilih harga foto",
                                            items: photoPricesByOutlet.value,
                                            "item-value": "photo_type_id",
                                            "item-title": (item) => {
                                              var _a2, _b;
                                              var _a;
                                              return `${(_a2 = item.photo_type_name) != null ? _a2 : "Select first"} - ${(_b = (_a = item.price) == null ? void 0 : _a.toLocaleString()) != null ? _b : "0"} IDR`;
                                            },
                                            class: "mb-4"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "item-title"])
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, { cols: "12" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(_component_v_file_upload, {
                                            modelValue: files.value,
                                            "onUpdate:modelValue": ($event) => files.value = $event,
                                            accept: "image/*",
                                            clearable: "",
                                            "prepend-icon": "bx bx-upload",
                                            multiple: "",
                                            disabled: loading.value,
                                            onChange: handleUpload,
                                            class: "mb-4"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(_component_v_file_upload, {
                                              modelValue: files.value,
                                              "onUpdate:modelValue": ($event) => files.value = $event,
                                              accept: "image/*",
                                              clearable: "",
                                              "prepend-icon": "bx bx-upload",
                                              multiple: "",
                                              disabled: loading.value,
                                              onChange: handleUpload,
                                              class: "mb-4"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, { cols: "12" }, {
                                        default: withCtx(() => [
                                          createVNode(_component_v_file_upload, {
                                            modelValue: files.value,
                                            "onUpdate:modelValue": ($event) => files.value = $event,
                                            accept: "image/*",
                                            clearable: "",
                                            "prepend-icon": "bx bx-upload",
                                            multiple: "",
                                            disabled: loading.value,
                                            onChange: handleUpload,
                                            class: "mb-4"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
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
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => {
                                        var _a;
                                        return [
                                          createVNode(VSelect, {
                                            modelValue: unref(photoParams).unit_id,
                                            "onUpdate:modelValue": ($event) => unref(photoParams).unit_id = $event,
                                            density: "comfortable",
                                            label: "1. Pilih unit",
                                            items: units.value,
                                            "item-value": "id",
                                            "item-title": "name",
                                            hint: (_a = unref(selectedUnit)) == null ? void 0 : _a.location,
                                            "persistent-hint": "",
                                            class: "mb-4",
                                            variant: "outlined"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "hint"])
                                        ];
                                      }),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          modelValue: unref(photoParams).outlet_id,
                                          "onUpdate:modelValue": ($event) => unref(photoParams).outlet_id = $event,
                                          label: "2. Pilih outlet",
                                          items: outletList.value,
                                          "item-value": "id",
                                          "item-title": "name",
                                          class: "mb-4"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "4"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          modelValue: unref(photoParams).photo_type_id,
                                          "onUpdate:modelValue": ($event) => unref(photoParams).photo_type_id = $event,
                                          label: "3. Pilih harga foto",
                                          items: photoPricesByOutlet.value,
                                          "item-value": "photo_type_id",
                                          "item-title": (item) => {
                                            var _a2, _b;
                                            var _a;
                                            return `${(_a2 = item.photo_type_name) != null ? _a2 : "Select first"} - ${(_b = (_a = item.price) == null ? void 0 : _a.toLocaleString()) != null ? _b : "0"} IDR`;
                                          },
                                          class: "mb-4"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "item-title"])
                                      ]),
                                      _: 2
                                    }, 1024)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, { cols: "12" }, {
                                      default: withCtx(() => [
                                        createVNode(_component_v_file_upload, {
                                          modelValue: files.value,
                                          "onUpdate:modelValue": ($event) => files.value = $event,
                                          accept: "image/*",
                                          clearable: "",
                                          "prepend-icon": "bx bx-upload",
                                          multiple: "",
                                          disabled: loading.value,
                                          onChange: handleUpload,
                                          class: "mb-4"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
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
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "4"
                                  }, {
                                    default: withCtx(() => {
                                      var _a;
                                      return [
                                        createVNode(VSelect, {
                                          modelValue: unref(photoParams).unit_id,
                                          "onUpdate:modelValue": ($event) => unref(photoParams).unit_id = $event,
                                          density: "comfortable",
                                          label: "1. Pilih unit",
                                          items: units.value,
                                          "item-value": "id",
                                          "item-title": "name",
                                          hint: (_a = unref(selectedUnit)) == null ? void 0 : _a.location,
                                          "persistent-hint": "",
                                          class: "mb-4",
                                          variant: "outlined"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "hint"])
                                      ];
                                    }),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        modelValue: unref(photoParams).outlet_id,
                                        "onUpdate:modelValue": ($event) => unref(photoParams).outlet_id = $event,
                                        label: "2. Pilih outlet",
                                        items: outletList.value,
                                        "item-value": "id",
                                        "item-title": "name",
                                        class: "mb-4"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "4"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        modelValue: unref(photoParams).photo_type_id,
                                        "onUpdate:modelValue": ($event) => unref(photoParams).photo_type_id = $event,
                                        label: "3. Pilih harga foto",
                                        items: photoPricesByOutlet.value,
                                        "item-value": "photo_type_id",
                                        "item-title": (item) => {
                                          var _a2, _b;
                                          var _a;
                                          return `${(_a2 = item.photo_type_name) != null ? _a2 : "Select first"} - ${(_b = (_a = item.price) == null ? void 0 : _a.toLocaleString()) != null ? _b : "0"} IDR`;
                                        },
                                        class: "mb-4"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "item-title"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, { cols: "12" }, {
                                    default: withCtx(() => [
                                      createVNode(_component_v_file_upload, {
                                        modelValue: files.value,
                                        "onUpdate:modelValue": ($event) => files.value = $event,
                                        accept: "image/*",
                                        clearable: "",
                                        "prepend-icon": "bx bx-upload",
                                        multiple: "",
                                        disabled: loading.value,
                                        onChange: handleUpload,
                                        class: "mb-4"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1024)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, { class: "text-h6 font-weight-bold mt-2" }, {
                      default: withCtx(() => [
                        createTextVNode(" Upload Foto ")
                      ]),
                      _: 1
                    }),
                    createVNode(VDivider),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VForm, null, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      createVNode(VSelect, {
                                        modelValue: unref(photoParams).unit_id,
                                        "onUpdate:modelValue": ($event) => unref(photoParams).unit_id = $event,
                                        density: "comfortable",
                                        label: "1. Pilih unit",
                                        items: units.value,
                                        "item-value": "id",
                                        "item-title": "name",
                                        hint: (_a = unref(selectedUnit)) == null ? void 0 : _a.location,
                                        "persistent-hint": "",
                                        class: "mb-4",
                                        variant: "outlined"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "hint"])
                                    ];
                                  }),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      modelValue: unref(photoParams).outlet_id,
                                      "onUpdate:modelValue": ($event) => unref(photoParams).outlet_id = $event,
                                      label: "2. Pilih outlet",
                                      items: outletList.value,
                                      "item-value": "id",
                                      "item-title": "name",
                                      class: "mb-4"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "4"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      modelValue: unref(photoParams).photo_type_id,
                                      "onUpdate:modelValue": ($event) => unref(photoParams).photo_type_id = $event,
                                      label: "3. Pilih harga foto",
                                      items: photoPricesByOutlet.value,
                                      "item-value": "photo_type_id",
                                      "item-title": (item) => {
                                        var _a2, _b;
                                        var _a;
                                        return `${(_a2 = item.photo_type_name) != null ? _a2 : "Select first"} - ${(_b = (_a = item.price) == null ? void 0 : _a.toLocaleString()) != null ? _b : "0"} IDR`;
                                      },
                                      class: "mb-4"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "item-title"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    createVNode(_component_v_file_upload, {
                                      modelValue: files.value,
                                      "onUpdate:modelValue": ($event) => files.value = $event,
                                      accept: "image/*",
                                      clearable: "",
                                      "prepend-icon": "bx bx-upload",
                                      multiple: "",
                                      disabled: loading.value,
                                      onChange: handleUpload,
                                      class: "mb-4"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            if (loading.value) {
              _push2(ssrRenderComponent(VProgressLinear, {
                value: progress.value,
                color: "blue",
                height: "16",
                striped: "",
                indeterminate: "",
                class: "mt-6 rounded-pill"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<strong class="ms-4 text-white"${_scopeId2}>Uploading...</strong>`);
                  } else {
                    return [
                      createVNode("strong", { class: "ms-4 text-white" }, "Uploading...")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              uploadStatus.value ? (openBlock(), createBlock(VAlert, {
                key: 0,
                type: uploadStatus.value.type,
                dismissible: "",
                transition: "fade-transition",
                class: "mb-4",
                color: "#2A3B4D",
                density: "compact",
                prominent: "",
                modelValue: showAlert.value,
                "onUpdate:modelValue": ($event) => showAlert.value = $event
              }, {
                default: withCtx(() => [
                  createVNode(VIcon, { class: "me-2" }, {
                    default: withCtx(() => [
                      createTextVNode("mdi-information")
                    ]),
                    _: 1
                  }),
                  createTextVNode(" " + toDisplayString(uploadStatus.value.message), 1)
                ]),
                _: 1
              }, 8, ["type", "modelValue", "onUpdate:modelValue"])) : createCommentVNode("", true),
              createVNode(VCard, {
                elevation: "8",
                class: "rounded-xl"
              }, {
                default: withCtx(() => [
                  createVNode(VCardTitle, { class: "text-h6 font-weight-bold mt-2" }, {
                    default: withCtx(() => [
                      createTextVNode(" Upload Foto ")
                    ]),
                    _: 1
                  }),
                  createVNode(VDivider),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VForm, null, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => {
                                  var _a;
                                  return [
                                    createVNode(VSelect, {
                                      modelValue: unref(photoParams).unit_id,
                                      "onUpdate:modelValue": ($event) => unref(photoParams).unit_id = $event,
                                      density: "comfortable",
                                      label: "1. Pilih unit",
                                      items: units.value,
                                      "item-value": "id",
                                      "item-title": "name",
                                      hint: (_a = unref(selectedUnit)) == null ? void 0 : _a.location,
                                      "persistent-hint": "",
                                      class: "mb-4",
                                      variant: "outlined"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "hint"])
                                  ];
                                }),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VSelect, {
                                    modelValue: unref(photoParams).outlet_id,
                                    "onUpdate:modelValue": ($event) => unref(photoParams).outlet_id = $event,
                                    label: "2. Pilih outlet",
                                    items: outletList.value,
                                    "item-value": "id",
                                    "item-title": "name",
                                    class: "mb-4"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "4"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VSelect, {
                                    modelValue: unref(photoParams).photo_type_id,
                                    "onUpdate:modelValue": ($event) => unref(photoParams).photo_type_id = $event,
                                    label: "3. Pilih harga foto",
                                    items: photoPricesByOutlet.value,
                                    "item-value": "photo_type_id",
                                    "item-title": (item) => {
                                      var _a2, _b;
                                      var _a;
                                      return `${(_a2 = item.photo_type_name) != null ? _a2 : "Select first"} - ${(_b = (_a = item.price) == null ? void 0 : _a.toLocaleString()) != null ? _b : "0"} IDR`;
                                    },
                                    class: "mb-4"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "item-title"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "12" }, {
                                default: withCtx(() => [
                                  createVNode(_component_v_file_upload, {
                                    modelValue: files.value,
                                    "onUpdate:modelValue": ($event) => files.value = $event,
                                    accept: "image/*",
                                    clearable: "",
                                    "prepend-icon": "bx bx-upload",
                                    multiple: "",
                                    disabled: loading.value,
                                    onChange: handleUpload,
                                    class: "mb-4"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "disabled"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024),
              loading.value ? (openBlock(), createBlock(VProgressLinear, {
                key: 1,
                value: progress.value,
                color: "blue",
                height: "16",
                striped: "",
                indeterminate: "",
                class: "mt-6 rounded-pill"
              }, {
                default: withCtx(() => [
                  createVNode("strong", { class: "ms-4 text-white" }, "Uploading...")
                ]),
                _: 1
              }, 8, ["value"])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/outlets/upload-photo.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
