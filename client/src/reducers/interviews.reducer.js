import {ADD_INTERVIEW, EDIT_INTERVIEW, GET_INTERVIEW} from "../actions/interviews.action";

export default function (oldInterviewsState = null, action) {
    switch (action.type) {
        case GET_INTERVIEW:
            return action.payload.data;
        case ADD_INTERVIEW:if (action.payload.success) {
            return oldInterviewsState.concat(action.payload.interview);
        } else {
            return oldInterviewsState;
        }
        case EDIT_INTERVIEW:
            if (action.payload.success) {
                const interview = action.payload.interview;
                const index = oldInterviewsState.findIndex(c => c.id === interview.id);
                const newInterviewsState = [...oldInterviewsState];
                newInterviewsState.splice(index, 1, interview);
                return newInterviewsState;
            } else {
                return oldInterviewsState;
            }
        default:
            return oldInterviewsState;
    }
}
