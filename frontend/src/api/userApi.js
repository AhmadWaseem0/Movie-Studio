import api from "./axios";

const API_URL = "http://localhost:5000/api";

export const getUsers = () => {
    const token = localStorage.getItem("token");

    return api.get(`${API_URL}/users`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
};

export const addUser = (data) => api.post(`${API_URL}/users`, data);

export const login = (data) =>
    api.post(`${API_URL}/login`, data);
