import React from "react";
import ReactDOM from 'react-dom';
import * as serviceWorker from './serviceWorker';
import App from "./App";
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter} from "react-router-dom";
import {Route, Switch} from "react-router";
import {Provider} from "react-redux";
import rootReducer from "./reducers/root.reducer";
import {applyMiddleware, createStore} from "redux";
import ReduxPromise from "redux-promise";
import Login from "./components/user/Login";
import Logout from "./components/user/Logout";
import Register from "./components/user/Register";
import Candidates from './components/Candidates';
import Jobs from './components/Jobs'
import Evaluations from './components/Evaluations';
import AddEvaluation from './containers/AddEvaluation';
import EditEvaluation from './containers/EditEvaluation';
import Employees from './components/Employees';
import auth from './components/auth.hoc'
import AddCandidate from './containers/AddCandidate';
import EditCandidate from './containers/EditCandidate';
import EditEmployee from './containers/EditEmployee';
import EditJob from './containers/EditJob';
import AddJob from './containers/AddJob';
import CalendarView from './components/CalendarView';
import Interviews from './components/Interviews';
import AddInterview from './containers/AddInterview';
import EditInterview from './containers/EditInterview';
import Reviews from './components/Reviews';
import AddReview from './containers/AddReview';
import EditReview from './containers/EditReview';
import Dashboard from './components/dashboard/Dashboard'

const createStoreWithMiddleware = applyMiddleware(ReduxPromise)(createStore); // 新的创建的store来append middleware（拦截器）

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(rootReducer)}>
        <BrowserRouter>
            <App>
                <Switch>
                    <Route path="/dashboard" component={Dashboard} />
                    <Route path='/candidates' component={auth(Candidates)}/>
                    <Route path='/add-candidate' component={auth(AddCandidate)}/>
                    <Route path={`/edit-candidate/:id`} component={auth(EditCandidate)}/>
                    <Route path='/jobs' component={auth(Jobs)}/>
                    <Route path='/add-job' component={auth(AddJob)}/>
                    <Route path={`/edit-job/:id`} component={auth(EditJob)}/>
                    <Route path='/evaluations' component={auth(Evaluations)}/>
                    <Route path='/add-evaluation' component={auth(AddEvaluation)}/>
                    <Route path='/edit-evaluation/:id' component={auth(EditEvaluation)}/>
                    <Route path='/interviews' component={auth(Interviews)}/>
                    <Route path='/add-interview' component={auth(AddInterview)}/>
                    <Route path={`/edit-interview/:id`} component={auth(EditInterview)}/>
                    <Route path='/employees' component={auth(Employees)}/>
                    <Route path={`/edit-employee/:id`} component={auth(EditEmployee)}/>
                    <Route path='/reviews' component={auth(Reviews)}/>
                    <Route path='/add-review' component={auth(AddReview)}/>
                    <Route path={`/edit-review/:id`} component={auth(EditReview)}/>
                    <Route path='/calendar' component={auth(CalendarView)}/>
                    <Route path='/logout' component={auth(Logout)}/>
                    <Route path='/register' component={Register}/>
                    <Route path='/' component={Login}/>
                </Switch>
            </App>
        </BrowserRouter>
    </Provider>, document.querySelector('#root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

