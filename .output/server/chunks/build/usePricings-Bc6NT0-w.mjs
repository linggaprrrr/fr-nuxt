import { a as authFetch } from './authFetch-5wQjlWwJ.mjs';

const usePricings = () => {
  const getPhotoTypes = async ({ page = 1, limit = 25, search = null }) => {
    const data = await authFetch(`/photo_types/`, {});
    return data;
  };
  const getPhotoPrices = async ({ page = 1, limit = 25, search = null }) => {
    const data = await authFetch(`/photo_prices/`, {});
    return data;
  };
  const getPhotoPricesByUnit = async (unitId) => {
    const data = await authFetch(`/photo_prices/by-unit/${unitId}`, {});
    return data;
  };
  const getPhotoPricesByOutlet = async (outletId) => {
    const data = await authFetch(`/photo_prices/by-outlet/${outletId}`, {});
    return data;
  };
  const createPhotoPricing = async (data) => {
    const response = await authFetch(`/photo_prices/`, {});
    return response;
  };
  const createPhotoType = async (data) => {
    const response = await authFetch(`/photo_types/`, {});
    return response;
  };
  const deletePhotoTypeById = async (id) => {
    const response = await authFetch(`/photo_types/${id}`, {});
    return response;
  };
  const deletePhotoPriceById = async (id) => {
    const response = await authFetch(`/photo_prices/${id}`, {});
    return response;
  };
  const getPhotoPriceById = async (id) => {
    const data = await authFetch(`/photo_prices/${id}`, {});
    return data;
  };
  const updatePhotoPrice = async (id, data) => {
    const response = await authFetch(`/photo_prices/${id}`, {});
    return response;
  };
  const getPhotoTypeById = async (id) => {
    const data = await authFetch(`/photo_types/${id}`, {});
    return data;
  };
  const updatePhotoType = async (id, data) => {
    const response = await authFetch(`/photo_types/${id}`, {});
    return response;
  };
  return {
    getPhotoTypes,
    getPhotoPrices,
    createPhotoPricing,
    createPhotoType,
    deletePhotoTypeById,
    deletePhotoPriceById,
    getPhotoPriceById,
    getPhotoTypeById,
    updatePhotoType,
    updatePhotoPrice,
    getPhotoPricesByUnit,
    getPhotoPricesByOutlet
  };
};

export { usePricings as u };
