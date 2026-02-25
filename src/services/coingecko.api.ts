import { MarketData, ChartDataPoint } from '../types';
import { coingeckoApi } from './axios';

export const fetchMarketPrices = async (page = 1, perPage = 100): Promise<MarketData[]> => {
    const { data } = await coingeckoApi.get('/coins/markets', {
        params: {
            vs_currency: 'usd',
            order: 'market_cap_desc',
            per_page: perPage,
            page,
            sparkline: false,
        },
    });
    return data;
};

export const fetchCoinDetails = async (id: string) => {
    const { data } = await coingeckoApi.get(`/coins/${id}`, {
        params: {
            localization: false,
            tickers: false,
            market_data: true,
            community_data: false,
            developer_data: false,
            sparkline: false,
        },
    });
    return data;
};

export const fetchCoinChart = async (id: string, days = '1'): Promise<ChartDataPoint[]> => {
    const { data } = await coingeckoApi.get(`/coins/${id}/market_chart`, {
        params: {
            vs_currency: 'usd',
            days,
        },
    });
    return data.prices.map((item: [number, number]) => ({
        time: item[0],
        price: item[1],
    }));
};
