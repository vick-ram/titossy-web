import axios, { AxiosInstance, AxiosResponse, AxiosRequestConfig, InternalAxiosRequestConfig } from "axios";

const axiosInstance: AxiosInstance = axios.create({
    baseURL: "http://localhost:8080/api",
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

axiosInstance.interceptors.response.use(
    (response: AxiosResponse) => {
        return response;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export const get = async <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => { 
    return await axiosInstance.get(url, config);
}

export const post = async <T = any>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
    return await axiosInstance.post(url, data, config);
}

export const put = async <T = any>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
    return await axiosInstance.put(url, data, config);
}

export const patch = async <T = any>(url: string, data: any, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
    return await axiosInstance.patch(url, data, config);
}

export const del = async <T = any>(url: string, config: AxiosRequestConfig = {}): Promise<AxiosResponse<T>> => {
    return await axiosInstance.delete(url, config);
}

