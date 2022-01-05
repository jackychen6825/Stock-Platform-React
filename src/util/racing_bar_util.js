const API_KEY = 'P1DMDN3WM6XI3J4E';  

export const fetchRacingBarData = (stock1, stock2, stock3, stock4, stock5) => {
    const promises = [];

    https://www.alphavantage.co/query?function=EARNINGS&symbol=IBM&apikey=demo

    if (stock1) {
        promises.push(fetch(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${stock1}&apikey=${API_KEY}`))
    }

    if (stock2) {
        promises.push(fetch(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${stock2}&apikey=${API_KEY}`))
    }

    if (stock3) {
        promises.push(fetch(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${stock3}&apikey=${API_KEY}`))
    }

    if (stock4) {
        promises.push(fetch(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${stock4}&apikey=${API_KEY}`))
    }

    if (stock5) {
        promises.push(fetch(`https://www.alphavantage.co/query?function=EARNINGS&symbol=${stock5}&apikey=${API_KEY}`))
    }

    return Promise.all(promises); //return array populated with promise objects 
}