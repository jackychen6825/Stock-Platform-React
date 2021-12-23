import { CRYPTO } from '../actions/cryptocurrency_actions'

export default function CryptoReducer(state = {}, action) {
    Object.freeze(state)
    switch (action.type) {
        case CRYPTO:
            return action.data
        default:
            return state;
    }
}