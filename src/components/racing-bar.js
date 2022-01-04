import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

export default class RacingBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(255, 159, 64, 0.2)',
                'rgba(255, 205, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 207, 0.2)'

            ],
            borderColor: [
                'rgb(255, 99, 132)',
                'rgb(255, 159, 64)',
                'rgb(255, 205, 86)',
                'rgb(75, 192, 192)',
                'rgb(54, 162, 235)',
                'rgb(153, 102, 255)',
                'rgb(201, 203, 207)'
            ],
            labels: [],
            race: false,
        }

        this.createDataFromProps = this.createDataFromProps.bind(this)
        this.beginRace = this.beginRace.bind(this)
    }

    componentDidMount() {
        const {getRacingBarData, stock1, stock2, stock3, stock4, stock5} = this.props;
        getRacingBarData(stock1, stock2, stock3, stock4, stock5)
    }

    sortData(data) {
        const {count, stocks} = this.props //grabbing values from props - racing bar slice of state 
        //initialize some constatnts to be converted into individual objects 
        const backgroundColor = this.state.backgroundColor.slice(0, count);
        const borderColor = this.state.borderColor.slice(0, count);
        const labels = stocks.slice(0, count)
        const chartArray = [];

        for (let i = 0; i < labels.length; i++) {
            //create a new object 
            let individualStockBar = {};
            individualStockBar["label"] = labels[i]
            individualStockBar["backgroundColor"] = backgroundColor[i]
            individualStockBar["borderColor"] = borderColor[i]
            individualStockBar["data"] = data[i]
            chartArray.push(individualStockBar)
        }
    
        const sorted 
    }

    //count = number of stocks we are racing 
    //racing bar: { count: 3, stocks: [], MSFT: [], TSLA: [], AMZN: [] ...}
    createDataFromProps(round) {
        const { count, stock1, stock2, stock3, stock4, stock5, racingBar } = this.props;
        const data = [];
        for (let i = 0; i < count; i++) {
            if (i === 0) {
                data.push(racingBar[stock1][round])
            } else if (i === 1) {
                data.push(racingBar[stock2][round])
            } else if (i === 2) {
                data.push(racingBar[stock3][round])
            } else if (i === 3) {
                data.push(racingBar[stock4][round])
            } else if (i === 4) {
                data.push(racingBar[stock5][round])
            }
        }
        return data;
    }

    beginRace() {
        const that = this;
        this.setState({ race: true })
        for (let round = 0; round < 12; round++) {
            setTimeout(() => {
                that.setState({ data: that.createDataFromProps(round) })
            }, round * 2000)
        }
    }

    render() {
        const {racingBar} = this.props;
        return (
            <div className='racing-bar-container'>
                {racingBar.stocks && !this.state.race ? this.beginRace() : "" }
                {racingBar.stocks ? <Bar 
                        data={{
                            labels: racingBar.stocks, //labels for stock names - ticker
                            datasets: [{
                                label: ["Nothing happening here :3"],
                                data: this.state.data,
                                backgroundColor: [ 
                                    'rgba(255, 99, 132, 0.2)',
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 205, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(153, 102, 255, 0.2)',
                                    'rgba(201, 203, 207, 0.2)'],
                                borderColor: [
                                    'rgb(255, 99, 132)',
                                    'rgb(255, 159, 64)',
                                    'rgb(255, 205, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(54, 162, 235)',
                                    'rgb(153, 102, 255)',
                                    'rgb(201, 203, 207)'    
                                ],
                                borderWidth: 1
                            }], 
                        }}

                        options={{
                            indexAxis: 'y',
                        }}
                    /> : ""
                }
            </div>
        )
    }
}
