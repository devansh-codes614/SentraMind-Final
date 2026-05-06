// Frontend/src/apiClient.js
import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // https://sentramind-backend.onrender.com
  withCredentials: true,                 // session cookie ke liye zaroori
});

export default api;

