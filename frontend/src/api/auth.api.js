import { axiosClient } from "./axiosClient";

export const authApi = {
    login: async ({ username, password, role }) => {
        const res = await axiosClient.post("/api/auth/login", {
            email: username,
            password: password,
            role: role
        });
        return res.data;
    },
    changePassword: (data) => axiosClient.post("/api/auth/change-password", data),
};
