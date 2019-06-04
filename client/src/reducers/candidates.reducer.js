import {ADD_CANDIDATE, EDIT_CANDIDATE, GET_CANDIDATE} from "../actions/candidates.action";

export default function (oldCandidatesState = null, action) {
    switch (action.type) {
        case GET_CANDIDATE:
            return action.payload.data;
        case ADD_CANDIDATE:
            if (action.payload.success) {
                return oldCandidatesState.concat(action.payload.candidate);
            } else {
                return oldCandidatesState;
            }
        case EDIT_CANDIDATE:
            if (action.payload.success) {
                const candidate = action.payload.candidate;
                const index = oldCandidatesState.findIndex(c => c.id === candidate.id);
                const newCandidatesState = [...oldCandidatesState];
                newCandidatesState.splice(index, 1, candidate);
                return newCandidatesState;
            } else {
                return oldCandidatesState;
            }
        default:
            // unknown action type should no update candidates state
            return oldCandidatesState;
    }
}