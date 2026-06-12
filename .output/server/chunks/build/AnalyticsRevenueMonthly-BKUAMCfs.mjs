import { defineComponent, createElementBlock, withCtx, createVNode, toDisplayString, computed, mergeProps, unref, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderStyle } from 'vue/server-renderer';
import { V as VCard, a as VCardText } from './VCard-DLk5PTHl.mjs';
import { V as VAvatar, b as VIcon, aY as useTheme } from './server.mjs';
import { Bar } from 'vue-chartjs';
import { Chart, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';

const ServerPlaceholder = defineComponent({
  name: "ServerPlaceholder",
  render() {
    return createElementBlock("div");
  }
});

const _sfc_main$3 = /* @__PURE__ */ defineComponent({
  __name: "CardStatisticsHorizontal",
  __ssrInlineRender: true,
  props: {
    title: {},
    color: { default: "primary" },
    icon: {},
    stats: {}
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardText, { class: "d-flex align-center" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VAvatar, {
                    size: "44",
                    rounded: "",
                    color: props.color,
                    variant: "tonal",
                    class: "me-4"
                  }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VIcon, {
                          icon: props.icon,
                          size: "30"
                        }, null, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VIcon, {
                            icon: props.icon,
                            size: "30"
                          }, null, 8, ["icon"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(`<div${_scopeId2}><span class="text-caption"${_scopeId2}>${ssrInterpolate(props.title)}</span><div class="d-flex align-center flex-wrap"${_scopeId2}><span class="text-h6 font-weight-semibold"${_scopeId2}>${ssrInterpolate(props.stats)}</span></div></div>`);
                } else {
                  return [
                    createVNode(VAvatar, {
                      size: "44",
                      rounded: "",
                      color: props.color,
                      variant: "tonal",
                      class: "me-4"
                    }, {
                      default: withCtx(() => [
                        createVNode(VIcon, {
                          icon: props.icon,
                          size: "30"
                        }, null, 8, ["icon"])
                      ]),
                      _: 1
                    }, 8, ["color"]),
                    createVNode("div", null, [
                      createVNode("span", { class: "text-caption" }, toDisplayString(props.title), 1),
                      createVNode("div", { class: "d-flex align-center flex-wrap" }, [
                        createVNode("span", { class: "text-h6 font-weight-semibold" }, toDisplayString(props.stats), 1)
                      ])
                    ])
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardText, { class: "d-flex align-center" }, {
                default: withCtx(() => [
                  createVNode(VAvatar, {
                    size: "44",
                    rounded: "",
                    color: props.color,
                    variant: "tonal",
                    class: "me-4"
                  }, {
                    default: withCtx(() => [
                      createVNode(VIcon, {
                        icon: props.icon,
                        size: "30"
                      }, null, 8, ["icon"])
                    ]),
                    _: 1
                  }, 8, ["color"]),
                  createVNode("div", null, [
                    createVNode("span", { class: "text-caption" }, toDisplayString(props.title), 1),
                    createVNode("div", { class: "d-flex align-center flex-wrap" }, [
                      createVNode("span", { class: "text-h6 font-weight-semibold" }, toDisplayString(props.stats), 1)
                    ])
                  ])
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("@core/components/cards/CardStatisticsHorizontal.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const _sfc_main$2 = /* @__PURE__ */ defineComponent({
  __name: "AnalyticsRevenue",
  __ssrInlineRender: true,
  props: {
    data: {}
  },
  setup(__props) {
    const props = __props;
    function getNamaHari(tanggalStr) {
      const hariIndo = ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"];
      const tanggal = new Date(tanggalStr);
      return hariIndo[tanggal.getDay()];
    }
    const vuetifyTheme = useTheme();
    const categories = computed(() => props.data.map((d) => getNamaHari(d.tanggal)));
    const values = computed(() => props.data.map((d) => d.total));
    const totalPendapatan = computed(() => values.value.reduce((a, b) => a + b, 0));
    const currentTheme = computed(() => vuetifyTheme.current.value.colors);
    computed(() => vuetifyTheme.current.value.variables);
    const disabledText = computed(() => {
      const isDark = vuetifyTheme.current.value.dark;
      if (isDark) {
        return `rgba(255, 255, 255, 0.72)`;
      } else {
        return `rgba(34, 34, 34, 0.72)`;
      }
    });
    const series = computed(() => [
      {
        name: "Pendapatan",
        data: values.value
        // line smooth agar lebih menarik
        // type, color sudah di options
      }
    ]);
    const chartOptions = computed(() => ({
      chart: {
        id: "line-pendapatan",
        toolbar: { show: false },
        zoom: { enabled: false },
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
          animateGradually: { enabled: true, delay: 150 },
          dynamicAnimation: { enabled: true, speed: 350 }
        }
      },
      stroke: {
        curve: "smooth",
        width: 3
      },
      markers: {
        size: 5,
        colors: [currentTheme.value.primary],
        strokeColors: currentTheme.value.surface,
        strokeWidth: 2,
        hover: { size: 7 }
      },
      tooltip: {
        enabled: true,
        theme: vuetifyTheme.current.value.dark ? "dark" : "light",
        y: {
          formatter: (val) => `Rp${val.toLocaleString()}`
        }
      },
      xaxis: {
        categories: categories.value,
        labels: {
          style: {
            colors: disabledText.value,
            fontSize: "12px",
            fontFamily: "Public Sans"
          }
        },
        axisBorder: { show: false },
        axisTicks: { show: false }
      },
      yaxis: {
        labels: {
          formatter: (val) => `Rp${val.toLocaleString()}`,
          style: {
            colors: disabledText.value,
            fontSize: "12px",
            fontFamily: "Public Sans"
          }
        }
      },
      grid: {
        borderColor: vuetifyTheme.current.value.dark ? "rgba(255, 255, 255, 0.12)" : "rgba(0, 0, 0, 0.12)",
        strokeDashArray: 4,
        xaxis: { lines: { show: false } },
        yaxis: { lines: { show: true } }
      },
      colors: [currentTheme.value.primary],
      legend: { show: false }
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VueApexCharts = ServerPlaceholder;
      _push(ssrRenderComponent(VCard, mergeProps({ class: "h-100 d-flex flex-column" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardText, { class: "pb-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-base font-medium"${_scopeId2}>Pendapatan Minggu ini</div><h4 class="text-h4 font-weight-medium"${_scopeId2}> Rp${ssrInterpolate(totalPendapatan.value.toLocaleString())}</h4>`);
                } else {
                  return [
                    createVNode("div", { class: "text-base font-medium" }, "Pendapatan Minggu ini"),
                    createVNode("h4", { class: "text-h4 font-weight-medium" }, " Rp" + toDisplayString(totalPendapatan.value.toLocaleString()), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_VueApexCharts, {
              type: "line",
              height: 350,
              options: chartOptions.value,
              series: series.value
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardText, { class: "pb-0" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-base font-medium" }, "Pendapatan Minggu ini"),
                  createVNode("h4", { class: "text-h4 font-weight-medium" }, " Rp" + toDisplayString(totalPendapatan.value.toLocaleString()), 1)
                ]),
                _: 2
              }, 1024),
              createVNode(_component_VueApexCharts, {
                type: "line",
                height: 350,
                options: chartOptions.value,
                series: series.value
              }, null, 8, ["options", "series"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/dashboard/AnalyticsRevenue.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const _sfc_main$1 = /* @__PURE__ */ defineComponent({
  __name: "AnalyticsRevenuePerUnit",
  __ssrInlineRender: true,
  props: {
    data: {}
  },
  setup(__props) {
    const props = __props;
    const vuetifyTheme = useTheme();
    const currentTheme = computed(() => vuetifyTheme.current.value.colors);
    const labels = computed(() => props.data.map((d) => d.unit));
    const series = computed(() => props.data.map((d) => d.total));
    const chartOptions = computed(() => ({
      labels: labels.value,
      legend: {
        position: "bottom",
        labels: {
          colors: vuetifyTheme.current.value.dark ? "#fff" : "#333"
        }
      },
      tooltip: {
        y: {
          formatter: (val) => `Rp${val.toLocaleString()}`
        }
      },
      colors: [
        currentTheme.value.primary,
        currentTheme.value.secondary,
        "#00E396",
        "#FEB019",
        "#FF4560",
        "#775DD0",
        "#008FFB"
      ]
    }));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_VueApexCharts = ServerPlaceholder;
      _push(ssrRenderComponent(VCard, mergeProps({ class: "h-100 d-flex flex-column" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardText, { class: "pb-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-base font-medium"${_scopeId2}>Pendapatan Per Unit Bulan Ini</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-base font-medium" }, "Pendapatan Per Unit Bulan Ini")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_VueApexCharts, {
              style: { "margin": "20px" },
              type: "pie",
              height: 400,
              options: chartOptions.value,
              series: series.value
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardText, { class: "pb-0" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-base font-medium" }, "Pendapatan Per Unit Bulan Ini")
                ]),
                _: 1
              }),
              createVNode(_component_VueApexCharts, {
                style: { "margin": "20px" },
                type: "pie",
                height: 400,
                options: chartOptions.value,
                series: series.value
              }, null, 8, ["options", "series"])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
});
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/dashboard/AnalyticsRevenuePerUnit.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "AnalyticsRevenueMonthly",
  __ssrInlineRender: true,
  props: {
    data: {}
  },
  setup(__props) {
    Chart.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);
    const props = __props;
    const chartData = computed(() => ({
      labels: props.data.map((d) => d.name),
      datasets: [
        {
          label: "Pendapatan per Bulan",
          backgroundColor: "#4caf50",
          data: props.data.map((d) => d.total)
        }
      ]
    }));
    const chartOptions = {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            callback: function(value) {
              return new Intl.NumberFormat("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0
              }).format(value);
            }
          }
        }
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({ class: "h-100 d-flex flex-column" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardText, { class: "pb-0" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<div class="text-base font-medium"${_scopeId2}>Pendapatan Per Bulan</div>`);
                } else {
                  return [
                    createVNode("div", { class: "text-base font-medium" }, "Pendapatan Per Bulan")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`<div style="${ssrRenderStyle({ "height": "400px", "margin": "20px" })}"${_scopeId}>`);
            _push2(ssrRenderComponent(unref(Bar), {
              data: unref(chartData),
              options: chartOptions
            }, null, _parent2, _scopeId));
            _push2(`</div>`);
          } else {
            return [
              createVNode(VCardText, { class: "pb-0" }, {
                default: withCtx(() => [
                  createVNode("div", { class: "text-base font-medium" }, "Pendapatan Per Bulan")
                ]),
                _: 1
              }),
              createVNode("div", { style: { "height": "400px", "margin": "20px" } }, [
                createVNode(unref(Bar), {
                  data: unref(chartData),
                  options: chartOptions
                }, null, 8, ["data"])
              ])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("views/dashboard/AnalyticsRevenueMonthly.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main$3 as _, _sfc_main$2 as a, _sfc_main$1 as b, _sfc_main as c };
