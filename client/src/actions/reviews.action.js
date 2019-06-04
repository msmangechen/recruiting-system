import axios from 'axios';

// environment variable
const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = 'http://localhost:8080';

export const GET_REVIEW = 'GET_REVIEW';
export const ADD_REVIEW = 'ADD_REVIEW';
export const EDIT_REVIEW = 'EDIT_REVIEW';

export function getReviews() {
    let promise = axios.get(`${API_URL}/reviews`);
    return {
        type: 'GET_REVIEW',
        payload: promise
    };
}

export function getReviewById(review_id) {
    let promise = axios.get(`${API_URL}/reviews/${review_id}`);
    return {
        type: 'GET_REVIEW_BY_ID',
        payload: promise
    };
}

export function addReview(review, callback) {
    let promise = axios.post(`${API_URL}/reviews`, review)
        .then (res => {
            callback(res);
            return {
                review: review,
                success: res.data.success
            };
        });
    return {
        type: 'ADD_REVIEW',
        payload: promise
    };
}

export function editReview(review, callback) {
    let promise = axios.put(`${API_URL}/reviews/${review.id}`, review, {withCredentials: true})
        .then(res => {
            callback(res);
            return {
                review: review,
                success: res.data
            };
        });
    return {
        type: 'EDIT_REVIEW',
        payload: promise
    };
}

export function deleteReview(review_id, callback) {
    let promise = axios.delete(`${API_URL}/reviews/${review_id}`)
        .then(res => {
            callback(res);
            return res;
        })
    return {
        type: 'DELETE_REVIEW',
        payload: promise
    };
}