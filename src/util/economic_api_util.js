const API_KEY = "P1DMDN3WM6XI3J4E";

export const fetchRealGDP = interval => (
    fetch(`https://www.alphavantage.co/query?function=REAL_GDP&interval=${interval}&apikey=${API_KEY}`)
        .then(res => res.json())
        .catch(err => console.error(err))
)

