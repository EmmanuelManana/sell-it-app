import axios from 'axios';

const BASE_URL = "http://light-it-04.tk/api";

const request = ({ method, url, data, headers }) => {
    return axios({
        method,
        url,
        data,
        headers
    })    
}

export const get = (path, headers) => {
    return request({
        method: 'GET',
        url: BASE_URL + path,
        headers
    });
}

export const post = (path, data, headers) => {
    return request({
        method: 'POST',
        url: BASE_URL + path,
        data,
        headers
    });
}

export const deleteRequest = (path, headers) => {
    return request({
        method: 'DELETE',
        url: BASE_URL + path,
        headers
    });
};

export const patch = (path, data, headers) => {
    return request({
        method: 'PATCH',
        url: BASE_URL + path,
        data,
        headers
    });
}
