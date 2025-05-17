import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5173/api",
});

api.interceptors.request.use(
  (cfg) => {
    const token = localStorage.getItem("token");
    if (token) {
      cfg.headers["Session"] = token;
    }
    return cfg;
  },
  (err) => Promise.reject(err),
);

export default api;
