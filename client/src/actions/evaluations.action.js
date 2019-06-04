import axios from 'axios';

// environment variable
const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = 'http://localhost:8080';

export const GET_EVALUATION = 'GET_EVALUATION';
export const ADD_EVALUATION = 'ADD_EVALUATION';
export const EDIT_EVALUATION = 'EDIT_EVALUATION';

export function getEvaluations() {
    let promise = axios.get(`${API_URL}/evaluations`);
    return {
        type: 'GET_EVALUATION',
        payload: promise
    };
}

export function getEvaluationById(evaluation_id) {
    let promise = axios.get(`${API_URL}/evaluations/${evaluation_id}`);
    return {
        type: 'GET_EVALUATION_BY_ID',
        payload: promise
    };
}

export function addEvaluation(evaluation, callback) {
    let promise = axios.post(`${API_URL}/evaluations`, evaluation)
        .then(res => {
            callback(res);
            return {
                evaluation: evaluation,
                success: res.data
            };
        });
    return {
        type: 'ADD_EVALUATION',
        payload: promise
    };
}

export function editEvaluation(evaluation, callback) {
    let promise = axios.put(`${API_URL}/evaluations/${evaluation.id}`, evaluation, {withCredentials: true})
        .then(res => {
            callback(res);
            return {
                evaluation: evaluation,
                success: res.data
            };
        });
    return {
        type: 'EDIT_EVALUATION',
        payload: promise
    };
}

export function deleteEvaluation(evaluation_id, callback) {
    let promise = axios.delete(`${API_URL}/evaluations/${evaluation_id}`)
        .then(res => {
            callback(res);
            return res;
        })
    return {
        type: 'DELETE_EVALUATION',
        payload: promise
    };
}