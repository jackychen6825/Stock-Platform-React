import React, { useEffect, useReducer } from 'react'; 
import { fetchRealGDP } from "../../util/economic_api_util";

function economicReducer(state, action) {
    switch (action.type) {
        case value:
            return action.payload;
            // break;
        default:
            return state;
            // break;
    }
}

export default function GrossDomesticProduct() => {

    const [timeHorizon, setTimeHorizon] = useState("annual");
    //here we also have to make use of the useReducer functinon  
    const [economics, dispatch] = useReducer(economicReducer, {});

    //upon this component mounting call the fetch gdp function
    useEffect(() => {
        fetchRealGDP(timeHorizon) //asynchronous function takes time to resolve
            .then(
                res => {
                    //we are going to need to parse this response --
                    console.log(res); //want to see how it looks like first
                }
            )
    }, [timeHorizon]) //each time timeHorizon changes, fetch the information again 

    return (
        <div className="chart-container">
            
        </div>
    )
} 