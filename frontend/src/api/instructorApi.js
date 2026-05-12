import { axiosClient } from "./axiosClient";

export const instructorApi = {
    getProfile: () => axiosClient.get("/api/instructor/profile"),
    getClasses: () => axiosClient.get("/api/instructor/classes"),
    getStudents: (classId) => axiosClient.get(`/api/instructor/classes/${classId}/students`),
};
