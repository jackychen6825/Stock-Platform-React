import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

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
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)'
                        }],
                        labels: this.props.cryptoCurrency.dates.reverse()
                    }}    
                /> : ""}
            </div>
        )
    }
}
