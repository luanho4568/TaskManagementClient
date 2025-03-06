import axios from "axios";

// Lấy URL từ .env
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const axiosClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để xử lý request/response
axiosClient.interceptors.response.use(
    (response) => response.data,
    (error) => {
      if (error.response) {
        return Promise.reject(error.response.data); 
      }
      return Promise.reject({ message: "Lỗi kết nối đến server!" });
    }
  );
  
export default axiosClient;
