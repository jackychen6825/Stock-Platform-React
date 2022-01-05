import React, { Component, useRef } from 'react'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto';


export default class RacingBar extends Component {
    constructor(props) {
        super(props)
       
        //reference the chart
        this.reference = React.createRef();
        this.datasets = [];

        this.createDataFromState = this.createDataFromState.bind(this); 
        this.beginRace = this.beginRace.bind(this);
        this.sortData = this.sortData.bind(this);
        this.manageTimestamp = this.manageTimestamp.bind(this); 
    }

    componentDidMount() {
        const { getRacingBarData, stock1, stock2, stock3, stock4, stock5 } = this.props;
        getRacingBarData(stock1, stock2, stock3, stock4, stock5)
    }

    createDataFromState(round) {
        const { count } = this.props;
        const data = [];

        for (let i = 0; i < count; i++) {
            if (i === 0) {
                data.push(this.datasets[i][round])
            } else if (i === 1) {
                data.push(this.datasets[i][round])
            } else if (i === 2) {
                data.push(this.datasets[i][round])
            } else if (i === 3) {
                data.push(this.datasets[i][round])
            } else if (i === 4) {
                data.push(this.datasets[i][round])
            }
        }

        return data;
    }

    sortData(data) { 
        const {count} = this.props;
        const chart = this.reference.current;

        let backgroundColor = chart.data.datasets[0].backgroundColor.slice(0, count);
        let borderColor = chart.data.datasets[0].borderColor.slice(0, count);
        let labels = chart.data.labels.slice(0, count);
        let datasets = this.datasets.slice(0, count);
        const chartArray = [];

        for (let i = 0; i < count; i++) {
            let individualStockBar = {};
            individualStockBar["label"] = labels[i]
            individualStockBar["backgroundColor"] = backgroundColor[i]
            individualStockBar["borderColor"] = borderColor[i]
            individualStockBar["data"] = data[i]
            individualStockBar["dataset"] = datasets[i]
            chartArray.push(individualStockBar)
        }

        //chart array = [{label: MSFT, backgroundColor: red, borderCorlor: red data:12},{label:TSLA, data:10 backgroundcolor: blue bordercolor: blue}]
        let sorted = chartArray.sort((a, b) => a.data - b.data) //ascending order sorting with es6 syntax 

        //reform into arrays, now properly sorted 
        const sortedLabels = [];
        const sortedData = [];
        const sortedBackgroundColors = [];
        const sortedBorderColors = [];
        const sortedDatasets = [];

        //sorted = [{},{},{}] -> sorted by ascending order 
        for (let j = 0; j < sorted.length; j++) {
            sortedLabels.push(sorted[j]['label'])
            sortedData.push(sorted[j]['data'])
            sortedBackgroundColors.push(sorted[j]['backgroundColor'])
            sortedBorderColors.push(sorted[j]['borderColor'])
            sortedDatasets.push(sorted[j]['dataset'])
        }
        
        //setting variables 
        chart.data.labels = sortedLabels;
        chart.data.datasets[0].data = sortedData;
        chart.data.datasets[0].backgroundColor = sortedBackgroundColors;
        chart.data.datasets[0].borderColor = sortedBorderColors;
        this.datasets = sortedDatasets;
        chart.update()
    }

    manageTimestamp(round) {
        const timestamps = [
            '2017 Q1', 
            '2017 Q2', 
            '2017 Q3', 
            '2017 Q4', 
            '2018 Q1', 
            '2018 Q2', 
            '2018 Q3', 
            '2018 Q4', 
            '2019 Q1', 
            '2019 Q2', 
            '2019 Q3', 
            '2019 Q4', 
            '2020 Q1', 
            '2020 Q2', 
            '2020 Q3', 
            '2020 Q4', 
            '2021 Q1', 
            '2021 Q2', 
            '2021 Q3', 
            '2021 Q4', 
        ];

       return timestamps[round];
    }


    componentDidUpdate(prevProps) {
        const { racingBar, stock1, stock2, stock3, stock4, stock5 } = this.props;
        const datasets = [];
        if (this.props.racingBar !== prevProps.racingBar) { 
            if (stock1) {
                datasets.push(racingBar[stock1])
            } 

            if (stock2) {
                datasets.push(racingBar[stock2])
            } 

            if (stock3) {
                datasets.push(racingBar[stock3])
            } 

            if (stock4) {
                datasets.push(racingBar[stock4])
            } 

            if (stock5) {
                datasets.push(racingBar[stock5])
            } 

            this.datasets = datasets;
            this.beginRace();
        }
    }

    beginRace() {
        const that = this; 
        for (let round = 0; round < 20; round++) {
            setTimeout(() => {
                let data = that.createDataFromState(round) 
                that.sortData(data) 
            }, round * 1500)
        }
    }

    render() {
        const { racingBar, stock1, stock2, stock3, stock4, stock5 } = this.props;
        return (
            <div className='racing-bar-container'>
                <div className='timestamp-container'>
                </div>
                {racingBar.stocks ? <Bar 
                        ref={this.reference}
                        data={{
                            labels: [stock1, stock2, stock3, stock4, stock5], //labels for stock names - ticker
                            datasets: [{
                                label: ["Earning Surprise (%)"],
                                data: [],
                                backgroundColor: [
                                    'rgba(255, 159, 64, 0.2)',
                                    'rgba(255, 205, 86, 0.2)',
                                    'rgba(75, 192, 192, 0.2)',
                                    'rgba(54, 162, 235, 0.2)',
                                    'rgba(153, 102, 255, 0.2)'
                                ],
                                borderColor: [
                                    'rgb(255, 159, 64)',
                                    'rgb(255, 205, 86)',
                                    'rgb(75, 192, 192)',
                                    'rgb(54, 162, 235)',
                                    'rgb(153, 102, 255)'
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
