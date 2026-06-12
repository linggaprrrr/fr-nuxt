import { defineComponent, ref, computed, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useReports, x as xlsxExports } from './useReports-DnK2mqp-.mjs';
import { saveAs } from 'file-saver';
import { V as VCard, a as VCardText } from './VCard-DLk5PTHl.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
import { _ as _export_sfc, a as VBtn } from './server.mjs';
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
    const fotoTerjualData = ref([]);
    const totalPendapatan = ref(0);
    const totalFotoTerjual = ref(0);
    function formatDateToYYYYMMDD(date) {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const dd = String(date.getDate()).padStart(2, "0");
      return `${yyyy}-${mm}-${dd}`;
    }
    function formatDateDisplay(dateString) {
      const date = new Date(dateString);
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }
    const today = /* @__PURE__ */ new Date();
    const startDate = ref(formatDateToYYYYMMDD(today));
    const endDate = ref(formatDateToYYYYMMDD(today));
    const { getFotoTerjualReport } = useReports();
    const totalFotoTerjualFromData = computed(() => {
      return fotoTerjualData.value.reduce((sum, item) => sum + item.foto_terjual, 0);
    });
    const totalRevenue = computed(() => {
      return fotoTerjualData.value.reduce((sum, item) => sum + item.total_pendapatan, 0);
    });
    computed(() => {
      if (fotoTerjualData.value.length === 0) return 0;
      return Math.round(totalRevenue.value / fotoTerjualData.value.length);
    });
    computed(() => {
      const summary = {};
      fotoTerjualData.value.forEach((item) => {
        if (!summary[item.outlet]) {
          summary[item.outlet] = { foto_terjual: 0, revenue: 0 };
        }
        summary[item.outlet].foto_terjual += item.foto_terjual;
        summary[item.outlet].revenue += item.total_pendapatan;
      });
      return summary;
    });
    computed(() => {
      const summary = {};
      fotoTerjualData.value.forEach((item) => {
        if (!summary[item.photo_type]) {
          summary[item.photo_type] = { foto_terjual: 0, revenue: 0 };
        }
        summary[item.photo_type].foto_terjual += item.foto_terjual;
        summary[item.photo_type].revenue += item.total_pendapatan;
      });
      return summary;
    });
    const fetchFotoTerjual = async () => {
      const result = await getFotoTerjualReport(startDate.value, endDate.value);
      fotoTerjualData.value = result.data;
      totalPendapatan.value = result.total_pendapatan;
      totalFotoTerjual.value = result.total_foto_terjual;
      console.log(result);
    };
    const exportToExcel = () => {
      if (fotoTerjualData.value.length === 0) {
        alert("Data foto terjual kosong, tidak bisa diexport!");
        return;
      }
      const periodText = startDate.value === endDate.value ? formatDateDisplay(startDate.value) : `${formatDateDisplay(startDate.value)} - ${formatDateDisplay(endDate.value)}`;
      const headerInfo = [
        ["LAPORAN FOTO TERJUAL"],
        [""],
        ["Periode:", periodText],
        ["Tanggal Export:", formatDateDisplay(formatDateToYYYYMMDD(/* @__PURE__ */ new Date()))],
        [""],
        ["RINGKASAN:"],
        ["Total Pendapatan:", `Rp ${totalPendapatan.value.toLocaleString()}`],
        ["Total Foto Terjual:", totalFotoTerjual.value],
        [""],
        ["DETAIL FOTO TERJUAL:"],
        [""]
      ];
      const fotoTerjualDataForExcel = fotoTerjualData.value.map((item, index) => ({
        "No": index + 1,
        "Tanggal": formatDateDisplay(item.tanggal),
        "Outlet/Konter": item.outlet,
        "Jenis Foto": item.photo_type,
        "Foto Terjual": item.foto_terjual,
        "Total Pendapatan": item.total_pendapatan,
        "Rata-rata per Foto": item.foto_terjual > 0 ? Math.round(item.total_pendapatan / item.foto_terjual) : 0
      }));
      const totalRow = {
        "No": "",
        "Tanggal": "TOTAL",
        "Outlet/Konter": "",
        "Jenis Foto": "",
        "Foto Terjual": totalFotoTerjualFromData.value,
        "Total Pendapatan": totalRevenue.value,
        "Rata-rata per Foto": totalFotoTerjualFromData.value > 0 ? Math.round(totalRevenue.value / totalFotoTerjualFromData.value) : 0
      };
      const allData = [
        ...headerInfo,
        ...xlsxExports.utils.sheet_to_json(xlsxExports.utils.json_to_sheet(fotoTerjualDataForExcel), { header: 1 }),
        [""],
        Object.values(totalRow)
      ];
      const worksheet = xlsxExports.utils.aoa_to_sheet(allData);
      worksheet["!cols"] = [
        { width: 5 },
        // No
        { width: 12 },
        // Tanggal
        { width: 15 },
        // Outlet
        { width: 15 },
        // Jenis Foto
        { width: 15 },
        // Foto Terjual
        { width: 18 },
        // Total Pendapatan
        { width: 20 }
        // Rata-rata
      ];
      const workbook = xlsxExports.utils.book_new();
      xlsxExports.utils.book_append_sheet(workbook, worksheet, "Laporan Foto Terjual");
      const wbout = xlsxExports.write(workbook, { bookType: "xlsx", type: "array" });
      const filename = `Laporan_Foto_Terjual_${startDate.value}_${endDate.value}.xlsx`;
      saveAs(new Blob([wbout], { type: "application/octet-stream" }), filename);
    };
    const dateHeader = computed(() => {
      const start = startDate.value.trim();
      const end = endDate.value.trim();
      return start === end ? formatDateDisplay(start) : `${formatDateDisplay(start)} - ${formatDateDisplay(end)}`;
    });
    const printReport = () => {
      if (fotoTerjualData.value.length === 0) {
        alert("Tidak ada data untuk diprint!");
        return;
      }
      const outletSummaryForPrint = fotoTerjualData.value.reduce((acc, item) => {
        if (!acc[item.outlet]) {
          acc[item.outlet] = 0;
        }
        acc[item.outlet] += item.foto_terjual;
        return acc;
      }, {});
      const printContent = `
    <style>
      body { 
        font-family: 'Courier New', monospace; 
        font-size: 8px; 
        margin: 2px; 
        line-height: 1.1;
        width: 58mm;
        max-width: 58mm;
      }
      .header { 
        text-align: center; 
        margin-bottom: 4px; 
        font-size: 9px;
        font-weight: bold;
      }
      .divider { 
        border-top: 1px dashed #000; 
        margin: 2px 0; 
      }
      .row { 
        display: flex; 
        justify-content: space-between; 
        margin: 1px 0;
        font-size: 7px;
      }
      .detail { 
        margin: 1px 0;
        font-size: 7px;
      }
      .bold { font-weight: bold; }
      .center { text-align: center; }
      .total-line { 
        border-top: 1px solid #000; 
        margin-top: 2px; 
        padding-top: 2px;
        font-weight: bold;
      }
      @media print {
        body { margin: 0; width: 58mm; }
        .no-print { display: none; }
      }
    </style>
    
    <div class="header">
      LAPORAN FOTO TERJUAL
      <br>
      ${dateHeader.value}
    </div>

    <div class="divider"></div>
    
    <div class="row bold">
      <span>RINGKASAN:</span>
    </div>
    <div class="row">
      <span>Total Pendapatan:</span>
      <span>Rp${totalPendapatan.value.toLocaleString()}</span>
    </div>
    <div class="row">
      <span>Total Foto Terjual:</span>
      <span>${totalFotoTerjual.value}</span>
    </div>    
    
    <div class="divider"></div>
    
    <div class="row bold">
      <span>SUMMARY PER OUTLET:</span>
    </div>
    ${Object.entries(outletSummaryForPrint).map(([outlet, count]) => `
      <div class="row">
        <span>${outlet}:</span>
        <span>${count}</span>
      </div>
    `).join("")}

    <div class="divider"></div>
    
    <div class="row bold">
      <span>DETAIL:</span>
    </div>
    
    ${fotoTerjualData.value.map((item, index) => `
      <div class="detail">
        <div class="bold">${index + 1}. ${item.unit} - ${item.outlet} - ${item.photo_type}</div>
        <div>Tanggal: ${formatDateDisplay(item.tanggal)}</div>
        <div class="row">
          <span>Foto terjual: ${item.foto_terjual}</span>
          <span>Rp${item.total_pendapatan.toLocaleString()}</span>
        </div>
      </div>
    `).join("")}
    
    <div class="divider"></div>
    <div class="row bold total-line">
      <span>GRAND TOTAL:</span>
    </div>    
    <div class="row bold">
      <span>Total: Rp${totalRevenue.value.toLocaleString()}</span>
    </div>
    <div class="divider"></div>
    <div class="center" style="font-size: 6px; margin-top: 3px;">
      Terima Kasih
    </div>
  `;
      const printWindow = (void 0).open("", "_blank");
      if (printWindow) {
        printWindow.document.write(printContent);
        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 250);
      }
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
                          md: "3"
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
                          md: "3"
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
                          md: "6",
                          class: "d-flex align-center gap-2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(VBtn), {
                                color: "primary",
                                onClick: fetchFotoTerjual
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<i class="bx bx-search-alt mr-1" data-v-6a26df2d${_scopeId5}></i> Terapkan `);
                                  } else {
                                    return [
                                      createVNode("i", { class: "bx bx-search-alt mr-1" }),
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
                                    _push6(`<i class="bx bx-export mr-1" data-v-6a26df2d${_scopeId5}></i> Export Excel `);
                                  } else {
                                    return [
                                      createVNode("i", { class: "bx bx-export mr-1" }),
                                      createTextVNode(" Export Excel ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(unref(VBtn), {
                                color: "info",
                                onClick: printReport
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<i class="bxr bx-printer mr-1" data-v-6a26df2d${_scopeId5}></i><span data-v-6a26df2d${_scopeId5}>Print</span>`);
                                  } else {
                                    return [
                                      createVNode("i", { class: "bxr bx-printer mr-1" }),
                                      createVNode("span", null, "Print")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(VBtn), {
                                  color: "primary",
                                  onClick: fetchFotoTerjual
                                }, {
                                  default: withCtx(() => [
                                    createVNode("i", { class: "bx bx-search-alt mr-1" }),
                                    createTextVNode(" Terapkan ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(VBtn), {
                                  color: "success",
                                  onClick: exportToExcel
                                }, {
                                  default: withCtx(() => [
                                    createVNode("i", { class: "bx bx-export mr-1" }),
                                    createTextVNode(" Export Excel ")
                                  ]),
                                  _: 1
                                }),
                                createVNode(unref(VBtn), {
                                  color: "info",
                                  onClick: printReport
                                }, {
                                  default: withCtx(() => [
                                    createVNode("i", { class: "bxr bx-printer mr-1" }),
                                    createVNode("span", null, "Print")
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
                            md: "3"
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
                            md: "6",
                            class: "d-flex align-center gap-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(VBtn), {
                                color: "primary",
                                onClick: fetchFotoTerjual
                              }, {
                                default: withCtx(() => [
                                  createVNode("i", { class: "bx bx-search-alt mr-1" }),
                                  createTextVNode(" Terapkan ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(VBtn), {
                                color: "success",
                                onClick: exportToExcel
                              }, {
                                default: withCtx(() => [
                                  createVNode("i", { class: "bx bx-export mr-1" }),
                                  createTextVNode(" Export Excel ")
                                ]),
                                _: 1
                              }),
                              createVNode(unref(VBtn), {
                                color: "info",
                                onClick: printReport
                              }, {
                                default: withCtx(() => [
                                  createVNode("i", { class: "bxr bx-printer mr-1" }),
                                  createVNode("span", null, "Print")
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
                          md: "3"
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
                          md: "6",
                          class: "d-flex align-center gap-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(VBtn), {
                              color: "primary",
                              onClick: fetchFotoTerjual
                            }, {
                              default: withCtx(() => [
                                createVNode("i", { class: "bx bx-search-alt mr-1" }),
                                createTextVNode(" Terapkan ")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(VBtn), {
                              color: "success",
                              onClick: exportToExcel
                            }, {
                              default: withCtx(() => [
                                createVNode("i", { class: "bx bx-export mr-1" }),
                                createTextVNode(" Export Excel ")
                              ]),
                              _: 1
                            }),
                            createVNode(unref(VBtn), {
                              color: "info",
                              onClick: printReport
                            }, {
                              default: withCtx(() => [
                                createVNode("i", { class: "bxr bx-printer mr-1" }),
                                createVNode("span", null, "Print")
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
                        md: "3"
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
                        md: "6",
                        class: "d-flex align-center gap-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(VBtn), {
                            color: "primary",
                            onClick: fetchFotoTerjual
                          }, {
                            default: withCtx(() => [
                              createVNode("i", { class: "bx bx-search-alt mr-1" }),
                              createTextVNode(" Terapkan ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(VBtn), {
                            color: "success",
                            onClick: exportToExcel
                          }, {
                            default: withCtx(() => [
                              createVNode("i", { class: "bx bx-export mr-1" }),
                              createTextVNode(" Export Excel ")
                            ]),
                            _: 1
                          }),
                          createVNode(unref(VBtn), {
                            color: "info",
                            onClick: printReport
                          }, {
                            default: withCtx(() => [
                              createVNode("i", { class: "bxr bx-printer mr-1" }),
                              createVNode("span", null, "Print")
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
                              _push5(`<div class="text-subtitle-1 text-grey" data-v-6a26df2d${_scopeId4}>Total Pendapatan</div><div class="text-h5 font-weight-bold text-primary" data-v-6a26df2d${_scopeId4}>Rp ${ssrInterpolate(totalRevenue.value.toLocaleString())}</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-subtitle-1 text-grey" }, "Total Pendapatan"),
                                createVNode("div", { class: "text-h5 font-weight-bold text-primary" }, "Rp " + toDisplayString(totalRevenue.value.toLocaleString()), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(VCardText), null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-subtitle-1 text-grey" }, "Total Pendapatan"),
                              createVNode("div", { class: "text-h5 font-weight-bold text-primary" }, "Rp " + toDisplayString(totalRevenue.value.toLocaleString()), 1)
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
                            createVNode("div", { class: "text-subtitle-1 text-grey" }, "Total Pendapatan"),
                            createVNode("div", { class: "text-h5 font-weight-bold text-primary" }, "Rp " + toDisplayString(totalRevenue.value.toLocaleString()), 1)
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
                              _push5(`<div class="text-subtitle-1 text-grey" data-v-6a26df2d${_scopeId4}>Total Foto Terjual</div><div class="text-h5 font-weight-bold text-success" data-v-6a26df2d${_scopeId4}>${ssrInterpolate(totalFotoTerjual.value)}</div>`);
                            } else {
                              return [
                                createVNode("div", { class: "text-subtitle-1 text-grey" }, "Total Foto Terjual"),
                                createVNode("div", { class: "text-h5 font-weight-bold text-success" }, toDisplayString(totalFotoTerjual.value), 1)
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(unref(VCardText), null, {
                            default: withCtx(() => [
                              createVNode("div", { class: "text-subtitle-1 text-grey" }, "Total Foto Terjual"),
                              createVNode("div", { class: "text-h5 font-weight-bold text-success" }, toDisplayString(totalFotoTerjual.value), 1)
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
                            createVNode("div", { class: "text-subtitle-1 text-grey" }, "Total Foto Terjual"),
                            createVNode("div", { class: "text-h5 font-weight-bold text-success" }, toDisplayString(totalFotoTerjual.value), 1)
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
                          createVNode("div", { class: "text-subtitle-1 text-grey" }, "Total Pendapatan"),
                          createVNode("div", { class: "text-h5 font-weight-bold text-primary" }, "Rp " + toDisplayString(totalRevenue.value.toLocaleString()), 1)
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
                          createVNode("div", { class: "text-subtitle-1 text-grey" }, "Total Foto Terjual"),
                          createVNode("div", { class: "text-h5 font-weight-bold text-success" }, toDisplayString(totalFotoTerjual.value), 1)
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
      _push(ssrRenderComponent(unref(VCard), { title: "Daftar Foto Terjual Detail" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(unref(VTable), { density: "compact" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<thead data-v-6a26df2d${_scopeId2}><tr data-v-6a26df2d${_scopeId2}><th class="text-center" data-v-6a26df2d${_scopeId2}>#</th><th class="text-center" data-v-6a26df2d${_scopeId2}>Tanggal</th><th class="text-center" data-v-6a26df2d${_scopeId2}>Outlet/Konter</th><th class="text-center" data-v-6a26df2d${_scopeId2}>Jenis Foto</th><th class="text-center" data-v-6a26df2d${_scopeId2}>Foto Terjual</th><th class="text-center" data-v-6a26df2d${_scopeId2}>Total Pendapatan</th></tr></thead><tbody data-v-6a26df2d${_scopeId2}>`);
                  if (fotoTerjualData.value.length === 0) {
                    _push3(`<tr data-v-6a26df2d${_scopeId2}><td colspan="6" class="text-center text-grey" data-v-6a26df2d${_scopeId2}>Tidak ada data</td></tr>`);
                  } else {
                    _push3(`<!--[-->`);
                    ssrRenderList(fotoTerjualData.value, (item, index) => {
                      _push3(`<tr data-v-6a26df2d${_scopeId2}><td class="text-center" data-v-6a26df2d${_scopeId2}>${ssrInterpolate(index + 1)}</td><td class="text-center" data-v-6a26df2d${_scopeId2}>${ssrInterpolate(formatDateDisplay(item.tanggal))}</td><td class="text-center" data-v-6a26df2d${_scopeId2}>${ssrInterpolate(item.outlet)}</td><td class="text-center" data-v-6a26df2d${_scopeId2}>${ssrInterpolate(item.photo_type)}</td><td class="text-center" data-v-6a26df2d${_scopeId2}>${ssrInterpolate(item.foto_terjual)}</td><td class="text-center" data-v-6a26df2d${_scopeId2}>Rp ${ssrInterpolate(item.total_pendapatan.toLocaleString())}</td></tr>`);
                    });
                    _push3(`<!--]-->`);
                  }
                  if (fotoTerjualData.value.length > 0) {
                    _push3(`<tr class="bg-blue-lighten-5" data-v-6a26df2d${_scopeId2}><td class="text-center font-weight-bold" data-v-6a26df2d${_scopeId2}></td><td class="text-center font-weight-bold" data-v-6a26df2d${_scopeId2}>TOTAL</td><td class="text-center font-weight-bold" data-v-6a26df2d${_scopeId2}></td><td class="text-center font-weight-bold" data-v-6a26df2d${_scopeId2}></td><td class="text-center font-weight-bold" data-v-6a26df2d${_scopeId2}>${ssrInterpolate(totalFotoTerjualFromData.value)}</td><td class="text-center font-weight-bold" data-v-6a26df2d${_scopeId2}>Rp ${ssrInterpolate(totalRevenue.value.toLocaleString())}</td></tr>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`</tbody>`);
                } else {
                  return [
                    createVNode("thead", null, [
                      createVNode("tr", null, [
                        createVNode("th", { class: "text-center" }, "#"),
                        createVNode("th", { class: "text-center" }, "Tanggal"),
                        createVNode("th", { class: "text-center" }, "Outlet/Konter"),
                        createVNode("th", { class: "text-center" }, "Jenis Foto"),
                        createVNode("th", { class: "text-center" }, "Foto Terjual"),
                        createVNode("th", { class: "text-center" }, "Total Pendapatan")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      fotoTerjualData.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "6",
                          class: "text-center text-grey"
                        }, "Tidak ada data")
                      ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(fotoTerjualData.value, (item, index) => {
                        return openBlock(), createBlock("tr", { key: index }, [
                          createVNode("td", { class: "text-center" }, toDisplayString(index + 1), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(formatDateDisplay(item.tanggal)), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(item.outlet), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(item.photo_type), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(item.foto_terjual), 1),
                          createVNode("td", { class: "text-center" }, "Rp " + toDisplayString(item.total_pendapatan.toLocaleString()), 1)
                        ]);
                      }), 128)),
                      fotoTerjualData.value.length > 0 ? (openBlock(), createBlock("tr", {
                        key: 2,
                        class: "bg-blue-lighten-5"
                      }, [
                        createVNode("td", { class: "text-center font-weight-bold" }),
                        createVNode("td", { class: "text-center font-weight-bold" }, "TOTAL"),
                        createVNode("td", { class: "text-center font-weight-bold" }),
                        createVNode("td", { class: "text-center font-weight-bold" }),
                        createVNode("td", { class: "text-center font-weight-bold" }, toDisplayString(totalFotoTerjualFromData.value), 1),
                        createVNode("td", { class: "text-center font-weight-bold" }, "Rp " + toDisplayString(totalRevenue.value.toLocaleString()), 1)
                      ])) : createCommentVNode("", true)
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
                      createVNode("th", { class: "text-center" }, "Outlet/Konter"),
                      createVNode("th", { class: "text-center" }, "Jenis Foto"),
                      createVNode("th", { class: "text-center" }, "Foto Terjual"),
                      createVNode("th", { class: "text-center" }, "Total Pendapatan")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    fotoTerjualData.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                      createVNode("td", {
                        colspan: "6",
                        class: "text-center text-grey"
                      }, "Tidak ada data")
                    ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(fotoTerjualData.value, (item, index) => {
                      return openBlock(), createBlock("tr", { key: index }, [
                        createVNode("td", { class: "text-center" }, toDisplayString(index + 1), 1),
                        createVNode("td", { class: "text-center" }, toDisplayString(formatDateDisplay(item.tanggal)), 1),
                        createVNode("td", { class: "text-center" }, toDisplayString(item.outlet), 1),
                        createVNode("td", { class: "text-center" }, toDisplayString(item.photo_type), 1),
                        createVNode("td", { class: "text-center" }, toDisplayString(item.foto_terjual), 1),
                        createVNode("td", { class: "text-center" }, "Rp " + toDisplayString(item.total_pendapatan.toLocaleString()), 1)
                      ]);
                    }), 128)),
                    fotoTerjualData.value.length > 0 ? (openBlock(), createBlock("tr", {
                      key: 2,
                      class: "bg-blue-lighten-5"
                    }, [
                      createVNode("td", { class: "text-center font-weight-bold" }),
                      createVNode("td", { class: "text-center font-weight-bold" }, "TOTAL"),
                      createVNode("td", { class: "text-center font-weight-bold" }),
                      createVNode("td", { class: "text-center font-weight-bold" }),
                      createVNode("td", { class: "text-center font-weight-bold" }, toDisplayString(totalFotoTerjualFromData.value), 1),
                      createVNode("td", { class: "text-center font-weight-bold" }, "Rp " + toDisplayString(totalRevenue.value.toLocaleString()), 1)
                    ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/reports/transactions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const transactions = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-6a26df2d"]]);

export { transactions as default };
