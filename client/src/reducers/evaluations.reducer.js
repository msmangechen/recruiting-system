import {ADD_EVALUATION, EDIT_EVALUATION, GET_EVALUATION} from "../actions/evaluations.action";

export default function (oldEvaluationsState = null, action) {
    switch (action.type) {
        case GET_EVALUATION:
            return action.payload.data;
        case ADD_EVALUATION:if (action.payload.success) {
                return oldEvaluationsState.concat(action.payload.evaluation);
            } else {
                return oldEvaluationsState;
            }
        case EDIT_EVALUATION:
            if (action.payload.success) {
                const evaluation = action.payload.evaluation;
                const index = oldEvaluationsState.findIndex(c => c.id === evaluation.id);
                const newEvaluationsState = [...oldEvaluationsState];
                newEvaluationsState.splice(index, 1, evaluation);
                return newEvaluationsState;
            } else {
                return oldEvaluationsState;
            }
        default:
            return oldEvaluationsState;
    }
}
