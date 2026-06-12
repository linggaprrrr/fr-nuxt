import { defineComponent, ref, computed, unref, withCtx, createVNode, createTextVNode, createBlock, createCommentVNode, openBlock, toDisplayString, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useReports, x as xlsxExports } from './useReports-DnK2mqp-.mjs';
import { saveAs } from 'file-saver';
import { V as VCard, a as VCardText } from './VCard-DLk5PTHl.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VSelect } from './VSelect-Bxz-WhQz.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
import { _ as _export_sfc, a as VBtn, b as VIcon } from './server.mjs';
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
  __name: "outlet-transactions",
  __ssrInlineRender: true,
  setup(__props) {
    const outletData = ref([]);
    const reportData = ref(null);
    const selectedOutlet = ref("");
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
    const { getPerOutletReports } = useReports();
    const totalTransactions = computed(() => {
      return outletData.value.reduce((sum, item) => sum + item.foto_terjual, 0);
    });
    const totalRevenue = computed(() => {
      return outletData.value.reduce((sum, item) => sum + item.total_pendapatan, 0);
    });
    const totalPhotosSold = computed(() => {
      return totalTransactions.value;
    });
    const averagePerTransaction = computed(() => {
      if (totalTransactions.value === 0) return 0;
      return Math.round(totalRevenue.value / totalTransactions.value);
    });
    computed(() => {
      if (!reportData.value) return 0;
      const startD = new Date(reportData.value.start_date);
      const endD = new Date(reportData.value.end_date);
      const daysDiff = Math.ceil((endD.getTime() - startD.getTime()) / (1e3 * 60 * 60 * 24)) + 1;
      return Math.round(totalRevenue.value / daysDiff);
    });
    const outletItems = computed(() => {
      return outlets.value.map((outlet) => {
        var _a;
        return {
          title: `${outlet.name}${((_a = outlet.unit) == null ? void 0 : _a.name) ? ` - ${outlet.unit.name}` : ""}`,
          value: outlet.id
        };
      });
    });
    const dateHeader = computed(() => {
      const start = startDate.value.trim();
      const end = endDate.value.trim();
      return start === end ? formatDateDisplay(start) : `${formatDateDisplay(start)} - ${formatDateDisplay(end)}`;
    });
    ref(1);
    ref(0);
    ref(false);
    const outlets = ref([]);
    const fetchTransactionsByOutlet = async () => {
      if (!selectedOutlet.value) {
        alert("Silakan pilih outlet terlebih dahulu!");
        return;
      }
      try {
        console.log("Fetching transactions for outlet:", selectedOutlet.value, "from", startDate.value, "to", endDate.value);
        const result = await getPerOutletReports(selectedOutlet.value, startDate.value, endDate.value);
        reportData.value = result;
        outletData.value = result.data || [];
        console.log("Report data received:", result);
      } catch (error) {
        console.error("Error fetching transactions:", error);
        alert("Terjadi kesalahan saat mengambil data transaksi");
      }
    };
    const selectedOutletInfo = computed(() => {
      return outlets.value.find((o) => o.id === selectedOutlet.value);
    });
    const fullOutletName = computed(() => {
      var _a;
      if (!selectedOutletInfo.value) return "Unknown";
      const outletName = selectedOutletInfo.value.name;
      const outletUnit = (_a = selectedOutletInfo.value.unit) == null ? void 0 : _a.name;
      return outletUnit ? `${outletName} - ${outletUnit}` : outletName;
    });
    const exportToExcel = () => {
      var _a, _b;
      if (!reportData.value || outletData.value.length === 0) {
        alert("Data transaksi kosong, tidak bisa diexport!");
        return;
      }
      const headerInfo = [
        ["LAPORAN TRANSAKSI PER OUTLET"],
        [""],
        ["Outlet:", fullOutletName.value],
        ["Periode:", dateHeader.value],
        ["Tanggal Export:", formatDateDisplay(formatDateToYYYYMMDD(/* @__PURE__ */ new Date()))],
        [""],
        ["RINGKASAN:"],
        ["Total Pendapatan:", `Rp ${totalRevenue.value.toLocaleString()}`],
        ["Total Penjualan:", totalTransactions.value],
        ["Total Foto Terjual:", totalPhotosSold.value],
        [""],
        ["DETAIL PER JENIS FOTO:"],
        [""]
      ];
      const photoTypeData = outletData.value.map((item, index) => ({
        "No": index + 1,
        "Jenis Foto": item.photo_type,
        "Jumlah Foto Terjual": item.foto_terjual,
        "Total Pendapatan": item.total_pendapatan,
        "Rata-rata per Transaksi": item.foto_terjual > 0 ? Math.round(item.total_pendapatan / item.foto_terjual) : 0
      }));
      const totalRow = {
        "No": "",
        "Jenis Foto": "TOTAL",
        "Jumlah Transaksi": totalTransactions.value,
        "Total Pendapatan": totalRevenue.value,
        "Rata-rata per Transaksi": averagePerTransaction.value
      };
      const allData = [
        ...headerInfo,
        ...xlsxExports.utils.sheet_to_json(xlsxExports.utils.json_to_sheet(photoTypeData), { header: 1 }),
        [""],
        Object.values(totalRow)
      ];
      const worksheet = xlsxExports.utils.aoa_to_sheet(allData);
      worksheet["!cols"] = [
        { width: 5 },
        // No
        { width: 20 },
        // Jenis Foto
        { width: 18 },
        // Jumlah Transaksi
        { width: 18 },
        // Total Pendapatan
        { width: 20 }
        // Rata-rata
      ];
      const workbook = xlsxExports.utils.book_new();
      xlsxExports.utils.book_append_sheet(workbook, worksheet, "Laporan Per Outlet");
      const wbout = xlsxExports.write(workbook, { bookType: "xlsx", type: "array" });
      const filename = `Laporan_Outlet_${((_b = (_a = selectedOutletInfo.value) == null ? void 0 : _a.name) == null ? void 0 : _b.replace(/\s+/g, "_")) || "Unknown"}_${startDate.value}_${endDate.value}.xlsx`;
      saveAs(new Blob([wbout], { type: "application/octet-stream" }), filename);
    };
    const printReport = () => {
      if (!reportData.value) {
        alert("Tidak ada data untuk di-print!");
        return;
      }
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
      LAPORAN TRANSAKSI OUTLET
      <br>
      ${fullOutletName.value}
      <br>
      ${dateHeader.value}
    </div>

    <div class="divider"></div>
    
    <div class="row bold">
      <span>RINGKASAN:</span>
    </div>
    <div class="row">
      <span>Total Pendapatan:</span>
      <span>Rp${totalRevenue.value.toLocaleString()}</span>
    </div>
    <div class="row">
      <span>Total Penjualan:</span>
      <span>${totalTransactions.value}</span>
    </div>
   
    <div class="divider"></div>
    
    <div class="row bold">
      <span>DETAIL PER JENIS:</span>
    </div>
    
    ${outletData.value.map((item, index) => `
      <div class="detail">
        <div class="bold">${index + 1}. ${item.photo_type}</div>
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
        title: "Filter Laporan"
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
                                modelValue: selectedOutlet.value,
                                "onUpdate:modelValue": ($event) => selectedOutlet.value = $event,
                                items: outletItems.value,
                                label: "Pilih Outlet",
                                variant: "outlined",
                                clearable: "",
                                loading: outlets.value.length === 0
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(VSelect), {
                                  modelValue: selectedOutlet.value,
                                  "onUpdate:modelValue": ($event) => selectedOutlet.value = $event,
                                  items: outletItems.value,
                                  label: "Pilih Outlet",
                                  variant: "outlined",
                                  clearable: "",
                                  loading: outlets.value.length === 0
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading"])
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
                          md: "2",
                          class: "d-flex align-center gap-2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(VBtn), {
                                color: "primary",
                                onClick: fetchTransactionsByOutlet,
                                disabled: !selectedOutlet.value
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<i class="bx bx-search-alt mr-1" data-v-ea81d509${_scopeId5}></i> Terapkan `);
                                  } else {
                                    return [
                                      createVNode("i", { class: "bx bx-search-alt mr-1" }),
                                      createTextVNode(" Terapkan ")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(unref(VBtn), {
                                  color: "primary",
                                  onClick: fetchTransactionsByOutlet,
                                  disabled: !selectedOutlet.value
                                }, {
                                  default: withCtx(() => [
                                    createVNode("i", { class: "bx bx-search-alt mr-1" }),
                                    createTextVNode(" Terapkan ")
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
                          createVNode(unref(VCol), {
                            cols: "12",
                            md: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(VSelect), {
                                modelValue: selectedOutlet.value,
                                "onUpdate:modelValue": ($event) => selectedOutlet.value = $event,
                                items: outletItems.value,
                                label: "Pilih Outlet",
                                variant: "outlined",
                                clearable: "",
                                loading: outlets.value.length === 0
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading"])
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
                            md: "2",
                            class: "d-flex align-center gap-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(VBtn), {
                                color: "primary",
                                onClick: fetchTransactionsByOutlet,
                                disabled: !selectedOutlet.value
                              }, {
                                default: withCtx(() => [
                                  createVNode("i", { class: "bx bx-search-alt mr-1" }),
                                  createTextVNode(" Terapkan ")
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
                  if (reportData.value) {
                    _push3(ssrRenderComponent(unref(VRow), {
                      class: "mt-2",
                      dense: ""
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(VCol), {
                            cols: "12",
                            class: "d-flex align-center gap-2"
                          }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(unref(VBtn), {
                                  color: "success",
                                  onClick: exportToExcel
                                }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`<i class="bx bx-export mr-1" data-v-ea81d509${_scopeId5}></i> Export Excel `);
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
                                      _push6(`<i class="bxr bx-printer mr-1" data-v-ea81d509${_scopeId5}></i> Print `);
                                    } else {
                                      return [
                                        createVNode("i", { class: "bxr bx-printer mr-1" }),
                                        createTextVNode(" Print ")
                                      ];
                                    }
                                  }),
                                  _: 1
                                }, _parent5, _scopeId4));
                              } else {
                                return [
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
                                      createTextVNode(" Print ")
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
                              class: "d-flex align-center gap-2"
                            }, {
                              default: withCtx(() => [
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
                                    createTextVNode(" Print ")
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
                    _push3(`<!---->`);
                  }
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
                              modelValue: selectedOutlet.value,
                              "onUpdate:modelValue": ($event) => selectedOutlet.value = $event,
                              items: outletItems.value,
                              label: "Pilih Outlet",
                              variant: "outlined",
                              clearable: "",
                              loading: outlets.value.length === 0
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading"])
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
                          md: "2",
                          class: "d-flex align-center gap-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(VBtn), {
                              color: "primary",
                              onClick: fetchTransactionsByOutlet,
                              disabled: !selectedOutlet.value
                            }, {
                              default: withCtx(() => [
                                createVNode("i", { class: "bx bx-search-alt mr-1" }),
                                createTextVNode(" Terapkan ")
                              ]),
                              _: 1
                            }, 8, ["disabled"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    reportData.value ? (openBlock(), createBlock(unref(VRow), {
                      key: 0,
                      class: "mt-2",
                      dense: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(unref(VCol), {
                          cols: "12",
                          class: "d-flex align-center gap-2"
                        }, {
                          default: withCtx(() => [
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
                                createTextVNode(" Print ")
                              ]),
                              _: 1
                            })
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
                            modelValue: selectedOutlet.value,
                            "onUpdate:modelValue": ($event) => selectedOutlet.value = $event,
                            items: outletItems.value,
                            label: "Pilih Outlet",
                            variant: "outlined",
                            clearable: "",
                            loading: outlets.value.length === 0
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading"])
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
                        md: "2",
                        class: "d-flex align-center gap-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(VBtn), {
                            color: "primary",
                            onClick: fetchTransactionsByOutlet,
                            disabled: !selectedOutlet.value
                          }, {
                            default: withCtx(() => [
                              createVNode("i", { class: "bx bx-search-alt mr-1" }),
                              createTextVNode(" Terapkan ")
                            ]),
                            _: 1
                          }, 8, ["disabled"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  reportData.value ? (openBlock(), createBlock(unref(VRow), {
                    key: 0,
                    class: "mt-2",
                    dense: ""
                  }, {
                    default: withCtx(() => [
                      createVNode(unref(VCol), {
                        cols: "12",
                        class: "d-flex align-center gap-2"
                      }, {
                        default: withCtx(() => [
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
                              createTextVNode(" Print ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })) : createCommentVNode("", true)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (reportData.value) {
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
                                _push5(`<div class="text-subtitle-1 text-grey" data-v-ea81d509${_scopeId4}>Total Pendapatan</div><div class="text-h5 font-weight-bold text-primary" data-v-ea81d509${_scopeId4}>Rp ${ssrInterpolate(totalRevenue.value.toLocaleString())}</div>`);
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
                                _push5(`<div class="text-subtitle-1 text-grey" data-v-ea81d509${_scopeId4}>Foto Terjual</div><div class="text-h5 font-weight-bold text-info" data-v-ea81d509${_scopeId4}>${ssrInterpolate(totalPhotosSold.value)}</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "text-subtitle-1 text-grey" }, "Foto Terjual"),
                                  createVNode("div", { class: "text-h5 font-weight-bold text-info" }, toDisplayString(totalPhotosSold.value), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(VCardText), null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-subtitle-1 text-grey" }, "Foto Terjual"),
                                createVNode("div", { class: "text-h5 font-weight-bold text-info" }, toDisplayString(totalPhotosSold.value), 1)
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
                              createVNode("div", { class: "text-subtitle-1 text-grey" }, "Foto Terjual"),
                              createVNode("div", { class: "text-h5 font-weight-bold text-info" }, toDisplayString(totalPhotosSold.value), 1)
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
                            createVNode("div", { class: "text-subtitle-1 text-grey" }, "Foto Terjual"),
                            createVNode("div", { class: "text-h5 font-weight-bold text-info" }, toDisplayString(totalPhotosSold.value), 1)
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
      } else {
        _push(`<!---->`);
      }
      if (reportData.value) {
        _push(ssrRenderComponent(unref(VCard), {
          title: `Detail Transaksi - ${fullOutletName.value}`
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(VTable), { density: "compact" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<thead data-v-ea81d509${_scopeId2}><tr data-v-ea81d509${_scopeId2}><th class="text-center" data-v-ea81d509${_scopeId2}>#</th><th class="text-center" data-v-ea81d509${_scopeId2}>Jenis Foto</th><th class="text-center" data-v-ea81d509${_scopeId2}>Total Penjualan</th><th class="text-center" data-v-ea81d509${_scopeId2}>Total Pendapatan</th></tr></thead><tbody data-v-ea81d509${_scopeId2}>`);
                    if (outletData.value.length === 0) {
                      _push3(`<tr data-v-ea81d509${_scopeId2}><td colspan="5" class="text-center text-grey" data-v-ea81d509${_scopeId2}>Tidak ada data</td></tr>`);
                    } else {
                      _push3(`<!--[-->`);
                      ssrRenderList(outletData.value, (item, index) => {
                        _push3(`<tr data-v-ea81d509${_scopeId2}><td class="text-center" data-v-ea81d509${_scopeId2}>${ssrInterpolate(index + 1)}</td><td class="text-center" data-v-ea81d509${_scopeId2}>${ssrInterpolate(item.photo_type)}</td><td class="text-center" data-v-ea81d509${_scopeId2}>${ssrInterpolate(item.foto_terjual)}</td><td class="text-center" data-v-ea81d509${_scopeId2}>Rp ${ssrInterpolate(item.total_pendapatan.toLocaleString())}</td></tr>`);
                      });
                      _push3(`<!--]-->`);
                    }
                    if (outletData.value.length > 0) {
                      _push3(`<tr class="bg-blue-lighten-5" data-v-ea81d509${_scopeId2}><td class="text-center font-weight-bold" data-v-ea81d509${_scopeId2}></td><td class="text-center font-weight-bold" data-v-ea81d509${_scopeId2}>TOTAL</td><td class="text-center font-weight-bold" data-v-ea81d509${_scopeId2}>${ssrInterpolate(totalTransactions.value)}</td><td class="text-center font-weight-bold" data-v-ea81d509${_scopeId2}>Rp ${ssrInterpolate(totalRevenue.value.toLocaleString())}</td></tr>`);
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(`</tbody>`);
                  } else {
                    return [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "text-center" }, "#"),
                          createVNode("th", { class: "text-center" }, "Jenis Foto"),
                          createVNode("th", { class: "text-center" }, "Total Penjualan"),
                          createVNode("th", { class: "text-center" }, "Total Pendapatan")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        outletData.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                          createVNode("td", {
                            colspan: "5",
                            class: "text-center text-grey"
                          }, "Tidak ada data")
                        ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(outletData.value, (item, index) => {
                          return openBlock(), createBlock("tr", { key: index }, [
                            createVNode("td", { class: "text-center" }, toDisplayString(index + 1), 1),
                            createVNode("td", { class: "text-center" }, toDisplayString(item.photo_type), 1),
                            createVNode("td", { class: "text-center" }, toDisplayString(item.foto_terjual), 1),
                            createVNode("td", { class: "text-center" }, "Rp " + toDisplayString(item.total_pendapatan.toLocaleString()), 1)
                          ]);
                        }), 128)),
                        outletData.value.length > 0 ? (openBlock(), createBlock("tr", {
                          key: 2,
                          class: "bg-blue-lighten-5"
                        }, [
                          createVNode("td", { class: "text-center font-weight-bold" }),
                          createVNode("td", { class: "text-center font-weight-bold" }, "TOTAL"),
                          createVNode("td", { class: "text-center font-weight-bold" }, toDisplayString(totalTransactions.value), 1),
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
                        createVNode("th", { class: "text-center" }, "Jenis Foto"),
                        createVNode("th", { class: "text-center" }, "Total Penjualan"),
                        createVNode("th", { class: "text-center" }, "Total Pendapatan")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      outletData.value.length === 0 ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "5",
                          class: "text-center text-grey"
                        }, "Tidak ada data")
                      ])) : (openBlock(true), createBlock(Fragment, { key: 1 }, renderList(outletData.value, (item, index) => {
                        return openBlock(), createBlock("tr", { key: index }, [
                          createVNode("td", { class: "text-center" }, toDisplayString(index + 1), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(item.photo_type), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(item.foto_terjual), 1),
                          createVNode("td", { class: "text-center" }, "Rp " + toDisplayString(item.total_pendapatan.toLocaleString()), 1)
                        ]);
                      }), 128)),
                      outletData.value.length > 0 ? (openBlock(), createBlock("tr", {
                        key: 2,
                        class: "bg-blue-lighten-5"
                      }, [
                        createVNode("td", { class: "text-center font-weight-bold" }),
                        createVNode("td", { class: "text-center font-weight-bold" }, "TOTAL"),
                        createVNode("td", { class: "text-center font-weight-bold" }, toDisplayString(totalTransactions.value), 1),
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
      } else {
        _push(ssrRenderComponent(unref(VCard), { class: "text-center pa-8" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(VCardText), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(VIcon), {
                      size: "64",
                      color: "grey-lighten-1"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`mdi-store-search`);
                        } else {
                          return [
                            createTextVNode("mdi-store-search")
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`<div class="text-h6 mt-4 text-grey" data-v-ea81d509${_scopeId2}>Pilih outlet untuk melihat laporan transaksi</div>`);
                  } else {
                    return [
                      createVNode(unref(VIcon), {
                        size: "64",
                        color: "grey-lighten-1"
                      }, {
                        default: withCtx(() => [
                          createTextVNode("mdi-store-search")
                        ]),
                        _: 1
                      }),
                      createVNode("div", { class: "text-h6 mt-4 text-grey" }, "Pilih outlet untuk melihat laporan transaksi")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(VCardText), null, {
                  default: withCtx(() => [
                    createVNode(unref(VIcon), {
                      size: "64",
                      color: "grey-lighten-1"
                    }, {
                      default: withCtx(() => [
                        createTextVNode("mdi-store-search")
                      ]),
                      _: 1
                    }),
                    createVNode("div", { class: "text-h6 mt-4 text-grey" }, "Pilih outlet untuk melihat laporan transaksi")
                  ]),
                  _: 1
                })
              ];
            }
          }),
          _: 1
        }, _parent));
      }
      _push(`<!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/reports/outlet-transactions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const outletTransactions = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-ea81d509"]]);

export { outletTransactions as default };
