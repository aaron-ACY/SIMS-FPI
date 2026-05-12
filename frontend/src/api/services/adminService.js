import { axiosClient } from "../clients/axiosClient";

export const adminService = {
    // TODO: cập nhật endpoint theo backend
    getDashboard: async () => {
        const res = await axiosClient.get("/api/admin/dashboard");
        return res.data;
    },
};

