import React, { Component } from 'react'
import { connect } from 'react-redux'

class Name extends Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className='name-container-crypto'>
                {this.props.cryptoCurrency.dates ? <div>{this.props.cryptoCurrency.name}</div> : ""}
            </div>
        )
    }
}

const mstp = ({ cryptoCurrency }) => ({
    cryptoCurrency,
});

export default connect(mstp, null)(Name);
