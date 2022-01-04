const API_KEY = 'P1DMDN3WM6XI3J4E';  

export const fetchRacingBarData = (stock1, stock2, stock3, stock4, stock5) => {
    const promises = [];

    if (stock1) {
        promises.push(fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stock1}&apikey=${API_KEY}`))
    }

    if (stock2) {
        promises.push(fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stock2}&apikey=${API_KEY}`))
    }

    if (stock3) {
        promises.push(fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stock3}&apikey=${API_KEY}`))
    }

    if (stock4) {
        promises.push(fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stock4}&apikey=${API_KEY}`))
    }

    if (stock5) {
        promises.push(fetch(`https://www.alphavantage.co/query?function=TIME_SERIES_MONTHLY&symbol=${stock5}&apikey=${API_KEY}`))
    }

    return Promise.all(promises); //return array populated with promise objects 
}