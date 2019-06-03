import {combineReducers} from 'redux';
import {reducer as FormReducer} from 'redux-form';
import AuthReducer from './auth.reducer';
import CandidatesReducer from './candidates.reducer';
import EmployeesReducer from './employees.reducer';
import JobsReducer from './jobs.reducer';
import RegisterReducer from './register.reducer';
import EvaluationsReducer from './evaluations.reducer';
import PostWebsitesReducer from './postWebsites.reducer';
import InterviewsReducer from './interviews.reducer';
import ReviewsReducer from './reviews.reducer';

const rootReducer = combineReducers({
    candidates: CandidatesReducer,
    employees: EmployeesReducer,
    evaluations: EvaluationsReducer,
    jobs: JobsReducer,
    form: FormReducer,
    loggedIn: AuthReducer,
    register: RegisterReducer,
    post_websites: PostWebsitesReducer,
    interviews: InterviewsReducer,
    reviews: ReviewsReducer,
});

export default rootReducer;