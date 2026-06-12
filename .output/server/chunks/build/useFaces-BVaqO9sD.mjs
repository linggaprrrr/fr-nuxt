import axios from 'axios';
import { b3 as useRuntimeConfig } from './server.mjs';
import { u as useAuth } from './useAuth-azgWfqZX.mjs';
import { a as authFetch } from './authFetch-5wQjlWwJ.mjs';

const useFaces = () => {
  const config = useRuntimeConfig();
  const { refreshAuth } = useAuth();
  const uploadImages = async (unit_id, outlet_id, type_id, files, onProgress) => {
    var _a;
    const tryUpload = async (token) => {
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("files", file);
      });
      return await axios.post(`${config.public.apiBase}/faces/upload`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data"
        },
        params: {
          unit_id,
          outlet_id,
          photo_type_id: type_id
        },
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round(progressEvent.loaded * 100 / progressEvent.total);
            onProgress(progress);
          }
        }
      });
    };
    let accessToken = null;
    try {
      const response = await tryUpload(accessToken);
      return response.data;
    } catch (error) {
      if (((_a = error == null ? void 0 : error.response) == null ? void 0 : _a.status) === 401) {
        const refreshed = await refreshAuth();
        if (refreshed) {
          accessToken = localStorage.getItem("access_token");
          try {
            const response = await tryUpload(accessToken);
            return response.data;
          } catch (err) {
            return Promise.reject(err);
          }
        }
      }
      return Promise.reject(error);
    }
  };
  const fetchFaceSearch = async ({
    page = 1,
    limit = 25,
    startDate = null,
    endDate = null
  }) => {
    const userRaw = localStorage.getItem("user");
    const user = userRaw ? JSON.parse(userRaw) : null;
    user == null ? void 0 : user.id;
    const data = await authFetch("/faces/search", {});
    return data;
  };
  return {
    uploadImages,
    fetchFaceSearch
  };
};

export { useFaces as u };
