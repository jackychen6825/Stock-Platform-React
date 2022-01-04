import { connect } from "react-redux";
import RacingBar from './racing-bar';
import { getRacingBarData } from '../actions/racing_bar_actions';

const mstp = ({ racingBar }) => ({
    racingBar,
    count: racingBar.count,
    stocks: racingBar.stocks,
});

const mdtp = dispatch => ({
    getRacingBarData: (stock1, stock2, stock3, stock4, stock5) => dispatch(getRacingBarData(stock1, stock2, stock3, stock4, stock5)),
});

export default connect(mstp, mdtp)(RacingBar);