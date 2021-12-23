import { OPEN_CLOSE } from "../actions/stock_actions";

export default function priceHistory(state = {}, action) {
    Object.freeze(state)
    switch (action.type) {
        case OPEN_CLOSE:
            return action.data
        default:
            return state;
    }
}