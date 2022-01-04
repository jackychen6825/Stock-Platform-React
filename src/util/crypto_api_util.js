const API_KEY = 'P1DMDN3WM6XI3J4E';

export const fetchCryptoExchangeRate = ticker => (
    fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=${ticker}&market=CNY&apikey=${API_KEY}`)
        .then(response => response.json())
)