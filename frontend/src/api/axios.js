import axios from "axios";

/* STEP 1: axios instance */
const api = axios.create({
    baseURL: "http://localhost:5000/api",
});

/* STEP 2: request interceptor (TOKEN AUTO ADD) */
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/* STEP 3: response interceptor (401 → LOGOUT) */
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem("token");
            window.location.href = "/login";
        }

        return Promise.reject(error);
    }
);

export default api;
