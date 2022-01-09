import { OVERVIEW } from "../actions/stock_actions";

export default function overviewReducer(state = {}, action) {
    switch (action.type) {
        case OVERVIEW:
            return { name: action.payload.name, description: action.payload.description };
        default:
            return state;
    }
};