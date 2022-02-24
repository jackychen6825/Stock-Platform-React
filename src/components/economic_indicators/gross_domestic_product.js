import React, { useEffect, useReducer, useState } from 'react'; 
import { fetchRealGDP } from "../../util/economic_api_util";
import { Line, Bar } from 'react-chartjs-2'
import Chart from 'chart.js/auto'

// function economicReducer(state, action) {
//     switch (action.type) {
//         case "grossDomesticProduct":
//             return action.payload;
//             // break;
//         default:
//             return state;
//             // break;
//     }
// }

export default function GrossDomesticProduct() {

    var [timeHorizon, setTimeHorizon] = useState("annual");
    //here we also have to make use of the useReducer functinon  
    // const [economics, dispatch] = useReducer(economicReducer, {});

    const [dates, setDates] = useState([]); //this is our x axis 
    const [values, setValues] = useState([]); //this is our y axis 

    //upon this component mounting call the fetch gdp function
    useEffect(() => {
        fetchRealGDP(timeHorizon) //asynchronous function takes time to resolve
            .then(
                res => {
                    const { data } = res; 

                    let parsedDate = [], 
                        parsedValues = [];

                    data.forEach(instance => {
                        for (const key in instance) {
                            if (key === "date") parsedDate.push(instance[key])
                            if (key === "value") parsedValues.push(instance[key])
                        }
                    })

                    if (timeHorizon === "annual") {
                        setDates(parsedDate.slice(0, 20).reverse().map(
                            date => date.slice(0, 4)
                        ))
                        setValues(parsedValues.slice(0, 20).reverse().map(
                            value => value / 1000
                        ))
                    } else {
                        let count = 1
                        let adjusted = parsedDate.slice(0, 48).reverse();
                        for (let i = 0; i < adjusted.length; i++) {
                            if (count > 4) count = 1;
                            adjusted[i] = `${adjusted[i].slice(0, 4)} - Q${count}`
                            count++
                        }

                        setDates(adjusted)
                        setValues(parsedValues.slice(0, 48).reverse().map(
                            value => value / 1000
                        ))
                    }
                }
            )
    }, [timeHorizon]) //each time timeHorizon changes, fetch the information again 

    return (
        <div className='price-history-chart-container'>
            {dates ? <Line 
                data={{
                    labels: dates,
                    datasets: [{
                        label: 'Real GDP (Trillions)',
                        borderColor: 'rgba(54, 162, 235, 0.5)',
                        backgroundColor: 'rgba(54, 162, 235, 0.2)',
                        data: values,
                        pointStyle: 'circle',
                        pointRadius: 8,
                        pointHoverRadius: 12
                    }]
                }}
            /> : "" }

            <div className="time-btn-container">
                {
                    timeHorizon === "annual" ? <button onClick={() => setTimeHorizon("quarterly")} className="switch-btn">Quarterly</button> : <button onClick={() => setTimeHorizon("annual")} className="switch-btn">Annual</button>
                }
            </div>
        </div>
    )
} 