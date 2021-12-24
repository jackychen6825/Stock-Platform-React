import { fetchStockOpenCloseDaily, fetchStockEarnings, fetchStockCapitalStructure } from "../util/stock_api_util"

export const OPEN_CLOSE = 'OPEN_CLOSE'
export const EARNINGS = 'EARNINGS'
export const CAPITAL_STRUCTURE = 'CAPITAL_STRUCTURE'

const receiveOpenClose = data => ({
    type: OPEN_CLOSE,
    data
})

const receiveEarnings = data => ({
    type: EARNINGS, 
    data
})

const receiveCapStructure = data => ({
    type: CAPITAL_STRUCTURE, 
    data
})

export const getStockOpenCloseDaily = ticker => dispatch => {
    fetchStockOpenCloseDaily(ticker)
        .then(data => {
            debugger
            //initialize variables
            const dates = []
            const opens = []
            const closes = []
            const volumes = []
            //parsing data
            for (const date in data["Time Series (Daily)"]) {
                dates.push(date)
                opens.push(data["Time Series (Daily)"][date]["1. open"])
                closes.push(data["Time Series (Daily)"][date]["4. close"])
                volumes.push(data["Time Series (Daily)"][date]["5. volume"])
            }
            let parsed = { dates, opens, closes, volumes }
            dispatch(receiveOpenClose(parsed))})
}

export const getStockEarnings = ticker => dispatch => {
    fetchStockEarnings(ticker)
        .then(data => {
            debugger
            //initialize variables 
            const dates = []
            const estimatedEPS = []
            const reportedEPS = []
            //parsing data
            for (const hash of data['quarterlyEarnings']) {
                dates.push(hash['fiscalDateEnding'])
                reportedEPS.push(hash['reportedEPS'])
                estimatedEPS.push(hash['estimatedEPS'])
            }

            const parsed = { dates, estimatedEPS, reportedEPS }
            dispatch(receiveEarnings(parsed))
        })
}

export const getStockCapitalStructure = ticker => dispatch => {
    fetchStockCapitalStructure(ticker)
        .then(data => {
            debugger
            //initialize variables 
            const dates = []
            const assets = []
            const liabilities = []
            const shareholderEquity = []
            //parsing data 
            for (const quartlyReport of data["quarterlyReports"]) {
                dates.push(quartlyReport["fiscalDateEnding"])
                assets.push(quartlyReport['totalAssets'])
                liabilities.push(quartlyReport['totalLiabilities'])
                shareholderEquity.push(quartlyReport['totalShareholderEquity'])
            }

            const parsed = { dates, assets, liabilities, shareholderEquity }
            dispatch(receiveCapStructure(parsed))
        })
}