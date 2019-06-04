import axios from 'axios';

// environment variable
const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = 'http://localhost:8080';

export const GET_CANDIDATE = 'GET_CANDIDATE';
export const ADD_CANDIDATE = 'ADD_CANDIDATE';
export const EDIT_CANDIDATE = 'EDIT_CANDIDATE';

export function getCandidates() {
    let promise = axios.get(`${API_URL}/candidates`);
    return {
        type: 'GET_CANDIDATE',
        payload: promise
    };
}

export function getCandidateById(candidate_id) {
    let promise = axios.get(`${API_URL}/candidates/${candidate_id}`);
    return {
        type: 'GET_CANDIDATE_BY_ID',
        payload: promise
    };
}

export function addCandidate(candidate, callback) {
    let promise = axios.post(`${API_URL}/candidates`, candidate)
        .then(res => {
            callback(res);
            return {
                candidate: candidate,
                success: res.data
            };
        });
    return {
        type: 'ADD_CANDIDATE',
        payload: promise
    };
}

export function editCandidate(candidate, callback) {
    let promise = axios.put(`${API_URL}/candidates/${candidate.id}`, candidate, {withCredentials: true})
        .then(res => {
            callback(res);
            return {
                candidate: candidate,
                success: res.data
            };
        });
    return {
        type: 'EDIT_CANDIDATE',
        payload: promise
    };
}

export function deleteCandidate(candidate_id, callback) {
    let promise = axios.delete(`${API_URL}/candidates/${candidate_id}`)
        .then(res => {
            callback(res);
            return res;
        })
    return {
        type: 'DELETE_CANDIDATE',
        payload: promise
    };
}