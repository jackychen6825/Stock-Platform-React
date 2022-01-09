import { fetchStockOpenCloseDaily, fetchStockEarnings, fetchStockCapitalStructure, fetchFreeCashFlow, fetchCompanyOverview } from "../util/stock_api_util"

export const OPEN_CLOSE = 'OPEN_CLOSE'
export const EARNINGS = 'EARNINGS'
export const CAPITAL_STRUCTURE = 'CAPITAL_STRUCTURE'
export const FCF = 'FCF'
export const OVERVIEW = 'OVERVIEW'

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

const receiveFreeCashFlow = data => ({
    type: FCF, 
    data
})

const receiveOverview = payload => ({
    type: OVERVIEW,
    payload
})

export const getStockOpenCloseDaily = ticker => dispatch => {
    fetchStockOpenCloseDaily(ticker)
        .then(data => {
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
            //initialize variables 
            const dates = []
            const assets = []
            const liabilities = []
            const shareholderEquity = []
            //parsing data 
            for (const quartlyReport of data["quarterlyReports"]) {
                dates.push(quartlyReport["fiscalDateEnding"])
                assets.push(
                    parseFloat(quartlyReport['totalAssets']) / 1000000000
                )
                liabilities.push(
                    parseFloat(quartlyReport['totalLiabilities']) / 1000000000
                )
                shareholderEquity.push(
                    parseFloat(quartlyReport['totalShareholderEquity']) / 1000000000
                )
            }

            const parsed = { dates, assets, liabilities, shareholderEquity }
            dispatch(receiveCapStructure(parsed))
        })
}

export const getFreeCashFlow = ticker => dispatch => {
    fetchFreeCashFlow(ticker)
        .then(data => {
            const dates = []
            const freeCashFlow = []
            const operatingCashflow = []
            const capEx = []

            for (const quartlyReport of data["quarterlyReports"]) {
                dates.push(quartlyReport["fiscalDateEnding"])
                freeCashFlow.push(
                    (parseFloat(quartlyReport["operatingCashflow"]) - parseFloat(quartlyReport["capitalExpenditures"])) / 1000000
                )
                operatingCashflow.push(
                    parseFloat(quartlyReport["operatingCashflow"]) / 1000000
                )
                capEx.push(
                    parseFloat(quartlyReport["capitalExpenditures"]) / 1000000
                )
            }

            const parsed = { dates, freeCashFlow, operatingCashflow, capEx }
            dispatch(receiveFreeCashFlow(parsed))
        })
}

export const getCompanyOverview = ticker => dispatch => {
    fetchCompanyOverview(ticker)
        .then(res => {
            
            let name = res.Name;
            let description = res.Description;
            const parsed = { name, description };
            dispatch(receiveOverview(parsed));
        })
};