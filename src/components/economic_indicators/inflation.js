import React, { useEffect, useState } from "react";
import { fetchInflationNumbers } from "../../util/economic_api_util";
import { Line } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

export default function Inflation() {
    const [values, setValues] = useState(null);
    const [dates, setDates] = useState(null);

    useEffect(() => {
        fetchInflationNumbers()
            .then(res => {
                let { data } = res;

                let parsedDates = [],
                    parsedValues = [];
                
                data.forEach(item => {
                    parsedDates.push(item['date'])
                    parsedValues.push(item['value'])
                })

                parsedDates = parsedDates.slice(0, 20).reverse().map(date => date.slice(0, 4))
                parsedValues = parsedValues.slice(0, 20).reverse();

                setDates(parsedDates)
                setValues(parsedValues)
            })
    }, [])

    return (
        <div>
            { dates ? <Line 
                data={{
                    labels: dates,
                    datasets: [{
                        label: 'Inflation (%)',
                        borderColor: 'rgba(54, 162, 235, 0.5)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        data: values,
                        pointStyle: 'circle',
                        pointRadius: 8,
                        pointHoverRadius: 12
                    }]
                }}
            /> : "" }
        </div>
    )
}