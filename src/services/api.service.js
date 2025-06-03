import axios from "axios";

const API_BASE_URL =
  import.meta.env.VITE_API_URL || "https://w57p2f-3000.csb.app/api";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
