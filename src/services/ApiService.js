import axios from "axios";

const CORE_BASE_PATH = 'http://127.0.0.1:8080/api/v1';
const FILE_BASE_PATH = 'http://127.0.0.1:8090/api/v1';

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

// file
const getSignedUrl = (fileId) => {
    const fileName = Math.random().toString(36).substring(2, 10);
    return get(`${FILE_BASE_PATH}/files/${fileId}/signed-url`, {
        params: { download: false, fileName },
    });
};

export default {
    CORE_BASE_PATH,
    FILE_BASE_PATH,
    getSignedUrl,
    post,
    get,
    getCategories,
    getProducts
};
