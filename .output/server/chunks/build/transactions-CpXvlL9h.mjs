import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useReports, x as xlsxExports } from './useReports-DnK2mqp-.mjs';
import { saveAs } from 'file-saver';
import { V as VCard, a as VCardText } from './VCard-DLk5PTHl.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
import { a as VBtn } from './server.mjs';
import { V as VTable } from './VTable-BXA3D1kT.mjs';
import '/Applications/MAMP/htdocs/nuxtjs/dufansnap/node_modules/xlsx/dist/cpexcel.js';
import 'fs';
import 'stream';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "transactions",
  __ssrInlineRender: true,
  setup(__props) {
    const transactions = ref([]);
    const totalPendapatan = ref(0);
    const jumlahTransaksi = ref(0);
    function formatDateToYYYYMMDD(date) {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    }
    const today = /* @__PURE__ */ new Date();
    const defaultStart = /* @__PURE__ */ new Date("2025-05-10");
    const startDate = ref(formatDateToYYYYMMDD(defaultStart));
    const endDate = ref(formatDateToYYYYMMDD(today));
    const { getTransactionsReport } = useReports();
    const fetchTransactions = async () => {
      const result = await getTransactionsReport(startDate.value, endDate.value);
      transactions.value = result.data;
      totalPendapatan.value = result.total_pendapatan;
      jumlahTransaksi.value = result.jumlah_transaksi;
    };
    const exportToExcel = () => {
      if (transactions.value.length === 0) {
        alert("Data transaksi kosong, tidak bisa diexport!");
        return;
      }
      const exportData = transactions.value.map((trx, index) => ({
        No: index + 1,
        Tanggal: trx.tanggal,
        "Jumlah Transaksi": trx.total_transaksi,
        "Total Pendapatan": trx.total_pendapatan
      }));
      const worksheet = xlsxExports.utils.json_to_sheet(exportData);
      const workbook = xlsxExports.utils.book_new();
      xlsxExports.utils.book_append_sheet(workbook, worksheet, "Transaksi");
      const wbout = xlsxExports.write(workbook, { bookType: "xlsx", type: "array" });
      saveAs(new Blob([wbout], { type: "application/octet-stream" }), "transaksi.xlsx");
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(VCard), {
        class: "mb-4",
        title: "Filter Tanggal"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(VCardText), null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(VRow), { dense: "" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(VCol), {
                          cols: "12",
                          md: "4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(VTextField), {
                                modelValue: startDate.value,
                                "onUpdate:modelValue": ($event) => startDate.value = $event,
                                label: "Start Date",
                                type: "date",
                                variant: "outlined"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(VTextField), {
                                  modelValue: startDate.value,
                                  "onUpdate:modelValue": ($event) => startDate.value = $event,
                                  label: "Start Date",
                                  type: "date",
                                  variant: "outlined"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(VCol), {
                          cols: "12",
                          md: "4"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(VTextField), {
                                modelValue: endDate.value,
                                "onUpdate:modelValue": ($event) => endDate.value = $event,
                                label: "End Date",
                                type: "date",
                                variant: "outlined"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(VTextField), {
                                  modelValue: endDate.value,
                                  "onUpdate:modelValue": ($event) => endDate.value = $event,
                                  label: "End Date",
                                  type: "date",
                                  variant: "outlined"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(VCol), {
                          cols: "12",
                          md: "4",
                          class: "d-flex align-center"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(VBtn), {
                                color: "primary",
                                class: "mr-4",
                                onClick: fetchTransactions
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Terapkan`);
                                  } else {
                                    return [
                                      createTextVNode("Terapkan")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(VBtn), {
                                color: "success",
                                onClick: exportToExcel
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Export`);
                                  } else {
                                    return [
                                      createTextVNode("Export")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(VBtn), {
                                  color: "primary",
                                  class: "mr-4",
                                  onClick: fetchTransactions
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Terapkan")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(VBtn), {
                                  color: "success",
                                  onClick: exportToExcel
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Export")
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
                          createVNode(unref(VCol), {
                            cols: "12",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(VTextField), {
                                modelValue: startDate.value,
                                "onUpdate:modelValue": ($event) => startDate.value = $event,
                                label: "Start Date",
                                type: "date",
                                variant: "outlined"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(VCol), {
                            cols: "12",
                            md: "4"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(VTextField), {
                                modelValue: endDate.value,
                                "onUpdate:modelValue": ($event) => endDate.value = $event,
                                label: "End Date",
                                type: "date",
                                variant: "outlined"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(VCol), {
                            cols: "12",
                            md: "4",
                            class: "d-flex align-center"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(VBtn), {
                                color: "primary",
                                class: "mr-4",
                                onClick: fetchTransactions
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Terapkan")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(VBtn), {
                                color: "success",
                                onClick: exportToExcel
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Export")
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
                    createVNode(unref(VRow), { dense: "" }, {
                      default: withCtx(() => [
                        createVNode(unref(VCol), {
                          cols: "12",
                          md: "4"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(VTextField), {
                              modelValue: startDate.value,
                              "onUpdate:modelValue": ($event) => startDate.value = $event,
                              label: "Start Date",
                              type: "date",
                              variant: "outlined"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(VCol), {
                          cols: "12",
                          md: "4"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(VTextField), {
                              modelValue: endDate.value,
                              "onUpdate:modelValue": ($event) => endDate.value = $event,
                              label: "End Date",
                              type: "date",
                              variant: "outlined"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(VCol), {
                          cols: "12",
                          md: "4",
                          class: "d-flex align-center"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(VBtn), {
                              color: "primary",
                              class: "mr-4",
                              onClick: fetchTransactions
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Terapkan")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(VBtn), {
                              color: "success",
                              onClick: exportToExcel
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Export")
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
              createVNode(unref(VCardText), null, {
                default: withCtx(() => [
                  createVNode(unref(VRow), { dense: "" }, {
                    default: withCtx(() => [
                      createVNode(unref(VCol), {
                        cols: "12",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(VTextField), {
                            modelValue: startDate.value,
                            "onUpdate:modelValue": ($event) => startDate.value = $event,
                            label: "Start Date",
                            type: "date",
                            variant: "outlined"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(VCol), {
                        cols: "12",
                        md: "4"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(VTextField), {
                            modelValue: endDate.value,
                            "onUpdate:modelValue": ($event) => endDate.value = $event,
                            label: "End Date",
                            type: "date",
                            variant: "outlined"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(VCol), {
                        cols: "12",
                        md: "4",
                        class: "d-flex align-center"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(VBtn), {
                            color: "primary",
                            class: "mr-4",
                            onClick: fetchTransactions
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Terapkan")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(VBtn), {
                            color: "success",
                            onClick: exportToExcel
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Export")
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
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(unref(VRow), {
        class: "mb-4",
        dense: ""
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(VCol), {
              cols: "12",
              md: "6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(VCard), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(VCardText), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-subtitle-1"${_scopeId4}>Total Pendapatan</div><div class="text-h5 font-weight-bold"${_scopeId4}>Rp ${ssrInterpolate(totalPendapatan.value.toLocaleString())}</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-subtitle-1" }, "Total Pendapatan"),
                                createVNode("div", { class: "text-h5 font-weight-bold" }, "Rp " + toDisplayString(totalPendapatan.value.toLocaleString()), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(VCardText), null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-subtitle-1" }, "Total Pendapatan"),
                              createVNode("div", { class: "text-h5 font-weight-bold" }, "Rp " + toDisplayString(totalPendapatan.value.toLocaleString()), 1)
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
                    createVNode(unref(VCard), null, {
                      default: withCtx(() => [
                        createVNode(unref(VCardText), null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-subtitle-1" }, "Total Pendapatan"),
                            createVNode("div", { class: "text-h5 font-weight-bold" }, "Rp " + toDisplayString(totalPendapatan.value.toLocaleString()), 1)
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
            _push2(ssrRenderComponent(unref(VCol), {
              cols: "12",
              md: "6"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(unref(VCard), null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(unref(VCardText), null, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`<div class="text-subtitle-1"${_scopeId4}>Total Transaksi</div><div class="text-h5 font-weight-bold"${_scopeId4}>${ssrInterpolate(jumlahTransaksi.value)}</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-subtitle-1" }, "Total Transaksi"),
                                createVNode("div", { class: "text-h5 font-weight-bold" }, toDisplayString(jumlahTransaksi.value), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(VCardText), null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-subtitle-1" }, "Total Transaksi"),
                              createVNode("div", { class: "text-h5 font-weight-bold" }, toDisplayString(jumlahTransaksi.value), 1)
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
                    createVNode(unref(VCard), null, {
                      default: withCtx(() => [
                        createVNode(unref(VCardText), null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-subtitle-1" }, "Total Transaksi"),
                            createVNode("div", { class: "text-h5 font-weight-bold" }, toDisplayString(jumlahTransaksi.value), 1)
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
              createVNode(unref(VCol), {
                cols: "12",
                md: "6"
              }, {
                default: withCtx(() => [
                  createVNode(unref(VCard), null, {
                    default: withCtx(() => [
                      createVNode(unref(VCardText), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-subtitle-1" }, "Total Pendapatan"),
                          createVNode("div", { class: "text-h5 font-weight-bold" }, "Rp " + toDisplayString(totalPendapatan.value.toLocaleString()), 1)
                        ]),
                        _: 2
                      }, 1024)
                    ]),
                    _: 2
                  }, 1024)
                ]),
                _: 2
              }, 1024),
              createVNode(unref(VCol), {
                cols: "12",
                md: "6"
              }, {
                default: withCtx(() => [
                  createVNode(unref(VCard), null, {
                    default: withCtx(() => [
                      createVNode(unref(VCardText), null, {
                        default: withCtx(() => [
                          createVNode("div", { class: "text-subtitle-1" }, "Total Transaksi"),
                          createVNode("div", { class: "text-h5 font-weight-bold" }, toDisplayString(jumlahTransaksi.value), 1)
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
      _push(ssrRenderComponent(unref(VCard), { title: "Daftar Transaksi" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(VTable), { density: "compact" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<thead${_scopeId2}><tr${_scopeId2}><th class="text-center"${_scopeId2}>#</th><th class="text-center"${_scopeId2}>Tanggal</th><th class="text-center"${_scopeId2}>Jumlah Transaksi</th><th class="text-center"${_scopeId2}>Total Pendapatan</th></tr></thead><tbody${_scopeId2}>`);
                  if (transactions.value.length === 0) {
                    _push3(`<tr${_scopeId2}><td colspan="4" class="text-center"${_scopeId2}>Tidak ada data</td></tr>`);
                  } else {
                    _push3(`<!--[-->`);
                    ssrRenderList(transactions.value, (trx, index) => {
                      _push3(`<tr${_scopeId2}><td class="text-center"${_scopeId2}>${ssrInterpolate(index + 1)}</td><td class="text-center"${_scopeId2}>${ssrInterpolate(trx.tanggal)}</td><td class="text-center"${_scopeId2}>${ssrInterpolate(trx.total_transaksi)}</td><td class="text-center"${_scopeId2}>Rp ${ssrInterpolate(trx.total_pendapatan.toLocaleString())}</td></tr>`);
                    });
                    _push3(`<!--]-->`);
                  }
                  _push3(`</tbody>`);
                } else {
                  return [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "text-center" }, "#"),
                        createVNode("th", { class: "text-center" }, "Tanggal"),
                        createVNode("th", { class: "text-center" }, "Jumlah Transaksi"),
                        createVNode("th", { class: "text-center" }, "Total Pendapatan")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      transactions.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "4",
                          class: "text-center"
                        }, "Tidak ada data")
                      ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(transactions.value, (trx, index) => {
                        return openBlock(), createBlock("tr", { key: index }, [
                          createVNode("td", { class: "text-center" }, toDisplayString(index + 1), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(trx.tanggal), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(trx.total_transaksi), 1),
                          createVNode("td", { class: "text-center" }, "Rp " + toDisplayString(trx.total_pendapatan.toLocaleString()), 1)
                        ]);
                      }), 128))
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(unref(VTable), { density: "compact" }, {
                default: withCtx(() => [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", { class: "text-center" }, "#"),
                      createVNode("th", { class: "text-center" }, "Tanggal"),
                      createVNode("th", { class: "text-center" }, "Jumlah Transaksi"),
                      createVNode("th", { class: "text-center" }, "Total Pendapatan")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    transactions.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                      createVNode("td", {
                        colspan: "4",
                        class: "text-center"
                      }, "Tidak ada data")
                    ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(transactions.value, (trx, index) => {
                      return openBlock(), createBlock("tr", { key: index }, [
                        createVNode("td", { class: "text-center" }, toDisplayString(index + 1), 1),
                        createVNode("td", { class: "text-center" }, toDisplayString(trx.tanggal), 1),
                        createVNode("td", { class: "text-center" }, toDisplayString(trx.total_transaksi), 1),
                        createVNode("td", { class: "text-center" }, "Rp " + toDisplayString(trx.total_pendapatan.toLocaleString()), 1)
                      ]);
                    }), 128))
                  ])
                ]),
                _: 2
              }, 1024)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/outlets/reports/transactions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
