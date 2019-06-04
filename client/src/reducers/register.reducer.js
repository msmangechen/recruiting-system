import {REGISTER} from '../actions/auth.action';

export default function(oldState = null, action) {
    switch (action.type) {
        case REGISTER:
            return action.payload;
        default:
            return oldState;
    }
}