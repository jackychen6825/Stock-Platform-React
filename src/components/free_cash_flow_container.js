import { connect } from 'react-redux';
import FreeCashFlow from './free_cash_flow';
import { getFreeCashFlow } from '../actions/stock_actions';

const mstp = state => ({
    freeCashFlow: state.freeCashFlow,
})

const mdtp = dispatch => ({
    getFreeCashFlow: ticker => dispatch(getFreeCashFlow(ticker))
})

export default connect(mstp, mdtp)(FreeCashFlow)