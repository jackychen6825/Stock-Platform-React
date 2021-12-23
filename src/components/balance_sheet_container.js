import { connect } from 'react-redux';
import BalanceSheet from './balance_sheet';
import { getStockCapitalStructure } from '../actions/stock_actions';

const mSTP = ({ balanceSheet }) => ({
    balanceSheet
})

const mDTP = dispatch => ({
    getStockCapitalStructure: ticker => dispatch(getStockCapitalStructure(ticker))
})

export default connect(mSTP, mDTP)(BalanceSheet);