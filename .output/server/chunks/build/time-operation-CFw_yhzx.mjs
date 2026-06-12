import { defineComponent, ref, computed, watch, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { aA as VListItem, a as VBtn, b as VIcon, c as VDivider, b3 as useRuntimeConfig, b4 as navigateTo } from './server.mjs';
import { V as VCard, c as VCardTitle, b as VCardActions, a as VCardText } from './VCard-DLk5PTHl.mjs';
import { V as VDialog } from './VDialog-yRDXDq_T.mjs';
import { V as VContainer } from './VContainer-CZliQBxk.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VListSubheader } from './VListSubheader-BbgyaiQc.mjs';
import { V as VSelect } from './VSelect-Bxz-WhQz.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
import { V as VTextarea } from './VTextarea-DrP3zBGC.mjs';
import { V as VSpacer } from './VSpacer-CQpJ4yRI.mjs';
import { V as VSwitch } from './VSwitch-BPbv21Ir.mjs';
import { V as VChip } from './VChip-C44NlS62.mjs';
import { V as VTable } from './VTable-BXA3D1kT.mjs';
import { V as VPagination } from './VPagination-z_-yTplN.mjs';
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
import './dialog-transition-D66jL1n_.mjs';
import './VMenu-CmFsZZaF.mjs';
import './index-ewhk7FTz.mjs';
import './ssrBoot-BtvJZs44.mjs';
import './VCheckboxBtn-DaRBpQ2e.mjs';
import './VSlideGroup-J1shNAVo.mjs';

const useTimeOperation = () => {
  const config = useRuntimeConfig();
  const baseURL = config.public.apiBase;
  const apiCall = async (url, options = {}) => {
    {
      await navigateTo("/login");
      throw new Error("No access token");
    }
  };
  const getTimeOperations = async ({}) => {
    try {
      const data = await apiCall(`${baseURL}/time_operation/`);
      return data;
    } catch (error) {
      console.error("Failed to fetch time operations:", error);
      throw error;
    }
  };
  const getTimeOperationById = async (id) => {
    try {
      const data = await apiCall(`${baseURL}/time_operation/${id}`);
      return data;
    } catch (error) {
      console.error("Failed to fetch time operation:", error);
      throw error;
    }
  };
  const getTimeOperationByUnit = async (unitId) => {
    try {
      const data = await apiCall(`${baseURL}/time_operation/unit/${unitId}`);
      return data;
    } catch (error) {
      console.error("Failed to fetch time operation for unit:", error);
      throw error;
    }
  };
  const createTimeOperation = async (timeOperation) => {
    try {
      const data = await apiCall(`${baseURL}/time_operation`, {
        method: "POST",
        body: timeOperation
      });
      return data;
    } catch (error) {
      console.error("Failed to create time operation:", error);
      throw error;
    }
  };
  const updateTimeOperation = async (id, timeOperation) => {
    try {
      const data = await apiCall(`${baseURL}/time_operation/${id}`, {
        method: "PUT",
        body: timeOperation
      });
      return data;
    } catch (error) {
      console.error("Failed to update time operation:", error);
      throw error;
    }
  };
  const setUnitHours = async (unitId, timeOperation) => {
    try {
      const data = await apiCall(`${baseURL}/time_operation/unit/${unitId}/set-hours`, {
        method: "POST",
        body: timeOperation
      });
      return data;
    } catch (error) {
      console.error("Failed to set unit hours:", error);
      throw error;
    }
  };
  const deleteTimeOperation = async (id) => {
    try {
      await apiCall(`${baseURL}/time_operation/${id}`, {
        method: "DELETE"
      });
    } catch (error) {
      console.error("Failed to delete time operation:", error);
      throw error;
    }
  };
  const getUnitStatus = async (unitId) => {
    try {
      const data = await apiCall(`${baseURL}/time_operation/unit/${unitId}/current-status`);
      return data;
    } catch (error) {
      console.error("Failed to get unit status:", error);
      throw error;
    }
  };
  return {
    getTimeOperations,
    getTimeOperationById,
    getTimeOperationByUnit,
    createTimeOperation,
    updateTimeOperation,
    setUnitHours,
    deleteTimeOperation,
    getUnitStatus
  };
};
const limit = 24;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "time-operation",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      getTimeOperations,
      setUnitHours,
      updateTimeOperation,
      deleteTimeOperation
    } = useTimeOperation();
    const page = ref(1);
    const total = ref(0);
    const isLoading = ref(false);
    const timeOperations = ref([]);
    const units = ref([]);
    const search = ref("");
    const showCreate = ref(false);
    const showEdit = ref(false);
    const showStatus = ref(false);
    const selectedUnit = ref(null);
    const unitStatus = ref(null);
    const createForm = ref({
      unit_id: "",
      opening_time: "08:00",
      closing_time: "22:00",
      notes: "",
      is_active: true
    });
    const editForm = ref({
      id: "",
      unit_id: "",
      opening_time: "",
      closing_time: "",
      notes: "",
      is_active: true,
      created_at: ""
    });
    const filteredTimeOperations = computed(() => {
      if (!search.value) return timeOperations.value;
      return timeOperations.value.filter(
        (to) => {
          var _a, _b;
          return ((_a = to.unit_name) == null ? void 0 : _a.toLowerCase().includes(search.value.toLowerCase())) || ((_b = to.unit_code) == null ? void 0 : _b.toLowerCase().includes(search.value.toLowerCase()));
        }
      );
    });
    const availableUnits = computed(() => {
      const usedUnitIds = timeOperations.value.map((to) => to.unit_id);
      return units.value.filter((unit) => !usedUnitIds.includes(unit.id));
    });
    async function fetchTimeOperations() {
      isLoading.value = true;
      try {
        const data = await getTimeOperations({});
        timeOperations.value = data || [];
        total.value = (data == null ? void 0 : data.length) || 0;
      } catch (error) {
        console.error("Failed to fetch time operations:", error);
        timeOperations.value = [];
        total.value = 0;
      } finally {
        isLoading.value = false;
      }
    }
    async function handleCreateTimeOperation() {
      try {
        await setUnitHours(createForm.value.unit_id, createForm.value);
        showCreate.value = false;
        resetCreateForm();
        await fetchTimeOperations();
      } catch (error) {
        console.error("Failed to create time operation:", error);
      }
    }
    function openEditModal(timeOperation) {
      editForm.value = { ...timeOperation };
      showEdit.value = true;
    }
    async function handleUpdateTimeOperation() {
      try {
        await updateTimeOperation(editForm.value.id, {
          opening_time: editForm.value.opening_time,
          closing_time: editForm.value.closing_time,
          notes: editForm.value.notes,
          is_active: editForm.value.is_active
        });
        showEdit.value = false;
        await fetchTimeOperations();
      } catch (error) {
        console.error("Failed to update time operation:", error);
      }
    }
    async function confirmDelete(id, unitName) {
      if (confirm(`Yakin ingin menonaktifkan jam operasional untuk ${unitName}?`)) {
        try {
          await deleteTimeOperation(id);
          await fetchTimeOperations();
        } catch (error) {
          console.error("Failed to delete time operation:", error);
        }
      }
    }
    function resetCreateForm() {
      createForm.value = {
        unit_id: "",
        opening_time: "08:00",
        closing_time: "22:00",
        notes: "",
        is_active: true
      };
    }
    function getStatusColor(status) {
      switch (status.toLowerCase()) {
        case "open":
          return "success";
        case "closed":
          return "error";
        case "break time":
          return "warning";
        case "not yet open":
          return "info";
        default:
          return "default";
      }
    }
    watch([page, search], fetchTimeOperations);
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({
        title: "Jam Operasional Unit",
        class: "mb-4"
      }, _attrs), {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              class: "text-none",
              color: "primary",
              text: "Tambah Jam Operasional",
              variant: "tonal",
              slim: "",
              onClick: ($event) => showCreate.value = true,
              disabled: availableUnits.value.length === 0
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, {
                class: "text-none",
                color: "primary",
                text: "Tambah Jam Operasional",
                variant: "tonal",
                slim: "",
                onClick: ($event) => showCreate.value = true,
                disabled: availableUnits.value.length === 0
              }, null, 8, ["onClick", "disabled"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VDialog, {
              modelValue: showCreate.value,
              "onUpdate:modelValue": ($event) => showCreate.value = $event,
              "max-width": "600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Tambah Jam Operasional`);
                            } else {
                              return [
                                createTextVNode("Tambah Jam Operasional")
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
                                                _push8(`Unit`);
                                              } else {
                                                return [
                                                  createTextVNode("Unit")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Unit")
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
                                          _push7(ssrRenderComponent(VSelect, {
                                            modelValue: createForm.value.unit_id,
                                            "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                            items: availableUnits.value,
                                            "item-title": "name",
                                            "item-value": "id",
                                            label: "Pilih Unit",
                                            required: ""
                                          }, {
                                            item: withCtx(({ props, item }, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(ssrRenderComponent(VListItem, props, {
                                                  title: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`${ssrInterpolate(item.raw.name)}`);
                                                    } else {
                                                      return [
                                                        createTextVNode(toDisplayString(item.raw.name), 1)
                                                      ];
                                                    }
                                                  }),
                                                  subtitle: withCtx((_7, _push9, _parent9, _scopeId8) => {
                                                    if (_push9) {
                                                      _push9(`${ssrInterpolate(item.raw.location)}`);
                                                    } else {
                                                      return [
                                                        createTextVNode(toDisplayString(item.raw.location), 1)
                                                      ];
                                                    }
                                                  }),
                                                  _: 2
                                                }, _parent8, _scopeId7));
                                              } else {
                                                return [
                                                  createVNode(VListItem, props, {
                                                    title: withCtx(() => [
                                                      createTextVNode(toDisplayString(item.raw.name), 1)
                                                    ]),
                                                    subtitle: withCtx(() => [
                                                      createTextVNode(toDisplayString(item.raw.location), 1)
                                                    ]),
                                                    _: 2
                                                  }, 1040)
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSelect, {
                                              modelValue: createForm.value.unit_id,
                                              "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                              items: availableUnits.value,
                                              "item-title": "name",
                                              "item-value": "id",
                                              label: "Pilih Unit",
                                              required: ""
                                            }, {
                                              item: withCtx(({ props, item }) => [
                                                createVNode(VListItem, props, {
                                                  title: withCtx(() => [
                                                    createTextVNode(toDisplayString(item.raw.name), 1)
                                                  ]),
                                                  subtitle: withCtx(() => [
                                                    createTextVNode(toDisplayString(item.raw.location), 1)
                                                  ]),
                                                  _: 2
                                                }, 1040)
                                              ]),
                                              _: 1
                                            }, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                              createTextVNode("Unit")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            modelValue: createForm.value.unit_id,
                                            "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                            items: availableUnits.value,
                                            "item-title": "name",
                                            "item-value": "id",
                                            label: "Pilih Unit",
                                            required: ""
                                          }, {
                                            item: withCtx(({ props, item }) => [
                                              createVNode(VListItem, props, {
                                                title: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.raw.name), 1)
                                                ]),
                                                subtitle: withCtx(() => [
                                                  createTextVNode(toDisplayString(item.raw.location), 1)
                                                ]),
                                                _: 2
                                              }, 1040)
                                            ]),
                                            _: 1
                                          }, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                                _push8(`Jam Buka`);
                                              } else {
                                                return [
                                                  createTextVNode("Jam Buka")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Jam Buka")
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
                                            modelValue: createForm.value.opening_time,
                                            "onUpdate:modelValue": ($event) => createForm.value.opening_time = $event,
                                            type: "time",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: createForm.value.opening_time,
                                              "onUpdate:modelValue": ($event) => createForm.value.opening_time = $event,
                                              type: "time",
                                              required: ""
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
                                              createTextVNode("Jam Buka")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: createForm.value.opening_time,
                                            "onUpdate:modelValue": ($event) => createForm.value.opening_time = $event,
                                            type: "time",
                                            required: ""
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
                                                _push8(`Jam Tutup`);
                                              } else {
                                                return [
                                                  createTextVNode("Jam Tutup")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Jam Tutup")
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
                                            modelValue: createForm.value.closing_time,
                                            "onUpdate:modelValue": ($event) => createForm.value.closing_time = $event,
                                            type: "time",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: createForm.value.closing_time,
                                              "onUpdate:modelValue": ($event) => createForm.value.closing_time = $event,
                                              type: "time",
                                              required: ""
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
                                              createTextVNode("Jam Tutup")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: createForm.value.closing_time,
                                            "onUpdate:modelValue": ($event) => createForm.value.closing_time = $event,
                                            type: "time",
                                            required: ""
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
                                                _push8(`Catatan`);
                                              } else {
                                                return [
                                                  createTextVNode("Catatan")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Catatan")
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
                                          _push7(ssrRenderComponent(VTextarea, {
                                            modelValue: createForm.value.notes,
                                            "onUpdate:modelValue": ($event) => createForm.value.notes = $event,
                                            placeholder: "Catatan tambahan (opsional)",
                                            rows: "2"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextarea, {
                                              modelValue: createForm.value.notes,
                                              "onUpdate:modelValue": ($event) => createForm.value.notes = $event,
                                              placeholder: "Catatan tambahan (opsional)",
                                              rows: "2"
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
                                              createTextVNode("Catatan")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextarea, {
                                            modelValue: createForm.value.notes,
                                            "onUpdate:modelValue": ($event) => createForm.value.notes = $event,
                                            placeholder: "Catatan tambahan (opsional)",
                                            rows: "2"
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
                                            createTextVNode("Unit")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          modelValue: createForm.value.unit_id,
                                          "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                          items: availableUnits.value,
                                          "item-title": "name",
                                          "item-value": "id",
                                          label: "Pilih Unit",
                                          required: ""
                                        }, {
                                          item: withCtx(({ props, item }) => [
                                            createVNode(VListItem, props, {
                                              title: withCtx(() => [
                                                createTextVNode(toDisplayString(item.raw.name), 1)
                                              ]),
                                              subtitle: withCtx(() => [
                                                createTextVNode(toDisplayString(item.raw.location), 1)
                                              ]),
                                              _: 2
                                            }, 1040)
                                          ]),
                                          _: 1
                                        }, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                            createTextVNode("Jam Buka")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: createForm.value.opening_time,
                                          "onUpdate:modelValue": ($event) => createForm.value.opening_time = $event,
                                          type: "time",
                                          required: ""
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
                                            createTextVNode("Jam Tutup")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: createForm.value.closing_time,
                                          "onUpdate:modelValue": ($event) => createForm.value.closing_time = $event,
                                          type: "time",
                                          required: ""
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
                                            createTextVNode("Catatan")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextarea, {
                                          modelValue: createForm.value.notes,
                                          "onUpdate:modelValue": ($event) => createForm.value.notes = $event,
                                          placeholder: "Catatan tambahan (opsional)",
                                          rows: "2"
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
                                onClick: ($event) => showCreate.value = false
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                onClick: handleCreateTimeOperation,
                                disabled: !createForm.value.unit_id || !createForm.value.opening_time || !createForm.value.closing_time
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Simpan `);
                                  } else {
                                    return [
                                      createTextVNode(" Simpan ")
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
                                  onClick: ($event) => showCreate.value = false
                                }, null, 8, ["onClick"]),
                                createVNode(VBtn, {
                                  color: "primary",
                                  onClick: handleCreateTimeOperation,
                                  disabled: !createForm.value.unit_id || !createForm.value.opening_time || !createForm.value.closing_time
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Simpan ")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCardTitle, null, {
                            default: withCtx(() => [
                              createTextVNode("Tambah Jam Operasional")
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
                                          createTextVNode("Unit")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        modelValue: createForm.value.unit_id,
                                        "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                        items: availableUnits.value,
                                        "item-title": "name",
                                        "item-value": "id",
                                        label: "Pilih Unit",
                                        required: ""
                                      }, {
                                        item: withCtx(({ props, item }) => [
                                          createVNode(VListItem, props, {
                                            title: withCtx(() => [
                                              createTextVNode(toDisplayString(item.raw.name), 1)
                                            ]),
                                            subtitle: withCtx(() => [
                                              createTextVNode(toDisplayString(item.raw.location), 1)
                                            ]),
                                            _: 2
                                          }, 1040)
                                        ]),
                                        _: 1
                                      }, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                          createTextVNode("Jam Buka")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: createForm.value.opening_time,
                                        "onUpdate:modelValue": ($event) => createForm.value.opening_time = $event,
                                        type: "time",
                                        required: ""
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
                                          createTextVNode("Jam Tutup")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: createForm.value.closing_time,
                                        "onUpdate:modelValue": ($event) => createForm.value.closing_time = $event,
                                        type: "time",
                                        required: ""
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
                                          createTextVNode("Catatan")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextarea, {
                                        modelValue: createForm.value.notes,
                                        "onUpdate:modelValue": ($event) => createForm.value.notes = $event,
                                        placeholder: "Catatan tambahan (opsional)",
                                        rows: "2"
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
                                onClick: ($event) => showCreate.value = false
                              }, null, 8, ["onClick"]),
                              createVNode(VBtn, {
                                color: "primary",
                                onClick: handleCreateTimeOperation,
                                disabled: !createForm.value.unit_id || !createForm.value.opening_time || !createForm.value.closing_time
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Simpan ")
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode(VCardTitle, null, {
                          default: withCtx(() => [
                            createTextVNode("Tambah Jam Operasional")
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
                                        createTextVNode("Unit")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      modelValue: createForm.value.unit_id,
                                      "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                      items: availableUnits.value,
                                      "item-title": "name",
                                      "item-value": "id",
                                      label: "Pilih Unit",
                                      required: ""
                                    }, {
                                      item: withCtx(({ props, item }) => [
                                        createVNode(VListItem, props, {
                                          title: withCtx(() => [
                                            createTextVNode(toDisplayString(item.raw.name), 1)
                                          ]),
                                          subtitle: withCtx(() => [
                                            createTextVNode(toDisplayString(item.raw.location), 1)
                                          ]),
                                          _: 2
                                        }, 1040)
                                      ]),
                                      _: 1
                                    }, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                        createTextVNode("Jam Buka")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: createForm.value.opening_time,
                                      "onUpdate:modelValue": ($event) => createForm.value.opening_time = $event,
                                      type: "time",
                                      required: ""
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
                                        createTextVNode("Jam Tutup")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: createForm.value.closing_time,
                                      "onUpdate:modelValue": ($event) => createForm.value.closing_time = $event,
                                      type: "time",
                                      required: ""
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
                                        createTextVNode("Catatan")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextarea, {
                                      modelValue: createForm.value.notes,
                                      "onUpdate:modelValue": ($event) => createForm.value.notes = $event,
                                      placeholder: "Catatan tambahan (opsional)",
                                      rows: "2"
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
                              onClick: ($event) => showCreate.value = false
                            }, null, 8, ["onClick"]),
                            createVNode(VBtn, {
                              color: "primary",
                              onClick: handleCreateTimeOperation,
                              disabled: !createForm.value.unit_id || !createForm.value.opening_time || !createForm.value.closing_time
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Simpan ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
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
            _push2(ssrRenderComponent(VDialog, {
              modelValue: showEdit.value,
              "onUpdate:modelValue": ($event) => showEdit.value = $event,
              "max-width": "600"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCard, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCardTitle, null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Edit Jam Operasional`);
                            } else {
                              return [
                                createTextVNode("Edit Jam Operasional")
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
                                                _push8(`Unit`);
                                              } else {
                                                return [
                                                  createTextVNode("Unit")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Unit")
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
                                            value: editForm.value.unit_name,
                                            readonly: "",
                                            variant: "outlined"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              value: editForm.value.unit_name,
                                              readonly: "",
                                              variant: "outlined"
                                            }, null, 8, ["value"])
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
                                              createTextVNode("Unit")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            value: editForm.value.unit_name,
                                            readonly: "",
                                            variant: "outlined"
                                          }, null, 8, ["value"])
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
                                                _push8(`Jam Buka`);
                                              } else {
                                                return [
                                                  createTextVNode("Jam Buka")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Jam Buka")
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
                                            modelValue: editForm.value.opening_time,
                                            "onUpdate:modelValue": ($event) => editForm.value.opening_time = $event,
                                            type: "time",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: editForm.value.opening_time,
                                              "onUpdate:modelValue": ($event) => editForm.value.opening_time = $event,
                                              type: "time",
                                              required: ""
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
                                              createTextVNode("Jam Buka")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: editForm.value.opening_time,
                                            "onUpdate:modelValue": ($event) => editForm.value.opening_time = $event,
                                            type: "time",
                                            required: ""
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
                                                _push8(`Jam Tutup`);
                                              } else {
                                                return [
                                                  createTextVNode("Jam Tutup")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Jam Tutup")
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
                                            modelValue: editForm.value.closing_time,
                                            "onUpdate:modelValue": ($event) => editForm.value.closing_time = $event,
                                            type: "time",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: editForm.value.closing_time,
                                              "onUpdate:modelValue": ($event) => editForm.value.closing_time = $event,
                                              type: "time",
                                              required: ""
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
                                              createTextVNode("Jam Tutup")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: editForm.value.closing_time,
                                            "onUpdate:modelValue": ($event) => editForm.value.closing_time = $event,
                                            type: "time",
                                            required: ""
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
                                                _push8(`Catatan`);
                                              } else {
                                                return [
                                                  createTextVNode("Catatan")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Catatan")
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
                                          _push7(ssrRenderComponent(VTextarea, {
                                            modelValue: editForm.value.notes,
                                            "onUpdate:modelValue": ($event) => editForm.value.notes = $event,
                                            placeholder: "Catatan tambahan (opsional)",
                                            rows: "2"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextarea, {
                                              modelValue: editForm.value.notes,
                                              "onUpdate:modelValue": ($event) => editForm.value.notes = $event,
                                              placeholder: "Catatan tambahan (opsional)",
                                              rows: "2"
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
                                              createTextVNode("Catatan")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextarea, {
                                            modelValue: editForm.value.notes,
                                            "onUpdate:modelValue": ($event) => editForm.value.notes = $event,
                                            placeholder: "Catatan tambahan (opsional)",
                                            rows: "2"
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
                                                _push8(`Status`);
                                              } else {
                                                return [
                                                  createTextVNode("Status")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Status")
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
                                          _push7(ssrRenderComponent(VSwitch, {
                                            modelValue: editForm.value.is_active,
                                            "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                                            label: "Aktif",
                                            color: "primary"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSwitch, {
                                              modelValue: editForm.value.is_active,
                                              "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                                              label: "Aktif",
                                              color: "primary"
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
                                              createTextVNode("Status")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VSwitch, {
                                            modelValue: editForm.value.is_active,
                                            "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                                            label: "Aktif",
                                            color: "primary"
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
                                            createTextVNode("Unit")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          value: editForm.value.unit_name,
                                          readonly: "",
                                          variant: "outlined"
                                        }, null, 8, ["value"])
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
                                            createTextVNode("Jam Buka")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: editForm.value.opening_time,
                                          "onUpdate:modelValue": ($event) => editForm.value.opening_time = $event,
                                          type: "time",
                                          required: ""
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
                                            createTextVNode("Jam Tutup")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: editForm.value.closing_time,
                                          "onUpdate:modelValue": ($event) => editForm.value.closing_time = $event,
                                          type: "time",
                                          required: ""
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
                                            createTextVNode("Catatan")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextarea, {
                                          modelValue: editForm.value.notes,
                                          "onUpdate:modelValue": ($event) => editForm.value.notes = $event,
                                          placeholder: "Catatan tambahan (opsional)",
                                          rows: "2"
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
                                            createTextVNode("Status")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VSwitch, {
                                          modelValue: editForm.value.is_active,
                                          "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                                          label: "Aktif",
                                          color: "primary"
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
                                onClick: ($event) => showEdit.value = false
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                color: "primary",
                                onClick: handleUpdateTimeOperation
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Update `);
                                  } else {
                                    return [
                                      createTextVNode(" Update ")
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
                                  onClick: ($event) => showEdit.value = false
                                }, null, 8, ["onClick"]),
                                createVNode(VBtn, {
                                  color: "primary",
                                  onClick: handleUpdateTimeOperation
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Update ")
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
                              createTextVNode("Edit Jam Operasional")
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
                                          createTextVNode("Unit")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        value: editForm.value.unit_name,
                                        readonly: "",
                                        variant: "outlined"
                                      }, null, 8, ["value"])
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
                                          createTextVNode("Jam Buka")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: editForm.value.opening_time,
                                        "onUpdate:modelValue": ($event) => editForm.value.opening_time = $event,
                                        type: "time",
                                        required: ""
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
                                          createTextVNode("Jam Tutup")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: editForm.value.closing_time,
                                        "onUpdate:modelValue": ($event) => editForm.value.closing_time = $event,
                                        type: "time",
                                        required: ""
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
                                          createTextVNode("Catatan")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextarea, {
                                        modelValue: editForm.value.notes,
                                        "onUpdate:modelValue": ($event) => editForm.value.notes = $event,
                                        placeholder: "Catatan tambahan (opsional)",
                                        rows: "2"
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
                                          createTextVNode("Status")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VSwitch, {
                                        modelValue: editForm.value.is_active,
                                        "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                                        label: "Aktif",
                                        color: "primary"
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
                                onClick: ($event) => showEdit.value = false
                              }, null, 8, ["onClick"]),
                              createVNode(VBtn, {
                                color: "primary",
                                onClick: handleUpdateTimeOperation
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Update ")
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
                            createTextVNode("Edit Jam Operasional")
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
                                        createTextVNode("Unit")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      value: editForm.value.unit_name,
                                      readonly: "",
                                      variant: "outlined"
                                    }, null, 8, ["value"])
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
                                        createTextVNode("Jam Buka")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: editForm.value.opening_time,
                                      "onUpdate:modelValue": ($event) => editForm.value.opening_time = $event,
                                      type: "time",
                                      required: ""
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
                                        createTextVNode("Jam Tutup")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: editForm.value.closing_time,
                                      "onUpdate:modelValue": ($event) => editForm.value.closing_time = $event,
                                      type: "time",
                                      required: ""
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
                                        createTextVNode("Catatan")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextarea, {
                                      modelValue: editForm.value.notes,
                                      "onUpdate:modelValue": ($event) => editForm.value.notes = $event,
                                      placeholder: "Catatan tambahan (opsional)",
                                      rows: "2"
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
                                        createTextVNode("Status")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VSwitch, {
                                      modelValue: editForm.value.is_active,
                                      "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                                      label: "Aktif",
                                      color: "primary"
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
                              onClick: ($event) => showEdit.value = false
                            }, null, 8, ["onClick"]),
                            createVNode(VBtn, {
                              color: "primary",
                              onClick: handleUpdateTimeOperation
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Update ")
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
            _push2(ssrRenderComponent(VDialog, {
              modelValue: showStatus.value,
              "onUpdate:modelValue": ($event) => showStatus.value = $event,
              "max-width": "500"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (unitStatus.value) {
                    _push3(ssrRenderComponent(VCard, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCardTitle, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              var _a, _b;
                              if (_push5) {
                                _push5(ssrRenderComponent(VIcon, {
                                  color: unitStatus.value.is_open ? "success" : "error",
                                  class: "me-2"
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(unitStatus.value.is_open ? "mdi-store-check" : "mdi-store-remove")}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(unitStatus.value.is_open ? "mdi-store-check" : "mdi-store-remove"), 1)
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(` Status ${ssrInterpolate((_a = selectedUnit.value) == null ? void 0 : _a.name)}`);
                              } else {
                                return [
                                  createVNode(VIcon, {
                                    color: unitStatus.value.is_open ? "success" : "error",
                                    class: "me-2"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unitStatus.value.is_open ? "mdi-store-check" : "mdi-store-remove"), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["color"]),
                                  createTextVNode(" Status " + toDisplayString((_b = selectedUnit.value) == null ? void 0 : _b.name), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VCardText, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VRow, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VCol, { cols: "6" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VListSubheader, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Status Saat Ini`);
                                                } else {
                                                  return [
                                                    createTextVNode("Status Saat Ini")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(ssrRenderComponent(VChip, {
                                              color: getStatusColor(unitStatus.value.status),
                                              variant: "tonal",
                                              size: "large"
                                            }, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`${ssrInterpolate(unitStatus.value.status)}`);
                                                } else {
                                                  return [
                                                    createTextVNode(toDisplayString(unitStatus.value.status), 1)
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VListSubheader, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Status Saat Ini")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode(VChip, {
                                                color: getStatusColor(unitStatus.value.status),
                                                variant: "tonal",
                                                size: "large"
                                              }, {
                                                default: withCtx(() => [
                                                  createTextVNode(toDisplayString(unitStatus.value.status), 1)
                                                ]),
                                                _: 1
                                              }, 8, ["color"])
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, { cols: "6" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VListSubheader, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Waktu Sekarang`);
                                                } else {
                                                  return [
                                                    createTextVNode("Waktu Sekarang")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(`<div class="text-h6"${_scopeId6}>${ssrInterpolate(unitStatus.value.current_time)}</div>`);
                                          } else {
                                            return [
                                              createVNode(VListSubheader, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Waktu Sekarang")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("div", { class: "text-h6" }, toDisplayString(unitStatus.value.current_time), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VCol, { cols: "6" }, {
                                          default: withCtx(() => [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Status Saat Ini")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode(VChip, {
                                              color: getStatusColor(unitStatus.value.status),
                                              variant: "tonal",
                                              size: "large"
                                            }, {
                                              default: withCtx(() => [
                                                createTextVNode(toDisplayString(unitStatus.value.status), 1)
                                              ]),
                                              _: 1
                                            }, 8, ["color"])
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, { cols: "6" }, {
                                          default: withCtx(() => [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Waktu Sekarang")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("div", { class: "text-h6" }, toDisplayString(unitStatus.value.current_time), 1)
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VDivider, { class: "my-4" }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VRow, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VCol, { cols: "6" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VListSubheader, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Jam Buka`);
                                                } else {
                                                  return [
                                                    createTextVNode("Jam Buka")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(`<div class="text-body-1"${_scopeId6}>${ssrInterpolate(unitStatus.value.operating_hours.opening_time)}</div>`);
                                          } else {
                                            return [
                                              createVNode(VListSubheader, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Jam Buka")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("div", { class: "text-body-1" }, toDisplayString(unitStatus.value.operating_hours.opening_time), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VCol, { cols: "6" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VListSubheader, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Jam Tutup`);
                                                } else {
                                                  return [
                                                    createTextVNode("Jam Tutup")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                            _push7(`<div class="text-body-1"${_scopeId6}>${ssrInterpolate(unitStatus.value.operating_hours.closing_time)}</div>`);
                                          } else {
                                            return [
                                              createVNode(VListSubheader, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Jam Tutup")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("div", { class: "text-body-1" }, toDisplayString(unitStatus.value.operating_hours.closing_time), 1)
                                            ];
                                          }
                                        }),
                                        _: 1
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VCol, { cols: "6" }, {
                                          default: withCtx(() => [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Jam Buka")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("div", { class: "text-body-1" }, toDisplayString(unitStatus.value.operating_hours.opening_time), 1)
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, { cols: "6" }, {
                                          default: withCtx(() => [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Jam Tutup")
                                              ]),
                                              _: 1
                                            }),
                                            createVNode("div", { class: "text-body-1" }, toDisplayString(unitStatus.value.operating_hours.closing_time), 1)
                                          ]),
                                          _: 1
                                        })
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                                if (unitStatus.value.operating_hours.notes) {
                                  _push5(ssrRenderComponent(VRow, null, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(ssrRenderComponent(VCol, { cols: "12" }, {
                                          default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                            if (_push7) {
                                              _push7(ssrRenderComponent(VListSubheader, null, {
                                                default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                  if (_push8) {
                                                    _push8(`Catatan`);
                                                  } else {
                                                    return [
                                                      createTextVNode("Catatan")
                                                    ];
                                                  }
                                                }),
                                                _: 1
                                              }, _parent7, _scopeId6));
                                              _push7(`<div class="text-body-2"${_scopeId6}>${ssrInterpolate(unitStatus.value.operating_hours.notes)}</div>`);
                                            } else {
                                              return [
                                                createVNode(VListSubheader, null, {
                                                  default: withCtx(() => [
                                                    createTextVNode("Catatan")
                                                  ]),
                                                  _: 1
                                                }),
                                                createVNode("div", { class: "text-body-2" }, toDisplayString(unitStatus.value.operating_hours.notes), 1)
                                              ];
                                            }
                                          }),
                                          _: 1
                                        }, _parent6, _scopeId5));
                                      } else {
                                        return [
                                          createVNode(VCol, { cols: "12" }, {
                                            default: withCtx(() => [
                                              createVNode(VListSubheader, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Catatan")
                                                ]),
                                                _: 1
                                              }),
                                              createVNode("div", { class: "text-body-2" }, toDisplayString(unitStatus.value.operating_hours.notes), 1)
                                            ]),
                                            _: 1
                                          })
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  createVNode(VRow, null, {
                                    default: withCtx(() => [
                                      createVNode(VCol, { cols: "6" }, {
                                        default: withCtx(() => [
                                          createVNode(VListSubheader, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Status Saat Ini")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode(VChip, {
                                            color: getStatusColor(unitStatus.value.status),
                                            variant: "tonal",
                                            size: "large"
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(toDisplayString(unitStatus.value.status), 1)
                                            ]),
                                            _: 1
                                          }, 8, ["color"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "6" }, {
                                        default: withCtx(() => [
                                          createVNode(VListSubheader, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Waktu Sekarang")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("div", { class: "text-h6" }, toDisplayString(unitStatus.value.current_time), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VDivider, { class: "my-4" }),
                                  createVNode(VRow, null, {
                                    default: withCtx(() => [
                                      createVNode(VCol, { cols: "6" }, {
                                        default: withCtx(() => [
                                          createVNode(VListSubheader, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Jam Buka")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("div", { class: "text-body-1" }, toDisplayString(unitStatus.value.operating_hours.opening_time), 1)
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "6" }, {
                                        default: withCtx(() => [
                                          createVNode(VListSubheader, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Jam Tutup")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("div", { class: "text-body-1" }, toDisplayString(unitStatus.value.operating_hours.closing_time), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  unitStatus.value.operating_hours.notes ? (openBlock(), createBlock(VRow, { key: 0 }, {
                                    default: withCtx(() => [
                                      createVNode(VCol, { cols: "12" }, {
                                        default: withCtx(() => [
                                          createVNode(VListSubheader, null, {
                                            default: withCtx(() => [
                                              createTextVNode("Catatan")
                                            ]),
                                            _: 1
                                          }),
                                          createVNode("div", { class: "text-body-2" }, toDisplayString(unitStatus.value.operating_hours.notes), 1)
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  })) : createCommentVNode("", true)
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
                                  text: "Tutup",
                                  onClick: ($event) => showStatus.value = false
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VSpacer),
                                  createVNode(VBtn, {
                                    text: "Tutup",
                                    onClick: ($event) => showStatus.value = false
                                  }, null, 8, ["onClick"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCardTitle, null, {
                              default: withCtx(() => {
                                var _a;
                                return [
                                  createVNode(VIcon, {
                                    color: unitStatus.value.is_open ? "success" : "error",
                                    class: "me-2"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unitStatus.value.is_open ? "mdi-store-check" : "mdi-store-remove"), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["color"]),
                                  createTextVNode(" Status " + toDisplayString((_a = selectedUnit.value) == null ? void 0 : _a.name), 1)
                                ];
                              }),
                              _: 1
                            }),
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, { cols: "6" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Status Saat Ini")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VChip, {
                                          color: getStatusColor(unitStatus.value.status),
                                          variant: "tonal",
                                          size: "large"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(unitStatus.value.status), 1)
                                          ]),
                                          _: 1
                                        }, 8, ["color"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "6" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Waktu Sekarang")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "text-h6" }, toDisplayString(unitStatus.value.current_time), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VDivider, { class: "my-4" }),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, { cols: "6" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Jam Buka")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "text-body-1" }, toDisplayString(unitStatus.value.operating_hours.opening_time), 1)
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "6" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Jam Tutup")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "text-body-1" }, toDisplayString(unitStatus.value.operating_hours.closing_time), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                unitStatus.value.operating_hours.notes ? (openBlock(), createBlock(VRow, { key: 0 }, {
                                  default: withCtx(() => [
                                    createVNode(VCol, { cols: "12" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Catatan")
                                          ]),
                                          _: 1
                                        }),
                                        createVNode("div", { class: "text-body-2" }, toDisplayString(unitStatus.value.operating_hours.notes), 1)
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true)
                              ]),
                              _: 1
                            }),
                            createVNode(VCardActions, null, {
                              default: withCtx(() => [
                                createVNode(VSpacer),
                                createVNode(VBtn, {
                                  text: "Tutup",
                                  onClick: ($event) => showStatus.value = false
                                }, null, 8, ["onClick"])
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
                } else {
                  return [
                    unitStatus.value ? (openBlock(), createBlock(VCard, { key: 0 }, {
                      default: withCtx(() => [
                        createVNode(VCardTitle, null, {
                          default: withCtx(() => {
                            var _a;
                            return [
                              createVNode(VIcon, {
                                color: unitStatus.value.is_open ? "success" : "error",
                                class: "me-2"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(unitStatus.value.is_open ? "mdi-store-check" : "mdi-store-remove"), 1)
                                ]),
                                _: 1
                              }, 8, ["color"]),
                              createTextVNode(" Status " + toDisplayString((_a = selectedUnit.value) == null ? void 0 : _a.name), 1)
                            ];
                          }),
                          _: 1
                        }),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "6" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Status Saat Ini")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VChip, {
                                      color: getStatusColor(unitStatus.value.status),
                                      variant: "tonal",
                                      size: "large"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(unitStatus.value.status), 1)
                                      ]),
                                      _: 1
                                    }, 8, ["color"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "6" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Waktu Sekarang")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "text-h6" }, toDisplayString(unitStatus.value.current_time), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createVNode(VDivider, { class: "my-4" }),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "6" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Jam Buka")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "text-body-1" }, toDisplayString(unitStatus.value.operating_hours.opening_time), 1)
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "6" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Jam Tutup")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "text-body-1" }, toDisplayString(unitStatus.value.operating_hours.closing_time), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            unitStatus.value.operating_hours.notes ? (openBlock(), createBlock(VRow, { key: 0 }, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "12" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Catatan")
                                      ]),
                                      _: 1
                                    }),
                                    createVNode("div", { class: "text-body-2" }, toDisplayString(unitStatus.value.operating_hours.notes), 1)
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }),
                        createVNode(VCardActions, null, {
                          default: withCtx(() => [
                            createVNode(VSpacer),
                            createVNode(VBtn, {
                              text: "Tutup",
                              onClick: ($event) => showStatus.value = false
                            }, null, 8, ["onClick"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTextField, {
                    modelValue: search.value,
                    "onUpdate:modelValue": ($event) => search.value = $event,
                    label: "Cari unit...",
                    "prepend-inner-icon": "mdi-magnify",
                    clearable: "",
                    class: "mb-4"
                  }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VTextField, {
                      modelValue: search.value,
                      "onUpdate:modelValue": ($event) => search.value = $event,
                      label: "Cari unit...",
                      "prepend-inner-icon": "mdi-magnify",
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
                  _push3(`<thead${_scopeId2}><tr${_scopeId2}><th${_scopeId2}>#</th><th${_scopeId2}>Unit</th><th${_scopeId2}>Lokasi</th><th${_scopeId2}>Jam Buka</th><th${_scopeId2}>Jam Tutup</th><th${_scopeId2}>Status</th><th${_scopeId2}>Catatan</th><th${_scopeId2}>Dibuat</th><th${_scopeId2}>Aksi</th></tr></thead><tbody${_scopeId2}>`);
                  if (!isLoading.value && filteredTimeOperations.value.length === 0) {
                    _push3(`<tr${_scopeId2}><td colspan="9" class="text-center py-4"${_scopeId2}>${ssrInterpolate(search.value ? "Tidak ada data yang sesuai" : "Belum ada jam operasional")}</td></tr>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList(filteredTimeOperations.value, (timeOperation, index) => {
                    var _a;
                    _push3(`<tr${_scopeId2}><td${_scopeId2}>${ssrInterpolate(index + 1 + (page.value - 1) * limit)}</td><td${_scopeId2}><div class="font-weight-medium"${_scopeId2}>${ssrInterpolate(timeOperation.unit_name)}</div><div class="text-caption text-medium-emphasis"${_scopeId2}>${ssrInterpolate(timeOperation.unit_code)}</div></td><td${_scopeId2}>${ssrInterpolate(((_a = units.value.find((u) => u.id === timeOperation.unit_id)) == null ? void 0 : _a.location) || "-")}</td><td${_scopeId2}>`);
                    _push3(ssrRenderComponent(VChip, {
                      color: "primary",
                      variant: "tonal",
                      size: "small"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(timeOperation.opening_time)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(timeOperation.opening_time), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</td><td${_scopeId2}>`);
                    _push3(ssrRenderComponent(VChip, {
                      color: "primary",
                      variant: "tonal",
                      size: "small"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(timeOperation.closing_time)}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(timeOperation.closing_time), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</td><td${_scopeId2}>`);
                    _push3(ssrRenderComponent(VChip, {
                      color: timeOperation.is_active ? "success" : "error",
                      variant: "tonal",
                      size: "small"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(timeOperation.is_active ? "Aktif" : "Non-aktif")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(timeOperation.is_active ? "Aktif" : "Non-aktif"), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</td><td${_scopeId2}><div class="text-caption" style="${ssrRenderStyle({ "max-width": "150px" })}"${_scopeId2}>${ssrInterpolate(timeOperation.notes || "-")}</div></td><td${_scopeId2}>${ssrInterpolate(new Date(timeOperation.created_at).toLocaleDateString("id-ID"))}</td><td${_scopeId2}>`);
                    _push3(ssrRenderComponent(VBtn, {
                      icon: "",
                      variant: "text",
                      size: "small",
                      onClick: ($event) => openEditModal(timeOperation),
                      title: "Edit"
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
                      onClick: ($event) => confirmDelete(timeOperation.id, timeOperation.unit_name || ""),
                      title: "Hapus"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VIcon, { color: "error" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`bx bx-x`);
                              } else {
                                return [
                                  createTextVNode("bx bx-x")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VIcon, { color: "error" }, {
                              default: withCtx(() => [
                                createTextVNode("bx bx-x")
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
                        createVNode("th", null, "Unit"),
                        createVNode("th", null, "Lokasi"),
                        createVNode("th", null, "Jam Buka"),
                        createVNode("th", null, "Jam Tutup"),
                        createVNode("th", null, "Status"),
                        createVNode("th", null, "Catatan"),
                        createVNode("th", null, "Dibuat"),
                        createVNode("th", null, "Aksi")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      !isLoading.value && filteredTimeOperations.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "9",
                          class: "text-center py-4"
                        }, toDisplayString(search.value ? "Tidak ada data yang sesuai" : "Belum ada jam operasional"), 1)
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(filteredTimeOperations.value, (timeOperation, index) => {
                        var _a;
                        return openBlock(), createBlock("tr", {
                          key: timeOperation.id
                        }, [
                          createVNode("td", null, toDisplayString(index + 1 + (page.value - 1) * limit), 1),
                          createVNode("td", null, [
                            createVNode("div", { class: "font-weight-medium" }, toDisplayString(timeOperation.unit_name), 1),
                            createVNode("div", { class: "text-caption text-medium-emphasis" }, toDisplayString(timeOperation.unit_code), 1)
                          ]),
                          createVNode("td", null, toDisplayString(((_a = units.value.find((u) => u.id === timeOperation.unit_id)) == null ? void 0 : _a.location) || "-"), 1),
                          createVNode("td", null, [
                            createVNode(VChip, {
                              color: "primary",
                              variant: "tonal",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(timeOperation.opening_time), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          createVNode("td", null, [
                            createVNode(VChip, {
                              color: "primary",
                              variant: "tonal",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(timeOperation.closing_time), 1)
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          createVNode("td", null, [
                            createVNode(VChip, {
                              color: timeOperation.is_active ? "success" : "error",
                              variant: "tonal",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(timeOperation.is_active ? "Aktif" : "Non-aktif"), 1)
                              ]),
                              _: 2
                            }, 1032, ["color"])
                          ]),
                          createVNode("td", null, [
                            createVNode("div", {
                              class: "text-caption",
                              style: { "max-width": "150px" }
                            }, toDisplayString(timeOperation.notes || "-"), 1)
                          ]),
                          createVNode("td", null, toDisplayString(new Date(timeOperation.created_at).toLocaleDateString("id-ID")), 1),
                          createVNode("td", null, [
                            createVNode(VBtn, {
                              icon: "",
                              variant: "text",
                              size: "small",
                              onClick: ($event) => openEditModal(timeOperation),
                              title: "Edit"
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
                              onClick: ($event) => confirmDelete(timeOperation.id, timeOperation.unit_name || ""),
                              title: "Hapus"
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, { color: "error" }, {
                                  default: withCtx(() => [
                                    createTextVNode("bx bx-x")
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
            if (total.value > limit) {
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
              _push2(`<!---->`);
            }
          } else {
            return [
              createVNode(VDialog, {
                modelValue: showCreate.value,
                "onUpdate:modelValue": ($event) => showCreate.value = $event,
                "max-width": "600"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Tambah Jam Operasional")
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
                                      createTextVNode("Unit")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VSelect, {
                                    modelValue: createForm.value.unit_id,
                                    "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                    items: availableUnits.value,
                                    "item-title": "name",
                                    "item-value": "id",
                                    label: "Pilih Unit",
                                    required: ""
                                  }, {
                                    item: withCtx(({ props, item }) => [
                                      createVNode(VListItem, props, {
                                        title: withCtx(() => [
                                          createTextVNode(toDisplayString(item.raw.name), 1)
                                        ]),
                                        subtitle: withCtx(() => [
                                          createTextVNode(toDisplayString(item.raw.location), 1)
                                        ]),
                                        _: 2
                                      }, 1040)
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                      createTextVNode("Jam Buka")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: createForm.value.opening_time,
                                    "onUpdate:modelValue": ($event) => createForm.value.opening_time = $event,
                                    type: "time",
                                    required: ""
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
                                      createTextVNode("Jam Tutup")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: createForm.value.closing_time,
                                    "onUpdate:modelValue": ($event) => createForm.value.closing_time = $event,
                                    type: "time",
                                    required: ""
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
                                      createTextVNode("Catatan")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextarea, {
                                    modelValue: createForm.value.notes,
                                    "onUpdate:modelValue": ($event) => createForm.value.notes = $event,
                                    placeholder: "Catatan tambahan (opsional)",
                                    rows: "2"
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
                            onClick: ($event) => showCreate.value = false
                          }, null, 8, ["onClick"]),
                          createVNode(VBtn, {
                            color: "primary",
                            onClick: handleCreateTimeOperation,
                            disabled: !createForm.value.unit_id || !createForm.value.opening_time || !createForm.value.closing_time
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Simpan ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VDialog, {
                modelValue: showEdit.value,
                "onUpdate:modelValue": ($event) => showEdit.value = $event,
                "max-width": "600"
              }, {
                default: withCtx(() => [
                  createVNode(VCard, null, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => [
                          createTextVNode("Edit Jam Operasional")
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
                                      createTextVNode("Unit")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    value: editForm.value.unit_name,
                                    readonly: "",
                                    variant: "outlined"
                                  }, null, 8, ["value"])
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
                                      createTextVNode("Jam Buka")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: editForm.value.opening_time,
                                    "onUpdate:modelValue": ($event) => editForm.value.opening_time = $event,
                                    type: "time",
                                    required: ""
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
                                      createTextVNode("Jam Tutup")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: editForm.value.closing_time,
                                    "onUpdate:modelValue": ($event) => editForm.value.closing_time = $event,
                                    type: "time",
                                    required: ""
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
                                      createTextVNode("Catatan")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextarea, {
                                    modelValue: editForm.value.notes,
                                    "onUpdate:modelValue": ($event) => editForm.value.notes = $event,
                                    placeholder: "Catatan tambahan (opsional)",
                                    rows: "2"
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
                                      createTextVNode("Status")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VSwitch, {
                                    modelValue: editForm.value.is_active,
                                    "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                                    label: "Aktif",
                                    color: "primary"
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
                            onClick: ($event) => showEdit.value = false
                          }, null, 8, ["onClick"]),
                          createVNode(VBtn, {
                            color: "primary",
                            onClick: handleUpdateTimeOperation
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Update ")
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
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VDialog, {
                modelValue: showStatus.value,
                "onUpdate:modelValue": ($event) => showStatus.value = $event,
                "max-width": "500"
              }, {
                default: withCtx(() => [
                  unitStatus.value ? (openBlock(), createBlock(VCard, { key: 0 }, {
                    default: withCtx(() => [
                      createVNode(VCardTitle, null, {
                        default: withCtx(() => {
                          var _a;
                          return [
                            createVNode(VIcon, {
                              color: unitStatus.value.is_open ? "success" : "error",
                              class: "me-2"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unitStatus.value.is_open ? "mdi-store-check" : "mdi-store-remove"), 1)
                              ]),
                              _: 1
                            }, 8, ["color"]),
                            createTextVNode(" Status " + toDisplayString((_a = selectedUnit.value) == null ? void 0 : _a.name), 1)
                          ];
                        }),
                        _: 1
                      }),
                      createVNode(VCardText, null, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "6" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Status Saat Ini")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VChip, {
                                    color: getStatusColor(unitStatus.value.status),
                                    variant: "tonal",
                                    size: "large"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unitStatus.value.status), 1)
                                    ]),
                                    _: 1
                                  }, 8, ["color"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "6" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Waktu Sekarang")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "text-h6" }, toDisplayString(unitStatus.value.current_time), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createVNode(VDivider, { class: "my-4" }),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "6" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Jam Buka")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "text-body-1" }, toDisplayString(unitStatus.value.operating_hours.opening_time), 1)
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "6" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Jam Tutup")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "text-body-1" }, toDisplayString(unitStatus.value.operating_hours.closing_time), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          unitStatus.value.operating_hours.notes ? (openBlock(), createBlock(VRow, { key: 0 }, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "12" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Catatan")
                                    ]),
                                    _: 1
                                  }),
                                  createVNode("div", { class: "text-body-2" }, toDisplayString(unitStatus.value.operating_hours.notes), 1)
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }),
                      createVNode(VCardActions, null, {
                        default: withCtx(() => [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            text: "Tutup",
                            onClick: ($event) => showStatus.value = false
                          }, null, 8, ["onClick"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              }, 8, ["modelValue", "onUpdate:modelValue"]),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode(VTextField, {
                    modelValue: search.value,
                    "onUpdate:modelValue": ($event) => search.value = $event,
                    label: "Cari unit...",
                    "prepend-inner-icon": "mdi-magnify",
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
                      createVNode("th", null, "Unit"),
                      createVNode("th", null, "Lokasi"),
                      createVNode("th", null, "Jam Buka"),
                      createVNode("th", null, "Jam Tutup"),
                      createVNode("th", null, "Status"),
                      createVNode("th", null, "Catatan"),
                      createVNode("th", null, "Dibuat"),
                      createVNode("th", null, "Aksi")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    !isLoading.value && filteredTimeOperations.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                      createVNode("td", {
                        colspan: "9",
                        class: "text-center py-4"
                      }, toDisplayString(search.value ? "Tidak ada data yang sesuai" : "Belum ada jam operasional"), 1)
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(filteredTimeOperations.value, (timeOperation, index) => {
                      var _a;
                      return openBlock(), createBlock("tr", {
                        key: timeOperation.id
                      }, [
                        createVNode("td", null, toDisplayString(index + 1 + (page.value - 1) * limit), 1),
                        createVNode("td", null, [
                          createVNode("div", { class: "font-weight-medium" }, toDisplayString(timeOperation.unit_name), 1),
                          createVNode("div", { class: "text-caption text-medium-emphasis" }, toDisplayString(timeOperation.unit_code), 1)
                        ]),
                        createVNode("td", null, toDisplayString(((_a = units.value.find((u) => u.id === timeOperation.unit_id)) == null ? void 0 : _a.location) || "-"), 1),
                        createVNode("td", null, [
                          createVNode(VChip, {
                            color: "primary",
                            variant: "tonal",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(timeOperation.opening_time), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        createVNode("td", null, [
                          createVNode(VChip, {
                            color: "primary",
                            variant: "tonal",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(timeOperation.closing_time), 1)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        createVNode("td", null, [
                          createVNode(VChip, {
                            color: timeOperation.is_active ? "success" : "error",
                            variant: "tonal",
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(timeOperation.is_active ? "Aktif" : "Non-aktif"), 1)
                            ]),
                            _: 2
                          }, 1032, ["color"])
                        ]),
                        createVNode("td", null, [
                          createVNode("div", {
                            class: "text-caption",
                            style: { "max-width": "150px" }
                          }, toDisplayString(timeOperation.notes || "-"), 1)
                        ]),
                        createVNode("td", null, toDisplayString(new Date(timeOperation.created_at).toLocaleDateString("id-ID")), 1),
                        createVNode("td", null, [
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            size: "small",
                            onClick: ($event) => openEditModal(timeOperation),
                            title: "Edit"
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
                            onClick: ($event) => confirmDelete(timeOperation.id, timeOperation.unit_name || ""),
                            title: "Hapus"
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, { color: "error" }, {
                                default: withCtx(() => [
                                  createTextVNode("bx bx-x")
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
              total.value > limit ? (openBlock(), createBlock(VCardActions, {
                key: 0,
                class: "justify-center"
              }, {
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
              })) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/time-operation.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
