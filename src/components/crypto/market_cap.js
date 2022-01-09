import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'

export default class Earnings extends Component {
    constructor(props) {
        super(props)
        this.state = {
            render: false
        }
    }

    render() {
        return (
            <div className='earnings-chart-container'>
                {this.props.cryptoCurrency.dates ? <Bar 
                    data={{
                        datasets: [{
                            label: 'Market Capitalization',
                            data: this.props.cryptoCurrency.marketCap.reverse(),
                            borderColor: 'rgba(54, 162, 235, 0.5)',
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderWidth: 1
                        }],
                        labels: this.props.cryptoCurrency.dates.reverse()
                    }}    
                /> : ""}
            </div>
        )
    }
}
