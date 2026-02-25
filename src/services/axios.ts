import axios from 'axios';

export const coingeckoApi = axios.create({
    baseURL: 'https://api.coingecko.com/api/v3',
    timeout: 10000,
});

coingeckoApi.interceptors.response.use(
    (response) => response,
    (error) => {
        // Basic error handling for rate limits or other issues
        if (error.response?.status === 429) {
            console.warn('CoinGecko API rate limit exceeded.');
        }
        return Promise.reject(error);
    }
);
