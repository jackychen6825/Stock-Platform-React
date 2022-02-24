import React, { useEffect, useReducer, useState } from 'react'; 
import { fetchRealGDP } from "../../util/economic_api_util";
import { Line } from 'react-chartjs-2'
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

    const [timeHorizon, setTimeHorizon] = useState("annual");
    //here we also have to make use of the useReducer functinon  
    // const [economics, dispatch] = useReducer(economicReducer, {});

    const [dates, setDates] = useState([]); //this is our x axis 
    const [values, setValues] = useState([]); //this is our y axis 

    //upon this component mounting call the fetch gdp function
    useEffect(() => {
        fetchRealGDP(timeHorizon) //asynchronous function takes time to resolve
            .then(
                res => {
                    //we are going to need to parse this response --
                    console.log(res); //want to see how it looks like first
                    const { name, data } = res; 

                    let parsedDate = [], 
                        parsedValues = [];

                    data.forEach(instance => {
                        for (const key in instance) {
                            if (key === "date") parsedDate.push(instance[key])
                            if (key === "value") parsedValues.push(instance[key])
                        }
                    })

                    //remember that data is an array with this structure:
                    //[{ date: "", value: "" }]

                    setDates(parsedDate)
                    setValues(parsedValues)
                }
            )
    }, []) //each time timeHorizon changes, fetch the information again 

    return (
        <div className='price-history-chart-container'>
                {dates ? <Line 
                    data={{
                        labels: dates.reverse(),
                        datasets: [{
                            label: 'Real GDP (Billions)',
                            borderColor: 'rgb(54, 162, 235)',
                            backgroundColor: 'rgb(54, 162, 235)',
                            data: values.reverse(),
                        }]
                    }}
                /> : "" }
            </div>
    )
} 