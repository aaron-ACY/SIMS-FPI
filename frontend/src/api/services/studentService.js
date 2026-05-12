import { axiosClient } from "../clients/axiosClient";

export const studentService = {
    // TODO: cập nhật endpoint theo backend
    getDashboard: async () => {
        const res = await axiosClient.get("/api/student/dashboard");
        return res.data;
    },
};

