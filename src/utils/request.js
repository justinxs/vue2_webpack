import axios from 'axios';
import { stringify } from './common';

const instance = axios.create({
    baseURL: '',
    timeout: 30000,
    withCredentials: false,
    transformResponse: [
        function(data) {
            return JSON.parse(data);
        }
    ]
});

instance.interceptors.request.use(
    config => {
        config.params = Object.assign({ v: Date.now() }, config.params);
        return config;
    },
    error => {
        return Promise.reject(error);
    }
);

instance.interceptors.response.use(
    response => {
        return response.data;
    }, 
    error => {
        if (error == 'Error: 网络错误') {
            return Promise.reject(error.message);
        } else {
            return Promise.resolve({ code: 0, msg: error });
        }
    }
);

class Request {
    constructor() {
        this.instance = instance;
    }
    async get(url, param, header) {
        return this.instance.get(url, {
            params: param,
            headers: header
        });
    }
    async post(url, data, header) {
        return this.instance.post(url, data, {
            headers: header
        });
    }
    async put(url, param, data, header) {
        return this.instance.put(url, data, {
            params: param,
            headers: header
        });
    }
    async delete(url, header) {
        return this.instance.delete(url, {
            headers: header
        });
    }
    async postForm(url, data, header) {
        return this.instance.post(url, data, {
            transformRequest: [function(data, headers) {
                if (header) {
                    Object.assign(header, headers);
                }
                return stringify(data);
            }]
        });
    }
}

export default new Request();
