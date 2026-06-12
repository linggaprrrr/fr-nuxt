import { a as authFetch } from './authFetch-5wQjlWwJ.mjs';

const usePhotos = () => {
  const getPhotos = async ({
    page = 1,
    limit = 25,
    outlet_id = null,
    name = null,
    date_from = null,
    date_to = null
  }) => {
    const response = await authFetch("/photos/", {});
    console.log("getPhotos response:", response);
    return response;
  };
  const deletePhotoById = async (id) => {
    const response = await authFetch(`photos/${id}`, {});
    return response;
  };
  return {
    getPhotos,
    deletePhotoById
  };
};

export { usePhotos as u };
