import axios from "axios";

const BASE_PATH = 'http://localhost:8080/api/v1';

const apiService = axios.create({
    BASE_PATH,
    headers: {
        'Authorization': 'Bearer ',
        'Content-Type': 'application/json',
        'X-Custom-Status': 'active',

    }
});

const post = async (url, data, config = {}) => {
    try {
        const response = await apiService.post(url, data, config);
        return response;
    } catch (error) {
        throw error.response ? error.response : new Error('Network error');
    }
};

export default {
    BASE_PATH,
    post
};
