import { ref, mergeProps, withCtx, createTextVNode, createVNode, toDisplayString, createBlock, openBlock, Fragment, renderList, computed, toValue, reactive, shallowRef, toRef, getCurrentInstance, onServerPrefetch, unref, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderStyle } from 'vue/server-renderer';
import { D as hash } from '../nitro/nitro.mjs';
import { a as VBtn, be as fetchDefaults, b6 as useNuxtApp, bc as asyncDataDefaults, bf as useRequestFetch, bd as createError } from './server.mjs';
import { V as VRow, a as VCol } from './VRow-7ayAHclW.mjs';
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

const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a2, _b2, _c, _d, _e, _f, _g, _h;
  var _b;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, _handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  const handler = _handler ;
  const getDefault = () => asyncDataDefaults.value;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server = (_a2 = options.server) != null ? _a2 : true;
  options.default = (_b2 = options.default) != null ? _b2 : getDefault;
  options.getCachedData = (_c = options.getCachedData) != null ? _c : getDefaultCachedData;
  options.lazy = (_d = options.lazy) != null ? _d : false;
  options.immediate = (_e = options.immediate) != null ? _e : true;
  options.deep = (_f = options.deep) != null ? _f : asyncDataDefaults.deep;
  options.dedupe = (_g = options.dedupe) != null ? _g : "cancel";
  const initialCachedData = options.getCachedData(key, nuxtApp);
  const hasCachedData = initialCachedData != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_h = (_b = nuxtApp.payload._errors)[key]) != null ? _h : _b[key] = asyncDataDefaults.errorValue;
    const _ref = options.deep ? ref : shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref(hasCachedData ? initialCachedData : options.default()),
      pending: ref(!hasCachedData),
      error: toRef(nuxtApp.payload._errors, key),
      status: ref("idle"),
      _default: options.default
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  delete asyncData._default;
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    var _a3;
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer((_a3 = opts.dedupe) != null ? _a3 : options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if (opts._initial || nuxtApp.isHydrating && opts._initial !== false) {
      const cachedData = opts._initial ? initialCachedData : options.getCachedData(key, nuxtApp);
      if (cachedData != null) {
        return Promise.resolve(cachedData);
      }
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxtApp));
        } catch (err) {
          reject(err);
        }
      }
    ).then(async (_result) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = await options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxtApp.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = asyncDataDefaults.errorValue;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxtApp._asyncDataPromises[key];
    });
    nuxtApp._asyncDataPromises[key] = promise;
    return nuxtApp._asyncDataPromises[key];
  };
  asyncData.clear = () => clearNuxtDataByKey(nuxtApp, key);
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = asyncDataDefaults.errorValue;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = asyncDataDefaults.errorValue;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    if (nuxtApp._asyncDataPromises[key]) {
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const _key = opts.key || hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    immediate,
    getCachedData,
    deep,
    dedupe,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    dedupe,
    watch: watch === false ? [] : [_fetchOptions, _request, ...watch || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller, new DOMException("Request aborted as another request to the same endpoint was initiated.", "AbortError"));
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    let timeoutId;
    if (timeoutLength) {
      timeoutId = setTimeout(() => controller.abort(new DOMException("Request aborted due to timeout.", "AbortError")), timeoutLength);
      controller.signal.onabort = () => clearTimeout(timeoutId);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions }).finally(() => {
      clearTimeout(timeoutId);
    });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  var _a;
  const segments = [
    ((_a = toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  return segments;
}
const userId = "2fecc2b3-0b2b-4d69-9ae7-5a1debb5caa4";
const _sfc_main = {
  __name: "webcam",
  __ssrInlineRender: true,
  setup(__props) {
    const selectedFile = ref(null);
    const previewUrl = ref(null);
    const searchResults = ref([]);
    const processingTime = ref(null);
    const uploadAndSend = async () => {
      var _a, _b;
      if (!selectedFile.value) {
        alert("\u274C Silakan pilih foto terlebih dahulu!");
        return;
      }
      const formData = new FormData();
      formData.append("file", selectedFile.value);
      const token = null;
      try {
        const { error } = await useFetch("http://localhost:8001/faces/register-reference?is_reference=true", {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`
          }
        }, "$mhMM87WWFE");
        if (error.value) {
          alert("\u274C Gagal kirim: " + error.value.message);
          return;
        }
        alert("\u2705 Foto berhasil dikirim! Mencari wajah...");
        const { data: searchData, error: searchError } = await useFetch(`http://localhost:8001/faces/search?user_id=${userId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }, "$QU9GSukDLb");
        if (searchError.value) {
          alert("\u274C Gagal mencari wajah: " + searchError.value.message);
        } else {
          searchResults.value = ((_a = searchData.value) == null ? void 0 : _a.results) || [];
          processingTime.value = (_b = searchData.value) == null ? void 0 : _b.processing_time_seconds;
        }
      } catch (err) {
        alert("\u274C Error: " + err.message);
      }
    };
    const resetReference = async () => {
      const token = null;
      try {
        const { error } = await useFetch("http://localhost:8001/faces/reset-reference", {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ user_id: userId })
        }, "$1eMYMgW4dm");
        if (error.value) {
          alert("\u274C Reset gagal: " + error.value.message);
        } else {
          alert("\u{1F9F9} Reference berhasil direset!");
          searchResults.value = [];
          selectedFile.value = null;
          previewUrl.value = null;
        }
      } catch (err) {
        alert("\u274C Error: " + err.message);
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "p-4 flex flex-col items-center" }, _attrs))}><h1 class="text-2xl font-bold mb-4">\u{1F4E4} Upload Foto Wajah</h1><input type="file" accept="image/*" class="border p-2 rounded shadow w-full max-w-md mb-4">`);
      if (previewUrl.value) {
        _push(`<div class="mb-4"><img${ssrRenderAttr("src", previewUrl.value)} alt="Preview" class="w-full max-w-md rounded shadow"></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="mt-4 flex gap-4 mb-4">`);
      _push(ssrRenderComponent(VBtn, {
        color: "primary",
        onClick: uploadAndSend,
        disabled: !selectedFile.value,
        class: "mr-2"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(` Kirim `);
          } else {
            return [
              createTextVNode(" Kirim ")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(ssrRenderComponent(VBtn, {
        color: "error",
        onClick: resetReference
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`Reset Reference`);
          } else {
            return [
              createTextVNode("Reset Reference")
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (searchResults.value.length) {
        _push(`<div class="mt-6 w-full max-w-md"><h2 class="text-lg font-semibold mb-2 text-center">\u{1F50D} Hasil Pencarian Wajah</h2>`);
        if (processingTime.value !== null) {
          _push(`<div class="text-md text-gray-600 mt-2 text-center mb-4"> \u23F1\uFE0F Processing time: ${ssrInterpolate(processingTime.value)} seconds </div>`);
        } else {
          _push(`<!---->`);
        }
        _push(ssrRenderComponent(VRow, null, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(`<!--[-->`);
              ssrRenderList(searchResults.value, (result, index) => {
                _push2(ssrRenderComponent(VCol, {
                  key: index,
                  cols: "12",
                  sm: "6",
                  md: "2"
                }, {
                  default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                    if (_push3) {
                      _push3(`<div class="text-center"${_scopeId2}><img${ssrRenderAttr("src", result.compressed_path)} alt="Matched face" class="w-24 h-24 object-cover rounded shadow mx-auto" style="${ssrRenderStyle({ "width": "300px" })}"${_scopeId2}><div class="text-md text-gray-600 mt-1"${_scopeId2}> Score/Akurasi: ${ssrInterpolate((result.score * 100).toFixed(2))}% </div></div>`);
                    } else {
                      return [
                        createVNode("div", { class: "text-center" }, [
                          createVNode("img", {
                            src: result.compressed_path,
                            alt: "Matched face",
                            class: "w-24 h-24 object-cover rounded shadow mx-auto",
                            style: { "width": "300px" }
                          }, null, 8, ["src"]),
                          createVNode("div", { class: "text-md text-gray-600 mt-1" }, " Score/Akurasi: " + toDisplayString((result.score * 100).toFixed(2)) + "% ", 1)
                        ])
                      ];
                    }
                  }),
                  _: 2
                }, _parent2, _scopeId));
              });
              _push2(`<!--]-->`);
            } else {
              return [
                (openBlock(true), createBlock(Fragment, null, renderList(searchResults.value, (result, index) => {
                  return openBlock(), createBlock(VCol, {
                    key: index,
                    cols: "12",
                    sm: "6",
                    md: "2"
                  }, {
                    default: withCtx(() => [
                      createVNode("div", { class: "text-center" }, [
                        createVNode("img", {
                          src: result.compressed_path,
                          alt: "Matched face",
                          class: "w-24 h-24 object-cover rounded shadow mx-auto",
                          style: { "width": "300px" }
                        }, null, 8, ["src"]),
                        createVNode("div", { class: "text-md text-gray-600 mt-1" }, " Score/Akurasi: " + toDisplayString((result.score * 100).toFixed(2)) + "% ", 1)
                      ])
                    ]),
                    _: 2
                  }, 1024);
                }), 128))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/webcam.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
