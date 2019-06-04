import {ADD_JOB, EDIT_JOB, GET_JOB} from "../actions/jobs.action";

export default function (oldJobsState = null, action) {
    switch (action.type) {
        case GET_JOB:
            return action.payload.data;
        case ADD_JOB:
            if (action.payload.success) {
                return oldJobsState.concat(action.payload.job);
            } else {
                return oldJobsState;
            }
        case EDIT_JOB:
            if (action.payload.success) {
                const job = action.payload.job;
                const index = oldJobsState.findIndex(c => c.id === job.id);
                const newJobsState = [...oldJobsState];
                newJobsState.splice(index, 1, job);
                return newJobsState;
            } else {
                return oldJobsState;
            }
        default:
            return oldJobsState;
    }
}