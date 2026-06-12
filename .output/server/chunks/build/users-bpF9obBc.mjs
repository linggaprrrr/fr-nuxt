import { defineComponent, ref, watch, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, Fragment, renderList, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useUsers } from './useUsers-hcBemT-c.mjs';
import { V as VCard, a as VCardText, b as VCardActions, c as VCardTitle } from './VCard-DLk5PTHl.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
import { V as VTable } from './VTable-BXA3D1kT.mjs';
import { a as VBtn, b as VIcon } from './server.mjs';
import { V as VPagination } from './VPagination-z_-yTplN.mjs';
import { V as VDialog } from './VDialog-yRDXDq_T.mjs';
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

const limit = 24;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "users",
  __ssrInlineRender: true,
  setup(__props) {
    const { getUsers, updateUserById, deleteUserById } = useUsers();
    const page = ref(1);
    const total = ref(0);
    const isLoading = ref(false);
    const users = ref([]);
    const search = ref("");
    const showEdit = ref(false);
    const editForm = ref({
      id: "",
      name: "",
      email: "",
      password: "",
      phone: "",
      address: "",
      picture: ""
    });
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
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VCard, {
        title: "Users Table",
        class: "mb-4"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VTextField, {
                    modelValue: search.value,
                    "onUpdate:modelValue": ($event) => search.value = $event,
                    label: "Cari user...",
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
                      label: "Cari user...",
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
                    label: "Cari user...",
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/units/users.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
