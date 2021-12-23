import { fetchCryptoExchangeRate } from "../util/crypto_api_util";

export const CRYPTO = 'CRYPTO'

const receiveCrypto = data => ({
    type: CRYPTO,
    data
})

export const getCryptoExchangeInfo = ticker => dispatch => {
    fetchCryptoExchangeRate(ticker)
        .then(response => {
            const dates = []
            const opens = []
            const closes = []
            const volumes = []
            const marketCap = []

            for (const date in response["Time Series (Digital Currency Weekly)"]) {
                dates.push(date)
                opens.push(response["Time Series (Digital Currency Weekly)"][date]["1b. open (USD)"])
                closes.push(response["Time Series (Digital Currency Weekly)"][date]["4b. close (USD)"])
                volumes.push(response["Time Series (Digital Currency Weekly)"][date]["5. volume"])
                marketCap.push(response["Time Series (Digital Currency Weekly)"][date]["6. market cap (USD)"])
            }

            const parsed = { dates, opens, closes, volumes, marketCap };
            dispatch(receiveCrypto(parsed))
        })
}