import {ADD_REVIEW, EDIT_REVIEW, GET_REVIEW} from "../actions/reviews.action";

export default function (oldReviewsState = null, action) {
    switch (action.type) {
        case GET_REVIEW:
            return action.payload.data;
        case ADD_REVIEW:
            if (action.payload.success) {
                return oldReviewsState.concat(action.payload.review);
            } else {
                return oldReviewsState;
            }
        case EDIT_REVIEW:
            if (action.payload.success) {
                const review = action.payload.review;
                const index = oldReviewsState.findIndex(c => c.id === review.id);
                const newReviewsState = [...oldReviewsState];
                newReviewsState.splice(index, 1, review);
                return newReviewsState;
            } else {
                return oldReviewsState;
            }
        default:
            return oldReviewsState;
    }
}