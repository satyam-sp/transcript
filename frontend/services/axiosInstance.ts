import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

const axiosInstance = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
        "ngrok-skip-browser-warning": "true", // ✅ skip the Ngrok warning page

    },
});

axiosInstance.interceptors.request.use(
    (config: any) => {
        return config;
    },
    (error: any) => Promise.reject(error)
);

export default axiosInstance;