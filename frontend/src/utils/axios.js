import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000/api/v1",
    withCredentials: true, // Ye line sabse zaroori hai cookies (tokens) ke liye
});

export default axiosInstance;


//  import.meta.env.VITE_SERVER_URL ||