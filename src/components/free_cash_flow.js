import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

export default class FreeCashFlow extends Component {
    constructor(props) {
        super(props)
        this.state = {
            render: false
        }
    }

    componentDidMount() {
        this.props.getFreeCashFlow(this.props.ticker)
    }

    componentDidUpdate(prevProps) {
        if (this.props.ticker !== prevProps.ticker) {
            this.props.getFreeCashFlow(this.props.ticker)
        }
    }

    render() {
        return (
            <div className='earnings-chart-container'>
                {this.props.freeCashFlow.dates ? <Bar 
                    data={{
                        datasets: [{
                            label: 'Free Cash Flow (Quarterly)',
                            data: this.props.freeCashFlow.freeCashFlow.reverse(),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)'
                        }, {
                            label: 'Operating Cash Flow (Quarterly)',
                            data: this.props.freeCashFlow.operatingCashflow.reverse(),
                            borderColor: 'rgb(54, 162, 235)',
                            backgroundColor: 'rgb(54, 162, 235)'
                        }, {
                            label: 'Capital Expenditure (Quarterly)',
                            data: this.props.freeCashFlow.capEx.reverse(),
                            borderColor: 'rgb(175,238,238)',
                            backgroundColor: 'rgb(175,238,238)'
                        }],
                        labels: this.props.freeCashFlow.dates.reverse()
                    }}    
                /> : ""}
            </div>
        )
    }
}
