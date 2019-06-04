import {GET_POST_WEBSITES} from "../actions/postWebsites.action";

export default function (oldpostWebsitesState = null, action) {
    switch (action.type) {
        case GET_POST_WEBSITES:
            return action.payload.data;
        default:
            return oldpostWebsitesState;
    }
}