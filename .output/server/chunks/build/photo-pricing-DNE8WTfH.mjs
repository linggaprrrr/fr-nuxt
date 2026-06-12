import { defineComponent, ref, computed, watch, unref, isRef, withCtx, createTextVNode, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as usePricings } from './usePricings-Bc6NT0-w.mjs';
import { V as VSnackbar } from './VSnackbar-CnnHHKBG.mjs';
import { a as VBtn, b as VIcon } from './server.mjs';
import { V as VCard, a as VCardText, c as VCardTitle, b as VCardActions } from './VCard-DLk5PTHl.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
import { V as VTable } from './VTable-BXA3D1kT.mjs';
import { V as VDialog } from './VDialog-yRDXDq_T.mjs';
import { V as VContainer } from './VContainer-CZliQBxk.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VListSubheader } from './VListSubheader-BbgyaiQc.mjs';
import { V as VSpacer } from './VSpacer-CQpJ4yRI.mjs';
import { V as VPagination } from './VPagination-z_-yTplN.mjs';
import { V as VSelect } from './VSelect-Bxz-WhQz.mjs';
import './authFetch-5wQjlWwJ.mjs';
import './forwardRefs-BSTjJZPU.mjs';
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
import './dialog-transition-D66jL1n_.mjs';
import './VMenu-CmFsZZaF.mjs';
import './ssrBoot-BtvJZs44.mjs';
import './VCheckboxBtn-DaRBpQ2e.mjs';
import './VChip-C44NlS62.mjs';
import './VSlideGroup-J1shNAVo.mjs';

const limit = 24;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "photo-pricing",
  __ssrInlineRender: true,
  setup(__props) {
    const { getPhotoTypes, getPhotoPrices, createPhotoPricing, createPhotoType, deletePhotoTypeById, deletePhotoPriceById, getPhotoPriceById, getPhotoTypeById, updatePhotoType, updatePhotoPrice } = usePricings();
    const pagePhotoTypes = ref(1);
    const totalPhotoTypes = ref(0);
    const searchPhotoTypes = ref("");
    const photoTypes = ref([]);
    const formPhotoType = ref({
      name: "",
      description: ""
    });
    const formEditPhotoType = ref({
      id: "",
      name: "",
      description: ""
    });
    const showCreatePhotoType = ref(false);
    const showEditPhotoType = ref(false);
    const pagePhotoPrices = ref(1);
    const totalPhotoPrices = ref(0);
    const searchPhotoPrices = ref("");
    const photoPrices = ref([]);
    const formPhotoPricing = ref({
      unit_id: "",
      photo_type_id: "",
      price: 0
    });
    const formEditPhotoPricing = ref({
      id: "",
      unit_id: "",
      photo_type_id: "",
      price: 0
    });
    const showCreatePhotoPricing = ref(false);
    const showEditPhotoPricing = ref(false);
    const isLoading = ref(false);
    async function fetchPhotoTypes() {
      isLoading.value = true;
      try {
        const res = await getPhotoTypes({
          page: pagePhotoTypes.value,
          limit,
          search: searchPhotoTypes.value
        });
        photoTypes.value = (res == null ? void 0 : res.data) || [];
        totalPhotoTypes.value = (res == null ? void 0 : res.total) || 0;
        if (photoTypes.value.length > 0 && !formPhotoPricing.value.photo_type_id) {
          formPhotoPricing.value.photo_type_id = photoTypes.value[0].id;
        }
      } catch (error) {
        console.error("Failed to fetch Photo types:", error);
        photoTypes.value = [];
        totalPhotoTypes.value = 0;
      } finally {
        isLoading.value = false;
      }
    }
    async function fetchPhotoPrices() {
      isLoading.value = true;
      try {
        const res = await getPhotoPrices({
          page: pagePhotoPrices.value,
          limit,
          search: searchPhotoPrices.value
        });
        photoPrices.value = (res == null ? void 0 : res.photo_prices) || [];
        totalPhotoPrices.value = (res == null ? void 0 : res.total) || 0;
      } catch (error) {
        console.error("Failed to fetch Photo prices:", error);
        photoPrices.value = [];
        totalPhotoPrices.value = 0;
      } finally {
        isLoading.value = false;
      }
    }
    const units = ref([]);
    const selectedUnit = computed(() => {
      return units.value.find((u) => u.id === formPhotoPricing.value.unit_id) || null;
    });
    const snackbar = ref(false);
    const text = ref("");
    const timeout = ref(3e3);
    async function handleCreatePhotoPricing() {
      try {
        await createPhotoPricing(formPhotoPricing.value);
        showCreatePhotoPricing.value = false;
        await fetchPhotoPrices();
      } catch (error) {
        text.value = "Photo price for this unit and photo type already exists";
        snackbar.value = true;
      }
    }
    async function openEditPriceModal(id) {
      const data = await getPhotoPriceById(id);
      if (data == null ? void 0 : data.photo_price) {
        formEditPhotoPricing.value = data.photo_price;
      }
      showEditPhotoPricing.value = true;
    }
    async function handleUpdatePhotoPricing(id) {
      await updatePhotoPrice(id, formEditPhotoPricing.value);
      showEditPhotoPricing.value = false;
      await fetchPhotoPrices();
    }
    async function confirmDeletePhotoPrice(id) {
      if (confirm("Yakin ingin menghapus Pricing ini?")) {
        await deletePhotoPriceById(id);
        await fetchPhotoPrices();
      }
    }
    async function handleCreatePhotoType() {
      await createPhotoType(formPhotoType.value);
      showCreatePhotoType.value = false;
      await fetchPhotoTypes();
    }
    async function openEditPhotoTypeModal(id) {
      const data = await getPhotoTypeById(id);
      if (data == null ? void 0 : data.photo_type) {
        formEditPhotoType.value = data.photo_type;
      }
      showEditPhotoType.value = true;
    }
    async function handleUpdatePhotoType(id) {
      await updatePhotoType(id, formEditPhotoType.value);
      showEditPhotoType.value = false;
      await fetchPhotoTypes();
    }
    async function confirmDeletePhotoType(id) {
      if (confirm("Yakin ingin menghapus Tipe Foto ini?")) {
        await deletePhotoTypeById(id);
        await fetchPhotoTypes();
      }
    }
    watch([pagePhotoTypes, searchPhotoTypes], fetchPhotoTypes);
    watch([pagePhotoPrices, searchPhotoPrices], fetchPhotoPrices);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[--><div class="container"><h1>Photo Pricing</h1><p>Manage your photo pricing here.</p></div>`);
      _push(ssrRenderComponent(VSnackbar, {
        modelValue: unref(snackbar),
        "onUpdate:modelValue": ($event) => isRef(snackbar) ? snackbar.value = $event : null,
        timeout: unref(timeout)
      }, {
        actions: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              color: "blue",
              variant: "text",
              onClick: ($event) => snackbar.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`Close`);
                } else {
                  return [
                    createTextVNode("Close")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, {
                color: "blue",
                variant: "text",
                onClick: ($event) => snackbar.value = false
              }, {
                default: withCtx(() => [
                  createTextVNode("Close")
                ]),
                _: 1
              }, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(unref(text))} `);
          } else {
            return [
              createTextVNode(toDisplayString(unref(text)) + " ", 1)
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCard, {
        title: "Photo Type Table",
        class: "mb-4"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              class: "text-none",
              color: "primary",
              text: "Tambah Tipe Foto",
              variant: "tonal",
              slim: "",
              onClick: ($event) => showCreatePhotoType.value = true
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VDialog, {
              modelValue: unref(showCreatePhotoType),
              "onUpdate:modelValue": ($event) => isRef(showCreatePhotoType) ? showCreatePhotoType.value = $event : null,
              "max-width": "766"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tambah Tipe Foto`);
                            } else {
                              return [
                                createTextVNode("Tambah Tipe Foto")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VContainer, { fluid: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, { cols: "3" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VListSubheader, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Tipe / Jenis Foto`);
                                              } else {
                                                return [
                                                  createTextVNode("Tipe / Jenis Foto")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Tipe / Jenis Foto")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { cols: "9" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: unref(formPhotoType).name,
                                            "onUpdate:modelValue": ($event) => unref(formPhotoType).name = $event,
                                            "persistent-hint": ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: unref(formPhotoType).name,
                                              "onUpdate:modelValue": ($event) => unref(formPhotoType).name = $event,
                                              "persistent-hint": ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, { cols: "3" }, {
                                        default: withCtx(() => [
                                          createVNode(VListSubheader, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Tipe / Jenis Foto")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(formPhotoType).name,
                                            "onUpdate:modelValue": ($event) => unref(formPhotoType).name = $event,
                                            "persistent-hint": ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, { cols: "3" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VListSubheader, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Descripsi`);
                                              } else {
                                                return [
                                                  createTextVNode("Descripsi")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Descripsi")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { cols: "9" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: unref(formPhotoType).description,
                                            "onUpdate:modelValue": ($event) => unref(formPhotoType).description = $event,
                                            "persistent-hint": ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: unref(formPhotoType).description,
                                              "onUpdate:modelValue": ($event) => unref(formPhotoType).description = $event,
                                              "persistent-hint": ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, { cols: "3" }, {
                                        default: withCtx(() => [
                                          createVNode(VListSubheader, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Descripsi")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(formPhotoType).description,
                                            "onUpdate:modelValue": ($event) => unref(formPhotoType).description = $event,
                                            "persistent-hint": ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                    createVNode(VCol, { cols: "3" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Tipe / Jenis Foto")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(formPhotoType).name,
                                          "onUpdate:modelValue": ($event) => unref(formPhotoType).name = $event,
                                          "persistent-hint": ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, { cols: "3" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Descripsi")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(formPhotoType).description,
                                          "onUpdate:modelValue": ($event) => unref(formPhotoType).description = $event,
                                          "persistent-hint": ""
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VSpacer, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                text: "Batal",
                                onClick: ($event) => showCreatePhotoType.value = false
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                onClick: handleCreatePhotoType
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Simpan`);
                                  } else {
                                    return [
                                      createTextVNode("Simpan")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VSpacer),
                                createVNode(VBtn, {
                                  text: "Batal",
                                  onClick: ($event) => showCreatePhotoType.value = false
                                }, null, 8, ["onClick"]),
                                createVNode(VBtn, {
                                  color: "primary",
                                  onClick: handleCreatePhotoType
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Simpan")
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
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Tambah Tipe Foto")
                            ]),
                            _: 1
                          }),
                          createVNode(VContainer, { fluid: "" }, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, { cols: "3" }, {
                                    default: withCtx(() => [
                                      createVNode(VListSubheader, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Tipe / Jenis Foto")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(formPhotoType).name,
                                        "onUpdate:modelValue": ($event) => unref(formPhotoType).name = $event,
                                        "persistent-hint": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, { cols: "3" }, {
                                    default: withCtx(() => [
                                      createVNode(VListSubheader, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Descripsi")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(formPhotoType).description,
                                        "onUpdate:modelValue": ($event) => unref(formPhotoType).description = $event,
                                        "persistent-hint": ""
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
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VSpacer),
                              createVNode(VBtn, {
                                text: "Batal",
                                onClick: ($event) => showCreatePhotoType.value = false
                              }, null, 8, ["onClick"]),
                              createVNode(VBtn, {
                                color: "primary",
                                onClick: handleCreatePhotoType
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Simpan")
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
                        createVNode(VCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Tambah Tipe Foto")
                          ]),
                          _: 1
                        }),
                        createVNode(VContainer, { fluid: "" }, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Tipe / Jenis Foto")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(formPhotoType).name,
                                      "onUpdate:modelValue": ($event) => unref(formPhotoType).name = $event,
                                      "persistent-hint": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Descripsi")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(formPhotoType).description,
                                      "onUpdate:modelValue": ($event) => unref(formPhotoType).description = $event,
                                      "persistent-hint": ""
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
                        createVNode(VCardActions, null, {
                          default: withCtx(() => [
                            createVNode(VSpacer),
                            createVNode(VBtn, {
                              text: "Batal",
                              onClick: ($event) => showCreatePhotoType.value = false
                            }, null, 8, ["onClick"]),
                            createVNode(VBtn, {
                              color: "primary",
                              onClick: handleCreatePhotoType
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Simpan")
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
              createVNode(VBtn, {
                class: "text-none",
                color: "primary",
                text: "Tambah Tipe Foto",
                variant: "tonal",
                slim: "",
                onClick: ($event) => showCreatePhotoType.value = true
              }, null, 8, ["onClick"]),
              createVNode(VDialog, {
                modelValue: unref(showCreatePhotoType),
                "onUpdate:modelValue": ($event) => isRef(showCreatePhotoType) ? showCreatePhotoType.value = $event : null,
                "max-width": "766"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Tambah Tipe Foto")
                        ]),
                        _: 1
                      }),
                      createVNode(VContainer, { fluid: "" }, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "3" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Tipe / Jenis Foto")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(formPhotoType).name,
                                    "onUpdate:modelValue": ($event) => unref(formPhotoType).name = $event,
                                    "persistent-hint": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "3" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Descripsi")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(formPhotoType).description,
                                    "onUpdate:modelValue": ($event) => unref(formPhotoType).description = $event,
                                    "persistent-hint": ""
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
                      createVNode(VCardActions, null, {
                        default: withCtx(() => [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            text: "Batal",
                            onClick: ($event) => showCreatePhotoType.value = false
                          }, null, 8, ["onClick"]),
                          createVNode(VBtn, {
                            color: "primary",
                            onClick: handleCreatePhotoType
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Simpan")
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
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTextField, {
                    modelValue: unref(searchPhotoTypes),
                    "onUpdate:modelValue": ($event) => isRef(searchPhotoTypes) ? searchPhotoTypes.value = $event : null,
                    label: "Cari tipe foto...",
                    onInput: fetchPhotoPrices,
                    "prepend-inner-icon": "bx bx-search",
                    clearable: "",
                    class: "mb-4"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTextField, {
                      modelValue: unref(searchPhotoTypes),
                      "onUpdate:modelValue": ($event) => isRef(searchPhotoTypes) ? searchPhotoTypes.value = $event : null,
                      label: "Cari tipe foto...",
                      onInput: fetchPhotoPrices,
                      "prepend-inner-icon": "bx bx-search",
                      clearable: "",
                      class: "mb-4"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VTable, { density: "compact" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<thead${_scopeId2}><tr${_scopeId2}><th${_scopeId2}>#</th><th${_scopeId2}>Nama</th><th${_scopeId2}>Deskripsi</th><th${_scopeId2}></th></tr></thead><tbody${_scopeId2}>`);
                  if (!unref(isLoading) && unref(photoTypes).length === 0) {
                    _push3(`<tr${_scopeId2}><td colspan="6" class="text-center"${_scopeId2}>Tidak ada data</td></tr>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(photoTypes), (photoType, index) => {
                    _push3(`<tr${_scopeId2}><td${_scopeId2}>${ssrInterpolate(index + 1 + (unref(pagePhotoTypes) - 1) * limit)}</td><td${_scopeId2}>${ssrInterpolate(photoType.name)}</td><td${_scopeId2}>${ssrInterpolate(photoType.description)}</td><td${_scopeId2}>`);
                    _push3(ssrRenderComponent(VBtn, {
                      icon: "",
                      variant: "text",
                      size: "small",
                      onClick: ($event) => openEditPhotoTypeModal(photoType.id)
                    }, {
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
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VIcon, { color: "warning" }, {
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
                      size: "small",
                      onClick: ($event) => confirmDeletePhotoType(photoType.id)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VIcon, { color: "error" }, {
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
                    }, _parent3, _scopeId2));
                    _push3(`</td></tr>`);
                  });
                  _push3(`<!--]--></tbody>`);
                } else {
                  return [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "#"),
                        createVNode("th", null, "Nama"),
                        createVNode("th", null, "Deskripsi"),
                        createVNode("th")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      !unref(isLoading) && unref(photoTypes).length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "6",
                          class: "text-center"
                        }, "Tidak ada data")
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(photoTypes), (photoType, index) => {
                        return openBlock(), createBlock("tr", {
                          key: photoType.id
                        }, [
                          createVNode("td", null, toDisplayString(index + 1 + (unref(pagePhotoTypes) - 1) * limit), 1),
                          createVNode("td", null, toDisplayString(photoType.name), 1),
                          createVNode("td", null, toDisplayString(photoType.description), 1),
                          createVNode("td", null, [
                            createVNode(VBtn, {
                              icon: "",
                              variant: "text",
                              size: "small",
                              onClick: ($event) => openEditPhotoTypeModal(photoType.id)
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, { color: "warning" }, {
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
                              size: "small",
                              onClick: ($event) => confirmDeletePhotoType(photoType.id)
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
                          ])
                        ]);
                      }), 128))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VDialog, {
              modelValue: unref(showEditPhotoType),
              "onUpdate:modelValue": ($event) => isRef(showEditPhotoType) ? showEditPhotoType.value = $event : null,
              "max-width": "766"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Edit Tipe Foto`);
                            } else {
                              return [
                                createTextVNode("Edit Tipe Foto")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VContainer, { fluid: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, { cols: "3" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VListSubheader, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Tipe / Jenis Foto`);
                                              } else {
                                                return [
                                                  createTextVNode("Tipe / Jenis Foto")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Tipe / Jenis Foto")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { cols: "9" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: unref(formEditPhotoType).name,
                                            "onUpdate:modelValue": ($event) => unref(formEditPhotoType).name = $event,
                                            "persistent-hint": ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: unref(formEditPhotoType).name,
                                              "onUpdate:modelValue": ($event) => unref(formEditPhotoType).name = $event,
                                              "persistent-hint": ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, { cols: "3" }, {
                                        default: withCtx(() => [
                                          createVNode(VListSubheader, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Tipe / Jenis Foto")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(formEditPhotoType).name,
                                            "onUpdate:modelValue": ($event) => unref(formEditPhotoType).name = $event,
                                            "persistent-hint": ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, { cols: "3" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VListSubheader, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Descripsi`);
                                              } else {
                                                return [
                                                  createTextVNode("Descripsi")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Descripsi")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { cols: "9" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: unref(formEditPhotoType).description,
                                            "onUpdate:modelValue": ($event) => unref(formEditPhotoType).description = $event,
                                            "persistent-hint": ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: unref(formEditPhotoType).description,
                                              "onUpdate:modelValue": ($event) => unref(formEditPhotoType).description = $event,
                                              "persistent-hint": ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, { cols: "3" }, {
                                        default: withCtx(() => [
                                          createVNode(VListSubheader, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Descripsi")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: unref(formEditPhotoType).description,
                                            "onUpdate:modelValue": ($event) => unref(formEditPhotoType).description = $event,
                                            "persistent-hint": ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                    createVNode(VCol, { cols: "3" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Tipe / Jenis Foto")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(formEditPhotoType).name,
                                          "onUpdate:modelValue": ($event) => unref(formEditPhotoType).name = $event,
                                          "persistent-hint": ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, { cols: "3" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Descripsi")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: unref(formEditPhotoType).description,
                                          "onUpdate:modelValue": ($event) => unref(formEditPhotoType).description = $event,
                                          "persistent-hint": ""
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VSpacer, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                text: "Batal",
                                onClick: ($event) => showEditPhotoType.value = false
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                onClick: ($event) => handleUpdatePhotoType(unref(formEditPhotoType).id)
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Update`);
                                  } else {
                                    return [
                                      createTextVNode("Update")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VSpacer),
                                createVNode(VBtn, {
                                  text: "Batal",
                                  onClick: ($event) => showEditPhotoType.value = false
                                }, null, 8, ["onClick"]),
                                createVNode(VBtn, {
                                  color: "primary",
                                  onClick: ($event) => handleUpdatePhotoType(unref(formEditPhotoType).id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Update")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Edit Tipe Foto")
                            ]),
                            _: 1
                          }),
                          createVNode(VContainer, { fluid: "" }, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, { cols: "3" }, {
                                    default: withCtx(() => [
                                      createVNode(VListSubheader, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Tipe / Jenis Foto")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(formEditPhotoType).name,
                                        "onUpdate:modelValue": ($event) => unref(formEditPhotoType).name = $event,
                                        "persistent-hint": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, { cols: "3" }, {
                                    default: withCtx(() => [
                                      createVNode(VListSubheader, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Descripsi")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: unref(formEditPhotoType).description,
                                        "onUpdate:modelValue": ($event) => unref(formEditPhotoType).description = $event,
                                        "persistent-hint": ""
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
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VSpacer),
                              createVNode(VBtn, {
                                text: "Batal",
                                onClick: ($event) => showEditPhotoType.value = false
                              }, null, 8, ["onClick"]),
                              createVNode(VBtn, {
                                color: "primary",
                                onClick: ($event) => handleUpdatePhotoType(unref(formEditPhotoType).id)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Update")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
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
                        createVNode(VCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Edit Tipe Foto")
                          ]),
                          _: 1
                        }),
                        createVNode(VContainer, { fluid: "" }, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Tipe / Jenis Foto")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(formEditPhotoType).name,
                                      "onUpdate:modelValue": ($event) => unref(formEditPhotoType).name = $event,
                                      "persistent-hint": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Descripsi")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: unref(formEditPhotoType).description,
                                      "onUpdate:modelValue": ($event) => unref(formEditPhotoType).description = $event,
                                      "persistent-hint": ""
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
                        createVNode(VCardActions, null, {
                          default: withCtx(() => [
                            createVNode(VSpacer),
                            createVNode(VBtn, {
                              text: "Batal",
                              onClick: ($event) => showEditPhotoType.value = false
                            }, null, 8, ["onClick"]),
                            createVNode(VBtn, {
                              color: "primary",
                              onClick: ($event) => handleUpdatePhotoType(unref(formEditPhotoType).id)
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Update")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
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
            _push2(ssrRenderComponent(VCardActions, { class: "justify-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VPagination, {
                    modelValue: unref(pagePhotoTypes),
                    "onUpdate:modelValue": ($event) => isRef(pagePhotoTypes) ? pagePhotoTypes.value = $event : null,
                    length: Math.ceil(unref(totalPhotoTypes) / limit),
                    "total-visible": "5",
                    "prev-icon": "bx bx-chevron-left",
                    "next-icon": "bx bx-chevron-right"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VPagination, {
                      modelValue: unref(pagePhotoTypes),
                      "onUpdate:modelValue": ($event) => isRef(pagePhotoTypes) ? pagePhotoTypes.value = $event : null,
                      length: Math.ceil(unref(totalPhotoTypes) / limit),
                      "total-visible": "5",
                      "prev-icon": "bx bx-chevron-left",
                      "next-icon": "bx bx-chevron-right"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "length"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode(VTextField, {
                    modelValue: unref(searchPhotoTypes),
                    "onUpdate:modelValue": ($event) => isRef(searchPhotoTypes) ? searchPhotoTypes.value = $event : null,
                    label: "Cari tipe foto...",
                    onInput: fetchPhotoPrices,
                    "prepend-inner-icon": "bx bx-search",
                    clearable: "",
                    class: "mb-4"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(VTable, { density: "compact" }, {
                default: withCtx(() => [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "#"),
                      createVNode("th", null, "Nama"),
                      createVNode("th", null, "Deskripsi"),
                      createVNode("th")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    !unref(isLoading) && unref(photoTypes).length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                      createVNode("td", {
                        colspan: "6",
                        class: "text-center"
                      }, "Tidak ada data")
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(photoTypes), (photoType, index) => {
                      return openBlock(), createBlock("tr", {
                        key: photoType.id
                      }, [
                        createVNode("td", null, toDisplayString(index + 1 + (unref(pagePhotoTypes) - 1) * limit), 1),
                        createVNode("td", null, toDisplayString(photoType.name), 1),
                        createVNode("td", null, toDisplayString(photoType.description), 1),
                        createVNode("td", null, [
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            size: "small",
                            onClick: ($event) => openEditPhotoTypeModal(photoType.id)
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, { color: "warning" }, {
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
                            size: "small",
                            onClick: ($event) => confirmDeletePhotoType(photoType.id)
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
                        ])
                      ]);
                    }), 128))
                  ])
                ]),
                _: 1
              }),
              createVNode(VDialog, {
                modelValue: unref(showEditPhotoType),
                "onUpdate:modelValue": ($event) => isRef(showEditPhotoType) ? showEditPhotoType.value = $event : null,
                "max-width": "766"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Edit Tipe Foto")
                        ]),
                        _: 1
                      }),
                      createVNode(VContainer, { fluid: "" }, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "3" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Tipe / Jenis Foto")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(formEditPhotoType).name,
                                    "onUpdate:modelValue": ($event) => unref(formEditPhotoType).name = $event,
                                    "persistent-hint": ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "3" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Descripsi")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: unref(formEditPhotoType).description,
                                    "onUpdate:modelValue": ($event) => unref(formEditPhotoType).description = $event,
                                    "persistent-hint": ""
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
                      createVNode(VCardActions, null, {
                        default: withCtx(() => [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            text: "Batal",
                            onClick: ($event) => showEditPhotoType.value = false
                          }, null, 8, ["onClick"]),
                          createVNode(VBtn, {
                            color: "primary",
                            onClick: ($event) => handleUpdatePhotoType(unref(formEditPhotoType).id)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Update")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VCardActions, { class: "justify-center" }, {
                default: withCtx(() => [
                  createVNode(VPagination, {
                    modelValue: unref(pagePhotoTypes),
                    "onUpdate:modelValue": ($event) => isRef(pagePhotoTypes) ? pagePhotoTypes.value = $event : null,
                    length: Math.ceil(unref(totalPhotoTypes) / limit),
                    "total-visible": "5",
                    "prev-icon": "bx bx-chevron-left",
                    "next-icon": "bx bx-chevron-right"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "length"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VCard, {
        title: "Pricing Table",
        class: "mb-4"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              class: "text-none",
              color: "primary",
              text: "Tambah Pricing",
              variant: "tonal",
              slim: "",
              onClick: ($event) => showCreatePhotoPricing.value = true
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VDialog, {
              modelValue: unref(showCreatePhotoPricing),
              "onUpdate:modelValue": ($event) => isRef(showCreatePhotoPricing) ? showCreatePhotoPricing.value = $event : null,
              "max-width": "766"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tambah Pricing`);
                            } else {
                              return [
                                createTextVNode("Tambah Pricing")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VContainer, { fluid: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, { cols: "2" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VListSubheader, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Lokasi Unit`);
                                              } else {
                                                return [
                                                  createTextVNode("Lokasi Unit")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Lokasi Unit")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { cols: "10" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        var _a, _b;
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSelect, {
                                            modelValue: unref(formPhotoPricing).unit_id,
                                            "onUpdate:modelValue": ($event) => unref(formPhotoPricing).unit_id = $event,
                                            density: "comfortable",
                                            label: "Unit",
                                            items: unref(units),
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
                                              modelValue: unref(formPhotoPricing).unit_id,
                                              "onUpdate:modelValue": ($event) => unref(formPhotoPricing).unit_id = $event,
                                              density: "comfortable",
                                              label: "Unit",
                                              items: unref(units),
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
                                  } else {
                                    return [
                                      createVNode(VCol, { cols: "2" }, {
                                        default: withCtx(() => [
                                          createVNode(VListSubheader, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Lokasi Unit")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "10" }, {
                                        default: withCtx(() => {
                                          var _a;
                                          return [
                                            createVNode(VSelect, {
                                              modelValue: unref(formPhotoPricing).unit_id,
                                              "onUpdate:modelValue": ($event) => unref(formPhotoPricing).unit_id = $event,
                                              density: "comfortable",
                                              label: "Unit",
                                              items: unref(units),
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
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, { cols: "2" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VListSubheader, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Tipe Foto`);
                                              } else {
                                                return [
                                                  createTextVNode("Tipe Foto")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Tipe Foto")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { cols: "10" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSelect, {
                                            modelValue: unref(formPhotoPricing).photo_type_id,
                                            "onUpdate:modelValue": ($event) => unref(formPhotoPricing).photo_type_id = $event,
                                            density: "comfortable",
                                            label: "Tipe Foto",
                                            items: unref(photoTypes),
                                            "item-value": "id",
                                            "item-title": "name",
                                            class: "mb-4"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSelect, {
                                              modelValue: unref(formPhotoPricing).photo_type_id,
                                              "onUpdate:modelValue": ($event) => unref(formPhotoPricing).photo_type_id = $event,
                                              density: "comfortable",
                                              label: "Tipe Foto",
                                              items: unref(photoTypes),
                                              "item-value": "id",
                                              "item-title": "name",
                                              class: "mb-4"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, { cols: "2" }, {
                                        default: withCtx(() => [
                                          createVNode(VListSubheader, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Tipe Foto")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "10" }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            modelValue: unref(formPhotoPricing).photo_type_id,
                                            "onUpdate:modelValue": ($event) => unref(formPhotoPricing).photo_type_id = $event,
                                            density: "comfortable",
                                            label: "Tipe Foto",
                                            items: unref(photoTypes),
                                            "item-value": "id",
                                            "item-title": "name",
                                            class: "mb-4"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, { cols: "2" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VListSubheader, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Harga`);
                                              } else {
                                                return [
                                                  createTextVNode("Harga")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Harga")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { cols: "10" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            label: "Amount",
                                            hint: "Rp 0 jika konten/foto gratis",
                                            prefix: "Rp",
                                            modelValue: unref(formPhotoPricing).price,
                                            "onUpdate:modelValue": ($event) => unref(formPhotoPricing).price = $event,
                                            "persistent-hint": ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              label: "Amount",
                                              hint: "Rp 0 jika konten/foto gratis",
                                              prefix: "Rp",
                                              modelValue: unref(formPhotoPricing).price,
                                              "onUpdate:modelValue": ($event) => unref(formPhotoPricing).price = $event,
                                              "persistent-hint": ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, { cols: "2" }, {
                                        default: withCtx(() => [
                                          createVNode(VListSubheader, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Harga")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "10" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            label: "Amount",
                                            hint: "Rp 0 jika konten/foto gratis",
                                            prefix: "Rp",
                                            modelValue: unref(formPhotoPricing).price,
                                            "onUpdate:modelValue": ($event) => unref(formPhotoPricing).price = $event,
                                            "persistent-hint": ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                    createVNode(VCol, { cols: "2" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Lokasi Unit")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "10" }, {
                                      default: withCtx(() => {
                                        var _a;
                                        return [
                                          createVNode(VSelect, {
                                            modelValue: unref(formPhotoPricing).unit_id,
                                            "onUpdate:modelValue": ($event) => unref(formPhotoPricing).unit_id = $event,
                                            density: "comfortable",
                                            label: "Unit",
                                            items: unref(units),
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
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, { cols: "2" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Tipe Foto")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "10" }, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          modelValue: unref(formPhotoPricing).photo_type_id,
                                          "onUpdate:modelValue": ($event) => unref(formPhotoPricing).photo_type_id = $event,
                                          density: "comfortable",
                                          label: "Tipe Foto",
                                          items: unref(photoTypes),
                                          "item-value": "id",
                                          "item-title": "name",
                                          class: "mb-4"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, { cols: "2" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Harga")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "10" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          label: "Amount",
                                          hint: "Rp 0 jika konten/foto gratis",
                                          prefix: "Rp",
                                          modelValue: unref(formPhotoPricing).price,
                                          "onUpdate:modelValue": ($event) => unref(formPhotoPricing).price = $event,
                                          "persistent-hint": ""
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VSpacer, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                text: "Batal",
                                onClick: ($event) => showCreatePhotoPricing.value = false
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                onClick: handleCreatePhotoPricing
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Simpan`);
                                  } else {
                                    return [
                                      createTextVNode("Simpan")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VSpacer),
                                createVNode(VBtn, {
                                  text: "Batal",
                                  onClick: ($event) => showCreatePhotoPricing.value = false
                                }, null, 8, ["onClick"]),
                                createVNode(VBtn, {
                                  color: "primary",
                                  onClick: handleCreatePhotoPricing
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Simpan")
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
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Tambah Pricing")
                            ]),
                            _: 1
                          }),
                          createVNode(VContainer, { fluid: "" }, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, { cols: "2" }, {
                                    default: withCtx(() => [
                                      createVNode(VListSubheader, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Lokasi Unit")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "10" }, {
                                    default: withCtx(() => {
                                      var _a;
                                      return [
                                        createVNode(VSelect, {
                                          modelValue: unref(formPhotoPricing).unit_id,
                                          "onUpdate:modelValue": ($event) => unref(formPhotoPricing).unit_id = $event,
                                          density: "comfortable",
                                          label: "Unit",
                                          items: unref(units),
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
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, { cols: "2" }, {
                                    default: withCtx(() => [
                                      createVNode(VListSubheader, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Tipe Foto")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "10" }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        modelValue: unref(formPhotoPricing).photo_type_id,
                                        "onUpdate:modelValue": ($event) => unref(formPhotoPricing).photo_type_id = $event,
                                        density: "comfortable",
                                        label: "Tipe Foto",
                                        items: unref(photoTypes),
                                        "item-value": "id",
                                        "item-title": "name",
                                        class: "mb-4"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, { cols: "2" }, {
                                    default: withCtx(() => [
                                      createVNode(VListSubheader, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Harga")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "10" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        label: "Amount",
                                        hint: "Rp 0 jika konten/foto gratis",
                                        prefix: "Rp",
                                        modelValue: unref(formPhotoPricing).price,
                                        "onUpdate:modelValue": ($event) => unref(formPhotoPricing).price = $event,
                                        "persistent-hint": ""
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
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VSpacer),
                              createVNode(VBtn, {
                                text: "Batal",
                                onClick: ($event) => showCreatePhotoPricing.value = false
                              }, null, 8, ["onClick"]),
                              createVNode(VBtn, {
                                color: "primary",
                                onClick: handleCreatePhotoPricing
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Simpan")
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
                        createVNode(VCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Tambah Pricing")
                          ]),
                          _: 1
                        }),
                        createVNode(VContainer, { fluid: "" }, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "2" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Lokasi Unit")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "10" }, {
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      createVNode(VSelect, {
                                        modelValue: unref(formPhotoPricing).unit_id,
                                        "onUpdate:modelValue": ($event) => unref(formPhotoPricing).unit_id = $event,
                                        density: "comfortable",
                                        label: "Unit",
                                        items: unref(units),
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
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "2" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Tipe Foto")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "10" }, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      modelValue: unref(formPhotoPricing).photo_type_id,
                                      "onUpdate:modelValue": ($event) => unref(formPhotoPricing).photo_type_id = $event,
                                      density: "comfortable",
                                      label: "Tipe Foto",
                                      items: unref(photoTypes),
                                      "item-value": "id",
                                      "item-title": "name",
                                      class: "mb-4"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "2" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Harga")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "10" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      label: "Amount",
                                      hint: "Rp 0 jika konten/foto gratis",
                                      prefix: "Rp",
                                      modelValue: unref(formPhotoPricing).price,
                                      "onUpdate:modelValue": ($event) => unref(formPhotoPricing).price = $event,
                                      "persistent-hint": ""
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
                        createVNode(VCardActions, null, {
                          default: withCtx(() => [
                            createVNode(VSpacer),
                            createVNode(VBtn, {
                              text: "Batal",
                              onClick: ($event) => showCreatePhotoPricing.value = false
                            }, null, 8, ["onClick"]),
                            createVNode(VBtn, {
                              color: "primary",
                              onClick: handleCreatePhotoPricing
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Simpan")
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
              createVNode(VBtn, {
                class: "text-none",
                color: "primary",
                text: "Tambah Pricing",
                variant: "tonal",
                slim: "",
                onClick: ($event) => showCreatePhotoPricing.value = true
              }, null, 8, ["onClick"]),
              createVNode(VDialog, {
                modelValue: unref(showCreatePhotoPricing),
                "onUpdate:modelValue": ($event) => isRef(showCreatePhotoPricing) ? showCreatePhotoPricing.value = $event : null,
                "max-width": "766"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Tambah Pricing")
                        ]),
                        _: 1
                      }),
                      createVNode(VContainer, { fluid: "" }, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "2" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Lokasi Unit")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "10" }, {
                                default: withCtx(() => {
                                  var _a;
                                  return [
                                    createVNode(VSelect, {
                                      modelValue: unref(formPhotoPricing).unit_id,
                                      "onUpdate:modelValue": ($event) => unref(formPhotoPricing).unit_id = $event,
                                      density: "comfortable",
                                      label: "Unit",
                                      items: unref(units),
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
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "2" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Tipe Foto")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "10" }, {
                                default: withCtx(() => [
                                  createVNode(VSelect, {
                                    modelValue: unref(formPhotoPricing).photo_type_id,
                                    "onUpdate:modelValue": ($event) => unref(formPhotoPricing).photo_type_id = $event,
                                    density: "comfortable",
                                    label: "Tipe Foto",
                                    items: unref(photoTypes),
                                    "item-value": "id",
                                    "item-title": "name",
                                    class: "mb-4"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "2" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Harga")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "10" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    label: "Amount",
                                    hint: "Rp 0 jika konten/foto gratis",
                                    prefix: "Rp",
                                    modelValue: unref(formPhotoPricing).price,
                                    "onUpdate:modelValue": ($event) => unref(formPhotoPricing).price = $event,
                                    "persistent-hint": ""
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
                      createVNode(VCardActions, null, {
                        default: withCtx(() => [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            text: "Batal",
                            onClick: ($event) => showCreatePhotoPricing.value = false
                          }, null, 8, ["onClick"]),
                          createVNode(VBtn, {
                            color: "primary",
                            onClick: handleCreatePhotoPricing
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Simpan")
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
              }, 8, ["modelValue", "onUpdate:modelValue"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTextField, {
                    modelValue: unref(searchPhotoPrices),
                    "onUpdate:modelValue": ($event) => isRef(searchPhotoPrices) ? searchPhotoPrices.value = $event : null,
                    label: "Cari...",
                    onInput: fetchPhotoPrices,
                    "prepend-inner-icon": "bx bx-search",
                    clearable: "",
                    class: "mb-4"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTextField, {
                      modelValue: unref(searchPhotoPrices),
                      "onUpdate:modelValue": ($event) => isRef(searchPhotoPrices) ? searchPhotoPrices.value = $event : null,
                      label: "Cari...",
                      onInput: fetchPhotoPrices,
                      "prepend-inner-icon": "bx bx-search",
                      clearable: "",
                      class: "mb-4"
                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VTable, { density: "compact" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<thead${_scopeId2}><tr${_scopeId2}><th${_scopeId2}>#</th><th${_scopeId2}>Tipe Foto</th><th${_scopeId2}>Unit</th><th${_scopeId2}>Harga</th><th${_scopeId2}></th></tr></thead><tbody${_scopeId2}>`);
                  if (!unref(isLoading) && unref(photoPrices).length === 0) {
                    _push3(`<tr${_scopeId2}><td colspan="6" class="text-center"${_scopeId2}>Tidak ada data</td></tr>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(photoPrices), (photoPrice, index) => {
                    _push3(`<tr${_scopeId2}><td${_scopeId2}>${ssrInterpolate(index + 1 + (unref(pagePhotoPrices) - 1) * limit)}</td><td${_scopeId2}>${ssrInterpolate(photoPrice.photo_type_name)}</td><td${_scopeId2}>${ssrInterpolate(photoPrice.unit_name)}</td><td${_scopeId2}>Rp ${ssrInterpolate(photoPrice.price.toLocaleString())}</td><td${_scopeId2}>`);
                    _push3(ssrRenderComponent(VBtn, {
                      icon: "",
                      variant: "text",
                      size: "small",
                      onClick: ($event) => openEditPriceModal(photoPrice.id)
                    }, {
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
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VIcon, { color: "warning" }, {
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
                      size: "small",
                      onClick: ($event) => confirmDeletePhotoPrice(photoPrice.id)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VIcon, { color: "error" }, {
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
                    }, _parent3, _scopeId2));
                    _push3(`</td></tr>`);
                  });
                  _push3(`<!--]--></tbody>`);
                } else {
                  return [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "#"),
                        createVNode("th", null, "Tipe Foto"),
                        createVNode("th", null, "Unit"),
                        createVNode("th", null, "Harga"),
                        createVNode("th")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      !unref(isLoading) && unref(photoPrices).length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "6",
                          class: "text-center"
                        }, "Tidak ada data")
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(unref(photoPrices), (photoPrice, index) => {
                        return openBlock(), createBlock("tr", {
                          key: photoPrice.id
                        }, [
                          createVNode("td", null, toDisplayString(index + 1 + (unref(pagePhotoPrices) - 1) * limit), 1),
                          createVNode("td", null, toDisplayString(photoPrice.photo_type_name), 1),
                          createVNode("td", null, toDisplayString(photoPrice.unit_name), 1),
                          createVNode("td", null, "Rp " + toDisplayString(photoPrice.price.toLocaleString()), 1),
                          createVNode("td", null, [
                            createVNode(VBtn, {
                              icon: "",
                              variant: "text",
                              size: "small",
                              onClick: ($event) => openEditPriceModal(photoPrice.id)
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, { color: "warning" }, {
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
                              size: "small",
                              onClick: ($event) => confirmDeletePhotoPrice(photoPrice.id)
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
                          ])
                        ]);
                      }), 128))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VDialog, {
              modelValue: unref(showEditPhotoPricing),
              "onUpdate:modelValue": ($event) => isRef(showEditPhotoPricing) ? showEditPhotoPricing.value = $event : null,
              "max-width": "766"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tambah Pricing`);
                            } else {
                              return [
                                createTextVNode("Tambah Pricing")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VContainer, { fluid: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, { cols: "2" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VListSubheader, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Lokasi Unit`);
                                              } else {
                                                return [
                                                  createTextVNode("Lokasi Unit")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Lokasi Unit")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { cols: "10" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        var _a, _b;
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSelect, {
                                            modelValue: unref(formEditPhotoPricing).unit_id,
                                            "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).unit_id = $event,
                                            density: "comfortable",
                                            label: "Unit",
                                            items: unref(units),
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
                                              modelValue: unref(formEditPhotoPricing).unit_id,
                                              "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).unit_id = $event,
                                              density: "comfortable",
                                              label: "Unit",
                                              items: unref(units),
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
                                  } else {
                                    return [
                                      createVNode(VCol, { cols: "2" }, {
                                        default: withCtx(() => [
                                          createVNode(VListSubheader, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Lokasi Unit")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "10" }, {
                                        default: withCtx(() => {
                                          var _a;
                                          return [
                                            createVNode(VSelect, {
                                              modelValue: unref(formEditPhotoPricing).unit_id,
                                              "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).unit_id = $event,
                                              density: "comfortable",
                                              label: "Unit",
                                              items: unref(units),
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
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, { cols: "2" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VListSubheader, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Tipe Foto`);
                                              } else {
                                                return [
                                                  createTextVNode("Tipe Foto")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Tipe Foto")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { cols: "10" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSelect, {
                                            modelValue: unref(formEditPhotoPricing).photo_type_id,
                                            "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).photo_type_id = $event,
                                            density: "comfortable",
                                            label: "Tipe Foto",
                                            items: unref(photoTypes),
                                            "item-value": "id",
                                            "item-title": "name",
                                            class: "mb-4"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSelect, {
                                              modelValue: unref(formEditPhotoPricing).photo_type_id,
                                              "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).photo_type_id = $event,
                                              density: "comfortable",
                                              label: "Tipe Foto",
                                              items: unref(photoTypes),
                                              "item-value": "id",
                                              "item-title": "name",
                                              class: "mb-4"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, { cols: "2" }, {
                                        default: withCtx(() => [
                                          createVNode(VListSubheader, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Tipe Foto")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "10" }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            modelValue: unref(formEditPhotoPricing).photo_type_id,
                                            "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).photo_type_id = $event,
                                            density: "comfortable",
                                            label: "Tipe Foto",
                                            items: unref(photoTypes),
                                            "item-value": "id",
                                            "item-title": "name",
                                            class: "mb-4"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, { cols: "2" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VListSubheader, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Harga`);
                                              } else {
                                                return [
                                                  createTextVNode("Harga")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Harga")
                                              ]),
                                              _: 1
                                            })
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, { cols: "10" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            label: "Amount",
                                            hint: "Rp 0 jika konten/foto gratis",
                                            prefix: "Rp",
                                            modelValue: unref(formEditPhotoPricing).price,
                                            "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).price = $event,
                                            "persistent-hint": ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              label: "Amount",
                                              hint: "Rp 0 jika konten/foto gratis",
                                              prefix: "Rp",
                                              modelValue: unref(formEditPhotoPricing).price,
                                              "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).price = $event,
                                              "persistent-hint": ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, { cols: "2" }, {
                                        default: withCtx(() => [
                                          createVNode(VListSubheader, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Harga")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "10" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            label: "Amount",
                                            hint: "Rp 0 jika konten/foto gratis",
                                            prefix: "Rp",
                                            modelValue: unref(formEditPhotoPricing).price,
                                            "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).price = $event,
                                            "persistent-hint": ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                    createVNode(VCol, { cols: "2" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Lokasi Unit")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "10" }, {
                                      default: withCtx(() => {
                                        var _a;
                                        return [
                                          createVNode(VSelect, {
                                            modelValue: unref(formEditPhotoPricing).unit_id,
                                            "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).unit_id = $event,
                                            density: "comfortable",
                                            label: "Unit",
                                            items: unref(units),
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
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, { cols: "2" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Tipe Foto")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "10" }, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          modelValue: unref(formEditPhotoPricing).photo_type_id,
                                          "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).photo_type_id = $event,
                                          density: "comfortable",
                                          label: "Tipe Foto",
                                          items: unref(photoTypes),
                                          "item-value": "id",
                                          "item-title": "name",
                                          class: "mb-4"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, { cols: "2" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Harga")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "10" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          label: "Amount",
                                          hint: "Rp 0 jika konten/foto gratis",
                                          prefix: "Rp",
                                          modelValue: unref(formEditPhotoPricing).price,
                                          "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).price = $event,
                                          "persistent-hint": ""
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
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCardActions, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VSpacer, null, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                text: "Batal",
                                onClick: ($event) => showEditPhotoPricing.value = false
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                onClick: ($event) => handleUpdatePhotoPricing(unref(formEditPhotoPricing).id)
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Update`);
                                  } else {
                                    return [
                                      createTextVNode("Update")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VSpacer),
                                createVNode(VBtn, {
                                  text: "Batal",
                                  onClick: ($event) => showEditPhotoPricing.value = false
                                }, null, 8, ["onClick"]),
                                createVNode(VBtn, {
                                  color: "primary",
                                  onClick: ($event) => handleUpdatePhotoPricing(unref(formEditPhotoPricing).id)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Update")
                                  ]),
                                  _: 1
                                }, 8, ["onClick"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Tambah Pricing")
                            ]),
                            _: 1
                          }),
                          createVNode(VContainer, { fluid: "" }, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, { cols: "2" }, {
                                    default: withCtx(() => [
                                      createVNode(VListSubheader, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Lokasi Unit")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "10" }, {
                                    default: withCtx(() => {
                                      var _a;
                                      return [
                                        createVNode(VSelect, {
                                          modelValue: unref(formEditPhotoPricing).unit_id,
                                          "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).unit_id = $event,
                                          density: "comfortable",
                                          label: "Unit",
                                          items: unref(units),
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
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, { cols: "2" }, {
                                    default: withCtx(() => [
                                      createVNode(VListSubheader, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Tipe Foto")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "10" }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        modelValue: unref(formEditPhotoPricing).photo_type_id,
                                        "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).photo_type_id = $event,
                                        density: "comfortable",
                                        label: "Tipe Foto",
                                        items: unref(photoTypes),
                                        "item-value": "id",
                                        "item-title": "name",
                                        class: "mb-4"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, { cols: "2" }, {
                                    default: withCtx(() => [
                                      createVNode(VListSubheader, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Harga")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "10" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        label: "Amount",
                                        hint: "Rp 0 jika konten/foto gratis",
                                        prefix: "Rp",
                                        modelValue: unref(formEditPhotoPricing).price,
                                        "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).price = $event,
                                        "persistent-hint": ""
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
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VSpacer),
                              createVNode(VBtn, {
                                text: "Batal",
                                onClick: ($event) => showEditPhotoPricing.value = false
                              }, null, 8, ["onClick"]),
                              createVNode(VBtn, {
                                color: "primary",
                                onClick: ($event) => handleUpdatePhotoPricing(unref(formEditPhotoPricing).id)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Update")
                                ]),
                                _: 1
                              }, 8, ["onClick"])
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
                        createVNode(VCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Tambah Pricing")
                          ]),
                          _: 1
                        }),
                        createVNode(VContainer, { fluid: "" }, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "2" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Lokasi Unit")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "10" }, {
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      createVNode(VSelect, {
                                        modelValue: unref(formEditPhotoPricing).unit_id,
                                        "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).unit_id = $event,
                                        density: "comfortable",
                                        label: "Unit",
                                        items: unref(units),
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
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "2" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Tipe Foto")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "10" }, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      modelValue: unref(formEditPhotoPricing).photo_type_id,
                                      "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).photo_type_id = $event,
                                      density: "comfortable",
                                      label: "Tipe Foto",
                                      items: unref(photoTypes),
                                      "item-value": "id",
                                      "item-title": "name",
                                      class: "mb-4"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "2" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Harga")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "10" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      label: "Amount",
                                      hint: "Rp 0 jika konten/foto gratis",
                                      prefix: "Rp",
                                      modelValue: unref(formEditPhotoPricing).price,
                                      "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).price = $event,
                                      "persistent-hint": ""
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
                        createVNode(VCardActions, null, {
                          default: withCtx(() => [
                            createVNode(VSpacer),
                            createVNode(VBtn, {
                              text: "Batal",
                              onClick: ($event) => showEditPhotoPricing.value = false
                            }, null, 8, ["onClick"]),
                            createVNode(VBtn, {
                              color: "primary",
                              onClick: ($event) => handleUpdatePhotoPricing(unref(formEditPhotoPricing).id)
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Update")
                              ]),
                              _: 1
                            }, 8, ["onClick"])
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
            _push2(ssrRenderComponent(VCardActions, { class: "justify-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VPagination, {
                    modelValue: unref(pagePhotoPrices),
                    "onUpdate:modelValue": ($event) => isRef(pagePhotoPrices) ? pagePhotoPrices.value = $event : null,
                    length: Math.ceil(unref(totalPhotoPrices) / limit),
                    "total-visible": "5",
                    "prev-icon": "bx bx-chevron-left",
                    "next-icon": "bx bx-chevron-right"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VPagination, {
                      modelValue: unref(pagePhotoPrices),
                      "onUpdate:modelValue": ($event) => isRef(pagePhotoPrices) ? pagePhotoPrices.value = $event : null,
                      length: Math.ceil(unref(totalPhotoPrices) / limit),
                      "total-visible": "5",
                      "prev-icon": "bx bx-chevron-left",
                      "next-icon": "bx bx-chevron-right"
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "length"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode(VTextField, {
                    modelValue: unref(searchPhotoPrices),
                    "onUpdate:modelValue": ($event) => isRef(searchPhotoPrices) ? searchPhotoPrices.value = $event : null,
                    label: "Cari...",
                    onInput: fetchPhotoPrices,
                    "prepend-inner-icon": "bx bx-search",
                    clearable: "",
                    class: "mb-4"
                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                ]),
                _: 1
              }),
              createVNode(VTable, { density: "compact" }, {
                default: withCtx(() => [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "#"),
                      createVNode("th", null, "Tipe Foto"),
                      createVNode("th", null, "Unit"),
                      createVNode("th", null, "Harga"),
                      createVNode("th")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    !unref(isLoading) && unref(photoPrices).length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                      createVNode("td", {
                        colspan: "6",
                        class: "text-center"
                      }, "Tidak ada data")
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(photoPrices), (photoPrice, index) => {
                      return openBlock(), createBlock("tr", {
                        key: photoPrice.id
                      }, [
                        createVNode("td", null, toDisplayString(index + 1 + (unref(pagePhotoPrices) - 1) * limit), 1),
                        createVNode("td", null, toDisplayString(photoPrice.photo_type_name), 1),
                        createVNode("td", null, toDisplayString(photoPrice.unit_name), 1),
                        createVNode("td", null, "Rp " + toDisplayString(photoPrice.price.toLocaleString()), 1),
                        createVNode("td", null, [
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            size: "small",
                            onClick: ($event) => openEditPriceModal(photoPrice.id)
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, { color: "warning" }, {
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
                            size: "small",
                            onClick: ($event) => confirmDeletePhotoPrice(photoPrice.id)
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
                        ])
                      ]);
                    }), 128))
                  ])
                ]),
                _: 2
              }, 1024),
              createVNode(VDialog, {
                modelValue: unref(showEditPhotoPricing),
                "onUpdate:modelValue": ($event) => isRef(showEditPhotoPricing) ? showEditPhotoPricing.value = $event : null,
                "max-width": "766"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Tambah Pricing")
                        ]),
                        _: 1
                      }),
                      createVNode(VContainer, { fluid: "" }, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "2" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Lokasi Unit")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "10" }, {
                                default: withCtx(() => {
                                  var _a;
                                  return [
                                    createVNode(VSelect, {
                                      modelValue: unref(formEditPhotoPricing).unit_id,
                                      "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).unit_id = $event,
                                      density: "comfortable",
                                      label: "Unit",
                                      items: unref(units),
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
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "2" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Tipe Foto")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "10" }, {
                                default: withCtx(() => [
                                  createVNode(VSelect, {
                                    modelValue: unref(formEditPhotoPricing).photo_type_id,
                                    "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).photo_type_id = $event,
                                    density: "comfortable",
                                    label: "Tipe Foto",
                                    items: unref(photoTypes),
                                    "item-value": "id",
                                    "item-title": "name",
                                    class: "mb-4"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "2" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Harga")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "10" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    label: "Amount",
                                    hint: "Rp 0 jika konten/foto gratis",
                                    prefix: "Rp",
                                    modelValue: unref(formEditPhotoPricing).price,
                                    "onUpdate:modelValue": ($event) => unref(formEditPhotoPricing).price = $event,
                                    "persistent-hint": ""
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
                      createVNode(VCardActions, null, {
                        default: withCtx(() => [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            text: "Batal",
                            onClick: ($event) => showEditPhotoPricing.value = false
                          }, null, 8, ["onClick"]),
                          createVNode(VBtn, {
                            color: "primary",
                            onClick: ($event) => handleUpdatePhotoPricing(unref(formEditPhotoPricing).id)
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Update")
                            ]),
                            _: 1
                          }, 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VCardActions, { class: "justify-center" }, {
                default: withCtx(() => [
                  createVNode(VPagination, {
                    modelValue: unref(pagePhotoPrices),
                    "onUpdate:modelValue": ($event) => isRef(pagePhotoPrices) ? pagePhotoPrices.value = $event : null,
                    length: Math.ceil(unref(totalPhotoPrices) / limit),
                    "total-visible": "5",
                    "prev-icon": "bx bx-chevron-left",
                    "next-icon": "bx bx-chevron-right"
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "length"])
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
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/units/photo-pricing.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
