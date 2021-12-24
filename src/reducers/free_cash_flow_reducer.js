import { FCF } from "../actions/stock_actions";

export default function FreeCashFlow(state = {}, action) {
    Object.freeze(state)
    switch (action.type) {
        case FCF:
            return action.data
        default:
            return state;
    }
}