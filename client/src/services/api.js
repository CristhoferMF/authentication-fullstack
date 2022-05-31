import axios from "axios";
import config from "../config";

axios.defaults.baseURL = "/api";

export const login = async (data) => {
  return axios.post("auth/login", data);
};

export const register = async (data) => {
  return axios.post("auth/register", data);
};

export const profile = async (token) => {
  return axios.get("user/profile", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const updateProfile = async (token, data) => {
  return axios.post("user/profile", data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const generateTokens = async (refreshToken, userId) => {
  return axios.post("auth/refreshtoken", {
    refreshToken,
    userId,
  });
};
