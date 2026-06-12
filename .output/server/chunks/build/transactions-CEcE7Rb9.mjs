import { defineComponent, ref, watch, withCtx, createVNode, unref, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { u as useTransactions } from './useTransactions-D60nhhiq.mjs';
import dayjs from 'dayjs';
import { V as VCard, a as VCardText, b as VCardActions } from './VCard-DLk5PTHl.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
import { V as VTable } from './VTable-BXA3D1kT.mjs';
import { V as VChip } from './VChip-C44NlS62.mjs';
import { a as VBtn, b as VIcon } from './server.mjs';
import { V as VPagination } from './VPagination-z_-yTplN.mjs';
import { V as VDialog } from './VDialog-yRDXDq_T.mjs';
import { V as VAlert } from './VAlert-DeVcT1vO.mjs';
import { V as VSelect } from './VSelect-Bxz-WhQz.mjs';
import './authFetch-5wQjlWwJ.mjs';
import './index-ewhk7FTz.mjs';
import './forwardRefs-BSTjJZPU.mjs';
import './VSlideGroup-J1shNAVo.mjs';
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
import './VListSubheader-BbgyaiQc.mjs';
import './VCheckboxBtn-DaRBpQ2e.mjs';

const limit = 24;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "transactions",
  __ssrInlineRender: true,
  setup(__props) {
    const {
      transactions,
      loading,
      error,
      getTransactions,
      updateTransactionStatus,
      deleteTransaction
    } = useTransactions();
    const page = ref(1);
    const total = ref(0);
    const search = ref("");
    const fetchTransactions = async () => {
      await getTransactions({ page: page.value, limit, search: search.value });
      if (transactions.value) {
        total.value = transactions.value.total;
      }
    };
    watch([page, search], fetchTransactions);
    const handleDelete = async (id) => {
      if (confirm("Hapus transaksi ini?")) {
        await deleteTransaction(id);
        fetchTransactions();
      }
    };
    const editDialog = ref(false);
    const editingTrxId = ref("");
    const editingStatus = ref("");
    const statusOptions = [
      { title: "Pending", value: "pending" },
      { title: "Lunas", value: "paid" },
      { title: "Dibatalkan", value: "cancelled" },
      { title: "Kadaluarsa", value: "expired" }
    ];
    const openEditDialog = (trx) => {
      editingTrxId.value = trx.id;
      editingStatus.value = trx.status;
      editDialog.value = true;
    };
    const handleUpdateStatus = async () => {
      await updateTransactionStatus(editingTrxId.value, editingStatus.value);
      if (!error.value) editDialog.value = false;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VCard, {
        title: "Daftar Transaksi",
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
                var _a, _b, _c, _d, _e, _f;
                if (_push3) {
                  _push3(`<thead${_scopeId2}><tr${_scopeId2}><th${_scopeId2}>#</th><th${_scopeId2}>Kode Transaksi</th><th${_scopeId2}>Email</th><th${_scopeId2}>Jumlah Foto</th><th${_scopeId2}>Final Price</th><th${_scopeId2}>Status</th><th${_scopeId2}>Waktu Bayar</th><th${_scopeId2}>Dibuat</th><th${_scopeId2}>Aksi</th></tr></thead><tbody${_scopeId2}>`);
                  if (!unref(loading) && ((_b = (_a = unref(transactions)) == null ? void 0 : _a.data) == null ? void 0 : _b.length) === 0) {
                    _push3(`<tr${_scopeId2}><td colspan="13" class="text-center"${_scopeId2}>Tidak ada data</td></tr>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList((_c = unref(transactions)) == null ? void 0 : _c.data, (trx, index) => {
                    var _a3, _b2;
                    var _a2;
                    _push3(`<tr${_scopeId2}><td${_scopeId2}>${ssrInterpolate(index + 1 + (page.value - 1) * limit)}</td><td${_scopeId2}>${ssrInterpolate((_a3 = trx.trx_code) != null ? _a3 : "-")}</td><td${_scopeId2}>${ssrInterpolate((_b2 = (_a2 = trx.user) == null ? void 0 : _a2.email) != null ? _b2 : "-")}</td><td class="text-center"${_scopeId2}>${ssrInterpolate(trx.photos.length)}</td><td${_scopeId2}>Rp ${ssrInterpolate(trx.final_price.toLocaleString("id-ID"))}</td><td${_scopeId2}>`);
                    _push3(ssrRenderComponent(VChip, {
                      color: trx.status === "paid" ? "success" : trx.status === "cancelled" ? "error" : trx.status === "expired" ? "grey" : "warning",
                      size: "small"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(trx.status === "paid" ? "Lunas" : trx.status === "cancelled" ? "Dibatalkan" : trx.status === "expired" ? "Kadaluarsa" : "Pending")}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(trx.status === "paid" ? "Lunas" : trx.status === "cancelled" ? "Dibatalkan" : trx.status === "expired" ? "Kadaluarsa" : "Pending"), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</td><td${_scopeId2}>${ssrInterpolate(trx.paid_at ? new Date(trx.paid_at).toLocaleString("id-ID") : "-")}</td> ${ssrInterpolate(unref(dayjs)(trx.created_at).format("DD/MM/YYYY HH:mm"))} <td${_scopeId2}>`);
                    _push3(ssrRenderComponent(VBtn, {
                      icon: "",
                      variant: "text",
                      size: "small",
                      onClick: ($event) => openEditDialog(trx)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VIcon, { color: "primary" }, {
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
                            createVNode(VIcon, { color: "primary" }, {
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
                      onClick: ($event) => handleDelete(trx.id)
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
                        createVNode("th", null, "Kode Transaksi"),
                        createVNode("th", null, "Email"),
                        createVNode("th", null, "Jumlah Foto"),
                        createVNode("th", null, "Final Price"),
                        createVNode("th", null, "Status"),
                        createVNode("th", null, "Waktu Bayar"),
                        createVNode("th", null, "Dibuat"),
                        createVNode("th", null, "Aksi")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      !unref(loading) && ((_e = (_d = unref(transactions)) == null ? void 0 : _d.data) == null ? void 0 : _e.length) === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "13",
                          class: "text-center"
                        }, "Tidak ada data")
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList((_f = unref(transactions)) == null ? void 0 : _f.data, (trx, index) => {
                        var _a3, _b2;
                        var _a2;
                        return openBlock(), createBlock("tr", {
                          key: trx.id
                        }, [
                          createVNode("td", null, toDisplayString(index + 1 + (page.value - 1) * limit), 1),
                          createVNode("td", null, toDisplayString((_a3 = trx.trx_code) != null ? _a3 : "-"), 1),
                          createVNode("td", null, toDisplayString((_b2 = (_a2 = trx.user) == null ? void 0 : _a2.email) != null ? _b2 : "-"), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(trx.photos.length), 1),
                          createVNode("td", null, "Rp " + toDisplayString(trx.final_price.toLocaleString("id-ID")), 1),
                          createVNode("td", null, [
                            createVNode(VChip, {
                              color: trx.status === "paid" ? "success" : trx.status === "cancelled" ? "error" : trx.status === "expired" ? "grey" : "warning",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(trx.status === "paid" ? "Lunas" : trx.status === "cancelled" ? "Dibatalkan" : trx.status === "expired" ? "Kadaluarsa" : "Pending"), 1)
                              ]),
                              _: 2
                            }, 1032, ["color"])
                          ]),
                          createVNode("td", null, toDisplayString(trx.paid_at ? new Date(trx.paid_at).toLocaleString("id-ID") : "-"), 1),
                          createTextVNode(" " + toDisplayString(unref(dayjs)(trx.created_at).format("DD/MM/YYYY HH:mm")) + " ", 1),
                          createVNode("td", null, [
                            createVNode(VBtn, {
                              icon: "",
                              variant: "text",
                              size: "small",
                              onClick: ($event) => openEditDialog(trx)
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, { color: "primary" }, {
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
                              onClick: ($event) => handleDelete(trx.id)
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
                default: withCtx(() => {
                  var _a, _b, _c;
                  return [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", null, "#"),
                        createVNode("th", null, "Kode Transaksi"),
                        createVNode("th", null, "Email"),
                        createVNode("th", null, "Jumlah Foto"),
                        createVNode("th", null, "Final Price"),
                        createVNode("th", null, "Status"),
                        createVNode("th", null, "Waktu Bayar"),
                        createVNode("th", null, "Dibuat"),
                        createVNode("th", null, "Aksi")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      !unref(loading) && ((_b = (_a = unref(transactions)) == null ? void 0 : _a.data) == null ? void 0 : _b.length) === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "13",
                          class: "text-center"
                        }, "Tidak ada data")
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList((_c = unref(transactions)) == null ? void 0 : _c.data, (trx, index) => {
                        var _a3, _b2;
                        var _a2;
                        return openBlock(), createBlock("tr", {
                          key: trx.id
                        }, [
                          createVNode("td", null, toDisplayString(index + 1 + (page.value - 1) * limit), 1),
                          createVNode("td", null, toDisplayString((_a3 = trx.trx_code) != null ? _a3 : "-"), 1),
                          createVNode("td", null, toDisplayString((_b2 = (_a2 = trx.user) == null ? void 0 : _a2.email) != null ? _b2 : "-"), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(trx.photos.length), 1),
                          createVNode("td", null, "Rp " + toDisplayString(trx.final_price.toLocaleString("id-ID")), 1),
                          createVNode("td", null, [
                            createVNode(VChip, {
                              color: trx.status === "paid" ? "success" : trx.status === "cancelled" ? "error" : trx.status === "expired" ? "grey" : "warning",
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(trx.status === "paid" ? "Lunas" : trx.status === "cancelled" ? "Dibatalkan" : trx.status === "expired" ? "Kadaluarsa" : "Pending"), 1)
                              ]),
                              _: 2
                            }, 1032, ["color"])
                          ]),
                          createVNode("td", null, toDisplayString(trx.paid_at ? new Date(trx.paid_at).toLocaleString("id-ID") : "-"), 1),
                          createTextVNode(" " + toDisplayString(unref(dayjs)(trx.created_at).format("DD/MM/YYYY HH:mm")) + " ", 1),
                          createVNode("td", null, [
                            createVNode(VBtn, {
                              icon: "",
                              variant: "text",
                              size: "small",
                              onClick: ($event) => openEditDialog(trx)
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, { color: "primary" }, {
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
                              onClick: ($event) => handleDelete(trx.id)
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
                }),
                _: 2
              }, 1024),
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
        modelValue: editDialog.value,
        "onUpdate:modelValue": ($event) => editDialog.value = $event,
        "max-width": "400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, { title: "Edit Status Transaksi" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(error)) {
                          _push4(ssrRenderComponent(VAlert, {
                            type: "error",
                            class: "mb-4",
                            density: "compact"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(unref(error))}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unref(error)), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<!---->`);
                        }
                        _push4(ssrRenderComponent(VSelect, {
                          modelValue: editingStatus.value,
                          "onUpdate:modelValue": ($event) => editingStatus.value = $event,
                          items: statusOptions,
                          "item-title": "title",
                          "item-value": "value",
                          label: "Status",
                          variant: "outlined"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          unref(error) ? (openBlock(), createBlock(VAlert, {
                            key: 0,
                            type: "error",
                            class: "mb-4",
                            density: "compact"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(error)), 1)
                            ]),
                            _: 1
                          })) : createCommentVNode("", true),
                          createVNode(VSelect, {
                            modelValue: editingStatus.value,
                            "onUpdate:modelValue": ($event) => editingStatus.value = $event,
                            items: statusOptions,
                            "item-title": "title",
                            "item-value": "value",
                            label: "Status",
                            variant: "outlined"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, { class: "justify-end" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VBtn, {
                          variant: "text",
                          onClick: ($event) => editDialog.value = false
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
                          loading: unref(loading),
                          onClick: handleUpdateStatus
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
                          createVNode(VBtn, {
                            variant: "text",
                            onClick: ($event) => editDialog.value = false
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Batal")
                            ]),
                            _: 1
                          }, 8, ["onClick"]),
                          createVNode(VBtn, {
                            color: "primary",
                            loading: unref(loading),
                            onClick: handleUpdateStatus
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Simpan")
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
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        unref(error) ? (openBlock(), createBlock(VAlert, {
                          key: 0,
                          type: "error",
                          class: "mb-4",
                          density: "compact"
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(error)), 1)
                          ]),
                          _: 1
                        })) : createCommentVNode("", true),
                        createVNode(VSelect, {
                          modelValue: editingStatus.value,
                          "onUpdate:modelValue": ($event) => editingStatus.value = $event,
                          items: statusOptions,
                          "item-title": "title",
                          "item-value": "value",
                          label: "Status",
                          variant: "outlined"
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, { class: "justify-end" }, {
                      default: withCtx(() => [
                        createVNode(VBtn, {
                          variant: "text",
                          onClick: ($event) => editDialog.value = false
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Batal")
                          ]),
                          _: 1
                        }, 8, ["onClick"]),
                        createVNode(VBtn, {
                          color: "primary",
                          loading: unref(loading),
                          onClick: handleUpdateStatus
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Simpan")
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
              createVNode(VCard, { title: "Edit Status Transaksi" }, {
                default: withCtx(() => [
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      unref(error) ? (openBlock(), createBlock(VAlert, {
                        key: 0,
                        type: "error",
                        class: "mb-4",
                        density: "compact"
                      }, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(error)), 1)
                        ]),
                        _: 1
                      })) : createCommentVNode("", true),
                      createVNode(VSelect, {
                        modelValue: editingStatus.value,
                        "onUpdate:modelValue": ($event) => editingStatus.value = $event,
                        items: statusOptions,
                        "item-title": "title",
                        "item-value": "value",
                        label: "Status",
                        variant: "outlined"
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, { class: "justify-end" }, {
                    default: withCtx(() => [
                      createVNode(VBtn, {
                        variant: "text",
                        onClick: ($event) => editDialog.value = false
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Batal")
                        ]),
                        _: 1
                      }, 8, ["onClick"]),
                      createVNode(VBtn, {
                        color: "primary",
                        loading: unref(loading),
                        onClick: handleUpdateStatus
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Simpan")
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
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/transactions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
