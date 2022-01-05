import { fetchRacingBarData } from "../util/racing_bar_util";

export const RACING_BAR = "RACING_BAR";

const receiveRacingBar = data => ({
    type: RACING_BAR,
    data
})

export const getRacingBarData = (stock1, stock2, stock3, stock4, stock5) => dispatch => {
    fetchRacingBarData(stock1, stock2, stock3, stock4, stock5) 
        .then(responses => {
            
            var jsonPromises = [];
            
            for (let i = 0; i < responses.length; i++) {
                jsonPromises.push(responses[i].json()) 
            }
            return Promise.all(jsonPromises) 
        })
        .then(results => {
            const parsedResponse = { count: results.length, stocks: [stock1, stock2, stock3, stock4, stock5] } //initialize return object
            
            for (let i = 0; i < results.length; i++) {
                const apiResponse = results[i]["quarterlyEarnings"] 
                let surprisePercentages = [] 
                
                for (let quarterlyReport of apiResponse) {
                    surprisePercentages.push(quarterlyReport["surprisePercentage"]) 
                }

                const stockTicker = parsedResponse["stocks"][i] 
                parsedResponse[stockTicker] = surprisePercentages.slice(0, 20) 
            }

            dispatch(receiveRacingBar(parsedResponse))
        }) 
};