import { a as authFetch } from './authFetch-5wQjlWwJ.mjs';

const useUsers = () => {
  const getCurrentUser = async () => {
    const data = await authFetch("users/me", {});
    return data;
  };
  const getUsers = async ({
    page = 1,
    limit = 25,
    search = null
  }) => {
    const data = await authFetch("users/", {});
    return data;
  };
  const getUserById = async (userId) => {
    const data = await authFetch(`users/${userId}`, {});
    return data;
  };
  const updateUserById = async (userId, payload) => {
    const data = await authFetch(`users/${userId}`, {});
    return data;
  };
  const deleteUserById = async (userId) => {
    const data = await authFetch(`users/${userId}`, {});
    return data;
  };
  const createUser = async (payload) => {
    const data = await authFetch("/auth/register", {});
    return data;
  };
  return {
    getUsers,
    createUser,
    getUserById,
    updateUserById,
    deleteUserById,
    getCurrentUser
  };
};

export { useUsers as u };
