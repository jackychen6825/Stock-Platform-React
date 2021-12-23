import { EARNINGS } from "../actions/stock_actions";

export default function Earnings(state = {}, action) {
    Object.freeze(state)
    switch (action.type) {
        case EARNINGS:
            return action.data
        default:
            return state;
    }
}