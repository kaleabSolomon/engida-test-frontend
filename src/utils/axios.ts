import axios from "axios";

// Create an axios instance
const API_URL = "https://exuberant-jennine-sewlesew-cc283cb8.koyeb.app/";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log(token);
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
