import { combineReducers } from 'redux'
import priceHistory from './price_history_reducer';
import earnings from './earnings_reducer';
import balanceSheet from './capital_structure_reducer';
import cryptoCurrency from './crypto_reducer';

const rootReducer = combineReducers({
    priceHistory,
    earnings,
    balanceSheet,
    cryptoCurrency,
})

export default rootReducer;