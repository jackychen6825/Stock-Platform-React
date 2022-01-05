import React, { Component } from 'react'
import { Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

export default class RacingBar extends Component {
    constructor(props) {
        super(props)
        this.state = {
            chart: { 
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
                labels: [this.props.stock1, this.props.stock2, this.props.stock3, this.props.stock4, this.props.stock5],
                datasets: [],
            }
        }

        this.createDataFromState = this.createDataFromState.bind(this); 
        this.beginRace = this.beginRace.bind(this);
        this.sortData = this.sortData.bind(this);
    }

    componentDidMount() {
        const {getRacingBarData, stock1, stock2, stock3, stock4, stock5} = this.props;
        getRacingBarData(stock1, stock2, stock3, stock4, stock5)
    }

    createDataFromState(monthIndex) {

        const {count} = this.props;
        const data = [];

        for (let i = 0; i < count; i++) {
            if (i === 0) {
                data.push(this.state.chart.datasets[i][monthIndex])
            } else if (i === 1) {
                data.push(this.state.chart.datasets[i][monthIndex])
            } else if (i === 2) {
                data.push(this.state.chart.datasets[i][monthIndex])
            } else if (i === 3) {
                data.push(this.state.chart.datasets[i][monthIndex])
            } else if (i === 4) {
                data.push(this.state.chart.datasets[i][monthIndex])
            }
        }

        return data;
    }

    sortData(data) { 
        const {count} = this.props 
        let backgroundColor = this.state.chart.backgroundColor.slice(0, count);
        let borderColor = this.state.chart.borderColor.slice(0, count);
        let labels = this.state.chart.labels.slice(0, count);
        let datasets = this.state.chart.datasets.slice(0, count);
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
        this.setState({ chart: { data: sortedData, labels: sortedLabels, backgroundColor: sortedBackgroundColors, borderColor: sortedBorderColors, datasets: sortedDatasets } }) 
    }

    componentDidUpdate(prevProps) {
        const {racingBar, stock1, stock2, stock3, stock4, stock5} = this.props;
        const datasets = [];
        if (this.props.racingBar !== prevProps.racingBar) { //when the racing bar information from the api call sets in, call begin race to begin the race 
            
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

            this.setState({ chart: { 
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
                labels: [this.props.stock1, this.props.stock2, this.props.stock3, this.props.stock4, this.props.stock5],
                datasets,
            }})

            this.beginRace();
        }
    }

    beginRace() {
        const pointerToThis = this; //the class component RacingBar 

        for (let round = 0; round < 20; round++) {
            setTimeout(() => {
                let data = pointerToThis.createDataFromState(round) //grabs the data array from props 
                pointerToThis.sortData(data) //creates the sorted data and sets the state 
            }, round * 2000)
        }
    }

    render() {
        const {racingBar} = this.props;
        return (
            <div className='racing-bar-container'>
                {racingBar.stocks ? <Bar 
                        data={{
                            labels: this.state.chart.labels, //labels for stock names - ticker
                            datasets: [{
                                label: ["Earning Surprise (%)"],
                                data: this.state.chart.data,
                                backgroundColor: this.state.chart.backgroundColor,
                                borderColor: this.state.chart.borderColor,
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
