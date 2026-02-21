// import api from "./axios";

// // const API_URL = "/api";

// export const getUsers = () => {
//     const token = localStorage.getItem("token");

//     return api.get(`${API_URL}/users`, {
//         headers: {
//             Authorization: `Bearer ${token}`,
//         },
//     });
// };

// export const addUser = (data) => api.post(`${API_URL}/users`, data);

// export const login = (data) =>
//     api.post(`${API_URL}/login`, data);


import api from "./axios";

/* GET USERS */
export const getUsers = () => {
    return api.get("/users");
};

/* ADD USER */
export const addUser = (data) => {
    return api.post("/users", data);
};

/* LOGIN */
export const login = (data) => {
    return api.post("/login", data);
};