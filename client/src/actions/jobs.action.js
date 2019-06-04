import axios from 'axios';

// environment variable
const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = 'http://localhost:8080';

export const GET_JOB = 'GET_JOB';
export const ADD_JOB = 'ADD_JOB';
export const EDIT_JOB = 'EDIT_JOB';

export function getJobs() {
    let promise = axios.get(`${API_URL}/jobs`);
    return {
        type: 'GET_JOB',
        payload: promise
    };
}

export function getJobById(job_id) {
    let promise = axios.get(`${API_URL}/jobs/${job_id}`);
    return {
        type: 'GET_JOB_BY_ID',
        payload: promise
    };
}

export function addJob(job, callback) {
    let promise = axios.post(`${API_URL}/jobs`, job)
        .then (res => {
            callback(res);
            return {
                job: job,
                success: res.data.success
            };
        });
    return {
        type: 'ADD_JOB',
        payload: promise
    };
}

export function editJob(job, callback) {
    let promise = axios.put(`${API_URL}/jobs/${job.id}`, job, {withCredentials: true})
        .then(res => {
            callback(res);
            return {
                job: job,
                success: res.data
            };
        });
    return {
        type: 'EDIT_JOB',
        payload: promise
    };
}

export function deleteJob(job_id, callback) {
    let promise = axios.delete(`${API_URL}/jobs/${job_id}`)
        .then(res => {
            callback(res);
            return res;
        })
    return {
        type: 'DELETE_JOB',
        payload: promise
    };
}