import { a as authFetch } from './authFetch-5wQjlWwJ.mjs';

const useOutlets = () => {
  const getOutlets = async ({
    page = 1,
    limit = 25,
    search = null
  }) => {
    const response = await authFetch("outlets/", {});
    return response;
  };
  const createOutlet = async (data) => {
    const response = await authFetch("outlets/", {});
    return response;
  };
  const deleteOutletById = async (id) => {
    const response = await authFetch(`outlets/${id}`, {});
    return response;
  };
  const getOutletById = async (id) => {
    const response = await authFetch(`outlets/${id}`, {});
    return response;
  };
  const getOutletsByUnit = async (id) => {
    const response = await authFetch(`/outlets/get-outlets-by-unit/${id}`, {});
    return response;
  };
  const updateOutletById = async (id, data) => {
    const response = await authFetch(`outlets/${id}`, {});
    return response;
  };
  return {
    getOutlets,
    createOutlet,
    deleteOutletById,
    getOutletById,
    getOutletsByUnit,
    updateOutletById
  };
};

export { useOutlets as u };
