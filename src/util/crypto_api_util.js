const API_KEY_1 = 'N08K14KBE4NBJZVN';

export const fetchCryptoExchangeRate = ticker => (
    fetch(`https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_WEEKLY&symbol=${ticker}&market=CNY&apikey=${API_KEY_1}`)
        .then(response => response.json())
)