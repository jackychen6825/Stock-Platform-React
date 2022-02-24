import React, { useState, useEffect } from 'react';
import { fetchUnemploymentNumbers } from '../../util/economic_api_util';
import { Line } from 'react-chartjs-2'
import Chart from 'chart.js/auto'


export default function Unemployment() {
    const [unemployment, setUnemployment] = useState(null);
    const [dates, setDates] = useState(null);
    
    useEffect(() => {
        fetchUnemploymentNumbers() //asynchronous function so 
            .then(res => {
                //here we have the response from the api call so  
                var { data } = res; 
                //data structure is like this: [{ date: "", value: "" }, ...]
                //iterate through each object 

                var parsedDates = [], 
                    parsedValues = [];

                data.forEach(item => {
                    //each item will be like so --> { date: "", value: "" }
                    parsedDates.push(item["date"])
                    parsedValues.push(item["value"])
                })

                // console.log(parsedDates, parsedValues);

                parsedDates = parsedDates.slice(0, 25).reverse();
                parsedValues = parsedValues.slice(0, 25).reverse();

                setDates(parsedDates);
                setUnemployment(parsedValues);

                //end 
            })
    }, []) //only do this upon mounting so no dependencies 

    return (
        <div className='price-history-chart-container'>
            {dates ? <Line 
                data={{
                    labels: dates,
                    datasets: [{
                        label: 'Unemployment Rate (%)',
                        borderColor: 'rgba(54, 162, 235, 0.5)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        data: unemployment,
                        pointStyle: 'circle',
                        pointRadius: 8,
                        pointHoverRadius: 12
                    }]
                }}
            /> : "" }
        </div>
    )
}