import React, { Component } from 'react'
import { connect } from 'react-redux';

class Timestamp extends Component {
    constructor(props) {
        super(props)
        this.state = { timestamp: "" }
        
        this.manageTimestamp = this.manageTimestamp.bind(this); 
        this.begin = this.begin.bind(this);
    }

    manageTimestamp(round) {
        const timestamps = [
            '2017 Q1', 
            '2017 Q2', 
            '2017 Q3', 
            '2017 Q4', 
            '2018 Q1', 
            '2018 Q2', 
            '2018 Q3', 
            '2018 Q4', 
            '2019 Q1', 
            '2019 Q2', 
            '2019 Q3', 
            '2019 Q4', 
            '2020 Q1', 
            '2020 Q2', 
            '2020 Q3', 
            '2020 Q4', 
            '2021 Q1', 
            '2021 Q2', 
            '2021 Q3', 
            '2021 Q4', 
        ];

       this.setState({ timestamp: timestamps[round] });
    }

    begin() {
        const that = this;
        for (let round = 0; round < 20; round++) {
            setTimeout(() => {
                that.manageTimestamp(round)
            }, round * 1500)
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.racingBar !== prevProps.racingBar) {
            this.begin()
        }
    }

    render() {
        return (
            <div className='timestamp-container'>
                {this.state.timestamp}
            </div>
        )
    }
}

const mstp = ({ racingBar }) => ({
    racingBar,
});

export default connect(mstp, null)(Timestamp);