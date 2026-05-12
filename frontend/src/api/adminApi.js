import { axiosClient } from "./axiosClient";

export const adminApi = {
    getDashboard: () => axiosClient.get("/api/admin/dashboard"),
    getUsers: () => axiosClient.get("/api/admin/users"),
    // Add more admin endpoints here
};
