import { CAPITAL_STRUCTURE } from "../actions/stock_actions";

export default function CapitalStructure(state = {}, action) {
    Object.freeze(state)
    switch (action.type) {
        case CAPITAL_STRUCTURE:
            return action.data
        default:
            return state;
    }
}