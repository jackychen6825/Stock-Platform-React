import { connect } from 'react-redux'
import PriceHistoryChart from './price_history_chart'
import { getStockOpenCloseDaily } from '../actions/stock_actions'

const mSTP = ({ priceHistory }) => ({
    priceHistory
})

const mDTP = dispatch => ({
    getStockOpenCloseDaily: ticker => dispatch(getStockOpenCloseDaily(ticker))
})

export default connect(mSTP, mDTP)(PriceHistoryChart)