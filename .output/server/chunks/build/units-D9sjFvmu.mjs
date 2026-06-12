import { defineComponent, ref, watch, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { g as getApiErrorMessage, a as authFetch } from './authFetch-5wQjlWwJ.mjs';
import { V as VCard, a as VCardText, b as VCardActions, c as VCardTitle } from './VCard-DLk5PTHl.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
import { V as VTable } from './VTable-BXA3D1kT.mjs';
import { a as VBtn, b as VIcon } from './server.mjs';
import { V as VPagination } from './VPagination-z_-yTplN.mjs';
import { V as VDialog } from './VDialog-yRDXDq_T.mjs';
import { V as VContainer } from './VContainer-CZliQBxk.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VListSubheader } from './VListSubheader-BbgyaiQc.mjs';
import { V as VSpacer } from './VSpacer-CQpJ4yRI.mjs';
import './index-ewhk7FTz.mjs';
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
import './dialog-transition-D66jL1n_.mjs';

const useUnits = () => {
  const getUnits = async ({
    page = 1,
    limit: limit2 = 25,
    search = null
  }) => {
    const response = await authFetch("units/", {});
    return response;
  };
  const createUnit = async (data) => {
    const response = await authFetch("units/", {});
    return response;
  };
  const deleteUnitById = async (id) => {
    const response = await authFetch(`units/${id}`, {});
    return response;
  };
  const getUnitById = async (id) => {
    const response = await authFetch(`units/${id}`, {});
    return response;
  };
  const updateUnitById = async (id, data) => {
    const response = await authFetch(`units/${id}`, {});
    return response;
  };
  return {
    getUnits,
    createUnit,
    deleteUnitById,
    getUnitById,
    updateUnitById
  };
};
const limit = 24;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "units",
  __ssrInlineRender: true,
  setup(__props) {
    const { getUnits, createUnit, updateUnitById, deleteUnitById } = useUnits();
    const page = ref(1);
    const total = ref(0);
    const isLoading = ref(false);
    const isSubmitting = ref(false);
    const units = ref([]);
    const search = ref("");
    const showCreate = ref(false);
    const showEdit = ref(false);
    const form = ref({
      id: "",
      name: "",
      location: "",
      kode_folder: ""
    });
    const createForm = ref({
      name: "",
      location: "",
      kode_folder: ""
    });
    async function fetchUnits() {
      isLoading.value = true;
      try {
        const res = await getUnits({
          page: page.value,
          limit,
          search: search.value
        });
        units.value = (res == null ? void 0 : res.data) || [];
        total.value = (res == null ? void 0 : res.total) || 0;
      } catch (error) {
        console.error("Failed to fetch units:", error);
        units.value = [];
        total.value = 0;
      } finally {
        isLoading.value = false;
      }
    }
    async function handleCreateUnit() {
      isSubmitting.value = true;
      try {
        await createUnit({
          name: createForm.value.name,
          location: createForm.value.location,
          kode_folder: createForm.value.kode_folder
        });
        showCreate.value = false;
        await fetchUnits();
      } catch (error) {
        alert(getApiErrorMessage(error));
      } finally {
        isSubmitting.value = false;
      }
    }
    function openEditModal(unit) {
      form.value = { ...unit };
      showEdit.value = true;
    }
    async function saveEdit() {
      isSubmitting.value = true;
      try {
        await updateUnitById(form.value.id, {
          name: form.value.name,
          location: form.value.location,
          kode_folder: form.value.kode_folder
        });
        showEdit.value = false;
        await fetchUnits();
      } catch (error) {
        alert(getApiErrorMessage(error));
      } finally {
        isSubmitting.value = false;
      }
    }
    async function confirmDelete(id) {
      if (confirm("Yakin ingin menghapus unit ini?")) {
        try {
          await deleteUnitById(id);
          await fetchUnits();
        } catch (error) {
          alert(getApiErrorMessage(error));
        }
      }
    }
    watch([page, search], fetchUnits);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VCard, {
        title: "Units Table",
        class: "mb-4"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              class: "text-none",
              color: "primary",
              text: "Tambah Unit",
              variant: "tonal",
              slim: "",
              onClick: ($event) => showCreate.value = true
            }, null, _parent2, _scopeId));
            _push2(ssrRenderComponent(VDialog, {
              modelValue: showCreate.value,
              "onUpdate:modelValue": ($event) => showCreate.value = $event,
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
                              _push5(`Tambah Unit`);
                            } else {
                              return [
                                createTextVNode("Tambah Unit")
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
                                                _push8(`Nama`);
                                              } else {
                                                return [
                                                  createTextVNode("Nama")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Nama")
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
                                            modelValue: createForm.value.name,
                                            "onUpdate:modelValue": ($event) => createForm.value.name = $event,
                                            "persistent-hint": ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: createForm.value.name,
                                              "onUpdate:modelValue": ($event) => createForm.value.name = $event,
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
                                              createTextVNode("Nama")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: createForm.value.name,
                                            "onUpdate:modelValue": ($event) => createForm.value.name = $event,
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
                                                _push8(`Alamat`);
                                              } else {
                                                return [
                                                  createTextVNode("Alamat")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Alamat")
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
                                            modelValue: createForm.value.location,
                                            "onUpdate:modelValue": ($event) => createForm.value.location = $event,
                                            "persistent-hint": ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: createForm.value.location,
                                              "onUpdate:modelValue": ($event) => createForm.value.location = $event,
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
                                              createTextVNode("Alamat")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: createForm.value.location,
                                            "onUpdate:modelValue": ($event) => createForm.value.location = $event,
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
                                                _push8(`Kode Folder`);
                                              } else {
                                                return [
                                                  createTextVNode("Kode Folder")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Kode Folder")
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
                                            modelValue: createForm.value.kode_folder,
                                            "onUpdate:modelValue": ($event) => createForm.value.kode_folder = $event,
                                            "persistent-hint": ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: createForm.value.kode_folder,
                                              "onUpdate:modelValue": ($event) => createForm.value.kode_folder = $event,
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
                                              createTextVNode("Kode Folder")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: createForm.value.kode_folder,
                                            "onUpdate:modelValue": ($event) => createForm.value.kode_folder = $event,
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
                                            createTextVNode("Nama")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: createForm.value.name,
                                          "onUpdate:modelValue": ($event) => createForm.value.name = $event,
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
                                            createTextVNode("Alamat")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: createForm.value.location,
                                          "onUpdate:modelValue": ($event) => createForm.value.location = $event,
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
                                            createTextVNode("Kode Folder")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: createForm.value.kode_folder,
                                          "onUpdate:modelValue": ($event) => createForm.value.kode_folder = $event,
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
                                onClick: ($event) => showCreate.value = false,
                                disabled: isSubmitting.value
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                onClick: handleCreateUnit,
                                loading: isSubmitting.value,
                                disabled: isSubmitting.value
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
                                  onClick: ($event) => showCreate.value = false,
                                  disabled: isSubmitting.value
                                }, null, 8, ["onClick", "disabled"]),
                                createVNode(VBtn, {
                                  color: "primary",
                                  onClick: handleCreateUnit,
                                  loading: isSubmitting.value,
                                  disabled: isSubmitting.value
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Simpan")
                                  ]),
                                  _: 1
                                }, 8, ["loading", "disabled"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Tambah Unit")
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
                                          createTextVNode("Nama")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: createForm.value.name,
                                        "onUpdate:modelValue": ($event) => createForm.value.name = $event,
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
                                          createTextVNode("Alamat")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: createForm.value.location,
                                        "onUpdate:modelValue": ($event) => createForm.value.location = $event,
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
                                          createTextVNode("Kode Folder")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: createForm.value.kode_folder,
                                        "onUpdate:modelValue": ($event) => createForm.value.kode_folder = $event,
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
                                onClick: ($event) => showCreate.value = false,
                                disabled: isSubmitting.value
                              }, null, 8, ["onClick", "disabled"]),
                              createVNode(VBtn, {
                                color: "primary",
                                onClick: handleCreateUnit,
                                loading: isSubmitting.value,
                                disabled: isSubmitting.value
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Simpan")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode(VCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Tambah Unit")
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
                                        createTextVNode("Nama")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: createForm.value.name,
                                      "onUpdate:modelValue": ($event) => createForm.value.name = $event,
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
                                        createTextVNode("Alamat")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: createForm.value.location,
                                      "onUpdate:modelValue": ($event) => createForm.value.location = $event,
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
                                        createTextVNode("Kode Folder")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: createForm.value.kode_folder,
                                      "onUpdate:modelValue": ($event) => createForm.value.kode_folder = $event,
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
                              onClick: ($event) => showCreate.value = false,
                              disabled: isSubmitting.value
                            }, null, 8, ["onClick", "disabled"]),
                            createVNode(VBtn, {
                              color: "primary",
                              onClick: handleCreateUnit,
                              loading: isSubmitting.value,
                              disabled: isSubmitting.value
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Simpan")
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, {
                class: "text-none",
                color: "primary",
                text: "Tambah Unit",
                variant: "tonal",
                slim: "",
                onClick: ($event) => showCreate.value = true
              }, null, 8, ["onClick"]),
              createVNode(VDialog, {
                modelValue: showCreate.value,
                "onUpdate:modelValue": ($event) => showCreate.value = $event,
                "max-width": "766"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Tambah Unit")
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
                                      createTextVNode("Nama")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: createForm.value.name,
                                    "onUpdate:modelValue": ($event) => createForm.value.name = $event,
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
                                      createTextVNode("Alamat")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: createForm.value.location,
                                    "onUpdate:modelValue": ($event) => createForm.value.location = $event,
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
                                      createTextVNode("Kode Folder")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: createForm.value.kode_folder,
                                    "onUpdate:modelValue": ($event) => createForm.value.kode_folder = $event,
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
                            onClick: ($event) => showCreate.value = false,
                            disabled: isSubmitting.value
                          }, null, 8, ["onClick", "disabled"]),
                          createVNode(VBtn, {
                            color: "primary",
                            onClick: handleCreateUnit,
                            loading: isSubmitting.value,
                            disabled: isSubmitting.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Simpan")
                            ]),
                            _: 1
                          }, 8, ["loading", "disabled"])
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
                    modelValue: search.value,
                    "onUpdate:modelValue": ($event) => search.value = $event,
                    label: "Search...",
                    "prepend-inner-icon": "bx bx-search",
                    clearable: "",
                    class: "mb-4"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTextField, {
                      modelValue: search.value,
                      "onUpdate:modelValue": ($event) => search.value = $event,
                      label: "Search...",
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
                  _push3(`<thead${_scopeId2}><tr${_scopeId2}><th${_scopeId2}>#</th><th${_scopeId2}>Name</th><th${_scopeId2}>Alamat</th><th${_scopeId2}>API Key</th><th${_scopeId2}>Kode Folder</th><th${_scopeId2}>Dibuat</th><th${_scopeId2}></th></tr></thead><tbody${_scopeId2}>`);
                  if (!isLoading.value && units.value.length === 0) {
                    _push3(`<tr${_scopeId2}><td colspan="7" class="text-center"${_scopeId2}>Tidak ada data</td></tr>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList(units.value, (unit, index) => {
                    _push3(`<tr${_scopeId2}><td${_scopeId2}>${ssrInterpolate(index + 1 + (page.value - 1) * limit)}</td><td${_scopeId2}>${ssrInterpolate(unit.name)}</td><td${_scopeId2}>${ssrInterpolate(unit.location)}</td><td${_scopeId2}><code${_scopeId2}>${ssrInterpolate(unit.api_key)}</code></td><td${_scopeId2}><span class="font-weight-bold text-error"${_scopeId2}>${ssrInterpolate(unit.kode_folder)}</span></td><td${_scopeId2}>${ssrInterpolate(new Date(unit.created_at).toISOString().slice(0, 10))}</td><td${_scopeId2}>`);
                    _push3(ssrRenderComponent(VBtn, {
                      icon: "",
                      variant: "text",
                      size: "small",
                      onClick: ($event) => openEditModal(unit)
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
                      onClick: ($event) => confirmDelete(unit.id)
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
                        createVNode("th", null, "Name"),
                        createVNode("th", null, "Alamat"),
                        createVNode("th", null, "API Key"),
                        createVNode("th", null, "Kode Folder"),
                        createVNode("th", null, "Dibuat"),
                        createVNode("th")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      !isLoading.value && units.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "7",
                          class: "text-center"
                        }, "Tidak ada data")
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(units.value, (unit, index) => {
                        return openBlock(), createBlock("tr", {
                          key: unit.id
                        }, [
                          createVNode("td", null, toDisplayString(index + 1 + (page.value - 1) * limit), 1),
                          createVNode("td", null, toDisplayString(unit.name), 1),
                          createVNode("td", null, toDisplayString(unit.location), 1),
                          createVNode("td", null, [
                            createVNode("code", null, toDisplayString(unit.api_key), 1)
                          ]),
                          createVNode("td", null, [
                            createVNode("span", { class: "font-weight-bold text-error" }, toDisplayString(unit.kode_folder), 1)
                          ]),
                          createVNode("td", null, toDisplayString(new Date(unit.created_at).toISOString().slice(0, 10)), 1),
                          createVNode("td", null, [
                            createVNode(VBtn, {
                              icon: "",
                              variant: "text",
                              size: "small",
                              onClick: ($event) => openEditModal(unit)
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
                              onClick: ($event) => confirmDelete(unit.id)
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
            _push2(ssrRenderComponent(VCardActions, { class: "justify-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VPagination, {
                    modelValue: page.value,
                    "onUpdate:modelValue": ($event) => page.value = $event,
                    length: Math.ceil(total.value / limit),
                    "total-visible": "5",
                    "prev-icon": "bx bx-chevron-left",
                    "next-icon": "bx bx-chevron-right"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VPagination, {
                      modelValue: page.value,
                      "onUpdate:modelValue": ($event) => page.value = $event,
                      length: Math.ceil(total.value / limit),
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
                    modelValue: search.value,
                    "onUpdate:modelValue": ($event) => search.value = $event,
                    label: "Search...",
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
                      createVNode("th", null, "Name"),
                      createVNode("th", null, "Alamat"),
                      createVNode("th", null, "API Key"),
                      createVNode("th", null, "Kode Folder"),
                      createVNode("th", null, "Dibuat"),
                      createVNode("th")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    !isLoading.value && units.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                      createVNode("td", {
                        colspan: "7",
                        class: "text-center"
                      }, "Tidak ada data")
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(units.value, (unit, index) => {
                      return openBlock(), createBlock("tr", {
                        key: unit.id
                      }, [
                        createVNode("td", null, toDisplayString(index + 1 + (page.value - 1) * limit), 1),
                        createVNode("td", null, toDisplayString(unit.name), 1),
                        createVNode("td", null, toDisplayString(unit.location), 1),
                        createVNode("td", null, [
                          createVNode("code", null, toDisplayString(unit.api_key), 1)
                        ]),
                        createVNode("td", null, [
                          createVNode("span", { class: "font-weight-bold text-error" }, toDisplayString(unit.kode_folder), 1)
                        ]),
                        createVNode("td", null, toDisplayString(new Date(unit.created_at).toISOString().slice(0, 10)), 1),
                        createVNode("td", null, [
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            size: "small",
                            onClick: ($event) => openEditModal(unit)
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
                            onClick: ($event) => confirmDelete(unit.id)
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
              createVNode(VCardActions, { class: "justify-center" }, {
                default: withCtx(() => [
                  createVNode(VPagination, {
                    modelValue: page.value,
                    "onUpdate:modelValue": ($event) => page.value = $event,
                    length: Math.ceil(total.value / limit),
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
      _push(ssrRenderComponent(VDialog, {
        modelValue: showEdit.value,
        "onUpdate:modelValue": ($event) => showEdit.value = $event,
        "max-width": "766"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Edit Unit`);
                      } else {
                        return [
                          createTextVNode("Edit Unit")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VContainer, { fluid: "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VListSubheader, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Nama`);
                                        } else {
                                          return [
                                            createTextVNode("Nama")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VListSubheader, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Nama")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "9" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      modelValue: form.value.name,
                                      "onUpdate:modelValue": ($event) => form.value.name = $event,
                                      "persistent-hint": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: form.value.name,
                                        "onUpdate:modelValue": ($event) => form.value.name = $event,
                                        "persistent-hint": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Nama")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: form.value.name,
                                      "onUpdate:modelValue": ($event) => form.value.name = $event,
                                      "persistent-hint": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VListSubheader, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Alamat`);
                                        } else {
                                          return [
                                            createTextVNode("Alamat")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VListSubheader, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Alamat")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "9" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      modelValue: form.value.location,
                                      "onUpdate:modelValue": ($event) => form.value.location = $event,
                                      "persistent-hint": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: form.value.location,
                                        "onUpdate:modelValue": ($event) => form.value.location = $event,
                                        "persistent-hint": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Alamat")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: form.value.location,
                                      "onUpdate:modelValue": ($event) => form.value.location = $event,
                                      "persistent-hint": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VRow, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VCol, { cols: "3" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VListSubheader, null, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(`Kode Folder`);
                                        } else {
                                          return [
                                            createTextVNode("Kode Folder")
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VListSubheader, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Kode Folder")
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VCol, { cols: "9" }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VTextField, {
                                      modelValue: form.value.kode_folder,
                                      "onUpdate:modelValue": ($event) => form.value.kode_folder = $event,
                                      "persistent-hint": ""
                                    }, null, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VTextField, {
                                        modelValue: form.value.kode_folder,
                                        "onUpdate:modelValue": ($event) => form.value.kode_folder = $event,
                                        "persistent-hint": ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Kode Folder")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: form.value.kode_folder,
                                      "onUpdate:modelValue": ($event) => form.value.kode_folder = $event,
                                      "persistent-hint": ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                              createVNode(VCol, { cols: "3" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Nama")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: form.value.name,
                                    "onUpdate:modelValue": ($event) => form.value.name = $event,
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
                                      createTextVNode("Alamat")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: form.value.location,
                                    "onUpdate:modelValue": ($event) => form.value.location = $event,
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
                                      createTextVNode("Kode Folder")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: form.value.kode_folder,
                                    "onUpdate:modelValue": ($event) => form.value.kode_folder = $event,
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          text: "Batal",
                          onClick: ($event) => showEdit.value = false,
                          disabled: isSubmitting.value
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "primary",
                          onClick: saveEdit,
                          loading: isSubmitting.value,
                          disabled: isSubmitting.value
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
                            text: "Batal",
                            onClick: ($event) => showEdit.value = false,
                            disabled: isSubmitting.value
                          }, null, 8, ["onClick", "disabled"]),
                          createVNode(VBtn, {
                            color: "primary",
                            onClick: saveEdit,
                            loading: isSubmitting.value,
                            disabled: isSubmitting.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Update")
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
                    createVNode(VCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Edit Unit")
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
                                    createTextVNode("Nama")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "9" }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: form.value.name,
                                  "onUpdate:modelValue": ($event) => form.value.name = $event,
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
                                    createTextVNode("Alamat")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "9" }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: form.value.location,
                                  "onUpdate:modelValue": ($event) => form.value.location = $event,
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
                                    createTextVNode("Kode Folder")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VCol, { cols: "9" }, {
                              default: withCtx(() => [
                                createVNode(VTextField, {
                                  modelValue: form.value.kode_folder,
                                  "onUpdate:modelValue": ($event) => form.value.kode_folder = $event,
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
                          onClick: ($event) => showEdit.value = false,
                          disabled: isSubmitting.value
                        }, null, 8, ["onClick", "disabled"]),
                        createVNode(VBtn, {
                          color: "primary",
                          onClick: saveEdit,
                          loading: isSubmitting.value,
                          disabled: isSubmitting.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Update")
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
                  createVNode(VCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Edit Unit")
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
                                  createTextVNode("Nama")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "9" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                modelValue: form.value.name,
                                "onUpdate:modelValue": ($event) => form.value.name = $event,
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
                                  createTextVNode("Alamat")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "9" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                modelValue: form.value.location,
                                "onUpdate:modelValue": ($event) => form.value.location = $event,
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
                                  createTextVNode("Kode Folder")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, { cols: "9" }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                modelValue: form.value.kode_folder,
                                "onUpdate:modelValue": ($event) => form.value.kode_folder = $event,
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
                        onClick: ($event) => showEdit.value = false,
                        disabled: isSubmitting.value
                      }, null, 8, ["onClick", "disabled"]),
                      createVNode(VBtn, {
                        color: "primary",
                        onClick: saveEdit,
                        loading: isSubmitting.value,
                        disabled: isSubmitting.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Update")
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/units.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
