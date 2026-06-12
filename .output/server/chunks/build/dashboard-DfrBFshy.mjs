import { _ as _sfc_main$3, a as _sfc_main$2, b as _sfc_main$1, c as _sfc_main$4 } from './AnalyticsRevenueMonthly-BKUAMCfs.mjs';
import { defineComponent, ref, computed, withCtx, unref, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import './VCard-DLk5PTHl.mjs';
import './server.mjs';
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
import 'vue-chartjs';
import 'chart.js';

const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "dashboard",
  __ssrInlineRender: true,
  setup(__props) {
    const stats = ref(null);
    const formatCurrency = (amount) => amount.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0
    });
    const incomeToday = computed(() => {
      var _a2;
      var _a;
      return formatCurrency((_a2 = (_a = stats.value) == null ? void 0 : _a.total_pendapatan_hari_ini) != null ? _a2 : 0);
    });
    const incomeWeek = computed(() => {
      var _a2;
      var _a;
      return formatCurrency((_a2 = (_a = stats.value) == null ? void 0 : _a.total_pendapatan_minggu_ini) != null ? _a2 : 0);
    });
    const incomeMonth = computed(() => {
      var _a2;
      var _a;
      return formatCurrency((_a2 = (_a = stats.value) == null ? void 0 : _a.total_pendapatan_bulan_ini) != null ? _a2 : 0);
    });
    const incomeYear = computed(() => {
      var _a2;
      var _a;
      return formatCurrency((_a2 = (_a = stats.value) == null ? void 0 : _a.total_pendapatan_tahun_ini) != null ? _a2 : 0);
    });
    const totalTransaction = computed(() => {
      var _a2;
      var _a;
      return ((_a2 = (_a = stats.value) == null ? void 0 : _a.total_transaksi_hari_ini) != null ? _a2 : 0).toString();
    });
    const totalTransactionWeek = computed(() => {
      var _a2;
      var _a;
      return ((_a2 = (_a = stats.value) == null ? void 0 : _a.total_transaksi_minggu_ini) != null ? _a2 : 0).toString();
    });
    const totalTransactionMonth = computed(() => {
      var _a2;
      var _a;
      return ((_a2 = (_a = stats.value) == null ? void 0 : _a.total_transaksi_bulan_ini) != null ? _a2 : 0).toString();
    });
    const totalTransactionYear = computed(() => {
      var _a2;
      var _a;
      return ((_a2 = (_a = stats.value) == null ? void 0 : _a.total_transaksi_tahun_ini) != null ? _a2 : 0).toString();
    });
    const chartData = computed(() => {
      var _a2;
      var _a;
      return (_a2 = (_a = stats.value) == null ? void 0 : _a.pendapatan_per_hari) != null ? _a2 : [];
    });
    const unitsRevenue = computed(() => {
      var _a2;
      var _a;
      return (_a2 = (_a = stats.value) == null ? void 0 : _a.pendapatan_per_unit) != null ? _a2 : [];
    });
    const monthlyRevenueChartData = computed(
      () => {
        var _a2;
        var _a, _b;
        return (_a2 = (_b = (_a = stats.value) == null ? void 0 : _a.pendapatan_per_bulan) == null ? void 0 : _b.map((item) => ({
          name: item.bulan,
          total: item.total
        }))) != null ? _a2 : [];
      }
    );
    return (_ctx, _push, _parent, _attrs) => {
      const _component_CardStatisticsHorizontal = _sfc_main$3;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "12" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "3"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CardStatisticsHorizontal, {
                                stats: unref(incomeToday),
                                icon: "bx bx-wallet-alt",
                                title: "Pendapatan Hari ini"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_CardStatisticsHorizontal, {
                                  stats: unref(incomeToday),
                                  icon: "bx bx-wallet-alt",
                                  title: "Pendapatan Hari ini"
                                }, null, 8, ["stats"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "3"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CardStatisticsHorizontal, {
                                stats: unref(incomeWeek),
                                icon: "bx bx-calendar-week",
                                title: "Pendapatan Minggu ini"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_CardStatisticsHorizontal, {
                                  stats: unref(incomeWeek),
                                  icon: "bx bx-calendar-week",
                                  title: "Pendapatan Minggu ini"
                                }, null, 8, ["stats"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "3"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CardStatisticsHorizontal, {
                                stats: unref(incomeMonth),
                                icon: "bx bx-calendar",
                                title: "Pendapatan Bulan ini"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_CardStatisticsHorizontal, {
                                  stats: unref(incomeMonth),
                                  icon: "bx bx-calendar",
                                  title: "Pendapatan Bulan ini"
                                }, null, 8, ["stats"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "3"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CardStatisticsHorizontal, {
                                stats: unref(incomeYear),
                                icon: "bx bx-calendar-alt",
                                title: "Pendapatan Tahun ini"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_CardStatisticsHorizontal, {
                                  stats: unref(incomeYear),
                                  icon: "bx bx-calendar-alt",
                                  title: "Pendapatan Tahun ini"
                                }, null, 8, ["stats"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CardStatisticsHorizontal, {
                                stats: unref(incomeToday),
                                icon: "bx bx-wallet-alt",
                                title: "Pendapatan Hari ini"
                              }, null, 8, ["stats"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CardStatisticsHorizontal, {
                                stats: unref(incomeWeek),
                                icon: "bx bx-calendar-week",
                                title: "Pendapatan Minggu ini"
                              }, null, 8, ["stats"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CardStatisticsHorizontal, {
                                stats: unref(incomeMonth),
                                icon: "bx bx-calendar",
                                title: "Pendapatan Bulan ini"
                              }, null, 8, ["stats"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6",
                            lg: "3"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CardStatisticsHorizontal, {
                                stats: unref(incomeYear),
                                icon: "bx bx-calendar-alt",
                                title: "Pendapatan Tahun ini"
                              }, null, 8, ["stats"])
                            ]),
                            _: 1
                          })
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CardStatisticsHorizontal, {
                                stats: unref(totalTransaction),
                                icon: "bx bx-cart",
                                title: "Transaksi Hari ini"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_CardStatisticsHorizontal, {
                                  stats: unref(totalTransaction),
                                  icon: "bx bx-cart",
                                  title: "Transaksi Hari ini"
                                }, null, 8, ["stats"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CardStatisticsHorizontal, {
                                stats: unref(totalTransactionWeek),
                                icon: "bx bx-cart-alt",
                                title: "Transaksi Minggu ini"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_CardStatisticsHorizontal, {
                                  stats: unref(totalTransactionWeek),
                                  icon: "bx bx-cart-alt",
                                  title: "Transaksi Minggu ini"
                                }, null, 8, ["stats"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CardStatisticsHorizontal, {
                                stats: unref(totalTransactionMonth),
                                icon: "bx bx-cart-add",
                                title: "Transaksi Bulan ini"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_CardStatisticsHorizontal, {
                                  stats: unref(totalTransactionMonth),
                                  icon: "bx bx-cart-add",
                                  title: "Transaksi Bulan ini"
                                }, null, 8, ["stats"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(_component_CardStatisticsHorizontal, {
                                stats: unref(totalTransactionYear),
                                icon: "bx bx-cart-download",
                                title: "Transaksi Tahun ini"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(_component_CardStatisticsHorizontal, {
                                  stats: unref(totalTransactionYear),
                                  icon: "bx bx-cart-download",
                                  title: "Transaksi Tahun ini"
                                }, null, 8, ["stats"])
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VCol, {
                            cols: "12",
                            md: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CardStatisticsHorizontal, {
                                stats: unref(totalTransaction),
                                icon: "bx bx-cart",
                                title: "Transaksi Hari ini"
                              }, null, 8, ["stats"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CardStatisticsHorizontal, {
                                stats: unref(totalTransactionWeek),
                                icon: "bx bx-cart-alt",
                                title: "Transaksi Minggu ini"
                              }, null, 8, ["stats"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CardStatisticsHorizontal, {
                                stats: unref(totalTransactionMonth),
                                icon: "bx bx-cart-add",
                                title: "Transaksi Bulan ini"
                              }, null, 8, ["stats"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(_component_CardStatisticsHorizontal, {
                                stats: unref(totalTransactionYear),
                                icon: "bx bx-cart-download",
                                title: "Transaksi Tahun ini"
                              }, null, 8, ["stats"])
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
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "3"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CardStatisticsHorizontal, {
                              stats: unref(incomeToday),
                              icon: "bx bx-wallet-alt",
                              title: "Pendapatan Hari ini"
                            }, null, 8, ["stats"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "3"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CardStatisticsHorizontal, {
                              stats: unref(incomeWeek),
                              icon: "bx bx-calendar-week",
                              title: "Pendapatan Minggu ini"
                            }, null, 8, ["stats"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "3"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CardStatisticsHorizontal, {
                              stats: unref(incomeMonth),
                              icon: "bx bx-calendar",
                              title: "Pendapatan Bulan ini"
                            }, null, 8, ["stats"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6",
                          lg: "3"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CardStatisticsHorizontal, {
                              stats: unref(incomeYear),
                              icon: "bx bx-calendar-alt",
                              title: "Pendapatan Tahun ini"
                            }, null, 8, ["stats"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }),
                    createVNode(VRow, null, {
                      default: withCtx(() => [
                        createVNode(VCol, {
                          cols: "12",
                          md: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CardStatisticsHorizontal, {
                              stats: unref(totalTransaction),
                              icon: "bx bx-cart",
                              title: "Transaksi Hari ini"
                            }, null, 8, ["stats"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CardStatisticsHorizontal, {
                              stats: unref(totalTransactionWeek),
                              icon: "bx bx-cart-alt",
                              title: "Transaksi Minggu ini"
                            }, null, 8, ["stats"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CardStatisticsHorizontal, {
                              stats: unref(totalTransactionMonth),
                              icon: "bx bx-cart-add",
                              title: "Transaksi Bulan ini"
                            }, null, 8, ["stats"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode(_component_CardStatisticsHorizontal, {
                              stats: unref(totalTransactionYear),
                              icon: "bx bx-cart-download",
                              title: "Transaksi Tahun ini"
                            }, null, 8, ["stats"])
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
              createVNode(VCol, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        lg: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CardStatisticsHorizontal, {
                            stats: unref(incomeToday),
                            icon: "bx bx-wallet-alt",
                            title: "Pendapatan Hari ini"
                          }, null, 8, ["stats"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        lg: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CardStatisticsHorizontal, {
                            stats: unref(incomeWeek),
                            icon: "bx bx-calendar-week",
                            title: "Pendapatan Minggu ini"
                          }, null, 8, ["stats"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        lg: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CardStatisticsHorizontal, {
                            stats: unref(incomeMonth),
                            icon: "bx bx-calendar",
                            title: "Pendapatan Bulan ini"
                          }, null, 8, ["stats"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6",
                        lg: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CardStatisticsHorizontal, {
                            stats: unref(incomeYear),
                            icon: "bx bx-calendar-alt",
                            title: "Pendapatan Tahun ini"
                          }, null, 8, ["stats"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  }),
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, {
                        cols: "12",
                        md: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CardStatisticsHorizontal, {
                            stats: unref(totalTransaction),
                            icon: "bx bx-cart",
                            title: "Transaksi Hari ini"
                          }, null, 8, ["stats"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CardStatisticsHorizontal, {
                            stats: unref(totalTransactionWeek),
                            icon: "bx bx-cart-alt",
                            title: "Transaksi Minggu ini"
                          }, null, 8, ["stats"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CardStatisticsHorizontal, {
                            stats: unref(totalTransactionMonth),
                            icon: "bx bx-cart-add",
                            title: "Transaksi Bulan ini"
                          }, null, 8, ["stats"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(_component_CardStatisticsHorizontal, {
                            stats: unref(totalTransactionYear),
                            icon: "bx bx-cart-download",
                            title: "Transaksi Tahun ini"
                          }, null, 8, ["stats"])
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
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              md: "8",
              order: "2",
              "order-md": "1",
              class: "h-100"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$2, { data: unref(chartData) }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$2, { data: unref(chartData) }, null, 8, ["data"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCol, {
              cols: "12",
              md: "4",
              order: "2",
              "order-md": "1",
              class: "h-100"
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$1, { data: unref(unitsRevenue) }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$1, { data: unref(unitsRevenue) }, null, 8, ["data"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, {
                cols: "12",
                md: "8",
                order: "2",
                "order-md": "1",
                class: "h-100"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$2, { data: unref(chartData) }, null, 8, ["data"])
                ]),
                _: 1
              }),
              createVNode(VCol, {
                cols: "12",
                md: "4",
                order: "2",
                "order-md": "1",
                class: "h-100"
              }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$1, { data: unref(unitsRevenue) }, null, 8, ["data"])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VRow, null, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCol, { cols: "12" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(_sfc_main$4, { data: unref(monthlyRevenueChartData) }, null, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(_sfc_main$4, { data: unref(monthlyRevenueChartData) }, null, 8, ["data"])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCol, { cols: "12" }, {
                default: withCtx(() => [
                  createVNode(_sfc_main$4, { data: unref(monthlyRevenueChartData) }, null, 8, ["data"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/dashboard.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
