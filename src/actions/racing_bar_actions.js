import { fetchRacingBarData } from "../util/racing_bar_util";

export const RACING_BAR = "RACING_BAR";

const receiveRacingBar = data => ({
    type: RACING_BAR,
    data
})

export const getRacingBarData = (stock1, stock2, stock3, stock4, stock5) => dispatch => {
    fetchRacingBarData(stock1, stock2, stock3, stock4, stock5) 
        .then(responses => {
            //make this a global variable so all functions can access
            var jsonPromises = [];
            //promises.all ensures that all promises are fulfilled before moving forward and returns a promise object
            for (let i = 0; i < responses.length; i++) {
                jsonPromises.push(responses[i].json()) //push the promises objects into the jsonPromises array
            }
            return Promise.all(jsonPromises)
        })
        .then(results => {
            const parsedResponse = { count: results.length, stocks: [stock1, stock2, stock3, stock4, stock5] } //initialize return object
            
            //create for loop to iterate through results 
            for (let i = 0; i < results.length; i++) {
                const apiResponse = results[i]["Monthly Time Series"] //key into the time series informtion
                let opens = [] //initialize array to replace associated arr in return object
                //iterate through monthly time series and grab the open values 
                for (const date in apiResponse) {
                    opens.push(apiResponse[date]["1. open"]) 
                }

                const stockTicker = parsedResponse["stocks"][i] //grab the stock ticker and use it as a key 
                parsedResponse[stockTicker] = opens.slice(0, 12) //only grab the last 12 months of information
            }

            //once parsing is done dispatch to the state 
            dispatch(receiveRacingBar(parsedResponse))
        }) 
};