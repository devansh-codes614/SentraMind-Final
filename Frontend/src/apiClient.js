// Frontend/src/apiclient.js

import axios from "axios";

console.log("Using API base URL => https://sentramind-backend-ymzz.onrender.com");

const api = axios.create({
  baseURL: "https://sentramind-backend-ymzz.onrender.com",
  withCredentials: true,
});

export default api;