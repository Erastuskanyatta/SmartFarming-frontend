import axios from "axios";

const BASE_PATH = 'http://127.0.0.1:8080/api/v1';

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

const getCategories = () => get(`${BASE_PATH}/categories`);

export default {
    BASE_PATH,
    post,
    get,
    getCategories
};
