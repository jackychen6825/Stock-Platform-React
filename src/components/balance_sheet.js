import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

export default class BalanceSheet extends Component {
    constructor(props) {
        super(props)
        this.state = {
            render: false
        }
    }

    componentDidMount() {
        this.props.getStockCapitalStructure(this.props.ticker)
    }

    componentDidUpdate(prevProps) {
        if (this.props.ticker !== prevProps.ticker) {
            this.props.getStockCapitalStructure(this.props.ticker)
        }
    }

    render() {
        return (
            <div className='balance-sheet-container'>
                {this.props.balanceSheet.dates ? <Bar 
                    data={{
                        datasets: [{
                            label: 'Assets (Quarterly)',
                            data: this.props.balanceSheet.assets.reverse(),
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)'
                        }, {
                            label: 'Liabilites (Quarterly)',
                            data: this.props.balanceSheet.liabilities.reverse(),
                            borderColor: 'rgb(54, 162, 235)',
                            backgroundColor: 'rgb(54, 162, 235)'
                        }, {
                            label: "Shareholder's Equity (Quarterly)",
                            data: this.props.balanceSheet.shareholderEquity.reverse(),
                            borderColor: 'rgb(175,238,238)',
                            backgroundColor: 'rgb(175,238,238)'
                        }],
                        labels: this.props.balanceSheet.dates.reverse()
                    }}    
                /> : "" }
            </div>
        )
    }
}
