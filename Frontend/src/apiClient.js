// Frontend/src/apiClient.js
import axios from "axios";

console.log("Using API base URL => https://sentramind-backend.onrender.com");

const api = axios.create({
  baseURL: "https://sentramind-backend.onrender.com", // backend root
  withCredentials: true,            // sessions/cookies for login
});

export default api;
