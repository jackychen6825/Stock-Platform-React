import React, { Component } from 'react'
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

export default class PriceHistoryChart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            render: false
        }
    }

    componentDidMount() {
        this.props.getStockOpenCloseDaily(this.props.ticker)
    }

    // componentDidUpdate(prevProps) {
    //     if (prevProps !== this.props) {
    //         const bool = this.state.render
    //         this.setState({ render: !bool })
    //     }
    // }

    componentDidUpdate(prevProps) {
        if (this.props.ticker !== prevProps.ticker) {
            this.props.getStockOpenCloseDaily(this.props.ticker)
        }
    }

    render() {
        return (
            <div className='price-history-chart-container'>
                {this.props.priceHistory.dates ? <Line 
                    data={{
                        labels: this.props.priceHistory.dates.reverse(),
                        datasets: [{
                            label: 'Open Price (Daily)',
                            borderColor: 'rgba(80, 39, 245, 0.8)',
                            backgroundColor: 'rgba(80, 39, 245, 0.8)',
                            data: this.props.priceHistory.opens.reverse(),
                        }, {
                            label: 'Closing Price (Daily)',
                            borderColor: 'rgb(54, 162, 235)',
                            backgroundColor: 'rgb(54, 162, 235)',
                            data: this.props.priceHistory.closes.reverse(),
                        }]
                    }}
                /> : "" }
            </div>
        )
    }
}
