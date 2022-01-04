import { combineReducers } from 'redux'
import priceHistory from './price_history_reducer';
import earnings from './earnings_reducer';
import balanceSheet from './capital_structure_reducer';
import freeCashFlow from './free_cash_flow_reducer';
import cryptoCurrency from './crypto_reducer';
import racingBar from './racing_bar_reducer';

const rootReducer = combineReducers({
    priceHistory,
    earnings,
    balanceSheet,
    freeCashFlow,
    cryptoCurrency,
    racingBar,
})

export default rootReducer;