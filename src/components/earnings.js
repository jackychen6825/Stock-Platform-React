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

    componentDidMount() {
        this.props.getStockEarnings(this.props.ticker)
    }

    componentDidUpdate(prevProps) {
        if (this.props.ticker !== prevProps.ticker) {
            this.props.getStockEarnings(this.props.ticker)
        }
    }

    render() {
        return (
            <div className='earnings-chart-container'>
                {this.props.earnings.dates ? <Bar 
                    data={{
                        datasets: [{
                            label: 'Reported EPS (Quarterly)',
                            data: this.props.earnings.reportedEPS.reverse(),
                            borderColor: 'rgba(255, 99, 132, 0.5)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)',
                            borderWidth: 1
                        }, {
                            label: 'Estimated EPS (Quarterly)',
                            data: this.props.earnings.estimatedEPS.reverse(),
                            borderColor: 'rgba(54, 162, 235, 0.5)',
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                            borderWidth: 1
                        }],
                        labels: this.props.earnings.dates.reverse()
                    }}    
                /> : ""}
            </div>
        )
    }
}
