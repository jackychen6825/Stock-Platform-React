import { connect } from 'react-redux'
import OpenCloseChart from './open_close'
import { getCryptoExchangeInfo } from '../../actions/cryptocurrency_actions'

const mSTP = ({ cryptoCurrency }) => ({
    cryptoCurrency
})

const mDTP = dispatch => ({
    getCryptoExchangeInfo: ticker => dispatch(getCryptoExchangeInfo(ticker))
})

export default connect(mSTP, mDTP)(OpenCloseChart)