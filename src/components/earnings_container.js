import { connect } from 'react-redux'
import Earnings from './earnings'
import { getStockEarnings } from '../actions/stock_actions'

const mSTP = ({ earnings }) => ({
    earnings
})

const mDTP = dispatch => ({
    getStockEarnings: ticker => dispatch(getStockEarnings(ticker))
})

export default connect(mSTP, mDTP)(Earnings)