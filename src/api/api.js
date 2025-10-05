// src/api/api.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL || "https://bookshop-api-er7t.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
