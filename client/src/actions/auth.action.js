import axios from 'axios';
import qs from 'qs';

const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = 'http://localhost:8080';

export const LOGIN = 'LOGIN';
export const LOGOUT = 'LOGOUT';
export const REGISTER = 'REGISTER';

export function login(user, callback) {
    const promise = axios.post(`${API_URL}/login`, qs.stringify(user), {withCredentials: true});
    return {
        type: LOGIN,
        payload: promise
    }
}

export function logout(callback) {
    const promise = axios.post(`${API_URL}/logout`, {withCredentials: true})
        .then(res => {
            callback(res);
            return res;
        });
    return {
        type: LOGOUT,
        payload: promise
    }
}

export function register(employee, callback) {
    const promise = axios.post(`${API_URL}/employees`,employee,{withCredentials: true})
        .then(res => {
            console.log('register successfully!');
            callback(res);
            return res;
        });
    return {
        type: REGISTER,
        payload: promise
    }
}
