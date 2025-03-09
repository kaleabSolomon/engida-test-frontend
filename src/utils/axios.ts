import axios from "axios";

// Create an axios instance
const API_URL = "http://localhost:3333/api/";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
