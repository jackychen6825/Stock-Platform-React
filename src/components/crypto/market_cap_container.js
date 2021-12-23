import { connect } from "react-redux";
import MarketCapChart from './market_cap'

const mSTP = ({ cryptoCurrency }) => ({
    cryptoCurrency
})

export default connect(mSTP, null)(MarketCapChart)