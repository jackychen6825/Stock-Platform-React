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
                            borderColor: 'rgba(255, 99, 132, 0.6)',
                            backgroundColor: 'rgba(255, 99, 132, 0.2)', 
                        }, {
                            label: 'Liabilites (Quarterly)',
                            data: this.props.balanceSheet.liabilities.reverse(),
                            borderColor: 'rgba(54, 162, 235, 0.6)',
                            backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        }, {
                            label: "Shareholder's Equity (Quarterly)",
                            data: this.props.balanceSheet.shareholderEquity.reverse(),
                            borderColor: 'rgba(175, 238, 238, 0.6)',
                            backgroundColor: 'rgba(175, 238, 238, 0.2)',
                        }],
                        labels: this.props.balanceSheet.dates.reverse()
                    }}    
                /> : "" }
            </div>
        )
    }
}
