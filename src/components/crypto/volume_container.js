import { connect } from 'react-redux'
import VolumeChart from './volume'

const mSTP = ({ cryptoCurrency }) => ({
    cryptoCurrency
})

export default connect(mSTP, null)(VolumeChart)