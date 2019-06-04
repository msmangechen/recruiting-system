import axios from 'axios';

// environment variable
const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = 'http://localhost:8080';

export const GET_INTERVIEW = 'GET_INTERVIEW';
export const ADD_INTERVIEW = 'ADD_INTERVIEW';
export const EDIT_INTERVIEW = 'EDIT_INTERVIEW';

export function getInterviews() {
    let promise = axios.get(`${API_URL}/interviews`);
    return {
        type: 'GET_INTERVIEW',
        payload: promise
    };
}

export function getInterviewById(interview_id) {
    let promise = axios.get(`${API_URL}/interviews/${interview_id}`);
    return {
        type: 'GET_INTERVIEW_BY_ID',
        payload: promise
    };
}

export function addInterview(interview, callback) {
    let promise = axios.post(`${API_URL}/interviews`, interview)
        .then(res => {
            callback(res);
            return {
                interview: interview,
                success: res.data
            };
        });
    return {
        type: 'ADD_INTERVIEW',
        payload: promise
    };
}

export function editInterview(interview, callback) {
    let promise = axios.put(`${API_URL}/interviews/${interview.id}`, interview, {withCredentials: true})
        .then(res => {
            callback(res);
            return {
                interview: interview,
                success: res.data
            };
        });
    return {
        type: 'EDIT_INTERVIEW',
        payload: promise
    };
}

export function deleteInterview(interview_id, callback) {
    let promise = axios.delete(`${API_URL}/interviews/${interview_id}`)
        .then(res => {
            callback(res);
            return res;
        })
    return {
        type: 'DELETE_INTERVIEW',
        payload: promise
    };
}