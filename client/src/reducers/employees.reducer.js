// import {ADD_EMPLOYEE, EDIT_EMPLOYEE, GET_EMPLOYEE, DELETE_EMPLOYEE} from "../actions/employees.action";
import {ADD_EMPLOYEE, EDIT_EMPLOYEE, GET_EMPLOYEE} from "../actions/employees.action";

export default function (oldEmployeesState = null, action) {
    switch (action.type) {
        case GET_EMPLOYEE:
            return action.payload.data;
        case ADD_EMPLOYEE:
            if (action.payload.success) {
                return oldEmployeesState.concat(action.payload.employee);
            } else {
                return oldEmployeesState;
            }
        case EDIT_EMPLOYEE:
            if (action.payload.success) {
                const employee = action.payload.employee;
                const index = oldEmployeesState.findIndex(e => e.id === employee.id);
                const newEmployeesState = [...oldEmployeesState];
                newEmployeesState.splice(index, 1, employee);
                return newEmployeesState;
            } else {
                return oldEmployeesState;
            }
        default:
            // unknown action type should no update employees state
            return oldEmployeesState;
    }
}