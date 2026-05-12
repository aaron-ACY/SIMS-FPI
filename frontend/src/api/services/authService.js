import { axiosClient } from "../clients/axiosClient";

export const authService = {
    login: async ({ username, password }) => {
        // Dựa vào Backend: [Route("api/auth")] [HttpPost("login")]
        // Dựa vào thông báo lỗi "Email hoặc mật khẩu", trường nhận vào khả năng cao là 'email'
        const res = await axiosClient.post("/api/auth/login", {
            email: username, // Map username từ UI vào email của Backend
            password: password,
        });
        return res.data;
    },
};
