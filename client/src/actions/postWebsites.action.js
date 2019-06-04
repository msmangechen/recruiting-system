import axios from 'axios';

// environment variable
const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = 'http://localhost:8080';

export const GET_POST_WEBSITES = 'GET_POST_WEBSITES';

export function getPostWebsites() {
    let promise = axios.get(`${API_URL}/post_websites`);
    return {
        type: 'GET_POST_WEBSITES',
        payload: promise
    };
}