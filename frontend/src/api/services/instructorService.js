import { axiosClient } from "../clients/axiosClient";

export const instructorService = {
    // TODO: cập nhật endpoint theo backend
    getDashboard: async () => {
        const res = await axiosClient.get("/api/instructor/dashboard");
        return res.data;
    },
};

