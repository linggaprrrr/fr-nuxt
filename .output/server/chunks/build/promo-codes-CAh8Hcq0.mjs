import { defineComponent, ref, watch, withCtx, createVNode, createTextVNode, toDisplayString, createBlock, createCommentVNode, openBlock, Fragment, renderList, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { g as getApiErrorMessage, a as authFetch } from './authFetch-5wQjlWwJ.mjs';
import { V as VCard, a as VCardText, b as VCardActions, c as VCardTitle } from './VCard-DLk5PTHl.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
import { V as VTextField } from './VTextField-1oTGfZvz.mjs';
import { V as VSelect } from './VSelect-Bxz-WhQz.mjs';
import { V as VTable } from './VTable-BXA3D1kT.mjs';
import { a as VBtn, b as VIcon } from './server.mjs';
import { V as VChip } from './VChip-C44NlS62.mjs';
import { V as VPagination } from './VPagination-z_-yTplN.mjs';
import { V as VDialog } from './VDialog-yRDXDq_T.mjs';
import { V as VContainer } from './VContainer-CZliQBxk.mjs';
import { V as VSwitch } from './VSwitch-BPbv21Ir.mjs';
import { V as VSpacer } from './VSpacer-CQpJ4yRI.mjs';
import './index-ewhk7FTz.mjs';
import './forwardRefs-BSTjJZPU.mjs';
import './VMenu-CmFsZZaF.mjs';
import './ssrBoot-BtvJZs44.mjs';
import './VListSubheader-BbgyaiQc.mjs';
import './dialog-transition-D66jL1n_.mjs';
import './VCheckboxBtn-DaRBpQ2e.mjs';
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
import './VSlideGroup-J1shNAVo.mjs';

const usePromoCodes = () => {
  const getPromoCodes = async ({
    page = 1,
    limit: limit2 = 25,
    search = null,
    status = null,
    discount_type = null
  }) => {
    const response = await authFetch("discounts/", {});
    return response;
  };
  const createPromoCode = async (data) => {
    const response = await authFetch("discounts/", {});
    return response;
  };
  const updatePromoCodeById = async (id, data) => {
    const response = await authFetch(`discounts/${id}`, {});
    return response;
  };
  const getPromoCodeById = async (id) => {
    const response = await authFetch(`discounts/${id}`, {});
    return response;
  };
  const deletePromoCodeById = async (id) => {
    const response = await authFetch(`discounts/${id}`, {});
    return response;
  };
  return {
    getPromoCodes,
    createPromoCode,
    updatePromoCodeById,
    getPromoCodeById,
    deletePromoCodeById
  };
};
const limit = 24;
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "promo-codes",
  __ssrInlineRender: true,
  setup(__props) {
    const { getPromoCodes, createPromoCode, updatePromoCodeById, deletePromoCodeById } = usePromoCodes();
    const page = ref(1);
    const total = ref(0);
    const isLoading = ref(false);
    const discounts = ref([]);
    const units = ref([]);
    const search = ref("");
    const discountTypeFilter = ref("");
    const showCreate = ref(false);
    const showEdit = ref(false);
    const showDelete = ref(false);
    const deleteId = ref("");
    const isSubmitting = ref(false);
    const defaultCreateForm = () => ({
      name: "",
      description: "",
      discount_type: "percentage",
      promo_code: "",
      value: 0,
      start_date: new Date(Date.now() - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4).toISOString().slice(0, 16),
      end_date: new Date(Date.now() + 24 * 31 * 60 * 60 * 1e3 - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4).toISOString().slice(0, 16),
      is_active: true,
      unit_id: ""
    });
    const createForm = ref(defaultCreateForm());
    const editForm = ref({
      id: "",
      name: "",
      description: "",
      discount_type: "percentage",
      promo_code: "",
      value: 0,
      start_date: "",
      end_date: "",
      is_active: true,
      unit_id: ""
    });
    const discountTypeItems = [
      { title: "Percentage", value: "percentage" },
      { title: "Fixed", value: "fixed" }
    ];
    async function fetchDiscounts() {
      isLoading.value = true;
      try {
        const res = await getPromoCodes({
          page: page.value,
          limit,
          search: search.value || null,
          discount_type: discountTypeFilter.value || null
        });
        discounts.value = (res == null ? void 0 : res.data) || [];
        total.value = (res == null ? void 0 : res.total) || 0;
      } catch (error) {
        console.error("Failed to fetch discounts:", error);
        discounts.value = [];
        total.value = 0;
      } finally {
        isLoading.value = false;
      }
    }
    function getStatus(discount) {
      const now = /* @__PURE__ */ new Date();
      const ended = new Date(discount.end_date) < now;
      if (ended) return "expired";
      return discount.is_active ? "active" : "inactive";
    }
    function getStatusColor(status) {
      switch (status) {
        case "active":
          return "success";
        case "inactive":
          return "grey";
        case "expired":
          return "error";
        default:
          return "grey";
      }
    }
    function toLocalDatetimeInput(iso) {
      if (!iso) return "";
      return new Date(new Date(iso).getTime() - (/* @__PURE__ */ new Date()).getTimezoneOffset() * 6e4).toISOString().slice(0, 16);
    }
    function validateForm(form) {
      if (!form.name) {
        alert("Name is required");
        return false;
      }
      if (!form.promo_code) {
        alert("Promo code is required");
        return false;
      }
      if (!form.unit_id) {
        alert("Unit is required");
        return false;
      }
      if (form.value <= 0) {
        alert("Discount value must be greater than 0");
        return false;
      }
      if (form.discount_type === "percentage" && form.value > 100) {
        alert("Percentage discount cannot exceed 100");
        return false;
      }
      return true;
    }
    async function handleCreate() {
      if (!validateForm(createForm.value)) return;
      isSubmitting.value = true;
      try {
        await createPromoCode({
          ...createForm.value,
          start_date: new Date(createForm.value.start_date).toISOString(),
          end_date: new Date(createForm.value.end_date).toISOString()
        });
        showCreate.value = false;
        createForm.value = defaultCreateForm();
        await fetchDiscounts();
      } catch (error) {
        console.error("Failed to create discount:", error);
        alert(getApiErrorMessage(error));
      } finally {
        isSubmitting.value = false;
      }
    }
    function openEditModal(discount) {
      editForm.value = {
        id: discount.id,
        name: discount.name,
        description: discount.description,
        discount_type: discount.discount_type,
        promo_code: discount.promo_code,
        value: discount.value,
        start_date: toLocalDatetimeInput(discount.start_date),
        end_date: toLocalDatetimeInput(discount.end_date),
        is_active: discount.is_active,
        unit_id: discount.unit_id
      };
      showEdit.value = true;
    }
    async function handleEdit() {
      if (!validateForm(editForm.value)) return;
      isSubmitting.value = true;
      try {
        await updatePromoCodeById(editForm.value.id, {
          name: editForm.value.name,
          description: editForm.value.description,
          discount_type: editForm.value.discount_type,
          promo_code: editForm.value.promo_code,
          value: editForm.value.value,
          start_date: new Date(editForm.value.start_date).toISOString(),
          end_date: new Date(editForm.value.end_date).toISOString(),
          is_active: editForm.value.is_active,
          unit_id: editForm.value.unit_id
        });
        showEdit.value = false;
        await fetchDiscounts();
      } catch (error) {
        console.error("Failed to update discount:", error);
        alert(getApiErrorMessage(error));
      } finally {
        isSubmitting.value = false;
      }
    }
    function openDeleteModal(id) {
      deleteId.value = id;
      showDelete.value = true;
    }
    async function handleDelete() {
      isSubmitting.value = true;
      try {
        await deletePromoCodeById(deleteId.value);
        showDelete.value = false;
        await fetchDiscounts();
      } catch (error) {
        console.error("Failed to delete discount:", error);
        alert(getApiErrorMessage(error));
      } finally {
        isSubmitting.value = false;
      }
    }
    watch([page, search, discountTypeFilter], () => {
      fetchDiscounts();
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(VCard, {
        title: "Discounts",
        class: "mb-4"
      }, {
        append: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VBtn, {
              class: "text-none",
              color: "primary",
              text: "Add Discount",
              variant: "tonal",
              slim: "",
              onClick: ($event) => showCreate.value = true
            }, null, _parent2, _scopeId));
          } else {
            return [
              createVNode(VBtn, {
                class: "text-none",
                color: "primary",
                text: "Add Discount",
                variant: "tonal",
                slim: "",
                onClick: ($event) => showCreate.value = true
              }, null, 8, ["onClick"])
            ];
          }
        }),
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VRow, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VCol, {
                          cols: "12",
                          md: "6"
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, {
                                modelValue: search.value,
                                "onUpdate:modelValue": ($event) => search.value = $event,
                                label: "Search by name or promo code...",
                                "prepend-inner-icon": "bx bx-search",
                                clearable: "",
                                class: "mb-4"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, {
                                  modelValue: search.value,
                                  "onUpdate:modelValue": ($event) => search.value = $event,
                                  label: "Search by name or promo code...",
                                  "prepend-inner-icon": "bx bx-search",
                                  clearable: "",
                                  class: "mb-4"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                              _push5(ssrRenderComponent(VSelect, {
                                modelValue: discountTypeFilter.value,
                                "onUpdate:modelValue": ($event) => discountTypeFilter.value = $event,
                                items: discountTypeItems,
                                "item-title": "title",
                                "item-value": "value",
                                label: "Filter by discount type",
                                clearable: "",
                                class: "mb-4"
                              }, null, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VSelect, {
                                  modelValue: discountTypeFilter.value,
                                  "onUpdate:modelValue": ($event) => discountTypeFilter.value = $event,
                                  items: discountTypeItems,
                                  "item-title": "title",
                                  "item-value": "value",
                                  label: "Filter by discount type",
                                  clearable: "",
                                  class: "mb-4"
                                }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                              createVNode(VTextField, {
                                modelValue: search.value,
                                "onUpdate:modelValue": ($event) => search.value = $event,
                                label: "Search by name or promo code...",
                                "prepend-inner-icon": "bx bx-search",
                                clearable: "",
                                class: "mb-4"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
                            ]),
                            _: 1
                          }),
                          createVNode(VCol, {
                            cols: "12",
                            md: "6"
                          }, {
                            default: withCtx(() => [
                              createVNode(VSelect, {
                                modelValue: discountTypeFilter.value,
                                "onUpdate:modelValue": ($event) => discountTypeFilter.value = $event,
                                items: discountTypeItems,
                                "item-title": "title",
                                "item-value": "value",
                                label: "Filter by discount type",
                                clearable: "",
                                class: "mb-4"
                              }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                          md: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode(VTextField, {
                              modelValue: search.value,
                              "onUpdate:modelValue": ($event) => search.value = $event,
                              label: "Search by name or promo code...",
                              "prepend-inner-icon": "bx bx-search",
                              clearable: "",
                              class: "mb-4"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                          ]),
                          _: 1
                        }),
                        createVNode(VCol, {
                          cols: "12",
                          md: "6"
                        }, {
                          default: withCtx(() => [
                            createVNode(VSelect, {
                              modelValue: discountTypeFilter.value,
                              "onUpdate:modelValue": ($event) => discountTypeFilter.value = $event,
                              items: discountTypeItems,
                              "item-title": "title",
                              "item-value": "value",
                              label: "Filter by discount type",
                              clearable: "",
                              class: "mb-4"
                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
            _push2(ssrRenderComponent(VTable, { density: "compact" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<thead${_scopeId2}><tr${_scopeId2}><th${_scopeId2}>#</th><th${_scopeId2}>Name</th><th${_scopeId2}>Promo Code</th><th${_scopeId2}>Type</th><th${_scopeId2}>Value</th><th${_scopeId2}>Start Date</th><th${_scopeId2}>End Date</th><th${_scopeId2}>Status</th><th${_scopeId2}>Unit</th><th${_scopeId2}>Actions</th></tr></thead><tbody${_scopeId2}>`);
                  if (isLoading.value) {
                    _push3(`<tr${_scopeId2}><td colspan="10" class="text-center"${_scopeId2}>Loading...</td></tr>`);
                  } else if (discounts.value.length === 0) {
                    _push3(`<tr${_scopeId2}><td colspan="10" class="text-center"${_scopeId2}>No data</td></tr>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<!--[-->`);
                  ssrRenderList(discounts.value, (discount, index) => {
                    _push3(`<tr${_scopeId2}><td${_scopeId2}>${ssrInterpolate(index + 1 + (page.value - 1) * limit)}</td><td${_scopeId2}>${ssrInterpolate(discount.name)}</td><td${_scopeId2}>${ssrInterpolate(discount.promo_code)} `);
                    _push3(ssrRenderComponent(VBtn, {
                      icon: "",
                      variant: "text",
                      size: "small",
                      onClick: ($event) => _ctx.navigator.clipboard.writeText(discount.promo_code)
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VIcon, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`bx bx-copy`);
                              } else {
                                return [
                                  createTextVNode("bx bx-copy")
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VIcon, null, {
                              default: withCtx(() => [
                                createTextVNode("bx bx-copy")
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</td><td${_scopeId2}>${ssrInterpolate(discount.discount_type)}</td><td${_scopeId2}>${ssrInterpolate(discount.value)}${ssrInterpolate(discount.discount_type === "percentage" ? "%" : "")}</td><td${_scopeId2}>${ssrInterpolate(new Date(discount.start_date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric"
                    }))}</td><td${_scopeId2}>${ssrInterpolate(new Date(discount.end_date).toLocaleDateString("id-ID", {
                      day: "2-digit",
                      month: "long",
                      year: "numeric"
                    }))}</td><td${_scopeId2}>`);
                    _push3(ssrRenderComponent(VChip, {
                      color: getStatusColor(getStatus(discount)),
                      size: "small"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(`${ssrInterpolate(getStatus(discount))}`);
                        } else {
                          return [
                            createTextVNode(toDisplayString(getStatus(discount)), 1)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                    _push3(`</td><td${_scopeId2}>${ssrInterpolate(discount.unit_name)}</td><td${_scopeId2}>`);
                    _push3(ssrRenderComponent(VBtn, {
                      icon: "",
                      variant: "text",
                      size: "small",
                      onClick: ($event) => openEditModal(discount),
                      disabled: getStatus(discount) === "expired"
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
                      onClick: ($event) => openDeleteModal(discount.id)
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
                        createVNode("th", null, "Promo Code"),
                        createVNode("th", null, "Type"),
                        createVNode("th", null, "Value"),
                        createVNode("th", null, "Start Date"),
                        createVNode("th", null, "End Date"),
                        createVNode("th", null, "Status"),
                        createVNode("th", null, "Unit"),
                        createVNode("th", null, "Actions")
                      ])
                    ]),
                    createVNode("tbody", null, [
                      isLoading.value ? (openBlock(), createBlock("tr", { key: 0 }, [
                        createVNode("td", {
                          colspan: "10",
                          class: "text-center"
                        }, "Loading...")
                      ])) : discounts.value.length === 0 ? (openBlock(), createBlock("tr", { key: 1 }, [
                        createVNode("td", {
                          colspan: "10",
                          class: "text-center"
                        }, "No data")
                      ])) : createCommentVNode("", true),
                      (openBlock(true), createBlock(Fragment, null, renderList(discounts.value, (discount, index) => {
                        return openBlock(), createBlock("tr", {
                          key: discount.id
                        }, [
                          createVNode("td", null, toDisplayString(index + 1 + (page.value - 1) * limit), 1),
                          createVNode("td", null, toDisplayString(discount.name), 1),
                          createVNode("td", null, [
                            createTextVNode(toDisplayString(discount.promo_code) + " ", 1),
                            createVNode(VBtn, {
                              icon: "",
                              variant: "text",
                              size: "small",
                              onClick: ($event) => _ctx.navigator.clipboard.writeText(discount.promo_code)
                            }, {
                              default: withCtx(() => [
                                createVNode(VIcon, null, {
                                  default: withCtx(() => [
                                    createTextVNode("bx bx-copy")
                                  ]),
                                  _: 1
                                })
                              ]),
                              _: 2
                            }, 1032, ["onClick"])
                          ]),
                          createVNode("td", null, toDisplayString(discount.discount_type), 1),
                          createVNode("td", null, toDisplayString(discount.value) + toDisplayString(discount.discount_type === "percentage" ? "%" : ""), 1),
                          createVNode("td", null, toDisplayString(new Date(discount.start_date).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                          })), 1),
                          createVNode("td", null, toDisplayString(new Date(discount.end_date).toLocaleDateString("id-ID", {
                            day: "2-digit",
                            month: "long",
                            year: "numeric"
                          })), 1),
                          createVNode("td", null, [
                            createVNode(VChip, {
                              color: getStatusColor(getStatus(discount)),
                              size: "small"
                            }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(getStatus(discount)), 1)
                              ]),
                              _: 2
                            }, 1032, ["color"])
                          ]),
                          createVNode("td", null, toDisplayString(discount.unit_name), 1),
                          createVNode("td", null, [
                            createVNode(VBtn, {
                              icon: "",
                              variant: "text",
                              size: "small",
                              onClick: ($event) => openEditModal(discount),
                              disabled: getStatus(discount) === "expired"
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
                            }, 1032, ["onClick", "disabled"]),
                            createVNode(VBtn, {
                              icon: "",
                              variant: "text",
                              size: "small",
                              onClick: ($event) => openDeleteModal(discount.id)
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
                  createVNode(VRow, null, {
                    default: withCtx(() => [
                      createVNode(VCol, {
                        cols: "12",
                        md: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: search.value,
                            "onUpdate:modelValue": ($event) => search.value = $event,
                            label: "Search by name or promo code...",
                            "prepend-inner-icon": "bx bx-search",
                            clearable: "",
                            class: "mb-4"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      }),
                      createVNode(VCol, {
                        cols: "12",
                        md: "6"
                      }, {
                        default: withCtx(() => [
                          createVNode(VSelect, {
                            modelValue: discountTypeFilter.value,
                            "onUpdate:modelValue": ($event) => discountTypeFilter.value = $event,
                            items: discountTypeItems,
                            "item-title": "title",
                            "item-value": "value",
                            label: "Filter by discount type",
                            clearable: "",
                            class: "mb-4"
                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }),
              createVNode(VTable, { density: "compact" }, {
                default: withCtx(() => [
                  createVNode("thead", null, [
                    createVNode("tr", null, [
                      createVNode("th", null, "#"),
                      createVNode("th", null, "Name"),
                      createVNode("th", null, "Promo Code"),
                      createVNode("th", null, "Type"),
                      createVNode("th", null, "Value"),
                      createVNode("th", null, "Start Date"),
                      createVNode("th", null, "End Date"),
                      createVNode("th", null, "Status"),
                      createVNode("th", null, "Unit"),
                      createVNode("th", null, "Actions")
                    ])
                  ]),
                  createVNode("tbody", null, [
                    isLoading.value ? (openBlock(), createBlock("tr", { key: 0 }, [
                      createVNode("td", {
                        colspan: "10",
                        class: "text-center"
                      }, "Loading...")
                    ])) : discounts.value.length === 0 ? (openBlock(), createBlock("tr", { key: 1 }, [
                      createVNode("td", {
                        colspan: "10",
                        class: "text-center"
                      }, "No data")
                    ])) : createCommentVNode("", true),
                    (openBlock(true), createBlock(Fragment, null, renderList(discounts.value, (discount, index) => {
                      return openBlock(), createBlock("tr", {
                        key: discount.id
                      }, [
                        createVNode("td", null, toDisplayString(index + 1 + (page.value - 1) * limit), 1),
                        createVNode("td", null, toDisplayString(discount.name), 1),
                        createVNode("td", null, [
                          createTextVNode(toDisplayString(discount.promo_code) + " ", 1),
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            size: "small",
                            onClick: ($event) => _ctx.navigator.clipboard.writeText(discount.promo_code)
                          }, {
                            default: withCtx(() => [
                              createVNode(VIcon, null, {
                                default: withCtx(() => [
                                  createTextVNode("bx bx-copy")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 2
                          }, 1032, ["onClick"])
                        ]),
                        createVNode("td", null, toDisplayString(discount.discount_type), 1),
                        createVNode("td", null, toDisplayString(discount.value) + toDisplayString(discount.discount_type === "percentage" ? "%" : ""), 1),
                        createVNode("td", null, toDisplayString(new Date(discount.start_date).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric"
                        })), 1),
                        createVNode("td", null, toDisplayString(new Date(discount.end_date).toLocaleDateString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric"
                        })), 1),
                        createVNode("td", null, [
                          createVNode(VChip, {
                            color: getStatusColor(getStatus(discount)),
                            size: "small"
                          }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(getStatus(discount)), 1)
                            ]),
                            _: 2
                          }, 1032, ["color"])
                        ]),
                        createVNode("td", null, toDisplayString(discount.unit_name), 1),
                        createVNode("td", null, [
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            size: "small",
                            onClick: ($event) => openEditModal(discount),
                            disabled: getStatus(discount) === "expired"
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
                          }, 1032, ["onClick", "disabled"]),
                          createVNode(VBtn, {
                            icon: "",
                            variant: "text",
                            size: "small",
                            onClick: ($event) => openDeleteModal(discount.id)
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
        modelValue: showCreate.value,
        "onUpdate:modelValue": ($event) => showCreate.value = $event,
        "max-width": "800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Add Discount`);
                      } else {
                        return [
                          createTextVNode("Add Discount")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VContainer, { fluid: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: createForm.value.name,
                                            "onUpdate:modelValue": ($event) => createForm.value.name = $event,
                                            label: "Name",
                                            placeholder: "e.g. Diskon Akhir Tahun",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: createForm.value.name,
                                              "onUpdate:modelValue": ($event) => createForm.value.name = $event,
                                              label: "Name",
                                              placeholder: "e.g. Diskon Akhir Tahun",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: createForm.value.description,
                                            "onUpdate:modelValue": ($event) => createForm.value.description = $event,
                                            label: "Description (optional)"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: createForm.value.description,
                                              "onUpdate:modelValue": ($event) => createForm.value.description = $event,
                                              label: "Description (optional)"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: createForm.value.name,
                                            "onUpdate:modelValue": ($event) => createForm.value.name = $event,
                                            label: "Name",
                                            placeholder: "e.g. Diskon Akhir Tahun",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: createForm.value.description,
                                            "onUpdate:modelValue": ($event) => createForm.value.description = $event,
                                            label: "Description (optional)"
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
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            "model-value": createForm.value.promo_code,
                                            label: "Promo Code",
                                            required: "",
                                            "onUpdate:modelValue": (val) => createForm.value.promo_code = val.toUpperCase()
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              "model-value": createForm.value.promo_code,
                                              label: "Promo Code",
                                              required: "",
                                              "onUpdate:modelValue": (val) => createForm.value.promo_code = val.toUpperCase()
                                            }, null, 8, ["model-value", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSelect, {
                                            modelValue: createForm.value.unit_id,
                                            "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                            items: units.value,
                                            "item-title": "name",
                                            "item-value": "id",
                                            label: "Unit",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSelect, {
                                              modelValue: createForm.value.unit_id,
                                              "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                              items: units.value,
                                              "item-title": "name",
                                              "item-value": "id",
                                              label: "Unit",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            "model-value": createForm.value.promo_code,
                                            label: "Promo Code",
                                            required: "",
                                            "onUpdate:modelValue": (val) => createForm.value.promo_code = val.toUpperCase()
                                          }, null, 8, ["model-value", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            modelValue: createForm.value.unit_id,
                                            "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                            items: units.value,
                                            "item-title": "name",
                                            "item-value": "id",
                                            label: "Unit",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSelect, {
                                            modelValue: createForm.value.discount_type,
                                            "onUpdate:modelValue": ($event) => createForm.value.discount_type = $event,
                                            items: discountTypeItems,
                                            "item-title": "title",
                                            "item-value": "value",
                                            label: "Discount Type",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSelect, {
                                              modelValue: createForm.value.discount_type,
                                              "onUpdate:modelValue": ($event) => createForm.value.discount_type = $event,
                                              items: discountTypeItems,
                                              "item-title": "title",
                                              "item-value": "value",
                                              label: "Discount Type",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: createForm.value.value,
                                            "onUpdate:modelValue": ($event) => createForm.value.value = $event,
                                            modelModifiers: { number: true },
                                            label: "Discount Value",
                                            type: "number",
                                            max: createForm.value.discount_type === "percentage" ? 100 : void 0,
                                            hint: createForm.value.discount_type === "percentage" ? "Maximum 100%" : "",
                                            "persistent-hint": "",
                                            rules: [
                                              (v) => v > 0 || "Must be greater than 0",
                                              (v) => createForm.value.discount_type !== "percentage" || v <= 100 || "Percentage cannot exceed 100%"
                                            ],
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: createForm.value.value,
                                              "onUpdate:modelValue": ($event) => createForm.value.value = $event,
                                              modelModifiers: { number: true },
                                              label: "Discount Value",
                                              type: "number",
                                              max: createForm.value.discount_type === "percentage" ? 100 : void 0,
                                              hint: createForm.value.discount_type === "percentage" ? "Maximum 100%" : "",
                                              "persistent-hint": "",
                                              rules: [
                                                (v) => v > 0 || "Must be greater than 0",
                                                (v) => createForm.value.discount_type !== "percentage" || v <= 100 || "Percentage cannot exceed 100%"
                                              ],
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "hint", "rules"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            modelValue: createForm.value.discount_type,
                                            "onUpdate:modelValue": ($event) => createForm.value.discount_type = $event,
                                            items: discountTypeItems,
                                            "item-title": "title",
                                            "item-value": "value",
                                            label: "Discount Type",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: createForm.value.value,
                                            "onUpdate:modelValue": ($event) => createForm.value.value = $event,
                                            modelModifiers: { number: true },
                                            label: "Discount Value",
                                            type: "number",
                                            max: createForm.value.discount_type === "percentage" ? 100 : void 0,
                                            hint: createForm.value.discount_type === "percentage" ? "Maximum 100%" : "",
                                            "persistent-hint": "",
                                            rules: [
                                              (v) => v > 0 || "Must be greater than 0",
                                              (v) => createForm.value.discount_type !== "percentage" || v <= 100 || "Percentage cannot exceed 100%"
                                            ],
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "hint", "rules"])
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
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: createForm.value.start_date,
                                            "onUpdate:modelValue": ($event) => createForm.value.start_date = $event,
                                            label: "Start Date",
                                            type: "datetime-local",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: createForm.value.start_date,
                                              "onUpdate:modelValue": ($event) => createForm.value.start_date = $event,
                                              label: "Start Date",
                                              type: "datetime-local",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: createForm.value.end_date,
                                            "onUpdate:modelValue": ($event) => createForm.value.end_date = $event,
                                            label: "End Date",
                                            type: "datetime-local",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: createForm.value.end_date,
                                              "onUpdate:modelValue": ($event) => createForm.value.end_date = $event,
                                              label: "End Date",
                                              type: "datetime-local",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: createForm.value.start_date,
                                            "onUpdate:modelValue": ($event) => createForm.value.start_date = $event,
                                            label: "Start Date",
                                            type: "datetime-local",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: createForm.value.end_date,
                                            "onUpdate:modelValue": ($event) => createForm.value.end_date = $event,
                                            label: "End Date",
                                            type: "datetime-local",
                                            required: ""
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
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSwitch, {
                                            modelValue: createForm.value.is_active,
                                            "onUpdate:modelValue": ($event) => createForm.value.is_active = $event,
                                            label: "Active"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSwitch, {
                                              modelValue: createForm.value.is_active,
                                              "onUpdate:modelValue": ($event) => createForm.value.is_active = $event,
                                              label: "Active"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VSwitch, {
                                            modelValue: createForm.value.is_active,
                                            "onUpdate:modelValue": ($event) => createForm.value.is_active = $event,
                                            label: "Active"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: createForm.value.name,
                                          "onUpdate:modelValue": ($event) => createForm.value.name = $event,
                                          label: "Name",
                                          placeholder: "e.g. Diskon Akhir Tahun",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: createForm.value.description,
                                          "onUpdate:modelValue": ($event) => createForm.value.description = $event,
                                          label: "Description (optional)"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                        createVNode(VTextField, {
                                          "model-value": createForm.value.promo_code,
                                          label: "Promo Code",
                                          required: "",
                                          "onUpdate:modelValue": (val) => createForm.value.promo_code = val.toUpperCase()
                                        }, null, 8, ["model-value", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          modelValue: createForm.value.unit_id,
                                          "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                          items: units.value,
                                          "item-title": "name",
                                          "item-value": "id",
                                          label: "Unit",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                        createVNode(VSelect, {
                                          modelValue: createForm.value.discount_type,
                                          "onUpdate:modelValue": ($event) => createForm.value.discount_type = $event,
                                          items: discountTypeItems,
                                          "item-title": "title",
                                          "item-value": "value",
                                          label: "Discount Type",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: createForm.value.value,
                                          "onUpdate:modelValue": ($event) => createForm.value.value = $event,
                                          modelModifiers: { number: true },
                                          label: "Discount Value",
                                          type: "number",
                                          max: createForm.value.discount_type === "percentage" ? 100 : void 0,
                                          hint: createForm.value.discount_type === "percentage" ? "Maximum 100%" : "",
                                          "persistent-hint": "",
                                          rules: [
                                            (v) => v > 0 || "Must be greater than 0",
                                            (v) => createForm.value.discount_type !== "percentage" || v <= 100 || "Percentage cannot exceed 100%"
                                          ],
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "hint", "rules"])
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
                                        createVNode(VTextField, {
                                          modelValue: createForm.value.start_date,
                                          "onUpdate:modelValue": ($event) => createForm.value.start_date = $event,
                                          label: "Start Date",
                                          type: "datetime-local",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: createForm.value.end_date,
                                          "onUpdate:modelValue": ($event) => createForm.value.end_date = $event,
                                          label: "End Date",
                                          type: "datetime-local",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                        createVNode(VSwitch, {
                                          modelValue: createForm.value.is_active,
                                          "onUpdate:modelValue": ($event) => createForm.value.is_active = $event,
                                          label: "Active"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                      } else {
                        return [
                          createVNode(VContainer, { fluid: "" }, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: createForm.value.name,
                                        "onUpdate:modelValue": ($event) => createForm.value.name = $event,
                                        label: "Name",
                                        placeholder: "e.g. Diskon Akhir Tahun",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: createForm.value.description,
                                        "onUpdate:modelValue": ($event) => createForm.value.description = $event,
                                        label: "Description (optional)"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                      createVNode(VTextField, {
                                        "model-value": createForm.value.promo_code,
                                        label: "Promo Code",
                                        required: "",
                                        "onUpdate:modelValue": (val) => createForm.value.promo_code = val.toUpperCase()
                                      }, null, 8, ["model-value", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        modelValue: createForm.value.unit_id,
                                        "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                        items: units.value,
                                        "item-title": "name",
                                        "item-value": "id",
                                        label: "Unit",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                      createVNode(VSelect, {
                                        modelValue: createForm.value.discount_type,
                                        "onUpdate:modelValue": ($event) => createForm.value.discount_type = $event,
                                        items: discountTypeItems,
                                        "item-title": "title",
                                        "item-value": "value",
                                        label: "Discount Type",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: createForm.value.value,
                                        "onUpdate:modelValue": ($event) => createForm.value.value = $event,
                                        modelModifiers: { number: true },
                                        label: "Discount Value",
                                        type: "number",
                                        max: createForm.value.discount_type === "percentage" ? 100 : void 0,
                                        hint: createForm.value.discount_type === "percentage" ? "Maximum 100%" : "",
                                        "persistent-hint": "",
                                        rules: [
                                          (v) => v > 0 || "Must be greater than 0",
                                          (v) => createForm.value.discount_type !== "percentage" || v <= 100 || "Percentage cannot exceed 100%"
                                        ],
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "hint", "rules"])
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
                                      createVNode(VTextField, {
                                        modelValue: createForm.value.start_date,
                                        "onUpdate:modelValue": ($event) => createForm.value.start_date = $event,
                                        label: "Start Date",
                                        type: "datetime-local",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: createForm.value.end_date,
                                        "onUpdate:modelValue": ($event) => createForm.value.end_date = $event,
                                        label: "End Date",
                                        type: "datetime-local",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                      createVNode(VSwitch, {
                                        modelValue: createForm.value.is_active,
                                        "onUpdate:modelValue": ($event) => createForm.value.is_active = $event,
                                        label: "Active"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          text: "Cancel",
                          onClick: ($event) => showCreate.value = false,
                          disabled: isSubmitting.value
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "primary",
                          onClick: handleCreate,
                          loading: isSubmitting.value,
                          disabled: isSubmitting.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Save`);
                            } else {
                              return [
                                createTextVNode("Save")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            text: "Cancel",
                            onClick: ($event) => showCreate.value = false,
                            disabled: isSubmitting.value
                          }, null, 8, ["onClick", "disabled"]),
                          createVNode(VBtn, {
                            color: "primary",
                            onClick: handleCreate,
                            loading: isSubmitting.value,
                            disabled: isSubmitting.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Save")
                            ]),
                            _: 1
                          }, 8, ["loading", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Add Discount")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VContainer, { fluid: "" }, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: createForm.value.name,
                                      "onUpdate:modelValue": ($event) => createForm.value.name = $event,
                                      label: "Name",
                                      placeholder: "e.g. Diskon Akhir Tahun",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: createForm.value.description,
                                      "onUpdate:modelValue": ($event) => createForm.value.description = $event,
                                      label: "Description (optional)"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                    createVNode(VTextField, {
                                      "model-value": createForm.value.promo_code,
                                      label: "Promo Code",
                                      required: "",
                                      "onUpdate:modelValue": (val) => createForm.value.promo_code = val.toUpperCase()
                                    }, null, 8, ["model-value", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      modelValue: createForm.value.unit_id,
                                      "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                      items: units.value,
                                      "item-title": "name",
                                      "item-value": "id",
                                      label: "Unit",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                    createVNode(VSelect, {
                                      modelValue: createForm.value.discount_type,
                                      "onUpdate:modelValue": ($event) => createForm.value.discount_type = $event,
                                      items: discountTypeItems,
                                      "item-title": "title",
                                      "item-value": "value",
                                      label: "Discount Type",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: createForm.value.value,
                                      "onUpdate:modelValue": ($event) => createForm.value.value = $event,
                                      modelModifiers: { number: true },
                                      label: "Discount Value",
                                      type: "number",
                                      max: createForm.value.discount_type === "percentage" ? 100 : void 0,
                                      hint: createForm.value.discount_type === "percentage" ? "Maximum 100%" : "",
                                      "persistent-hint": "",
                                      rules: [
                                        (v) => v > 0 || "Must be greater than 0",
                                        (v) => createForm.value.discount_type !== "percentage" || v <= 100 || "Percentage cannot exceed 100%"
                                      ],
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "hint", "rules"])
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
                                    createVNode(VTextField, {
                                      modelValue: createForm.value.start_date,
                                      "onUpdate:modelValue": ($event) => createForm.value.start_date = $event,
                                      label: "Start Date",
                                      type: "datetime-local",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: createForm.value.end_date,
                                      "onUpdate:modelValue": ($event) => createForm.value.end_date = $event,
                                      label: "End Date",
                                      type: "datetime-local",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                    createVNode(VSwitch, {
                                      modelValue: createForm.value.is_active,
                                      "onUpdate:modelValue": ($event) => createForm.value.is_active = $event,
                                      label: "Active"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          text: "Cancel",
                          onClick: ($event) => showCreate.value = false,
                          disabled: isSubmitting.value
                        }, null, 8, ["onClick", "disabled"]),
                        createVNode(VBtn, {
                          color: "primary",
                          onClick: handleCreate,
                          loading: isSubmitting.value,
                          disabled: isSubmitting.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Save")
                          ]),
                          _: 1
                        }, 8, ["loading", "disabled"])
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
                      createTextVNode("Add Discount")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VContainer, { fluid: "" }, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: createForm.value.name,
                                    "onUpdate:modelValue": ($event) => createForm.value.name = $event,
                                    label: "Name",
                                    placeholder: "e.g. Diskon Akhir Tahun",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: createForm.value.description,
                                    "onUpdate:modelValue": ($event) => createForm.value.description = $event,
                                    label: "Description (optional)"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                  createVNode(VTextField, {
                                    "model-value": createForm.value.promo_code,
                                    label: "Promo Code",
                                    required: "",
                                    "onUpdate:modelValue": (val) => createForm.value.promo_code = val.toUpperCase()
                                  }, null, 8, ["model-value", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VSelect, {
                                    modelValue: createForm.value.unit_id,
                                    "onUpdate:modelValue": ($event) => createForm.value.unit_id = $event,
                                    items: units.value,
                                    "item-title": "name",
                                    "item-value": "id",
                                    label: "Unit",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                  createVNode(VSelect, {
                                    modelValue: createForm.value.discount_type,
                                    "onUpdate:modelValue": ($event) => createForm.value.discount_type = $event,
                                    items: discountTypeItems,
                                    "item-title": "title",
                                    "item-value": "value",
                                    label: "Discount Type",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: createForm.value.value,
                                    "onUpdate:modelValue": ($event) => createForm.value.value = $event,
                                    modelModifiers: { number: true },
                                    label: "Discount Value",
                                    type: "number",
                                    max: createForm.value.discount_type === "percentage" ? 100 : void 0,
                                    hint: createForm.value.discount_type === "percentage" ? "Maximum 100%" : "",
                                    "persistent-hint": "",
                                    rules: [
                                      (v) => v > 0 || "Must be greater than 0",
                                      (v) => createForm.value.discount_type !== "percentage" || v <= 100 || "Percentage cannot exceed 100%"
                                    ],
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "hint", "rules"])
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
                                  createVNode(VTextField, {
                                    modelValue: createForm.value.start_date,
                                    "onUpdate:modelValue": ($event) => createForm.value.start_date = $event,
                                    label: "Start Date",
                                    type: "datetime-local",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: createForm.value.end_date,
                                    "onUpdate:modelValue": ($event) => createForm.value.end_date = $event,
                                    label: "End Date",
                                    type: "datetime-local",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                  createVNode(VSwitch, {
                                    modelValue: createForm.value.is_active,
                                    "onUpdate:modelValue": ($event) => createForm.value.is_active = $event,
                                    label: "Active"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        text: "Cancel",
                        onClick: ($event) => showCreate.value = false,
                        disabled: isSubmitting.value
                      }, null, 8, ["onClick", "disabled"]),
                      createVNode(VBtn, {
                        color: "primary",
                        onClick: handleCreate,
                        loading: isSubmitting.value,
                        disabled: isSubmitting.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Save")
                        ]),
                        _: 1
                      }, 8, ["loading", "disabled"])
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
      _push(ssrRenderComponent(VDialog, {
        modelValue: showEdit.value,
        "onUpdate:modelValue": ($event) => showEdit.value = $event,
        "max-width": "800"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Edit Discount`);
                      } else {
                        return [
                          createTextVNode("Edit Discount")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VContainer, { fluid: "" }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VRow, null, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: editForm.value.name,
                                            "onUpdate:modelValue": ($event) => editForm.value.name = $event,
                                            label: "Name",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: editForm.value.name,
                                              "onUpdate:modelValue": ($event) => editForm.value.name = $event,
                                              label: "Name",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: editForm.value.description,
                                            "onUpdate:modelValue": ($event) => editForm.value.description = $event,
                                            label: "Description (optional)"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: editForm.value.description,
                                              "onUpdate:modelValue": ($event) => editForm.value.description = $event,
                                              label: "Description (optional)"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: editForm.value.name,
                                            "onUpdate:modelValue": ($event) => editForm.value.name = $event,
                                            label: "Name",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: editForm.value.description,
                                            "onUpdate:modelValue": ($event) => editForm.value.description = $event,
                                            label: "Description (optional)"
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
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            "model-value": editForm.value.promo_code,
                                            label: "Promo Code",
                                            required: "",
                                            "onUpdate:modelValue": (val) => editForm.value.promo_code = val.toUpperCase()
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              "model-value": editForm.value.promo_code,
                                              label: "Promo Code",
                                              required: "",
                                              "onUpdate:modelValue": (val) => editForm.value.promo_code = val.toUpperCase()
                                            }, null, 8, ["model-value", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSelect, {
                                            modelValue: editForm.value.unit_id,
                                            "onUpdate:modelValue": ($event) => editForm.value.unit_id = $event,
                                            items: units.value,
                                            "item-title": "name",
                                            "item-value": "id",
                                            label: "Unit",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSelect, {
                                              modelValue: editForm.value.unit_id,
                                              "onUpdate:modelValue": ($event) => editForm.value.unit_id = $event,
                                              items: units.value,
                                              "item-title": "name",
                                              "item-value": "id",
                                              label: "Unit",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            "model-value": editForm.value.promo_code,
                                            label: "Promo Code",
                                            required: "",
                                            "onUpdate:modelValue": (val) => editForm.value.promo_code = val.toUpperCase()
                                          }, null, 8, ["model-value", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            modelValue: editForm.value.unit_id,
                                            "onUpdate:modelValue": ($event) => editForm.value.unit_id = $event,
                                            items: units.value,
                                            "item-title": "name",
                                            "item-value": "id",
                                            label: "Unit",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSelect, {
                                            modelValue: editForm.value.discount_type,
                                            "onUpdate:modelValue": ($event) => editForm.value.discount_type = $event,
                                            items: discountTypeItems,
                                            "item-title": "title",
                                            "item-value": "value",
                                            label: "Discount Type",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSelect, {
                                              modelValue: editForm.value.discount_type,
                                              "onUpdate:modelValue": ($event) => editForm.value.discount_type = $event,
                                              items: discountTypeItems,
                                              "item-title": "title",
                                              "item-value": "value",
                                              label: "Discount Type",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: editForm.value.value,
                                            "onUpdate:modelValue": ($event) => editForm.value.value = $event,
                                            modelModifiers: { number: true },
                                            label: "Discount Value",
                                            type: "number",
                                            max: editForm.value.discount_type === "percentage" ? 100 : void 0,
                                            hint: editForm.value.discount_type === "percentage" ? "Maximum 100%" : "",
                                            "persistent-hint": "",
                                            rules: [
                                              (v) => v > 0 || "Must be greater than 0",
                                              (v) => editForm.value.discount_type !== "percentage" || v <= 100 || "Percentage cannot exceed 100%"
                                            ],
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: editForm.value.value,
                                              "onUpdate:modelValue": ($event) => editForm.value.value = $event,
                                              modelModifiers: { number: true },
                                              label: "Discount Value",
                                              type: "number",
                                              max: editForm.value.discount_type === "percentage" ? 100 : void 0,
                                              hint: editForm.value.discount_type === "percentage" ? "Maximum 100%" : "",
                                              "persistent-hint": "",
                                              rules: [
                                                (v) => v > 0 || "Must be greater than 0",
                                                (v) => editForm.value.discount_type !== "percentage" || v <= 100 || "Percentage cannot exceed 100%"
                                              ],
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "hint", "rules"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VSelect, {
                                            modelValue: editForm.value.discount_type,
                                            "onUpdate:modelValue": ($event) => editForm.value.discount_type = $event,
                                            items: discountTypeItems,
                                            "item-title": "title",
                                            "item-value": "value",
                                            label: "Discount Type",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: editForm.value.value,
                                            "onUpdate:modelValue": ($event) => editForm.value.value = $event,
                                            modelModifiers: { number: true },
                                            label: "Discount Value",
                                            type: "number",
                                            max: editForm.value.discount_type === "percentage" ? 100 : void 0,
                                            hint: editForm.value.discount_type === "percentage" ? "Maximum 100%" : "",
                                            "persistent-hint": "",
                                            rules: [
                                              (v) => v > 0 || "Must be greater than 0",
                                              (v) => editForm.value.discount_type !== "percentage" || v <= 100 || "Percentage cannot exceed 100%"
                                            ],
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "hint", "rules"])
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
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: editForm.value.start_date,
                                            "onUpdate:modelValue": ($event) => editForm.value.start_date = $event,
                                            label: "Start Date",
                                            type: "datetime-local",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: editForm.value.start_date,
                                              "onUpdate:modelValue": ($event) => editForm.value.start_date = $event,
                                              label: "Start Date",
                                              type: "datetime-local",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VTextField, {
                                            modelValue: editForm.value.end_date,
                                            "onUpdate:modelValue": ($event) => editForm.value.end_date = $event,
                                            label: "End Date",
                                            type: "datetime-local",
                                            required: ""
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VTextField, {
                                              modelValue: editForm.value.end_date,
                                              "onUpdate:modelValue": ($event) => editForm.value.end_date = $event,
                                              label: "End Date",
                                              type: "datetime-local",
                                              required: ""
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: editForm.value.start_date,
                                            "onUpdate:modelValue": ($event) => editForm.value.start_date = $event,
                                            label: "Start Date",
                                            type: "datetime-local",
                                            required: ""
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                        ]),
                                        _: 1
                                      }),
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VTextField, {
                                            modelValue: editForm.value.end_date,
                                            "onUpdate:modelValue": ($event) => editForm.value.end_date = $event,
                                            label: "End Date",
                                            type: "datetime-local",
                                            required: ""
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
                                    _push6(ssrRenderComponent(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                        if (_push7) {
                                          _push7(ssrRenderComponent(VSwitch, {
                                            modelValue: editForm.value.is_active,
                                            "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                                            label: "Active"
                                          }, null, _parent7, _scopeId6));
                                        } else {
                                          return [
                                            createVNode(VSwitch, {
                                              modelValue: editForm.value.is_active,
                                              "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                                              label: "Active"
                                            }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                          ];
                                        }
                                      }),
                                      _: 1
                                    }, _parent6, _scopeId5));
                                  } else {
                                    return [
                                      createVNode(VCol, {
                                        cols: "12",
                                        md: "6"
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(VSwitch, {
                                            modelValue: editForm.value.is_active,
                                            "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                                            label: "Active"
                                          }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: editForm.value.name,
                                          "onUpdate:modelValue": ($event) => editForm.value.name = $event,
                                          label: "Name",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: editForm.value.description,
                                          "onUpdate:modelValue": ($event) => editForm.value.description = $event,
                                          label: "Description (optional)"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                        createVNode(VTextField, {
                                          "model-value": editForm.value.promo_code,
                                          label: "Promo Code",
                                          required: "",
                                          "onUpdate:modelValue": (val) => editForm.value.promo_code = val.toUpperCase()
                                        }, null, 8, ["model-value", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VSelect, {
                                          modelValue: editForm.value.unit_id,
                                          "onUpdate:modelValue": ($event) => editForm.value.unit_id = $event,
                                          items: units.value,
                                          "item-title": "name",
                                          "item-value": "id",
                                          label: "Unit",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                        createVNode(VSelect, {
                                          modelValue: editForm.value.discount_type,
                                          "onUpdate:modelValue": ($event) => editForm.value.discount_type = $event,
                                          items: discountTypeItems,
                                          "item-title": "title",
                                          "item-value": "value",
                                          label: "Discount Type",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: editForm.value.value,
                                          "onUpdate:modelValue": ($event) => editForm.value.value = $event,
                                          modelModifiers: { number: true },
                                          label: "Discount Value",
                                          type: "number",
                                          max: editForm.value.discount_type === "percentage" ? 100 : void 0,
                                          hint: editForm.value.discount_type === "percentage" ? "Maximum 100%" : "",
                                          "persistent-hint": "",
                                          rules: [
                                            (v) => v > 0 || "Must be greater than 0",
                                            (v) => editForm.value.discount_type !== "percentage" || v <= 100 || "Percentage cannot exceed 100%"
                                          ],
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "hint", "rules"])
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
                                        createVNode(VTextField, {
                                          modelValue: editForm.value.start_date,
                                          "onUpdate:modelValue": ($event) => editForm.value.start_date = $event,
                                          label: "Start Date",
                                          type: "datetime-local",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                      ]),
                                      _: 1
                                    }),
                                    createVNode(VCol, {
                                      cols: "12",
                                      md: "6"
                                    }, {
                                      default: withCtx(() => [
                                        createVNode(VTextField, {
                                          modelValue: editForm.value.end_date,
                                          "onUpdate:modelValue": ($event) => editForm.value.end_date = $event,
                                          label: "End Date",
                                          type: "datetime-local",
                                          required: ""
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                        createVNode(VSwitch, {
                                          modelValue: editForm.value.is_active,
                                          "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                                          label: "Active"
                                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                      } else {
                        return [
                          createVNode(VContainer, { fluid: "" }, {
                            default: withCtx(() => [
                              createVNode(VRow, null, {
                                default: withCtx(() => [
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: editForm.value.name,
                                        "onUpdate:modelValue": ($event) => editForm.value.name = $event,
                                        label: "Name",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: editForm.value.description,
                                        "onUpdate:modelValue": ($event) => editForm.value.description = $event,
                                        label: "Description (optional)"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                      createVNode(VTextField, {
                                        "model-value": editForm.value.promo_code,
                                        label: "Promo Code",
                                        required: "",
                                        "onUpdate:modelValue": (val) => editForm.value.promo_code = val.toUpperCase()
                                      }, null, 8, ["model-value", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VSelect, {
                                        modelValue: editForm.value.unit_id,
                                        "onUpdate:modelValue": ($event) => editForm.value.unit_id = $event,
                                        items: units.value,
                                        "item-title": "name",
                                        "item-value": "id",
                                        label: "Unit",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                      createVNode(VSelect, {
                                        modelValue: editForm.value.discount_type,
                                        "onUpdate:modelValue": ($event) => editForm.value.discount_type = $event,
                                        items: discountTypeItems,
                                        "item-title": "title",
                                        "item-value": "value",
                                        label: "Discount Type",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: editForm.value.value,
                                        "onUpdate:modelValue": ($event) => editForm.value.value = $event,
                                        modelModifiers: { number: true },
                                        label: "Discount Value",
                                        type: "number",
                                        max: editForm.value.discount_type === "percentage" ? 100 : void 0,
                                        hint: editForm.value.discount_type === "percentage" ? "Maximum 100%" : "",
                                        "persistent-hint": "",
                                        rules: [
                                          (v) => v > 0 || "Must be greater than 0",
                                          (v) => editForm.value.discount_type !== "percentage" || v <= 100 || "Percentage cannot exceed 100%"
                                        ],
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "hint", "rules"])
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
                                      createVNode(VTextField, {
                                        modelValue: editForm.value.start_date,
                                        "onUpdate:modelValue": ($event) => editForm.value.start_date = $event,
                                        label: "Start Date",
                                        type: "datetime-local",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                    ]),
                                    _: 1
                                  }),
                                  createVNode(VCol, {
                                    cols: "12",
                                    md: "6"
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(VTextField, {
                                        modelValue: editForm.value.end_date,
                                        "onUpdate:modelValue": ($event) => editForm.value.end_date = $event,
                                        label: "End Date",
                                        type: "datetime-local",
                                        required: ""
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                      createVNode(VSwitch, {
                                        modelValue: editForm.value.is_active,
                                        "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                                        label: "Active"
                                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardActions, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VSpacer, null, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          text: "Cancel",
                          onClick: ($event) => showEdit.value = false,
                          disabled: isSubmitting.value
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "primary",
                          onClick: handleEdit,
                          loading: isSubmitting.value,
                          disabled: isSubmitting.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Update`);
                            } else {
                              return [
                                createTextVNode("Update")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            text: "Cancel",
                            onClick: ($event) => showEdit.value = false,
                            disabled: isSubmitting.value
                          }, null, 8, ["onClick", "disabled"]),
                          createVNode(VBtn, {
                            color: "primary",
                            onClick: handleEdit,
                            loading: isSubmitting.value,
                            disabled: isSubmitting.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Update")
                            ]),
                            _: 1
                          }, 8, ["loading", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Edit Discount")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VContainer, { fluid: "" }, {
                          default: withCtx(() => [
                            createVNode(VRow, null, {
                              default: withCtx(() => [
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: editForm.value.name,
                                      "onUpdate:modelValue": ($event) => editForm.value.name = $event,
                                      label: "Name",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: editForm.value.description,
                                      "onUpdate:modelValue": ($event) => editForm.value.description = $event,
                                      label: "Description (optional)"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                    createVNode(VTextField, {
                                      "model-value": editForm.value.promo_code,
                                      label: "Promo Code",
                                      required: "",
                                      "onUpdate:modelValue": (val) => editForm.value.promo_code = val.toUpperCase()
                                    }, null, 8, ["model-value", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VSelect, {
                                      modelValue: editForm.value.unit_id,
                                      "onUpdate:modelValue": ($event) => editForm.value.unit_id = $event,
                                      items: units.value,
                                      "item-title": "name",
                                      "item-value": "id",
                                      label: "Unit",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                    createVNode(VSelect, {
                                      modelValue: editForm.value.discount_type,
                                      "onUpdate:modelValue": ($event) => editForm.value.discount_type = $event,
                                      items: discountTypeItems,
                                      "item-title": "title",
                                      "item-value": "value",
                                      label: "Discount Type",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: editForm.value.value,
                                      "onUpdate:modelValue": ($event) => editForm.value.value = $event,
                                      modelModifiers: { number: true },
                                      label: "Discount Value",
                                      type: "number",
                                      max: editForm.value.discount_type === "percentage" ? 100 : void 0,
                                      hint: editForm.value.discount_type === "percentage" ? "Maximum 100%" : "",
                                      "persistent-hint": "",
                                      rules: [
                                        (v) => v > 0 || "Must be greater than 0",
                                        (v) => editForm.value.discount_type !== "percentage" || v <= 100 || "Percentage cannot exceed 100%"
                                      ],
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "hint", "rules"])
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
                                    createVNode(VTextField, {
                                      modelValue: editForm.value.start_date,
                                      "onUpdate:modelValue": ($event) => editForm.value.start_date = $event,
                                      label: "Start Date",
                                      type: "datetime-local",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                  ]),
                                  _: 1
                                }),
                                createVNode(VCol, {
                                  cols: "12",
                                  md: "6"
                                }, {
                                  default: withCtx(() => [
                                    createVNode(VTextField, {
                                      modelValue: editForm.value.end_date,
                                      "onUpdate:modelValue": ($event) => editForm.value.end_date = $event,
                                      label: "End Date",
                                      type: "datetime-local",
                                      required: ""
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                    createVNode(VSwitch, {
                                      modelValue: editForm.value.is_active,
                                      "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                                      label: "Active"
                                    }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          text: "Cancel",
                          onClick: ($event) => showEdit.value = false,
                          disabled: isSubmitting.value
                        }, null, 8, ["onClick", "disabled"]),
                        createVNode(VBtn, {
                          color: "primary",
                          onClick: handleEdit,
                          loading: isSubmitting.value,
                          disabled: isSubmitting.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Update")
                          ]),
                          _: 1
                        }, 8, ["loading", "disabled"])
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
                      createTextVNode("Edit Discount")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VContainer, { fluid: "" }, {
                        default: withCtx(() => [
                          createVNode(VRow, null, {
                            default: withCtx(() => [
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: editForm.value.name,
                                    "onUpdate:modelValue": ($event) => editForm.value.name = $event,
                                    label: "Name",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: editForm.value.description,
                                    "onUpdate:modelValue": ($event) => editForm.value.description = $event,
                                    label: "Description (optional)"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                  createVNode(VTextField, {
                                    "model-value": editForm.value.promo_code,
                                    label: "Promo Code",
                                    required: "",
                                    "onUpdate:modelValue": (val) => editForm.value.promo_code = val.toUpperCase()
                                  }, null, 8, ["model-value", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VSelect, {
                                    modelValue: editForm.value.unit_id,
                                    "onUpdate:modelValue": ($event) => editForm.value.unit_id = $event,
                                    items: units.value,
                                    "item-title": "name",
                                    "item-value": "id",
                                    label: "Unit",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items"])
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
                                  createVNode(VSelect, {
                                    modelValue: editForm.value.discount_type,
                                    "onUpdate:modelValue": ($event) => editForm.value.discount_type = $event,
                                    items: discountTypeItems,
                                    "item-title": "title",
                                    "item-value": "value",
                                    label: "Discount Type",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: editForm.value.value,
                                    "onUpdate:modelValue": ($event) => editForm.value.value = $event,
                                    modelModifiers: { number: true },
                                    label: "Discount Value",
                                    type: "number",
                                    max: editForm.value.discount_type === "percentage" ? 100 : void 0,
                                    hint: editForm.value.discount_type === "percentage" ? "Maximum 100%" : "",
                                    "persistent-hint": "",
                                    rules: [
                                      (v) => v > 0 || "Must be greater than 0",
                                      (v) => editForm.value.discount_type !== "percentage" || v <= 100 || "Percentage cannot exceed 100%"
                                    ],
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "max", "hint", "rules"])
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
                                  createVNode(VTextField, {
                                    modelValue: editForm.value.start_date,
                                    "onUpdate:modelValue": ($event) => editForm.value.start_date = $event,
                                    label: "Start Date",
                                    type: "datetime-local",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
                                ]),
                                _: 1
                              }),
                              createVNode(VCol, {
                                cols: "12",
                                md: "6"
                              }, {
                                default: withCtx(() => [
                                  createVNode(VTextField, {
                                    modelValue: editForm.value.end_date,
                                    "onUpdate:modelValue": ($event) => editForm.value.end_date = $event,
                                    label: "End Date",
                                    type: "datetime-local",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                                  createVNode(VSwitch, {
                                    modelValue: editForm.value.is_active,
                                    "onUpdate:modelValue": ($event) => editForm.value.is_active = $event,
                                    label: "Active"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue"])
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
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        text: "Cancel",
                        onClick: ($event) => showEdit.value = false,
                        disabled: isSubmitting.value
                      }, null, 8, ["onClick", "disabled"]),
                      createVNode(VBtn, {
                        color: "primary",
                        onClick: handleEdit,
                        loading: isSubmitting.value,
                        disabled: isSubmitting.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Update")
                        ]),
                        _: 1
                      }, 8, ["loading", "disabled"])
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
      _push(ssrRenderComponent(VDialog, {
        modelValue: showDelete.value,
        "onUpdate:modelValue": ($event) => showDelete.value = $event,
        "max-width": "400"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Delete Discount`);
                      } else {
                        return [
                          createTextVNode("Delete Discount")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Are you sure you want to delete this discount?`);
                      } else {
                        return [
                          createTextVNode("Are you sure you want to delete this discount?")
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
                          text: "Cancel",
                          onClick: ($event) => showDelete.value = false,
                          disabled: isSubmitting.value
                        }, null, _parent4, _scopeId3));
                        _push4(ssrRenderComponent(VBtn, {
                          color: "error",
                          onClick: handleDelete,
                          loading: isSubmitting.value,
                          disabled: isSubmitting.value
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(`Delete`);
                            } else {
                              return [
                                createTextVNode("Delete")
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VSpacer),
                          createVNode(VBtn, {
                            text: "Cancel",
                            onClick: ($event) => showDelete.value = false,
                            disabled: isSubmitting.value
                          }, null, 8, ["onClick", "disabled"]),
                          createVNode(VBtn, {
                            color: "error",
                            onClick: handleDelete,
                            loading: isSubmitting.value,
                            disabled: isSubmitting.value
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Delete")
                            ]),
                            _: 1
                          }, 8, ["loading", "disabled"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, null, {
                      default: withCtx(() => [
                        createTextVNode("Delete Discount")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createTextVNode("Are you sure you want to delete this discount?")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardActions, null, {
                      default: withCtx(() => [
                        createVNode(VSpacer),
                        createVNode(VBtn, {
                          text: "Cancel",
                          onClick: ($event) => showDelete.value = false,
                          disabled: isSubmitting.value
                        }, null, 8, ["onClick", "disabled"]),
                        createVNode(VBtn, {
                          color: "error",
                          onClick: handleDelete,
                          loading: isSubmitting.value,
                          disabled: isSubmitting.value
                        }, {
                          default: withCtx(() => [
                            createTextVNode("Delete")
                          ]),
                          _: 1
                        }, 8, ["loading", "disabled"])
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
                      createTextVNode("Delete Discount")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createTextVNode("Are you sure you want to delete this discount?")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardActions, null, {
                    default: withCtx(() => [
                      createVNode(VSpacer),
                      createVNode(VBtn, {
                        text: "Cancel",
                        onClick: ($event) => showDelete.value = false,
                        disabled: isSubmitting.value
                      }, null, 8, ["onClick", "disabled"]),
                      createVNode(VBtn, {
                        color: "error",
                        onClick: handleDelete,
                        loading: isSubmitting.value,
                        disabled: isSubmitting.value
                      }, {
                        default: withCtx(() => [
                          createTextVNode("Delete")
                        ]),
                        _: 1
                      }, 8, ["loading", "disabled"])
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/admin/promo-codes.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
