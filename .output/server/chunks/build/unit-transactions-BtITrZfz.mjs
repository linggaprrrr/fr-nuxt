import { defineComponent, ref, computed, unref, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { u as useReports, x as xlsxExports } from './useReports-DnK2mqp-.mjs';
import { saveAs } from 'file-saver';
import { V as VCard, a as VCardText } from './VCard-DLk5PTHl.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VSelect } from './VSelect-Bxz-WhQz.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
import { _ as _export_sfc, a as VBtn } from './server.mjs';
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
    const today = /* @__PURE__ */ new Date();
    const startDate = ref(today.toISOString().slice(0, 10));
    const endDate = ref(today.toISOString().slice(0, 10));
    const loading = ref(false);
    const error = ref(null);
    const report = ref(null);
    const units = ref([]);
    const unitsLoading = ref(false);
    const unitsError = ref(null);
    const totalTransactions = computed(() => {
      var _a;
      return ((_a = report.value) == null ? void 0 : _a.data.reduce((sum, item) => sum + item.foto_terjual, 0)) || 0;
    });
    const totalRevenue = computed(() => {
      var _a;
      return ((_a = report.value) == null ? void 0 : _a.data.reduce((sum, item) => sum + item.total_pendapatan, 0)) || 0;
    });
    const totalOutlets = computed(() => {
      var _a;
      if (!((_a = report.value) == null ? void 0 : _a.data)) return 0;
      const uniqueOutlets = new Set(report.value.data.map((item) => item.outlet));
      return uniqueOutlets.size;
    });
    const totalPhotoTypes = computed(() => {
      var _a;
      if (!((_a = report.value) == null ? void 0 : _a.data)) return 0;
      const uniquePhotoTypes = new Set(report.value.data.map((item) => item.photo_type));
      return uniquePhotoTypes.size;
    });
    const averagePerTransaction = computed(() => {
      if (totalTransactions.value === 0) return 0;
      return Math.round(totalRevenue.value / totalTransactions.value);
    });
    const dateHeader = computed(() => {
      const start = startDate.value.trim();
      const end = endDate.value.trim();
      console.log("Computed - Start:", start, "End:", end, "Equal?", start === end);
      return start === end ? formatDateDisplay(start) : `${formatDateDisplay(start)} - ${formatDateDisplay(end)}`;
    });
    function formatDateDisplay(dateString) {
      const date = new Date(dateString);
      const dd = String(date.getDate()).padStart(2, "0");
      const mm = String(date.getMonth() + 1).padStart(2, "0");
      const yyyy = date.getFullYear();
      return `${dd}/${mm}/${yyyy}`;
    }
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
    const exportToExcel = () => {
      if (!report.value) {
        alert("Tidak ada data untuk diexport!");
        return;
      }
      const headerInfo = [
        ["LAPORAN TRANSAKSI PER UNIT"],
        [""],
        ["Unit:", report.value.unit_name],
        ["Periode:", dateHeader.value],
        ["Tanggal Export:", formatDateDisplay((/* @__PURE__ */ new Date()).toISOString().slice(0, 10))],
        [""],
        ["RINGKASAN:"],
        ["Total Penjualan:", totalTransactions.value],
        ["Total Pendapatan:", `Rp ${totalRevenue.value.toLocaleString()}`],
        ["Total Outlet:", totalOutlets.value],
        ["Total Jenis Foto:", totalPhotoTypes.value],
        [""],
        ["DETAIL PER OUTLET & JENIS FOTO:"],
        [""]
      ];
      const transactionData = report.value.data.map((item, index) => ({
        "No": index + 1,
        "Outlet": item.outlet,
        "Jenis Foto": item.photo_type,
        "Jumlah Transaksi": item.foto_terjual,
        "Total Pendapatan": item.total_pendapatan
      }));
      const totalRow = {
        "No": "",
        "Outlet": "TOTAL",
        "Jenis Foto": "",
        "Jumlah Transaksi": totalTransactions.value,
        "Total Pendapatan": totalRevenue.value
      };
      const allData = [
        ...headerInfo,
        ...xlsxExports.utils.sheet_to_json(xlsxExports.utils.json_to_sheet(transactionData), { header: 1 }),
        [""],
        Object.values(totalRow)
      ];
      const worksheet = xlsxExports.utils.aoa_to_sheet(allData);
      worksheet["!cols"] = [
        { width: 5 },
        // No
        { width: 20 },
        // Outlet
        { width: 15 },
        // Jenis Foto
        { width: 15 },
        // Jumlah Transaksi
        { width: 18 }
        // Total Pendapatan
      ];
      const workbook = xlsxExports.utils.book_new();
      xlsxExports.utils.book_append_sheet(workbook, worksheet, "Laporan Unit");
      const wbout = xlsxExports.write(workbook, { bookType: "xlsx", type: "array" });
      const filename = `Laporan_Unit_${report.value.unit_name}_${startDate.value}_${endDate.value}.xlsx`;
      saveAs(new Blob([wbout], { type: "application/octet-stream" }), filename);
    };
    const printReport = () => {
      if (!report.value) {
        alert("Tidak ada data untuk diprint!");
        return;
      }
      const outletSummary = report.value.data.reduce((acc, item) => {
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
      LAPORAN UNIT
      <br>
      ${report.value.unit_name}
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
    <div class="row">
      <span>Total Outlet:</span>
      <span>${totalOutlets.value}</span>
    </div>
    
    <div class="divider"></div>
    
    <div class="row bold">
      <span>SUMMARY PER OUTLET:</span>
    </div>
    ${Object.entries(outletSummary).map(([outlet, count]) => `
      <div class="row">
        <span>${outlet}:</span>
        <span>${count}</span>
      </div>
    `).join("")}
    
    <div class="divider"></div>
    
    <div class="row bold">
      <span>DETAIL:</span>
    </div>
    
    ${report.value.data.map((item, index) => `
      <div class="detail">
        <div class="bold">${index + 1}. ${item.outlet}</div>
        <div>Jenis: ${item.photo_type}</div>
        <div class="row">
          <span>Foto Terjual: ${item.foto_terjual}</span>
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
                                variant: "outlined",
                                clearable: "",
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
                                  variant: "outlined",
                                  clearable: "",
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
                          md: "2"
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
                          md: "2"
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
                          md: "5",
                          class: "d-flex align-center gap-2"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(unref(VBtn), {
                                color: "primary",
                                loading: loading.value,
                                onClick: fetchReport,
                                disabled: loading.value
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<i class="bx bx-search-alt mr-1" data-v-31088fca${_scopeId5}></i> Terapkan `);
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
                                onClick: exportToExcel,
                                disabled: !report.value
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<i class="bx bx-export mr-1" data-v-31088fca${_scopeId5}></i> Export Excel `);
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
                                onClick: printReport,
                                disabled: !report.value
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`<i class="bxr bx-printer mr-1" data-v-31088fca${_scopeId5}></i> Print `);
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
                                  color: "primary",
                                  loading: loading.value,
                                  onClick: fetchReport,
                                  disabled: loading.value
                                }, {
                                  default: withCtx(() => [
                                    createVNode("i", { class: "bx bx-search-alt mr-1" }),
                                    createTextVNode(" Terapkan ")
                                  ]),
                                  _: 1
                                }, 8, ["loading", "disabled"]),
                                createVNode(unref(VBtn), {
                                  color: "success",
                                  onClick: exportToExcel,
                                  disabled: !report.value
                                }, {
                                  default: withCtx(() => [
                                    createVNode("i", { class: "bx bx-export mr-1" }),
                                    createTextVNode(" Export Excel ")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"]),
                                createVNode(unref(VBtn), {
                                  color: "info",
                                  onClick: printReport,
                                  disabled: !report.value
                                }, {
                                  default: withCtx(() => [
                                    createVNode("i", { class: "bxr bx-printer mr-1" }),
                                    createTextVNode(" Print ")
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
                                modelValue: unitId.value,
                                "onUpdate:modelValue": ($event) => unitId.value = $event,
                                items: units.value,
                                "item-title": "name",
                                "item-value": "id",
                                label: "Pilih Unit",
                                variant: "outlined",
                                clearable: "",
                                loading: unitsLoading.value,
                                disabled: unitsLoading.value || unitsError.value !== null
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "disabled"])
                            ]),
                            _: 1
                          }),
                          createVNode(unref(VCol), {
                            cols: "12",
                            md: "2"
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
                            md: "2"
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
                            md: "5",
                            class: "d-flex align-center gap-2"
                          }, {
                            default: withCtx(() => [
                              createVNode(unref(VBtn), {
                                color: "primary",
                                loading: loading.value,
                                onClick: fetchReport,
                                disabled: loading.value
                              }, {
                                default: withCtx(() => [
                                  createVNode("i", { class: "bx bx-search-alt mr-1" }),
                                  createTextVNode(" Terapkan ")
                                ]),
                                _: 1
                              }, 8, ["loading", "disabled"]),
                              createVNode(unref(VBtn), {
                                color: "success",
                                onClick: exportToExcel,
                                disabled: !report.value
                              }, {
                                default: withCtx(() => [
                                  createVNode("i", { class: "bx bx-export mr-1" }),
                                  createTextVNode(" Export Excel ")
                                ]),
                                _: 1
                              }, 8, ["disabled"]),
                              createVNode(unref(VBtn), {
                                color: "info",
                                onClick: printReport,
                                disabled: !report.value
                              }, {
                                default: withCtx(() => [
                                  createVNode("i", { class: "bxr bx-printer mr-1" }),
                                  createTextVNode(" Print ")
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
                              variant: "outlined",
                              clearable: "",
                              loading: unitsLoading.value,
                              disabled: unitsLoading.value || unitsError.value !== null
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "disabled"])
                          ]),
                          _: 1
                        }),
                        createVNode(unref(VCol), {
                          cols: "12",
                          md: "2"
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
                          md: "2"
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
                          md: "5",
                          class: "d-flex align-center gap-2"
                        }, {
                          default: withCtx(() => [
                            createVNode(unref(VBtn), {
                              color: "primary",
                              loading: loading.value,
                              onClick: fetchReport,
                              disabled: loading.value
                            }, {
                              default: withCtx(() => [
                                createVNode("i", { class: "bx bx-search-alt mr-1" }),
                                createTextVNode(" Terapkan ")
                              ]),
                              _: 1
                            }, 8, ["loading", "disabled"]),
                            createVNode(unref(VBtn), {
                              color: "success",
                              onClick: exportToExcel,
                              disabled: !report.value
                            }, {
                              default: withCtx(() => [
                                createVNode("i", { class: "bx bx-export mr-1" }),
                                createTextVNode(" Export Excel ")
                              ]),
                              _: 1
                            }, 8, ["disabled"]),
                            createVNode(unref(VBtn), {
                              color: "info",
                              onClick: printReport,
                              disabled: !report.value
                            }, {
                              default: withCtx(() => [
                                createVNode("i", { class: "bxr bx-printer mr-1" }),
                                createTextVNode(" Print ")
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
                            variant: "outlined",
                            clearable: "",
                            loading: unitsLoading.value,
                            disabled: unitsLoading.value || unitsError.value !== null
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading", "disabled"])
                        ]),
                        _: 1
                      }),
                      createVNode(unref(VCol), {
                        cols: "12",
                        md: "2"
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
                        md: "2"
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
                        md: "5",
                        class: "d-flex align-center gap-2"
                      }, {
                        default: withCtx(() => [
                          createVNode(unref(VBtn), {
                            color: "primary",
                            loading: loading.value,
                            onClick: fetchReport,
                            disabled: loading.value
                          }, {
                            default: withCtx(() => [
                              createVNode("i", { class: "bx bx-search-alt mr-1" }),
                              createTextVNode(" Terapkan ")
                            ]),
                            _: 1
                          }, 8, ["loading", "disabled"]),
                          createVNode(unref(VBtn), {
                            color: "success",
                            onClick: exportToExcel,
                            disabled: !report.value
                          }, {
                            default: withCtx(() => [
                              createVNode("i", { class: "bx bx-export mr-1" }),
                              createTextVNode(" Export Excel ")
                            ]),
                            _: 1
                          }, 8, ["disabled"]),
                          createVNode(unref(VBtn), {
                            color: "info",
                            onClick: printReport,
                            disabled: !report.value
                          }, {
                            default: withCtx(() => [
                              createVNode("i", { class: "bxr bx-printer mr-1" }),
                              createTextVNode(" Print ")
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
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      if (error.value) {
        _push(ssrRenderComponent(unref(VCard), {
          color: "error",
          class: "mb-4"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(VCardText), { class: "text-white" }, {
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
                createVNode(unref(VCardText), { class: "text-white" }, {
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
        _push(ssrRenderComponent(unref(VRow), {
          class: "mb-4",
          dense: ""
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(VCol), {
                cols: "12",
                md: "3"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(VCard), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(VCardText), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="text-subtitle-1 text-grey" data-v-31088fca${_scopeId4}>Total Pendapatan</div><div class="text-h5 font-weight-bold text-primary" data-v-31088fca${_scopeId4}>Rp ${ssrInterpolate(totalRevenue.value.toLocaleString())}</div>`);
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
                md: "3"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(VCard), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(VCardText), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="text-subtitle-1 text-grey" data-v-31088fca${_scopeId4}>Total Penjualan</div><div class="text-h5 font-weight-bold text-success" data-v-31088fca${_scopeId4}>${ssrInterpolate(totalTransactions.value)}</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "text-subtitle-1 text-grey" }, "Total Penjualan"),
                                  createVNode("div", { class: "text-h5 font-weight-bold text-success" }, toDisplayString(totalTransactions.value), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(VCardText), null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-subtitle-1 text-grey" }, "Total Penjualan"),
                                createVNode("div", { class: "text-h5 font-weight-bold text-success" }, toDisplayString(totalTransactions.value), 1)
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
                              createVNode("div", { class: "text-subtitle-1 text-grey" }, "Total Penjualan"),
                              createVNode("div", { class: "text-h5 font-weight-bold text-success" }, toDisplayString(totalTransactions.value), 1)
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
              _push2(ssrRenderComponent(unref(VCol), {
                cols: "12",
                md: "3"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(VCard), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(VCardText), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="text-subtitle-1 text-grey" data-v-31088fca${_scopeId4}>Total Outlet</div><div class="text-h5 font-weight-bold text-warning" data-v-31088fca${_scopeId4}>${ssrInterpolate(totalOutlets.value)}</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "text-subtitle-1 text-grey" }, "Total Outlet"),
                                  createVNode("div", { class: "text-h5 font-weight-bold text-warning" }, toDisplayString(totalOutlets.value), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(VCardText), null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-subtitle-1 text-grey" }, "Total Outlet"),
                                createVNode("div", { class: "text-h5 font-weight-bold text-warning" }, toDisplayString(totalOutlets.value), 1)
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
                              createVNode("div", { class: "text-subtitle-1 text-grey" }, "Total Outlet"),
                              createVNode("div", { class: "text-h5 font-weight-bold text-warning" }, toDisplayString(totalOutlets.value), 1)
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
              _push2(ssrRenderComponent(unref(VCol), {
                cols: "12",
                md: "3"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(ssrRenderComponent(unref(VCard), null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(unref(VCardText), null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`<div class="text-subtitle-1 text-grey" data-v-31088fca${_scopeId4}>Rata-rata per Transaksi</div><div class="text-h5 font-weight-bold text-info" data-v-31088fca${_scopeId4}>Rp ${ssrInterpolate(averagePerTransaction.value.toLocaleString())}</div>`);
                              } else {
                                return [
                                  createVNode("div", { class: "text-subtitle-1 text-grey" }, "Rata-rata per Transaksi"),
                                  createVNode("div", { class: "text-h5 font-weight-bold text-info" }, "Rp " + toDisplayString(averagePerTransaction.value.toLocaleString()), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(unref(VCardText), null, {
                              default: withCtx(() => [
                                createVNode("div", { class: "text-subtitle-1 text-grey" }, "Rata-rata per Transaksi"),
                                createVNode("div", { class: "text-h5 font-weight-bold text-info" }, "Rp " + toDisplayString(averagePerTransaction.value.toLocaleString()), 1)
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
                              createVNode("div", { class: "text-subtitle-1 text-grey" }, "Rata-rata per Transaksi"),
                              createVNode("div", { class: "text-h5 font-weight-bold text-info" }, "Rp " + toDisplayString(averagePerTransaction.value.toLocaleString()), 1)
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
            } else {
              return [
                createVNode(unref(VCol), {
                  cols: "12",
                  md: "3"
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
                  md: "3"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(VCard), null, {
                      default: withCtx(() => [
                        createVNode(unref(VCardText), null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-subtitle-1 text-grey" }, "Total Penjualan"),
                            createVNode("div", { class: "text-h5 font-weight-bold text-success" }, toDisplayString(totalTransactions.value), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(VCol), {
                  cols: "12",
                  md: "3"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(VCard), null, {
                      default: withCtx(() => [
                        createVNode(unref(VCardText), null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-subtitle-1 text-grey" }, "Total Outlet"),
                            createVNode("div", { class: "text-h5 font-weight-bold text-warning" }, toDisplayString(totalOutlets.value), 1)
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  _: 1
                }),
                createVNode(unref(VCol), {
                  cols: "12",
                  md: "3"
                }, {
                  default: withCtx(() => [
                    createVNode(unref(VCard), null, {
                      default: withCtx(() => [
                        createVNode(unref(VCardText), null, {
                          default: withCtx(() => [
                            createVNode("div", { class: "text-subtitle-1 text-grey" }, "Rata-rata per Transaksi"),
                            createVNode("div", { class: "text-h5 font-weight-bold text-info" }, "Rp " + toDisplayString(averagePerTransaction.value.toLocaleString()), 1)
                          ]),
                          _: 2
                        }, 1024)
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
        }, _parent));
      } else {
        _push(`<!---->`);
      }
      if (report.value && report.value.data.length > 0) {
        _push(ssrRenderComponent(unref(VCard), { title: "Detail Transaksi Per Unit (Berdasarkan Outlet & Jenis Foto)" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(VTable), { density: "compact" }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<thead data-v-31088fca${_scopeId2}><tr data-v-31088fca${_scopeId2}><th class="text-center" data-v-31088fca${_scopeId2}>#</th><th class="text-center" data-v-31088fca${_scopeId2}>Outlet</th><th class="text-center" data-v-31088fca${_scopeId2}>Jenis Foto</th><th class="text-center" data-v-31088fca${_scopeId2}>Total Penjualan</th><th class="text-center" data-v-31088fca${_scopeId2}>Total Pendapatan</th></tr></thead><tbody data-v-31088fca${_scopeId2}><!--[-->`);
                    ssrRenderList(report.value.data, (item, index) => {
                      _push3(`<tr data-v-31088fca${_scopeId2}><td class="text-center" data-v-31088fca${_scopeId2}>${ssrInterpolate(index + 1)}</td><td class="text-center" data-v-31088fca${_scopeId2}>${ssrInterpolate(item.outlet)}</td><td class="text-center" data-v-31088fca${_scopeId2}>${ssrInterpolate(item.photo_type)}</td><td class="text-center" data-v-31088fca${_scopeId2}>${ssrInterpolate(item.foto_terjual)}</td><td class="text-center" data-v-31088fca${_scopeId2}>Rp ${ssrInterpolate(item.total_pendapatan.toLocaleString())}</td></tr>`);
                    });
                    _push3(`<!--]--><tr class="bg-blue-lighten-5" data-v-31088fca${_scopeId2}><td class="text-center font-weight-bold" data-v-31088fca${_scopeId2}></td><td class="text-center font-weight-bold" data-v-31088fca${_scopeId2}>TOTAL</td><td class="text-center font-weight-bold" data-v-31088fca${_scopeId2}></td><td class="text-center font-weight-bold" data-v-31088fca${_scopeId2}>${ssrInterpolate(totalTransactions.value)}</td><td class="text-center font-weight-bold" data-v-31088fca${_scopeId2}>Rp ${ssrInterpolate(totalRevenue.value.toLocaleString())}</td></tr></tbody>`);
                  } else {
                    return [
                      createVNode("thead", null, [
                        createVNode("tr", null, [
                          createVNode("th", { class: "text-center" }, "#"),
                          createVNode("th", { class: "text-center" }, "Outlet"),
                          createVNode("th", { class: "text-center" }, "Jenis Foto"),
                          createVNode("th", { class: "text-center" }, "Total Penjualan"),
                          createVNode("th", { class: "text-center" }, "Total Pendapatan")
                        ])
                      ]),
                      createVNode("tbody", null, [
                        (openBlock(true), createBlock(Fragment, null, renderList(report.value.data, (item, index) => {
                          return openBlock(), createBlock("tr", {
                            key: `${item.outlet}-${item.photo_type}`
                          }, [
                            createVNode("td", { class: "text-center" }, toDisplayString(index + 1), 1),
                            createVNode("td", { class: "text-center" }, toDisplayString(item.outlet), 1),
                            createVNode("td", { class: "text-center" }, toDisplayString(item.photo_type), 1),
                            createVNode("td", { class: "text-center" }, toDisplayString(item.foto_terjual), 1),
                            createVNode("td", { class: "text-center" }, "Rp " + toDisplayString(item.total_pendapatan.toLocaleString()), 1)
                          ]);
                        }), 128)),
                        createVNode("tr", { class: "bg-blue-lighten-5" }, [
                          createVNode("td", { class: "text-center font-weight-bold" }),
                          createVNode("td", { class: "text-center font-weight-bold" }, "TOTAL"),
                          createVNode("td", { class: "text-center font-weight-bold" }),
                          createVNode("td", { class: "text-center font-weight-bold" }, toDisplayString(totalTransactions.value), 1),
                          createVNode("td", { class: "text-center font-weight-bold" }, "Rp " + toDisplayString(totalRevenue.value.toLocaleString()), 1)
                        ])
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
                        createVNode("th", { class: "text-center" }, "Outlet"),
                        createVNode("th", { class: "text-center" }, "Jenis Foto"),
                        createVNode("th", { class: "text-center" }, "Total Penjualan"),
                        createVNode("th", { class: "text-center" }, "Total Pendapatan")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      (openBlock(true), createBlock(Fragment, null, renderList(report.value.data, (item, index) => {
                        return openBlock(), createBlock("tr", {
                          key: `${item.outlet}-${item.photo_type}`
                        }, [
                          createVNode("td", { class: "text-center" }, toDisplayString(index + 1), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(item.outlet), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(item.photo_type), 1),
                          createVNode("td", { class: "text-center" }, toDisplayString(item.foto_terjual), 1),
                          createVNode("td", { class: "text-center" }, "Rp " + toDisplayString(item.total_pendapatan.toLocaleString()), 1)
                        ]);
                      }), 128)),
                      createVNode("tr", { class: "bg-blue-lighten-5" }, [
                        createVNode("td", { class: "text-center font-weight-bold" }),
                        createVNode("td", { class: "text-center font-weight-bold" }, "TOTAL"),
                        createVNode("td", { class: "text-center font-weight-bold" }),
                        createVNode("td", { class: "text-center font-weight-bold" }, toDisplayString(totalTransactions.value), 1),
                        createVNode("td", { class: "text-center font-weight-bold" }, "Rp " + toDisplayString(totalRevenue.value.toLocaleString()), 1)
                      ])
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
        _push(ssrRenderComponent(unref(VCard), { title: "Ringkasan Unit" }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(unref(VCardText), null, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(`<div class="text-center mb-4" data-v-31088fca${_scopeId2}><div class="text-h6 font-weight-bold" data-v-31088fca${_scopeId2}>${ssrInterpolate(report.value.unit_name)}</div><div class="text-subtitle-1" data-v-31088fca${_scopeId2}>${ssrInterpolate(formatDateDisplay(report.value.start_date))} - ${ssrInterpolate(formatDateDisplay(report.value.end_date))}</div></div><div class="text-center text-subtitle-1 text-grey" data-v-31088fca${_scopeId2}> Tidak ada data transaksi untuk unit ini pada periode yang dipilih. </div>`);
                  } else {
                    return [
                      createVNode("div", { class: "text-center mb-4" }, [
                        createVNode("div", { class: "text-h6 font-weight-bold" }, toDisplayString(report.value.unit_name), 1),
                        createVNode("div", { class: "text-subtitle-1" }, toDisplayString(formatDateDisplay(report.value.start_date)) + " - " + toDisplayString(formatDateDisplay(report.value.end_date)), 1)
                      ]),
                      createVNode("div", { class: "text-center text-subtitle-1 text-grey" }, " Tidak ada data transaksi untuk unit ini pada periode yang dipilih. ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
            } else {
              return [
                createVNode(unref(VCardText), null, {
                  default: withCtx(() => [
                    createVNode("div", { class: "text-center mb-4" }, [
                      createVNode("div", { class: "text-h6 font-weight-bold" }, toDisplayString(report.value.unit_name), 1),
                      createVNode("div", { class: "text-subtitle-1" }, toDisplayString(formatDateDisplay(report.value.start_date)) + " - " + toDisplayString(formatDateDisplay(report.value.end_date)), 1)
                    ]),
                    createVNode("div", { class: "text-center text-subtitle-1 text-grey" }, " Tidak ada data transaksi untuk unit ini pada periode yang dipilih. ")
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/reports/unit-transactions.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const unitTransactions = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-31088fca"]]);

export { unitTransactions as default };
