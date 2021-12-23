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
                            label: 'Reported EPS',
                            data: this.props.earnings.reportedEPS.reverse(),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)'
                        }, {
                            label: 'Estimated EPS',
                            data: this.props.earnings.estimatedEPS.reverse(),
                            borderColor: 'rgb(54, 162, 235)',
                            backgroundColor: 'rgb(54, 162, 235)'
                        }],
                        labels: this.props.earnings.dates.reverse()
                    }}    
                /> : ""}
            </div>
        )
    }
}
