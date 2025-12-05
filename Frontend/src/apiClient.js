// Frontend/src/apiClient.js
import axios from "axios";

console.log("Using API base URL => http://localhost:5000");

const api = axios.create({
  baseURL: "http://localhost:5000", // backend root
  withCredentials: true,            // sessions/cookies for login
});

export default api;
