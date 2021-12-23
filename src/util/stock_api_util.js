const API_KEY = 'P1DMDN3WM6XI3J4E';
const API_KEY_2 = '63KJFKQWW3LJY8KS63KJFKQWW3LJY8KS';
const API_KEY_3 = 'KR51Y5FQIXNWWNEV'

export const fetchStockOpenCloseDaily = ticker => (
    fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=${API_KEY}`)
        .then(response => response.json())
)

export const fetchStockEarnings = ticker => (
    fetch(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${ticker}&apikey=${API_KEY_2}`)
        .then(response => response.json())
)

export const fetchStockCapitalStructure = ticker => (
    fetch(`https://www.alphavantage.co/query?function=BALANCE_SHEET&symbol=${ticker}&apikey=${API_KEY_3}`)
        .then(response => response.json())
)