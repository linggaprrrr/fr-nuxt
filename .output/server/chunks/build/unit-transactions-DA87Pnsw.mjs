import { defineComponent, ref, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useReports, x as xlsxExports } from './useReports-DnK2mqp-.mjs';
import { saveAs } from 'file-saver';
import { V as VCard, a as VCardText } from './VCard-DLk5PTHl.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VSelect } from './VSelect-Bxz-WhQz.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
import { a as VBtn } from './server.mjs';
import { V as VTable } from './VTable-BXA3D1kT.mjs';
import '/Applications/MAMP/htdocs/nuxtjs/dufansnap/node_modules/xlsx/dist/cpexcel.js';
import 'fs';
import 'stream';
import './authFetch-5wQjlWwJ.mjs';
import './forwardRefs-BSTjJZPU.mjs';
import './VMenu-CmFsZZaF.mjs';
import './index-ewhk7FTz.mjs';
import './ssrBoot-BtvJZs44.mjs';
import './VListSubheader-BbgyaiQc.mjs';
import './dialog-transition-D66jL1n_.mjs';
import './VCheckboxBtn-DaRBpQ2e.mjs';
import './VChip-C44NlS62.mjs';
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

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "unit-transactions",
  __ssrInlineRender: true,
  setup(__props) {
    const { getPerUnitReports } = useReports();
    const unitId = ref("");
    const startDate = ref((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
    const endDate = ref((/* @__PURE__ */ new Date()).toISOString().slice(0, 10));
    const loading = ref(false);
    const error = ref(null);
    const report = ref(null);
    const units = ref([]);
    const unitsLoading = ref(false);
    const unitsError = ref(null);
    async function fetchReport() {
      if (!unitId.value) {
        error.value = "Pilih unit terlebih dahulu";
        report.value = null;
        return;
      }
      loading.value = true;
      error.value = null;
      report.value = null;
      const data = await getPerUnitReports(unitId.value, startDate.value, endDate.value);
      if (data) {
        report.value = data;
      } else {
        error.value = "Gagal mengambil data";
      }
      loading.value = false;
    }
    const formatTanggal = (tanggal) => {
      const date = new Date(tanggal);
      return date.toLocaleString("id-ID", {
        day: "2-digit",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
      });
    };
    const exportToExcel = () => {
      if (!report.value) return;
      const summarySheet = [
        {
          "Unit": report.value.unit_name,
          "Periode": `${report.value.start_date} - ${report.value.end_date}`,
          "Jumlah Transaksi": report.value.jumlah_transaksi,
          "Jumlah Foto Terjuak": report.value.jumlah_foto_terjual,
          "Total Pendapatan": report.value.total_pendapatan
        }
      ];
      const detailSheet = report.value.data.map((trx, i) => ({
        "#": i + 1,
        "Tanggal": formatTanggal(trx.created_at),
        "User": trx.user,
        "Jumlah Transaksi": trx.final_price
      }));
      const wb = xlsxExports.utils.book_new();
      const summaryTempWs = xlsxExports.utils.json_to_sheet(summarySheet);
      const detailTempWs = xlsxExports.utils.json_to_sheet(detailSheet);
      const summaryRows = xlsxExports.utils.sheet_to_json(summaryTempWs, { header: 1 });
      const detailRows = xlsxExports.utils.sheet_to_json(detailTempWs, { header: 1 });
      summaryRows.push([], ["Detail Transaksi"]);
      const combinedRows = [...summaryRows, ...detailRows];
      const ws = xlsxExports.utils.aoa_to_sheet(combinedRows);
      xlsxExports.utils.book_append_sheet(wb, ws, "Ringkasan");
      xlsxExports.writeFile(wb, "laporan-transaksi.xlsx");
      const wbout = xlsxExports.write(wb, { bookType: "xlsx", type: "array" });
      saveAs(new Blob([wbout], { type: "application/octet-stream" }), `Laporan-Unit-${report.value.unit_name}.xlsx`);
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(unref(VCard), {
        class: "mb-4",
        title: "Filter Laporan Per Unit"
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
                          md: "3"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(VSelect), {
                                modelValue: unitId.value,
                                "onUpdate:modelValue": ($event) => unitId.value = $event,
                                items: units.value,
                                "item-title": "name",
                                "item-value": "id",
                                label: "Pilih Unit",
                                dense: "",
                                clearable: "",
                                outlined: "",
                                loading: unitsLoading.value,
                                disabled: unitsLoading.value || unitsError.value !== null
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(VSelect), {
                                  modelValue: unitId.value,
                                  "onUpdate:modelValue": ($event) => unitId.value = $event,
                                  items: units.value,
                                  "item-title": "name",
                                  "item-value": "id",
                                  label: "Pilih Unit",
                                  dense: "",
                                  clearable: "",
                                  outlined: "",
                                  loading: unitsLoading.value,
                                  disabled: unitsLoading.value || unitsError.value !== null
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "disabled"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(VCol), {
                          cols: "12",
                          md: "3"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(VTextField), {
                                modelValue: startDate.value,
                                "onUpdate:modelValue": ($event) => startDate.value = $event,
                                label: "Start Date",
                                type: "date",
                                dense: "",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(VTextField), {
                                  modelValue: startDate.value,
                                  "onUpdate:modelValue": ($event) => startDate.value = $event,
                                  label: "Start Date",
                                  type: "date",
                                  dense: "",
                                  outlined: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(VCol), {
                          cols: "12",
                          md: "3"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(VTextField), {
                                modelValue: endDate.value,
                                "onUpdate:modelValue": ($event) => endDate.value = $event,
                                label: "End Date",
                                type: "date",
                                dense: "",
                                outlined: ""
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(VTextField), {
                                  modelValue: endDate.value,
                                  "onUpdate:modelValue": ($event) => endDate.value = $event,
                                  label: "End Date",
                                  type: "date",
                                  dense: "",
                                  outlined: ""
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(unref(VCol), {
                          cols: "12",
                          md: "3",
                          class: "d-flex align-center"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(VBtn), {
                                color: "primary",
                                loading: loading.value,
                                onClick: fetchReport,
                                disabled: loading.value,
                                class: "mr-4"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(` Terapkan `);
                                  } else {
                                    return [
                                      createTextVNode(" Terapkan ")
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
                                    _push6(` Export `);
                                  } else {
                                    return [
                                      createTextVNode(" Export ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(VBtn), {
                                  color: "primary",
                                  loading: loading.value,
                                  onClick: fetchReport,
                                  disabled: loading.value,
                                  class: "mr-4"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Terapkan ")
                                  ]),
                                  _: 1
                                }, 8, ["loading", "disabled"]),
                                createVNode(unref(VBtn), {
                                  color: "success",
                                  onClick: exportToExcel
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Export ")
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
                            md: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(VSelect), {
                                modelValue: unitId.value,
                                "onUpdate:modelValue": ($event) => unitId.value = $event,
                                items: units.value,
                                "item-title": "name",
                                "item-value": "id",
                                label: "Pilih Unit",
                                dense: "",
                                clearable: "",
                                outlined: "",
                                loading: unitsLoading.value,
                                disabled: unitsLoading.value || unitsError.value !== null
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "disabled"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(VCol), {
                            cols: "12",
                            md: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(VTextField), {
                                modelValue: startDate.value,
                                "onUpdate:modelValue": ($event) => startDate.value = $event,
                                label: "Start Date",
                                type: "date",
                                dense: "",
                                outlined: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(VCol), {
                            cols: "12",
                            md: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(VTextField), {
                                modelValue: endDate.value,
                                "onUpdate:modelValue": ($event) => endDate.value = $event,
                                label: "End Date",
                                type: "date",
                                dense: "",
                                outlined: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(VCol), {
                            cols: "12",
                            md: "3",
                            class: "d-flex align-center"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(VBtn), {
                                color: "primary",
                                loading: loading.value,
                                onClick: fetchReport,
                                disabled: loading.value,
                                class: "mr-4"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Terapkan ")
                                ]),
                                _: 1
                              }, 8, ["loading", "disabled"]),
                              createVNode(unref(VBtn), {
                                color: "success",
                                onClick: exportToExcel
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Export ")
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
                          md: "3"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(VSelect), {
                              modelValue: unitId.value,
                              "onUpdate:modelValue": ($event) => unitId.value = $event,
                              items: units.value,
                              "item-title": "name",
                              "item-value": "id",
                              label: "Pilih Unit",
                              dense: "",
                              clearable: "",
                              outlined: "",
                              loading: unitsLoading.value,
                              disabled: unitsLoading.value || unitsError.value !== null
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "disabled"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(VCol), {
                          cols: "12",
                          md: "3"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(VTextField), {
                              modelValue: startDate.value,
                              "onUpdate:modelValue": ($event) => startDate.value = $event,
                              label: "Start Date",
                              type: "date",
                              dense: "",
                              outlined: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(VCol), {
                          cols: "12",
                          md: "3"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(VTextField), {
                              modelValue: endDate.value,
                              "onUpdate:modelValue": ($event) => endDate.value = $event,
                              label: "End Date",
                              type: "date",
                              dense: "",
                              outlined: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(VCol), {
                          cols: "12",
                          md: "3",
                          class: "d-flex align-center"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(VBtn), {
                              color: "primary",
                              loading: loading.value,
                              onClick: fetchReport,
                              disabled: loading.value,
                              class: "mr-4"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Terapkan ")
                              ]),
                              _: 1
                            }, 8, ["loading", "disabled"]),
                            createVNode(unref(VBtn), {
                              color: "success",
                              onClick: exportToExcel
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Export ")
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
                        md: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(VSelect), {
                            modelValue: unitId.value,
                            "onUpdate:modelValue": ($event) => unitId.value = $event,
                            items: units.value,
                            "item-title": "name",
                            "item-value": "id",
                            label: "Pilih Unit",
                            dense: "",
                            clearable: "",
                            outlined: "",
                            loading: unitsLoading.value,
                            disabled: unitsLoading.value || unitsError.value !== null
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "disabled"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(VCol), {
                        cols: "12",
                        md: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(VTextField), {
                            modelValue: startDate.value,
                            "onUpdate:modelValue": ($event) => startDate.value = $event,
                            label: "Start Date",
                            type: "date",
                            dense: "",
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(VCol), {
                        cols: "12",
                        md: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(VTextField), {
                            modelValue: endDate.value,
                            "onUpdate:modelValue": ($event) => endDate.value = $event,
                            label: "End Date",
                            type: "date",
                            dense: "",
                            outlined: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(VCol), {
                        cols: "12",
                        md: "3",
                        class: "d-flex align-center"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(VBtn), {
                            color: "primary",
                            loading: loading.value,
                            onClick: fetchReport,
                            disabled: loading.value,
                            class: "mr-4"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Terapkan ")
                            ]),
                            _: 1
                          }, 8, ["loading", "disabled"]),
                          createVNode(unref(VBtn), {
                            color: "success",
                            onClick: exportToExcel
                          }, {
                            default: withCtx(() => [
                              createTextVNode(" Export ")
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
      if (error.value) {
        _push(ssrRenderComponent(unref(VCard), {
          color: "error",
          class: "mb-4",
          dark: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(VCardText), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`${ssrInterpolate(error.value)}`);
                  } else {
                    return [
                      createTextVNode(toDisplayString(error.value), 1)
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(VCardText), null, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(error.value), 1)
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (report.value) {
        _push(ssrRenderComponent(unref(VCard), {
          title: "Ringkasan Laporan Per Unit",
          class: "mb-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(VCardText), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div${_scopeId2}><strong${_scopeId2}>Unit:</strong> ${ssrInterpolate(report.value.unit_name)}</div><div${_scopeId2}><strong${_scopeId2}>Periode:</strong> ${ssrInterpolate(report.value.start_date)} - ${ssrInterpolate(report.value.end_date)}</div><div${_scopeId2}><strong${_scopeId2}>Jumlah Transaksi:</strong> ${ssrInterpolate(report.value.jumlah_transaksi)}</div><div${_scopeId2}><strong${_scopeId2}>Jumlah Foto yang terjual:</strong> ${ssrInterpolate(report.value.jumlah_foto_terjual)}</div><div${_scopeId2}><strong${_scopeId2}>Total Pendapatan:</strong> Rp ${ssrInterpolate(report.value.total_pendapatan.toLocaleString())}</div>`);
                  } else {
                    return [
                      createVNode("div", null, [
                        createVNode("strong", null, "Unit:"),
                        createTextVNode(" " + toDisplayString(report.value.unit_name), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("strong", null, "Periode:"),
                        createTextVNode(" " + toDisplayString(report.value.start_date) + " - " + toDisplayString(report.value.end_date), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("strong", null, "Jumlah Transaksi:"),
                        createTextVNode(" " + toDisplayString(report.value.jumlah_transaksi), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("strong", null, "Jumlah Foto yang terjual:"),
                        createTextVNode(" " + toDisplayString(report.value.jumlah_foto_terjual), 1)
                      ]),
                      createVNode("div", null, [
                        createVNode("strong", null, "Total Pendapatan:"),
                        createTextVNode(" Rp " + toDisplayString(report.value.total_pendapatan.toLocaleString()), 1)
                      ])
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(VCardText), null, {
                  default: withCtx(() => [
                    createVNode("div", null, [
                      createVNode("strong", null, "Unit:"),
                      createTextVNode(" " + toDisplayString(report.value.unit_name), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("strong", null, "Periode:"),
                      createTextVNode(" " + toDisplayString(report.value.start_date) + " - " + toDisplayString(report.value.end_date), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("strong", null, "Jumlah Transaksi:"),
                      createTextVNode(" " + toDisplayString(report.value.jumlah_transaksi), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("strong", null, "Jumlah Foto yang terjual:"),
                      createTextVNode(" " + toDisplayString(report.value.jumlah_foto_terjual), 1)
                    ]),
                    createVNode("div", null, [
                      createVNode("strong", null, "Total Pendapatan:"),
                      createTextVNode(" Rp " + toDisplayString(report.value.total_pendapatan.toLocaleString()), 1)
                    ])
                  ]),
                  _: 2
                }, 1024)
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (report.value && report.value.data.length > 0) {
        _push(ssrRenderComponent(unref(VCard), { title: "Detail Transaksi Per Unit" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(VTable), { density: "compact" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<thead${_scopeId2}><tr${_scopeId2}><th class="text-center"${_scopeId2}>#</th><th class="text-center"${_scopeId2}>Tanggal</th><th class="text-center"${_scopeId2}>Kode Transaksi</th><th class="text-center"${_scopeId2}>User</th><th class="text-center"${_scopeId2}>Foto Terjual</th><th class="text-center"${_scopeId2}>Jumlah Transaksi</th></tr></thead><tbody${_scopeId2}><!--[-->`);
                    ssrRenderList(report.value.data, (trx, index) => {
                      _push3(`<tr${_scopeId2}><td class="text-center"${_scopeId2}>${ssrInterpolate(index + 1)}</td><td class="text-center"${_scopeId2}>${ssrInterpolate(formatTanggal(trx.created_at))}</td><td class="text-center"${_scopeId2}>${ssrInterpolate(trx.trx_code.toUpperCase())}</td><td class="text-center"${_scopeId2}>${ssrInterpolate(trx.user)}</td><td class="text-center"${_scopeId2}>${ssrInterpolate(trx.jumlah_foto)}</td><td class="text-center"${_scopeId2}>Rp ${ssrInterpolate(trx.final_price.toLocaleString())}</td></tr>`);
                    });
                    _push3(`<!--]--></tbody>`);
                  } else {
                    return [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "text-center" }, "#"),
                          createVNode("th", { class: "text-center" }, "Tanggal"),
                          createVNode("th", { class: "text-center" }, "Kode Transaksi"),
                          createVNode("th", { class: "text-center" }, "User"),
                          createVNode("th", { class: "text-center" }, "Foto Terjual"),
                          createVNode("th", { class: "text-center" }, "Jumlah Transaksi")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(report.value.data, (trx, index) => {
                          return openBlock(), createBlock("tr", {
                            key: trx.id
                          }, [
                            createVNode("td", { class: "text-center" }, toDisplayString(index + 1), 1),
                            createVNode("td", { class: "text-center" }, toDisplayString(formatTanggal(trx.created_at)), 1),
                            createVNode("td", { class: "text-center" }, toDisplayString(trx.trx_code.toUpperCase()), 1),
                            createVNode("td", { class: "text-center" }, toDisplayString(trx.user), 1),
                            createVNode("td", { class: "text-center" }, toDisplayString(trx.jumlah_foto), 1),
                            createVNode("td", { class: "text-center" }, "Rp " + toDisplayString(trx.final_price.toLocaleString()), 1)
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
                        createVNode("th", { class: "text-center" }, "Kode Transaksi"),
                        createVNode("th", { class: "text-center" }, "User"),
                        createVNode("th", { class: "text-center" }, "Foto Terjual"),
                        createVNode("th", { class: "text-center" }, "Jumlah Transaksi")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(report.value.data, (trx, index) => {
                        return openBlock(), createBlock("tr", {
                          key: trx.id
                        }, [
                          createVNode("td", { class: "text-center" }, toDisplayString(index + 1), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(formatTanggal(trx.created_at)), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(trx.trx_code.toUpperCase()), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(trx.user), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(trx.jumlah_foto), 1),
                          createVNode("td", { class: "text-center" }, "Rp " + toDisplayString(trx.final_price.toLocaleString()), 1)
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
      } else if (report.value) {
        _push(ssrRenderComponent(unref(VCard), null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(VCardText), { class: "text-center text-subtitle-1" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`Tidak ada data transaksi untuk unit ini.`);
                  } else {
                    return [
                      createTextVNode("Tidak ada data transaksi untuk unit ini.")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(VCardText), { class: "text-center text-subtitle-1" }, {
                  default: withCtx(() => [
                    createTextVNode("Tidak ada data transaksi untuk unit ini.")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/outlets/reports/unit-transactions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
