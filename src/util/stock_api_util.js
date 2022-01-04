const API_KEY = 'P1DMDN3WM6XI3J4E';

export const fetchStockOpenCloseDaily = ticker => (
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`)
        .then(response => response.json())
)

export const fetchStockEarnings = ticker => (
    fetch(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${ticker}&apikey=${API_KEY}`)
        .then(response => response.json())
)

export const fetchStockCapitalStructure = ticker => (
    fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${ticker}&apikey=${API_KEY}`)
        .then(response => response.json())
)

export const fetchFreeCashFlow = ticker => (
    fetch(`https://www.alphavantage.co/query?function=CASH_FLOW&symbol=${ticker}&apikey=${API_KEY}`)
        .then(res => res.json())
)