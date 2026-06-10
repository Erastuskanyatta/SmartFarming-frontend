import axios from "axios";

const CORE_BASE_PATH = 'http://127.0.0.1:8080/api/v1';
const FILE_BASE_PATH = 'http://127.0.0.1:8090/api/v1';
const AUTH_BASE_PATH = 'http://127.0.0.1:9090/api/v1/auth';

const apiService = axios.create({
    headers: {
        'Content-Type': 'application/json',
        'X-Custom-Status': 'active',
    }
});

apiService.interceptors.request.use(config => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
});

const post = async (url, data, config = {}) => {
    try {
        const response = await apiService.post(url, data, config);
        return response;
    } catch (error) {
        throw error.response ? error.response : new Error('Network error');
    }
};

const get = async (url, config = {}) => {
    try {
        const response = await apiService.get(url, config);
        return response;
    } catch (error) {
        throw error.response ? error.response : new Error('Network error');
    }
};

// core
const getCategories = () => get(`${CORE_BASE_PATH}/categories`);
const getProducts = () => get(`${CORE_BASE_PATH}/product`);
const createProduct = (data) => post(`${CORE_BASE_PATH}/product`, data);

// file
const getSignedUrl = (fileId) => {
    const fileName = Math.random().toString(36).substring(2, 10);
    return get(`${FILE_BASE_PATH}/files/${fileId}/signed-url`, {
        params: { download: false, fileName },
    });
};

const uploadFile = (file) => {
    const formData = new FormData();
    formData.append('file', file);
    return post(`${FILE_BASE_PATH}/files`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
};

// auth
const register = (data) => post(`${AUTH_BASE_PATH}/register`, data)
const authenticate = (data) => post(`${AUTH_BASE_PATH}/authenticate`, data)
const verifyUser = (data) => post(`${AUTH_BASE_PATH}/verify-user`, data)
const resendCode = (data) => post(`${AUTH_BASE_PATH}/resend-code`, data)
const forgotPassword = (data) => post(`${AUTH_BASE_PATH}/forgot-password`, data)
const resetPassword = (data) => post(`${AUTH_BASE_PATH}/reset-password`, data)
const refreshToken = (data) => post(`${AUTH_BASE_PATH}/refresh-token`, data)
const enableUser = () => post(`${AUTH_BASE_PATH}/users/{userId}/enable`)
const updateUserEmail = (data) => post(`${AUTH_BASE_PATH}/users/{userId}/email`, data)

export default {
    // file 
    getSignedUrl,
    uploadFile,

    // core:
    getCategories,
    getProducts,
    createProduct,

    // auth
    register,
    authenticate,
    verifyUser,
    resendCode,
    forgotPassword,
    resetPassword,
    refreshToken,
    enableUser,
    updateUserEmail,
};
