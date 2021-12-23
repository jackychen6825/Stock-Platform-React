import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

export default class VolumeChart extends Component {
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
                            label: 'Volume (Weekly)',
                            data: this.props.cryptoCurrency.volumes.reverse(),
                            borderColor: 'rgba(80, 39, 245, 0.38)',
                            backgroundColor: 'rgba(80, 39, 245, 0.38)'
                        }],
                        labels: this.props.cryptoCurrency.dates.reverse()
                    }}    
                /> : ""}
            </div>
        )
    }
}
