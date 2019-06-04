import axios from 'axios';

// environment variable
const API_URL = process.env.REACT_APP_API_URL;
// const API_URL = 'http://localhost:8080';

export const GET_EMPLOYEE = 'GET_EMPLOYEE';
export const ADD_EMPLOYEE = 'ADD_EMPLOYEE';
export const EDIT_EMPLOYEE = 'EDIT_EMPLOYEE';

export function getEmployees() {
    let promise = axios.get(`${API_URL}/employees`);
    return {
        type: 'GET_EMPLOYEE',
        payload: promise
    };
}

// get id from employee detail emp_id
export function getEmployeeById(employee_id) {
    let promise = axios.get(`${API_URL}/employee-detail/${employee_id}`);
    return {
        type: 'GET_EMPLOYEE_BY_EMP_ID',
        payload: promise
    };
}

export function editEmployee(employee, callback) {
    let promise = axios.put(`${API_URL}/employee-detail/${employee.id}`, employee, {withCredentials: true})
        .then(res => {
            callback(res);
            return {
                employee: employee,
                success: res.data
            };
        });
    return {
        type: 'EDIT_EMPLOYEE',
        payload: promise
    };
}

export function deleteEmployee(employee_id, callback) {
    // console.log('action:', index);
    let promise = axios.delete(`${API_URL}/employees/${employee_id}`)
        .then(res => {
            callback(res);
            return res;
        });
    return {
        type: 'DELETE_EMPLOYEE',
        payload: promise
    };
}