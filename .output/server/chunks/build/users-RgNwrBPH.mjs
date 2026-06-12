import { defineComponent, ref, watch, computed, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useUsers } from './useUsers-hcBemT-c.mjs';
import { u as useOutlets } from './useOutlets-B5FqPd-h.mjs';
import { V as VCard, a as VCardText, b as VCardActions, c as VCardTitle } from './VCard-DLk5PTHl.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
import { V as VTable } from './VTable-BXA3D1kT.mjs';
import { a as VBtn, b as VIcon } from './server.mjs';
import { V as VPagination } from './VPagination-z_-yTplN.mjs';
import { V as VDialog } from './VDialog-yRDXDq_T.mjs';
import { V as VContainer } from './VContainer-CZliQBxk.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VListSubheader } from './VListSubheader-BbgyaiQc.mjs';
import { V as VTextarea } from './VTextarea-DrP3zBGC.mjs';
import { V as VSelect } from './VSelect-Bxz-WhQz.mjs';
import { V as VSpacer } from './VSpacer-CQpJ4yRI.mjs';
import './authFetch-5wQjlWwJ.mjs';
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
import './VMenu-CmFsZZaF.mjs';
import './ssrBoot-BtvJZs44.mjs';
import './VCheckboxBtn-DaRBpQ2e.mjs';
import './VChip-C44NlS62.mjs';
import './VSlideGroup-J1shNAVo.mjs';

const limit = 24;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "users",
  __ssrInlineRender: true,
  setup(__props) {
    const { getUsers, updateUserById, deleteUserById, createUser } = useUsers();
    const { getOutletsByUnit } = useOutlets();
    const page = ref(1);
    const total = ref(0);
    const isLoading = ref(false);
    const users = ref([]);
    const search = ref("");
    const showCreate = ref(false);
    const showEdit = ref(false);
    const createForm = ref({
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      picture: "",
      role: "",
      unit_id: "",
      outlet_id: ""
    });
    const editForm = ref({
      id: "",
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      picture: "",
      role: "",
      unit_id: "",
      outlet_id: ""
    });
    ref([]);
    const units = ref([]);
    const handleCreateUser = async () => {
      showCreate.value = false;
      createForm.value.role = createForm.value.role.toLowerCase();
      if (createForm.value.role == "customer" || createForm.value.role == "superadmin") {
        createForm.value.unit_id = "";
        createForm.value.outlet_id = "";
      }
      await createUser(createForm.value);
      await fetchUsers();
      createForm.value = {
        name: "",
        email: "",
        password: "",
        phone: "",
        address: "",
        picture: "",
        role: "",
        unit_id: "",
        outlet_id: ""
      };
    };
    async function fetchUsers() {
      isLoading.value = true;
      try {
        const res = await getUsers({
          page: page.value,
          limit,
          search: search.value
        });
        users.value = (res == null ? void 0 : res.data) || [];
        total.value = (res == null ? void 0 : res.total) || 0;
        console.log("Users:", users.value);
      } catch (error) {
        console.error("Failed to fetch users:", error);
        users.value = [];
        total.value = 0;
      } finally {
        isLoading.value = false;
      }
    }
    function openEditModal(user) {
      editForm.value = { ...user };
      showEdit.value = true;
    }
    async function saveEdit() {
      await updateUserById(editForm.value.id, {
        name: editForm.value.name,
        email: editForm.value.email
      });
      showEdit.value = false;
      await fetchUsers();
    }
    async function confirmDelete(id) {
      if (confirm("Yakin ingin menghapus user ini?")) {
        await deleteUserById(id);
        await fetchUsers();
      }
    }
    watch([page, search], fetchUsers);
    const outletList = ref([]);
    const selectedUnit = computed(() => {
      return units.value.find((u) => u.id === createForm.value.unit_id) || null;
    });
    watch(
      () => createForm.value.unit_id,
      async (newUnitId) => {
        var _a;
        if (newUnitId) {
          const outletRes = await getOutletsByUnit(newUnitId);
          if ((outletRes == null ? void 0 : outletRes.status_code) === 200 && Array.isArray(outletRes.outlets)) {
            outletList.value = outletRes.outlets;
            createForm.value.outlet_id = ((_a = outletRes.outlets[0]) == null ? void 0 : _a.id) || "";
          } else {
            outletList.value = [];
            createForm.value.outlet_id;
          }
        }
      },
      { immediate: true }
    );
    const rules = {
      required: (value) => !!value || "Required.",
      min: (v) => v.length >= 6 || "Min 6 characters"
    };
    const show1 = ref(false);
    ref("Password");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VCard, {
        title: "Users Table",
        class: "mb-4"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              class: "text-none",
              color: "primary",
              text: "Tambah User",
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
                              _push5(`Tambah User`);
                            } else {
                              return [
                                createTextVNode("Tambah User")
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
                                                _push8(`Email`);
                                              } else {
                                                return [
                                                  createTextVNode("Email")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Email")
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
                                            modelValue: createForm.value.email,
                                            "onUpdate:modelValue": ($event) => createForm.value.email = $event,
                                            "persistent-hint": "",
                                            placeholder: "johndoe@gmail.com",
                                            type: "email"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: createForm.value.email,
                                              "onUpdate:modelValue": ($event) => createForm.value.email = $event,
                                              "persistent-hint": "",
                                              placeholder: "johndoe@gmail.com",
                                              type: "email"
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
                                              createTextVNode("Email")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: createForm.value.email,
                                            "onUpdate:modelValue": ($event) => createForm.value.email = $event,
                                            "persistent-hint": "",
                                            placeholder: "johndoe@gmail.com",
                                            type: "email"
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
                                            placeholder: "John Doe",
                                            "persistent-hint": ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: createForm.value.name,
                                              "onUpdate:modelValue": ($event) => createForm.value.name = $event,
                                              placeholder: "John Doe",
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
                                            placeholder: "John Doe",
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
                                                _push8(`No Telp`);
                                              } else {
                                                return [
                                                  createTextVNode("No Telp")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("No Telp")
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
                                            modelValue: createForm.value.phone,
                                            "onUpdate:modelValue": ($event) => createForm.value.phone = $event,
                                            "persistent-hint": ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: createForm.value.phone,
                                              "onUpdate:modelValue": ($event) => createForm.value.phone = $event,
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
                                              createTextVNode("No Telp")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: createForm.value.phone,
                                            "onUpdate:modelValue": ($event) => createForm.value.phone = $event,
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
                                          _push7(ssrRenderComponent(VTextarea, {
                                            modelValue: createForm.value.address,
                                            "onUpdate:modelValue": ($event) => createForm.value.address = $event,
                                            variant: "outlined"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextarea, {
                                              modelValue: createForm.value.address,
                                              "onUpdate:modelValue": ($event) => createForm.value.address = $event,
                                              variant: "outlined"
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
                                          createVNode(VTextarea, {
                                            modelValue: createForm.value.address,
                                            "onUpdate:modelValue": ($event) => createForm.value.address = $event,
                                            variant: "outlined"
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
                                                _push8(`Role`);
                                              } else {
                                                return [
                                                  createTextVNode("Role")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Role")
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
                                            modelValue: createForm.value.role,
                                            "onUpdate:modelValue": ($event) => createForm.value.role = $event,
                                            density: "comfortable",
                                            items: ["Customer", "Unit", "Outlet", "Superadmin"],
                                            class: "mb-4"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSelect, {
                                              modelValue: createForm.value.role,
                                              "onUpdate:modelValue": ($event) => createForm.value.role = $event,
                                              density: "comfortable",
                                              items: ["Customer", "Unit", "Outlet", "Superadmin"],
                                              class: "mb-4"
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
                                              createTextVNode("Role")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            modelValue: createForm.value.role,
                                            "onUpdate:modelValue": ($event) => createForm.value.role = $event,
                                            density: "comfortable",
                                            items: ["Customer", "Unit", "Outlet", "Superadmin"],
                                            class: "mb-4"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      })
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              if (createForm.value.role === "Unit" || createForm.value.role === "Outlet") {
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
                                          var _a, _b;
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VSelect, {
                                              modelValue: createForm.value.unit_id,
                                              "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                              density: "comfortable",
                                              label: "Pilih unit",
                                              items: units.value,
                                              "item-value": "id",
                                              "item-title": "name",
                                              hint: (_a = selectedUnit.value) == null ? void 0 : _a.location,
                                              "persistent-hint": "",
                                              class: "mb-4",
                                              variant: "outlined"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VSelect, {
                                                modelValue: createForm.value.unit_id,
                                                "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                                density: "comfortable",
                                                label: "Pilih unit",
                                                items: units.value,
                                                "item-value": "id",
                                                "item-title": "name",
                                                hint: (_b = selectedUnit.value) == null ? void 0 : _b.location,
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
                                          default: withCtx(() => {
                                            var _a;
                                            return [
                                              createVNode(VSelect, {
                                                modelValue: createForm.value.unit_id,
                                                "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                                density: "comfortable",
                                                label: "Pilih unit",
                                                items: units.value,
                                                "item-value": "id",
                                                "item-title": "name",
                                                hint: (_a = selectedUnit.value) == null ? void 0 : _a.location,
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
                              } else {
                                _push5(`<!---->`);
                              }
                              if (createForm.value.role === "Outlet") {
                                _push5(ssrRenderComponent(VRow, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VCol, { cols: "3" }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(ssrRenderComponent(VListSubheader, null, {
                                              default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                                if (_push8) {
                                                  _push8(`Outlet`);
                                                } else {
                                                  return [
                                                    createTextVNode("Outlet")
                                                  ];
                                                }
                                              }),
                                              _: 1
                                            }, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VListSubheader, null, {
                                                default: withCtx(() => [
                                                  createTextVNode("Outlet")
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
                                              modelValue: createForm.value.outlet_id,
                                              "onUpdate:modelValue": ($event) => createForm.value.outlet_id = $event,
                                              density: "comfortable",
                                              label: "Pilih outlet",
                                              items: outletList.value,
                                              "item-value": "id",
                                              "item-title": "name",
                                              "persistent-hint": "",
                                              class: "mb-4",
                                              variant: "outlined"
                                            }, null, _parent7, _scopeId6));
                                          } else {
                                            return [
                                              createVNode(VSelect, {
                                                modelValue: createForm.value.outlet_id,
                                                "onUpdate:modelValue": ($event) => createForm.value.outlet_id = $event,
                                                density: "comfortable",
                                                label: "Pilih outlet",
                                                items: outletList.value,
                                                "item-value": "id",
                                                "item-title": "name",
                                                "persistent-hint": "",
                                                class: "mb-4",
                                                variant: "outlined"
                                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                                createTextVNode("Outlet")
                                              ]),
                                              _: 1
                                            })
                                          ]),
                                          _: 1
                                        }),
                                        createVNode(VCol, { cols: "9" }, {
                                          default: withCtx(() => [
                                            createVNode(VSelect, {
                                              modelValue: createForm.value.outlet_id,
                                              "onUpdate:modelValue": ($event) => createForm.value.outlet_id = $event,
                                              density: "comfortable",
                                              label: "Pilih outlet",
                                              items: outletList.value,
                                              "item-value": "id",
                                              "item-title": "name",
                                              "persistent-hint": "",
                                              class: "mb-4",
                                              variant: "outlined"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, { cols: "3" }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VListSubheader, null, {
                                            default: withCtx((_7, _push8, _parent8, _scopeId7) => {
                                              if (_push8) {
                                                _push8(`Password`);
                                              } else {
                                                return [
                                                  createTextVNode("Password")
                                                ];
                                              }
                                            }),
                                            _: 1
                                          }, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VListSubheader, null, {
                                              default: withCtx(() => [
                                                createTextVNode("Password")
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
                                            modelValue: createForm.value.password,
                                            "onUpdate:modelValue": ($event) => createForm.value.password = $event,
                                            "append-icon": show1.value ? "bx-show" : "bx-hide",
                                            rules: [rules.required, rules.min],
                                            type: show1.value ? "text" : "password",
                                            hint: "At least 6 characters",
                                            name: "input-10-1",
                                            counter: "",
                                            "onClick:append": ($event) => show1.value = !show1.value
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: createForm.value.password,
                                              "onUpdate:modelValue": ($event) => createForm.value.password = $event,
                                              "append-icon": show1.value ? "bx-show" : "bx-hide",
                                              rules: [rules.required, rules.min],
                                              type: show1.value ? "text" : "password",
                                              hint: "At least 6 characters",
                                              name: "input-10-1",
                                              counter: "",
                                              "onClick:append": ($event) => show1.value = !show1.value
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "append-icon", "rules", "type", "onClick:append"])
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
                                              createTextVNode("Password")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, { cols: "9" }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: createForm.value.password,
                                            "onUpdate:modelValue": ($event) => createForm.value.password = $event,
                                            "append-icon": show1.value ? "bx-show" : "bx-hide",
                                            rules: [rules.required, rules.min],
                                            type: show1.value ? "text" : "password",
                                            hint: "At least 6 characters",
                                            name: "input-10-1",
                                            counter: "",
                                            "onClick:append": ($event) => show1.value = !show1.value
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "append-icon", "rules", "type", "onClick:append"])
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
                                            createTextVNode("Email")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: createForm.value.email,
                                          "onUpdate:modelValue": ($event) => createForm.value.email = $event,
                                          "persistent-hint": "",
                                          placeholder: "johndoe@gmail.com",
                                          type: "email"
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
                                          placeholder: "John Doe",
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
                                            createTextVNode("No Telp")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: createForm.value.phone,
                                          "onUpdate:modelValue": ($event) => createForm.value.phone = $event,
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
                                        createVNode(VTextarea, {
                                          modelValue: createForm.value.address,
                                          "onUpdate:modelValue": ($event) => createForm.value.address = $event,
                                          variant: "outlined"
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
                                            createTextVNode("Role")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          modelValue: createForm.value.role,
                                          "onUpdate:modelValue": ($event) => createForm.value.role = $event,
                                          density: "comfortable",
                                          items: ["Customer", "Unit", "Outlet", "Superadmin"],
                                          class: "mb-4"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createForm.value.role === "Unit" || createForm.value.role === "Outlet" ? (openBlock(), createBlock(VRow, { key: 0 }, {
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
                                      default: withCtx(() => {
                                        var _a;
                                        return [
                                          createVNode(VSelect, {
                                            modelValue: createForm.value.unit_id,
                                            "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                            density: "comfortable",
                                            label: "Pilih unit",
                                            items: units.value,
                                            "item-value": "id",
                                            "item-title": "name",
                                            hint: (_a = selectedUnit.value) == null ? void 0 : _a.location,
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
                                })) : createCommentVNode("", true),
                                createForm.value.role === "Outlet" ? (openBlock(), createBlock(VRow, { key: 1 }, {
                                  default: withCtx(() => [
                                    createVNode(VCol, { cols: "3" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Outlet")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          modelValue: createForm.value.outlet_id,
                                          "onUpdate:modelValue": ($event) => createForm.value.outlet_id = $event,
                                          density: "comfortable",
                                          label: "Pilih outlet",
                                          items: outletList.value,
                                          "item-value": "id",
                                          "item-title": "name",
                                          "persistent-hint": "",
                                          class: "mb-4",
                                          variant: "outlined"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })) : createCommentVNode("", true),
                                createVNode(VRow, null, {
                                  default: withCtx(() => [
                                    createVNode(VCol, { cols: "3" }, {
                                      default: withCtx(() => [
                                        createVNode(VListSubheader, null, {
                                          default: withCtx(() => [
                                            createTextVNode("Password")
                                          ]),
                                          _: 1
                                        })
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, { cols: "9" }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: createForm.value.password,
                                          "onUpdate:modelValue": ($event) => createForm.value.password = $event,
                                          "append-icon": show1.value ? "bx-show" : "bx-hide",
                                          rules: [rules.required, rules.min],
                                          type: show1.value ? "text" : "password",
                                          hint: "At least 6 characters",
                                          name: "input-10-1",
                                          counter: "",
                                          "onClick:append": ($event) => show1.value = !show1.value
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "append-icon", "rules", "type", "onClick:append"])
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
                                onClick: handleCreateUser
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
                                  onClick: ($event) => showCreate.value = false
                                }, null, 8, ["onClick"]),
                                createVNode(VBtn, {
                                  color: "primary",
                                  onClick: handleCreateUser
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
                              createTextVNode("Tambah User")
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
                                          createTextVNode("Email")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: createForm.value.email,
                                        "onUpdate:modelValue": ($event) => createForm.value.email = $event,
                                        "persistent-hint": "",
                                        placeholder: "johndoe@gmail.com",
                                        type: "email"
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
                                        placeholder: "John Doe",
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
                                          createTextVNode("No Telp")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: createForm.value.phone,
                                        "onUpdate:modelValue": ($event) => createForm.value.phone = $event,
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
                                      createVNode(VTextarea, {
                                        modelValue: createForm.value.address,
                                        "onUpdate:modelValue": ($event) => createForm.value.address = $event,
                                        variant: "outlined"
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
                                          createTextVNode("Role")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        modelValue: createForm.value.role,
                                        "onUpdate:modelValue": ($event) => createForm.value.role = $event,
                                        density: "comfortable",
                                        items: ["Customer", "Unit", "Outlet", "Superadmin"],
                                        class: "mb-4"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createForm.value.role === "Unit" || createForm.value.role === "Outlet" ? (openBlock(), createBlock(VRow, { key: 0 }, {
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
                                    default: withCtx(() => {
                                      var _a;
                                      return [
                                        createVNode(VSelect, {
                                          modelValue: createForm.value.unit_id,
                                          "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                          density: "comfortable",
                                          label: "Pilih unit",
                                          items: units.value,
                                          "item-value": "id",
                                          "item-title": "name",
                                          hint: (_a = selectedUnit.value) == null ? void 0 : _a.location,
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
                              })) : createCommentVNode("", true),
                              createForm.value.role === "Outlet" ? (openBlock(), createBlock(VRow, { key: 1 }, {
                                default: withCtx(() => [
                                  createVNode(VCol, { cols: "3" }, {
                                    default: withCtx(() => [
                                      createVNode(VListSubheader, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Outlet")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        modelValue: createForm.value.outlet_id,
                                        "onUpdate:modelValue": ($event) => createForm.value.outlet_id = $event,
                                        density: "comfortable",
                                        label: "Pilih outlet",
                                        items: outletList.value,
                                        "item-value": "id",
                                        "item-title": "name",
                                        "persistent-hint": "",
                                        class: "mb-4",
                                        variant: "outlined"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              })) : createCommentVNode("", true),
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, { cols: "3" }, {
                                    default: withCtx(() => [
                                      createVNode(VListSubheader, null, {
                                        default: withCtx(() => [
                                          createTextVNode("Password")
                                        ]),
                                        _: 1
                                      })
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, { cols: "9" }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: createForm.value.password,
                                        "onUpdate:modelValue": ($event) => createForm.value.password = $event,
                                        "append-icon": show1.value ? "bx-show" : "bx-hide",
                                        rules: [rules.required, rules.min],
                                        type: show1.value ? "text" : "password",
                                        hint: "At least 6 characters",
                                        name: "input-10-1",
                                        counter: "",
                                        "onClick:append": ($event) => show1.value = !show1.value
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "append-icon", "rules", "type", "onClick:append"])
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
                                onClick: handleCreateUser
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
                            createTextVNode("Tambah User")
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
                                        createTextVNode("Email")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: createForm.value.email,
                                      "onUpdate:modelValue": ($event) => createForm.value.email = $event,
                                      "persistent-hint": "",
                                      placeholder: "johndoe@gmail.com",
                                      type: "email"
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
                                      placeholder: "John Doe",
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
                                        createTextVNode("No Telp")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: createForm.value.phone,
                                      "onUpdate:modelValue": ($event) => createForm.value.phone = $event,
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
                                    createVNode(VTextarea, {
                                      modelValue: createForm.value.address,
                                      "onUpdate:modelValue": ($event) => createForm.value.address = $event,
                                      variant: "outlined"
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
                                        createTextVNode("Role")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      modelValue: createForm.value.role,
                                      "onUpdate:modelValue": ($event) => createForm.value.role = $event,
                                      density: "comfortable",
                                      items: ["Customer", "Unit", "Outlet", "Superadmin"],
                                      class: "mb-4"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            }),
                            createForm.value.role === "Unit" || createForm.value.role === "Outlet" ? (openBlock(), createBlock(VRow, { key: 0 }, {
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
                                  default: withCtx(() => {
                                    var _a;
                                    return [
                                      createVNode(VSelect, {
                                        modelValue: createForm.value.unit_id,
                                        "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                        density: "comfortable",
                                        label: "Pilih unit",
                                        items: units.value,
                                        "item-value": "id",
                                        "item-title": "name",
                                        hint: (_a = selectedUnit.value) == null ? void 0 : _a.location,
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
                            })) : createCommentVNode("", true),
                            createForm.value.role === "Outlet" ? (openBlock(), createBlock(VRow, { key: 1 }, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Outlet")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      modelValue: createForm.value.outlet_id,
                                      "onUpdate:modelValue": ($event) => createForm.value.outlet_id = $event,
                                      density: "comfortable",
                                      label: "Pilih outlet",
                                      items: outletList.value,
                                      "item-value": "id",
                                      "item-title": "name",
                                      "persistent-hint": "",
                                      class: "mb-4",
                                      variant: "outlined"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 1
                            })) : createCommentVNode("", true),
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, { cols: "3" }, {
                                  default: withCtx(() => [
                                    createVNode(VListSubheader, null, {
                                      default: withCtx(() => [
                                        createTextVNode("Password")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, { cols: "9" }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: createForm.value.password,
                                      "onUpdate:modelValue": ($event) => createForm.value.password = $event,
                                      "append-icon": show1.value ? "bx-show" : "bx-hide",
                                      rules: [rules.required, rules.min],
                                      type: show1.value ? "text" : "password",
                                      hint: "At least 6 characters",
                                      name: "input-10-1",
                                      counter: "",
                                      "onClick:append": ($event) => show1.value = !show1.value
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "append-icon", "rules", "type", "onClick:append"])
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
                              onClick: handleCreateUser
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
                text: "Tambah User",
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
                          createTextVNode("Tambah User")
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
                                      createTextVNode("Email")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: createForm.value.email,
                                    "onUpdate:modelValue": ($event) => createForm.value.email = $event,
                                    "persistent-hint": "",
                                    placeholder: "johndoe@gmail.com",
                                    type: "email"
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
                                    placeholder: "John Doe",
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
                                      createTextVNode("No Telp")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: createForm.value.phone,
                                    "onUpdate:modelValue": ($event) => createForm.value.phone = $event,
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
                                  createVNode(VTextarea, {
                                    modelValue: createForm.value.address,
                                    "onUpdate:modelValue": ($event) => createForm.value.address = $event,
                                    variant: "outlined"
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
                                      createTextVNode("Role")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VSelect, {
                                    modelValue: createForm.value.role,
                                    "onUpdate:modelValue": ($event) => createForm.value.role = $event,
                                    density: "comfortable",
                                    items: ["Customer", "Unit", "Outlet", "Superadmin"],
                                    class: "mb-4"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }),
                          createForm.value.role === "Unit" || createForm.value.role === "Outlet" ? (openBlock(), createBlock(VRow, { key: 0 }, {
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
                                default: withCtx(() => {
                                  var _a;
                                  return [
                                    createVNode(VSelect, {
                                      modelValue: createForm.value.unit_id,
                                      "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                      density: "comfortable",
                                      label: "Pilih unit",
                                      items: units.value,
                                      "item-value": "id",
                                      "item-title": "name",
                                      hint: (_a = selectedUnit.value) == null ? void 0 : _a.location,
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
                          })) : createCommentVNode("", true),
                          createForm.value.role === "Outlet" ? (openBlock(), createBlock(VRow, { key: 1 }, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "3" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Outlet")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VSelect, {
                                    modelValue: createForm.value.outlet_id,
                                    "onUpdate:modelValue": ($event) => createForm.value.outlet_id = $event,
                                    density: "comfortable",
                                    label: "Pilih outlet",
                                    items: outletList.value,
                                    "item-value": "id",
                                    "item-title": "name",
                                    "persistent-hint": "",
                                    class: "mb-4",
                                    variant: "outlined"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, { cols: "3" }, {
                                default: withCtx(() => [
                                  createVNode(VListSubheader, null, {
                                    default: withCtx(() => [
                                      createTextVNode("Password")
                                    ]),
                                    _: 1
                                  })
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, { cols: "9" }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: createForm.value.password,
                                    "onUpdate:modelValue": ($event) => createForm.value.password = $event,
                                    "append-icon": show1.value ? "bx-show" : "bx-hide",
                                    rules: [rules.required, rules.min],
                                    type: show1.value ? "text" : "password",
                                    hint: "At least 6 characters",
                                    name: "input-10-1",
                                    counter: "",
                                    "onClick:append": ($event) => show1.value = !show1.value
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "append-icon", "rules", "type", "onClick:append"])
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
                            onClick: handleCreateUser
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
                    modelValue: search.value,
                    "onUpdate:modelValue": ($event) => search.value = $event,
                    label: "Search...",
                    onInput: fetchUsers,
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
                      onInput: fetchUsers,
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
                  _push3(`<thead${_scopeId2}><tr${_scopeId2}><th${_scopeId2}>#</th><th${_scopeId2}>Name</th><th${_scopeId2}>Email</th><th${_scopeId2}>No Telp</th><th${_scopeId2}>Alamat</th><th${_scopeId2}>Role</th><th${_scopeId2}>Aksi</th></tr></thead><tbody${_scopeId2}>`);
                  if (!isLoading.value && users.value.length === 0) {
                    _push3(`<tr${_scopeId2}><td colspan="6" class="text-center"${_scopeId2}>Tidak ada data</td></tr>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList(users.value, (user, index) => {
                    var _a, _b, _c;
                    _push3(`<tr${_scopeId2}><td${_scopeId2}>${ssrInterpolate(index + 1 + (page.value - 1) * limit)}</td><td${_scopeId2}>${ssrInterpolate(user.name)}</td><td${_scopeId2}>${ssrInterpolate(user.email)}</td><td${_scopeId2}>${ssrInterpolate(((_a = user.phone) == null ? void 0 : _a.trim()) !== "" ? user.phone : "-")}</td><td${_scopeId2}>${ssrInterpolate(((_b = user.address) == null ? void 0 : _b.trim()) !== "" ? user.address : "-")}</td><td${_scopeId2}>${ssrInterpolate(((_c = user.role) == null ? void 0 : _c.trim()) !== "" ? user.role : "Customer")}</td><td${_scopeId2}>`);
                    _push3(ssrRenderComponent(VBtn, {
                      icon: "",
                      variant: "text",
                      size: "small",
                      onClick: ($event) => openEditModal(user)
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
                      onClick: ($event) => confirmDelete(user.id)
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
                        createVNode("th", null, "Email"),
                        createVNode("th", null, "No Telp"),
                        createVNode("th", null, "Alamat"),
                        createVNode("th", null, "Role"),
                        createVNode("th", null, "Aksi")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      !isLoading.value && users.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "6",
                          class: "text-center"
                        }, "Tidak ada data")
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(users.value, (user, index) => {
                        var _a, _b, _c;
                        return openBlock(), createBlock("tr", {
                          key: user.id
                        }, [
                          createVNode("td", null, toDisplayString(index + 1 + (page.value - 1) * limit), 1),
                          createVNode("td", null, toDisplayString(user.name), 1),
                          createVNode("td", null, toDisplayString(user.email), 1),
                          createVNode("td", null, toDisplayString(((_a = user.phone) == null ? void 0 : _a.trim()) !== "" ? user.phone : "-"), 1),
                          createVNode("td", null, toDisplayString(((_b = user.address) == null ? void 0 : _b.trim()) !== "" ? user.address : "-"), 1),
                          createVNode("td", null, toDisplayString(((_c = user.role) == null ? void 0 : _c.trim()) !== "" ? user.role : "Customer"), 1),
                          createVNode("td", null, [
                            createVNode(VBtn, {
                              icon: "",
                              variant: "text",
                              size: "small",
                              onClick: ($event) => openEditModal(user)
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
                              onClick: ($event) => confirmDelete(user.id)
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
                    onInput: fetchUsers,
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
                      createVNode("th", null, "Email"),
                      createVNode("th", null, "No Telp"),
                      createVNode("th", null, "Alamat"),
                      createVNode("th", null, "Role"),
                      createVNode("th", null, "Aksi")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    !isLoading.value && users.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                      createVNode("td", {
                        colspan: "6",
                        class: "text-center"
                      }, "Tidak ada data")
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(users.value, (user, index) => {
                      var _a, _b, _c;
                      return openBlock(), createBlock("tr", {
                        key: user.id
                      }, [
                        createVNode("td", null, toDisplayString(index + 1 + (page.value - 1) * limit), 1),
                        createVNode("td", null, toDisplayString(user.name), 1),
                        createVNode("td", null, toDisplayString(user.email), 1),
                        createVNode("td", null, toDisplayString(((_a = user.phone) == null ? void 0 : _a.trim()) !== "" ? user.phone : "-"), 1),
                        createVNode("td", null, toDisplayString(((_b = user.address) == null ? void 0 : _b.trim()) !== "" ? user.address : "-"), 1),
                        createVNode("td", null, toDisplayString(((_c = user.role) == null ? void 0 : _c.trim()) !== "" ? user.role : "Customer"), 1),
                        createVNode("td", null, [
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            size: "small",
                            onClick: ($event) => openEditModal(user)
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
                            onClick: ($event) => confirmDelete(user.id)
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
        "max-width": "500"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Edit User`);
                      } else {
                        return [
                          createTextVNode("Edit User")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VTextField, {
                          label: "Name",
                          modelValue: editForm.value.name,
                          "onUpdate:modelValue": ($event) => editForm.value.name = $event
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VTextField, {
                          label: "Email",
                          modelValue: editForm.value.email,
                          "onUpdate:modelValue": ($event) => editForm.value.email = $event
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VTextField, {
                            label: "Name",
                            modelValue: editForm.value.name,
                            "onUpdate:modelValue": ($event) => editForm.value.name = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                          createVNode(VTextField, {
                            label: "Email",
                            modelValue: editForm.value.email,
                            "onUpdate:modelValue": ($event) => editForm.value.email = $event
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          onClick: ($event) => showEdit.value = false
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "primary",
                          onClick: saveEdit
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Simpan`);
                            } else {
                              return [
                                createTextVNode("Simpan")
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
                            onClick: ($event) => showEdit.value = false
                          }, null, 8, ["onClick"]),
                          createVNode(VBtn, {
                            color: "primary",
                            onClick: saveEdit
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
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Edit User")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VTextField, {
                          label: "Name",
                          modelValue: editForm.value.name,
                          "onUpdate:modelValue": ($event) => editForm.value.name = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                        createVNode(VTextField, {
                          label: "Email",
                          modelValue: editForm.value.email,
                          "onUpdate:modelValue": ($event) => editForm.value.email = $event
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          onClick: saveEdit
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
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, null, {
                    default: withCtx(() => [
                      createTextVNode("Edit User")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VTextField, {
                        label: "Name",
                        modelValue: editForm.value.name,
                        "onUpdate:modelValue": ($event) => editForm.value.name = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"]),
                      createVNode(VTextField, {
                        label: "Email",
                        modelValue: editForm.value.email,
                        "onUpdate:modelValue": ($event) => editForm.value.email = $event
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                        onClick: saveEdit
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
      }, _parent));
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
