import { axiosClient } from "./axiosClient";

export const studentApi = {
    getProfile: () => axiosClient.get("/api/student/profile"),
    getCourses: () => axiosClient.get("/api/student/courses"),
    getGrades: () => axiosClient.get("/api/student/grades"),
};
