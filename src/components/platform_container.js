import { connect } from 'react-redux'
import Platform from './platform'
import { getCryptoExchangeInfo } from '../actions/cryptocurrency_actions'

const mDTP = dispatch => ({
    getCryptoExchangeInfo: ticker => dispatch(getCryptoExchangeInfo(ticker))
})

export default connect(null, mDTP)(Platform);