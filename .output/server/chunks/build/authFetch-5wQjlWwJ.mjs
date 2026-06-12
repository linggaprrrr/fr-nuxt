const getApiErrorMessage = (error) => {
  var _a, _b, _c;
  if (!error) return "Unknown API error.";
  if (typeof error === "string") return error;
  if (error == null ? void 0 : error.message) return error.message;
  if ((_a = error == null ? void 0 : error.data) == null ? void 0 : _a.message) return error.data.message;
  if ((_c = (_b = error == null ? void 0 : error.response) == null ? void 0 : _b.data) == null ? void 0 : _c.message) return error.response.data.message;
  if (error == null ? void 0 : error.statusText) return error.statusText;
  return "An unexpected API error occurred.";
};
const createApiError = (payload) => {
  const error = new Error(payload.message);
  error.status = payload.status;
  error.data = payload.data;
  return error;
};
const authFetch = async (url, options = {}) => {
  {
    throw createApiError({ message: "No access token available.", status: 401 });
  }
};

export { authFetch as a, getApiErrorMessage as g };
