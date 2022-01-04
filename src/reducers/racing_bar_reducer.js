import { RACING_BAR } from "../actions/racing_bar_actions";

export default function racingBarReducer(state = {}, action) {
    Object.freeze(state);
    switch (action.type) {
        case RACING_BAR:
            return action.data
        default:
            return state;
    }
};