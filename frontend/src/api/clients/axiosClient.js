import axios from "axios";

const tokenFromStorage = () => {
    try {
        return localStorage.getItem("accessToken");
    } catch {
        return null;
    }
};

export const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000",
    headers: {
        "Content-Type": "application/json",
    },
});

// Request interceptor
axiosClient.interceptors.request.use(
    (config) => {
        const token = tokenFromStorage();
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        console.log(`🚀 Calling API: ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("user");
        }
        return Promise.reject(error);
    }
);
