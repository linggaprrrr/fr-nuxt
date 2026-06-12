import { b3 as useRuntimeConfig } from './server.mjs';

const useAuth = () => {
  const config = useRuntimeConfig();
  const login = async (email, password) => {
    try {
      const data = await $fetch("/auth/login", {
        baseURL: config.public.apiBase,
        method: "POST",
        body: { email, password }
      });
      if (isLoginResponse(data)) {
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        const user = data.user;
        if (false) ;
      }
    } catch (err) {
      throw err;
    }
  };
  const userRegister = async (fullname, email, password) => {
    try {
      const data = await $fetch("/auth/register", {
        baseURL: config.public.apiBase,
        method: "POST",
        body: { fullname, email, password }
      });
      if (isLoginResponse(data)) {
        const accessToken = data.access_token;
        const refreshToken = data.refresh_token;
        const user = data.user;
        if (false) ;
      }
      throw new Error("Registration failed. Please check your input and try again.");
    } catch (error) {
      throw error;
    }
  };
  const googleLogin = async (googleToken) => {
    try {
      const response = await $fetch("/auth/google-login", {
        baseURL: config.public.apiBase,
        method: "POST",
        body: { token: googleToken }
      });
      if (isLoginResponse(response)) {
        const accessToken = response.access_token;
        const refreshToken = response.refresh_token;
        const user = response.user;
        if (false) ;
      }
      throw new Error("Google login failed. Please try again.");
    } catch (err) {
      throw err;
    }
  };
  const refreshAuth = async () => {
    return false;
  };
  function isLoginResponse(data) {
    return typeof data.access_token === "string" && typeof data.refresh_token === "string" && typeof data.user === "object";
  }
  const logout = () => {
  };
  const isAuthenticated = () => {
    return false;
  };
  const getUser = () => {
    return null;
  };
  return {
    userRegister,
    login,
    logout,
    isAuthenticated,
    getUser,
    googleLogin,
    refreshAuth
  };
};

export { useAuth as u };
