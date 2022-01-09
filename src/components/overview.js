import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getCompanyOverview } from '../actions/stock_actions';

class Overview extends Component {
    constructor(props) {
        super(props)
        this.state = { rerender: false }
    }

    componentDidMount() {
        this.props.getCompanyOverview(this.props.ticker);
    }

    componentDidUpdate(prevProps) {
        if (this.props.ticker !== prevProps.ticker) {
            this.props.getCompanyOverview(this.props.ticker)
        }
    }

    render() {
        return (
            <div className='overview-container'>
                {this.props.overview.name ? 
                    <div className='overview-content-container'>
                        <div className='name-container'>{this.props.overview.name}</div>
                        <div className='description-container'>{this.props.overview.description}</div>
                    </div> 
                    :  "" 
                }
            </div>
        )
    }
}

const mstp = ({ overview }) => ({
    overview,
});

const mdtp = dispatch => ({
    getCompanyOverview: ticker => dispatch(getCompanyOverview(ticker)),
});

export default connect(mstp, mdtp)(Overview);